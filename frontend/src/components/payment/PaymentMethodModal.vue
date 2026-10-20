<template>
  <a-modal :open="props.open" title="选择支付方式" :footer="null" :mask-closable="!busy" @cancel="close">
    <a-spin :spinning="channelLoading">
      <div class="summary">
        <span>订单号 {{ props.orderNo }}</span>
        <strong>¥{{ money(props.amount) }}</strong>
      </div>

      <a-alert v-if="!channelLoading && !channels.length" type="warning" show-icon
               message="当前没有可用支付渠道"
               description="订单可以保留在待支付状态。请配置真实支付渠道后再继续，系统不会自动使用未启用的模拟支付。" />

      <template v-else-if="!channelLoading">
        <a-radio-group v-model:value="selectedChannel" class="channels">
          <a-radio v-for="channel in channels" :key="channel.value" :value="channel.value"
                   :disabled="channel.value === 'wallet' && walletInsufficient">
            <span class="channel-title">{{ channel.label }}</span>
            <small>{{ channel.description }}</small>
          </a-radio>
        </a-radio-group>

        <a-alert v-if="walletInsufficient" type="warning" show-icon
                 message="钱包余额不足"
                 description="可选择当前已配置的其他支付渠道。生产环境未接入真实充值时，请勿重复尝试模拟充值。" />

        <div v-if="qrImage" class="qr-panel">
          <img :src="qrImage" alt="微信支付二维码" />
          <b>请使用微信扫码支付</b>
          <span>订单状态会自动刷新。付款完成前请勿重复创建支付。</span>
          <a-spin v-if="polling" size="small" />
        </div>

        <a-alert v-if="selectedChannel === 'mock'" type="info" show-icon
                 message="仅演示用途" description="该渠道只有在服务端显式开启模拟支付时才会出现。" />

        <div class="actions">
          <a-button @click="close">稍后支付</a-button>
          <a-button type="primary" :loading="busy" :disabled="!canStartPayment"
                    @click="confirmPayment">{{ qrImage ? '已展示二维码' : '确认支付' }}</a-button>
        </div>
      </template>
    </a-spin>
  </a-modal>
</template>

<script setup>
import {computed, onBeforeUnmount, ref, watch} from 'vue'
import {message} from 'ant-design-vue'
import QRCode from 'qrcode'
import {paymentApi, walletApi} from '../../api'

const props = defineProps({
  open: {type: Boolean, default: false},
  orderNo: {type: [String, Number], default: ''},
  amount: {type: [String, Number], default: 0},
  defaultChannel: {type: String, default: ''}
})
const emit = defineEmits(['close', 'paid'])

const channels = ref([])
const selectedChannel = ref('')
const walletBalance = ref(0)
const channelLoading = ref(false)
const busy = ref(false)
const qrImage = ref('')
const polling = ref(false)
const paymentStarted = ref(false)
let pollingTimer = null
let pollingAttempts = 0

const amountNumber = computed(() => Number(props.amount || 0))
const walletInsufficient = computed(() => walletBalance.value < amountNumber.value)
const canStartPayment = computed(() => {
  if (!props.orderNo || !selectedChannel.value || busy.value) return false
  if (selectedChannel.value === 'wallet' && walletInsufficient.value) return false
  // A displayed QR is already a live payment request; don't create another one.
  if (qrImage.value && selectedChannel.value === 'wechat') return false
  return channels.value.some(c => c.value === selectedChannel.value)
})

const money = value => Number(value || 0).toFixed(2)

function stopPolling() {
  if (pollingTimer) clearInterval(pollingTimer)
  pollingTimer = null
  polling.value = false
}

function close() {
  stopPolling()
  emit('close')
}

async function loadChannels() {
  channelLoading.value = true
  channels.value = []
  selectedChannel.value = ''
  qrImage.value = ''
  paymentStarted.value = false
  stopPolling()
  try {
    const [available, wallet] = await Promise.all([
      paymentApi.channels(),
      walletApi.my().catch(() => null)
    ])
    channels.value = Array.isArray(available) ? available : []
    walletBalance.value = Number(wallet?.balance || 0)

    const canUseWallet = !walletInsufficient.value
    const preferred = props.defaultChannel
    if (preferred && channels.value.some(c => c.value === preferred)
        && (preferred !== 'wallet' || canUseWallet)) {
      selectedChannel.value = preferred
    } else {
      const order = ['wechat', 'alipay', 'mock', 'wallet']
      selectedChannel.value = order.find(value =>
        channels.value.some(c => c.value === value) &&
        (value !== 'wallet' || canUseWallet)
      ) || (channels.value[0]?.value || '')
    }
  } catch (e) {
    channels.value = []
    selectedChannel.value = ''
  } finally {
    channelLoading.value = false
  }
}

