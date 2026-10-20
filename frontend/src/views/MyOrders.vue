<template>
  <div>
    <div class="eyebrow">ORDER CENTER</div><h2>我的订单</h2><p class="sub">查看订单状态、支付进度与履约信息。</p><div class="order-tabs"><a-radio-group v-model:value="filter" button-style="solid"><a-radio-button value="all">全部</a-radio-button><a-radio-button value="unpaid">待支付</a-radio-button><a-radio-button value="paid">已支付 / 账期已开单</a-radio-button><a-radio-button value="done">已完成</a-radio-button><a-radio-button value="closed">已关闭</a-radio-button></a-radio-group></div>
    <a-table :data-source="filteredOrders" :columns="cols" row-key="orderNo" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'total'">¥{{ record.totalAmount }}</template>
        <template v-else-if="column.key === 'payType'">{{ payTypeText[record.payType] || record.payType || '—' }}</template>
        <template v-else-if="column.key === 'pay'">
          <a-tag :color="record.payStatus === 1 ? 'green' : (record.payStatus === 2 ? 'purple' : 'orange')">
            {{ record.payStatus === 1 ? (record.payType === 'term' ? '账期已开单' : '已支付') : (record.payStatus === 2 ? '已退款' : '未支付') }}
          </a-tag>
          <div v-if="record.payChannel" class="ch">{{ channelText[record.payChannel] || record.payChannel }}</div>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag>{{ statusMap[record.orderStatus] || record.orderStatus }}</a-tag>
          <div v-if="record.refundStatus === 'success'" class="rf">已全额退款 ¥{{ record.refundAmount }}</div>
        </template>
        <template v-else-if="column.key === 'op'">
          <a-space>
            <a @click="$router.push('/orders/' + record.orderNo)">详情</a>
            <a v-if="record.payStatus === 0 && record.orderStatus === 0 && record.payType !== 'term'" @click="openPay(record)">支付</a>
            <a v-if="record.orderStatus === 0 && (record.payStatus === 0 || record.payType === 'term')" @click="cancel(record)" style="color:#999">取消</a>
          </a-space>
        </template>
      </template>
    </a-table>
    <a-empty v-if="!loading && orders.length === 0" description="还没有订单">
      <a-button type="primary" @click="$router.push('/mall')">去下单</a-button>
    </a-empty>

    <!-- All orders use the same server-configured payment channel dialog. -->
    <PaymentMethodModal
      :open="payOpen"
      :order-no="current?.orderNo || ''"
      :amount="Number(current?.totalAmount || 0)"
      @close="payOpen = false"
      @paid="paymentComplete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { orderApi } from '../api'
import PaymentMethodModal from '../components/payment/PaymentMethodModal.vue'
import { useUserStore } from '../store/user'

const user = useUserStore()
const orders = ref([])
const loading = ref(false)
const filter = ref('all')
const filteredOrders = computed(() => orders.value.filter(o => filter.value === 'all' ? true : filter.value === 'unpaid' ? Number(o.payStatus) !== 1 && Number(o.payStatus) !== 2 && Number(o.orderStatus) !== 3 : filter.value === 'paid' ? Number(o.payStatus) === 1 && Number(o.orderStatus) !== 2 && Number(o.orderStatus) !== 3 && Number(o.orderStatus) !== 4 : filter.value === 'done' ? Number(o.orderStatus) === 2 : Number(o.orderStatus) === 3 || Number(o.orderStatus) === 4))
const statusMap = { 0: '待发货', 1: '已发货', 2: '已完成', 3: '已取消', 4: '已退款' }
const channelText = { wallet: '钱包', mock: '模拟', wechat: '微信', alipay: '支付宝' }
const payTypeText = { corporate: '在线支付订单', balance: '企业钱包', term: '企业账期' }
const cols = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
  { title: '金额', key: 'total', width: 120 },
  { title: '支付方式', dataIndex: 'payType', width: 120 },
  { title: '支付状态', key: 'pay', width: 110 },
  { title: '订单状态', key: 'status', width: 130 },
  { title: '操作', key: 'op', width: 120 }
]

// ===== 支付弹窗 =====
const payOpen = ref(false)
const current = ref(null)

async function load() {
  loading.value = true
  try { orders.value = await orderApi.my() }
  finally { loading.value = false }
}

function openPay(record) {
  current.value = record
  payOpen.value = true
}

async function paymentComplete() {
  payOpen.value = false
  await user.fetchMe()
  await load()
}

async function cancel(r) { await orderApi.cancel(r.orderNo); message.success('已取消'); load() }

onMounted(load)
</script>

<style scoped>
.eyebrow{font-size:11px;letter-spacing:.16em;color:var(--ll-primary)}.sub{margin:-10px 0 12px;color:var(--ll-muted)}.order-tabs{margin-bottom:16px}.order-tabs :deep(.ant-radio-button-wrapper){font-size:12px}
.ch { font-size: 12px; color: var(--ll-muted, #64748b); margin-top: 2px; }
.rf { font-size: 12px; color: #7c3aed; margin-top: 2px; }
.pay-amount { font-size: 15px; margin-bottom: 14px; color: var(--ll-gray, #4b5563); }
.pay-amount b { color: #e4393c; font-size: 22px; margin-left: 6px; }
.pay-list { display: flex; flex-direction: column; gap: 10px; }
.pay-item { display: flex; align-items: center; justify-content: space-between; gap: 12px;
            border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 12px 14px; cursor: pointer;
            transition: border-color .2s ease, background-color .2s ease; }
.pay-item:hover:not(.disabled) { border-color: var(--ll-primary, #1e6eb8); background: rgba(30, 110, 184, .04); }
.pay-item.disabled { opacity: .55; cursor: not-allowed; }
.pay-name { font-weight: 600; }
.pay-sub { font-size: 12px; color: var(--ll-muted, #64748b); margin-top: 2px; }
.pay-warn a { color: var(--ll-primary, #1e6eb8); }
.pay-note { margin-top: 14px; font-size: 12px; color: var(--ll-muted, #64748b); }
</style>
