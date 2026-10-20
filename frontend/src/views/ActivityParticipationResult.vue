<template>
  <div class="result">
    <a-card v-if="joined" :bordered="false" class="card">
      <div class="mark">✓</div>
      <div class="eyebrow">ACTIVITY / PARTICIPATION</div>
      <h1>参与成功</h1>
      <p>已确认你加入「{{title||'本次活动'}}」。奖励积分已由服务端记录。</p>
      <div class="reward">+{{bonusPoints}} <span>积分</span></div>
      <div class="actions">
        <a-button type="primary" size="large" @click="$router.push('/membership/points')">查看积分</a-button>
        <a-button size="large" @click="$router.push('/activity/my')">我的活动</a-button>
        <a-button size="large" @click="$router.push('/activity')">继续逛活动</a-button>
      </div>
    </a-card>
    <a-result v-else-if="!loading" status="404" title="尚未找到参与记录"
              sub-title="请先从活动详情提交参与，消费有礼活动会在订单支付后自动参与。">
      <template #extra>
        <a-button type="primary" @click="$router.push('/activity/'+route.params.id)">返回活动详情</a-button>
        <a-button @click="$router.push('/activity/my')">我的活动</a-button>
      </template>
    </a-result>
    <a-card v-else :bordered="false" class="card"><a-spin tip="正在核验活动参与记录…" /></a-card>
  </div>
</template>
<script setup>
import {ref,watch} from 'vue'
import {useRoute} from 'vue-router'
import {activityApi} from '../api'

const route=useRoute()
const title=ref('')
const bonusPoints=ref(0)
const joined=ref(false)
const loading=ref(true)

async function load(){
  loading.value=true
  joined.value=false
  title.value=''
  bonusPoints.value=0
  try{
    const [mine,list]=await Promise.all([activityApi.my(),activityApi.list()])
    const id=String(route.params.id)
    const record=(mine||[]).find(item=>String(item.activityId)===id)
    if(record){
      joined.value=true
      bonusPoints.value=Number(record.bonusPoints||0)
      title.value=(list||[]).find(item=>String(item.activityId)===id)?.title||''
    }
  }catch(e){
    // The shared request interceptor presents network/API errors.
  }finally{
    loading.value=false
  }
}
watch(()=>route.params.id,load,{immediate:true})
</script>
<style scoped>
.result{max-width:620px;margin:70px auto}
.card{border-radius:24px;padding:38px}
.mark{width:68px;height:68px;border-radius:50%;display:grid;place-items:center;margin:0 auto 18px;background:rgba(200,164,92,.16);color:#9b2d20;font-size:34px;font-weight:800}
.eyebrow{font-size:11px;letter-spacing:.18em;color:var(--ll-primary)}
h1{margin:8px 0}
.card p{color:var(--ll-muted)}
.reward{font-size:42px;font-weight:800;color:#9b2d20;margin:24px 0}
.reward span{font-size:15px;font-weight:600}
.actions{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
</style>