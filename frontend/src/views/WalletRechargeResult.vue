<template>
  <div class="result">
    <a-card v-if="confirmed" :bordered="false" class="card">
      <div class="check">✓</div><div class="eyebrow">WALLET / COMPLETE</div>
      <h1>充值已完成</h1>
      <p>已在服务端钱包流水中确认本次充值记录。</p>
      <div class="actions"><a-button type="primary" size="large" @click="$router.push('/wallet')">查看钱包</a-button><a-button size="large" @click="$router.push('/wallet/transactions')">查看流水</a-button></div>
      <a-divider/><div class="meta">流水参考：{{ route.params.id }}</div>
    </a-card>
    <a-card v-else-if="loading" :bordered="false" class="card"><a-spin tip="正在核验充值流水…" /></a-card>
    <a-result v-else status="warning" title="未找到充值成功记录"
              sub-title="此页面不会仅凭链接显示充值成功。请返回钱包查看实际余额与流水。">
      <template #extra><a-button type="primary" @click="$router.push('/wallet')">返回钱包</a-button><a-button @click="$router.push('/wallet/transactions')">查看流水</a-button></template>
    </a-result>
  </div>
</template>
<script setup>
import {ref,watch} from 'vue'
import {useRoute} from 'vue-router'
import {walletApi} from '../api'
const route=useRoute(),confirmed=ref(false),loading=ref(true)
async function verify(){
  loading.value=true
  confirmed.value=false
  try{
    const data=await walletApi.my()
    const log=(data?.logs||[]).find(item=>String(item.id)===String(route.params.id))
    confirmed.value=Boolean(log&&log.changeType==='recharge')
  }catch(e){
    confirmed.value=false
  }finally{loading.value=false}
}
watch(()=>route.params.id,verify,{immediate:true})
</script>
<style scoped>
.result{max-width:600px;margin:70px auto}.card{text-align:center;border-radius:24px;padding:34px}.check{width:64px;height:64px;border-radius:50%;margin:0 auto 18px;display:grid;place-items:center;background:rgba(200,164,92,.16);color:#9b2d20;font-size:32px;font-weight:800}.eyebrow{font-size:11px;letter-spacing:.16em;color:var(--ll-primary)}h1{margin:7px 0}.actions{display:flex;justify-content:center;gap:10px;margin-top:24px}.meta{color:var(--ll-muted);font-size:12px}
</style>