function startPolling() {
  stopPolling()
  polling.value = true
  pollingAttempts = 0
  pollingTimer = setInterval(async () => {
    pollingAttempts += 1
    try {
      const status = await paymentApi.query(props.orderNo)
      if (Number(status?.payStatus) === 1) {
        stopPolling()
        message.success('已确认收到支付结果')
        emit('paid', {orderNo: props.orderNo, channel: 'wechat'})
        emit('close')
        return
      }
    } catch (e) {
      // Temporary query errors do not turn a pending payment into a success.
    }
    if (pollingAttempts >= 100) {
      stopPolling()
      message.info('暂未确认支付结果，可在订单详情重新查询状态。')
    }
  }, 3000)
}

function submitAlipayForm(markup) {
  const parsed = new DOMParser().parseFromString(String(markup || ''), 'text/html')
  const source = parsed.querySelector('form')
  if (!source) throw new Error('支付宝支付表单无效，请稍后重试')

  const action = new URL(source.getAttribute('action') || '', window.location.origin)
  const allowedHosts = ['openapi.alipay.com', 'openapi-sandbox.dl.alipaydev.com']
  if (action.protocol !== 'https:' || !allowedHosts.includes(action.hostname)) {
    throw new Error('支付宝支付地址未通过安全校验')
  }

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action.href
  source.querySelectorAll('input[name]').forEach(input => {
    // Ignore buttons and any executable markup; only copy named input values.
    if (!['hidden', 'text'].includes(String(input.type || 'hidden').toLowerCase())) return
    const field = document.createElement('input')
    field.type = 'hidden'
    field.name = input.name
    field.value = input.value
    form.appendChild(field)
  })
  if (!form.children.length) throw new Error('支付宝支付参数为空，请稍后重试')
  document.body.appendChild(form)
  form.submit()
}

async function confirmPayment() {
  if (!canStartPayment.value) return
  busy.value = true
  try {
    const result = await paymentApi.create(props.orderNo, selectedChannel.value)
    if (selectedChannel.value === 'wallet') {
      if (result?.payInfo?.paid !== true) throw new Error('钱包支付未确认')
      message.success('钱包支付成功')
      emit('paid', {orderNo: props.orderNo, channel: 'wallet'})
      close()
      return
    }
    if (selectedChannel.value === 'mock') {
      if (result?.mock !== true) throw new Error('服务端未启用模拟支付')
      const confirmed = await paymentApi.mockConfirm(props.orderNo)
      if (confirmed !== true) throw new Error('模拟支付未确认')
      message.success('演示支付成功')
      emit('paid', {orderNo: props.orderNo, channel: 'mock'})
      close()
      return
    }
    if (selectedChannel.value === 'wechat') {
      const codeUrl = result?.payInfo?.codeUrl
      if (!codeUrl) throw new Error('未收到微信支付二维码信息')
      qrImage.value = await QRCode.toDataURL(codeUrl, {width: 248, margin: 1})
      paymentStarted.value = true
      startPolling()
      return
    }
    if (selectedChannel.value === 'alipay') {
      submitAlipayForm(result?.payInfo?.form)
      return
    }
    throw new Error('当前支付方式暂不支持')
  } catch (e) {
    message.error(e?.message || '发起支付失败，请检查订单状态后重试')
  } finally {
    busy.value = false
  }
}

watch(() => [props.open, props.orderNo], ([open]) => {
  if (open) loadChannels()
  else {
    stopPolling()
    qrImage.value = ''
    paymentStarted.value = false
  }
}, {immediate: true})

onBeforeUnmount(stopPolling)
</script>

<style scoped>
.summary{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;padding:14px 16px;border-radius:12px;background:#f7f8fa;color:#475467;font-size:12px}
.summary strong{font-size:24px;color:#9b2d20;white-space:nowrap}
.channels{display:flex;flex-direction:column;width:100%;gap:4px;margin-bottom:14px}
.channels :deep(.ant-radio-wrapper){display:flex;align-items:flex-start;gap:8px;margin:0;padding:12px;border:1px solid #e6e8ec;border-radius:10px}
.channels :deep(.ant-radio-wrapper-checked){border-color:#1e6eb8;background:rgba(30,110,184,.04)}
.channel-title{display:block;font-weight:650;color:#18212f}
.channels small{display:block;color:#667085;font-size:12px;margin-top:4px;line-height:1.6}
.qr-panel{display:flex;align-items:center;flex-direction:column;gap:8px;padding:18px;margin:14px 0;border:1px solid #e6e8ec;border-radius:14px;text-align:center}
.qr-panel img{width:248px;max-width:100%;height:auto}
.qr-panel span{font-size:12px;color:#667085}
.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}
</style>