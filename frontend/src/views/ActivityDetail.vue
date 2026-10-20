<template><div class="activity-detail"><a-button type="link" @click="$router.push('/activity')">← 活动广场</a-button><a-card v-if="activity" :bordered="false" class="card"><div class="tag">{{activity.type==='register'?'注册有礼':'消费有礼'}}</div><h1>{{activity.title}}</h1><p>{{activity.description}}</p><a-descriptions bordered :column="1"><a-descriptions-item label="开始时间">{{fmt(activity.startTime)}}</a-descriptions-item><a-descriptions-item label="结束时间">{{fmt(activity.endTime)||'长期有效'}}</a-descriptions-item><a-descriptions-item label="参与奖励">100 积分</a-descriptions-item><a-descriptions-item label="状态">{{activity.joined?'已参与':'可参与'}}</a-descriptions-item></a-descriptions><div class="rule"><b>参与说明</b><span>同一活动仅可参与一次；消费有礼在符合条件的支付完成后由系统自动参与。</span></div><a-alert v-if="activity.type==='purchase'" type="info" show-icon message="消费有礼活动" description="完成符合条件的订单支付后，系统会自动记录参与并发放奖励积分。"/>
      <a-button v-else-if="!activity.joined" type="primary" size="large" :loading="loading" @click="join">立即参与</a-button><a-button v-else size="large" disabled>已参与</a-button></a-card><a-empty v-else description="活动不存在或已结束"/></div></template>
<script setup>
import {ref,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {message} from 'ant-design-vue'
import {activityApi} from '../api'
const route=useRoute(),router=useRouter(),activity=ref(null),loading=ref(false)
const fmt=v=>v?String(v).replace('T',' '):''
async function load(){
  activity.value=null
  try{
    const list=(await activityApi.list())||[]
    activity.value=list.find(x=>String(x.activityId)===String(route.params.id))||null
  }catch(e){ /* request interceptor reports network failures */ }
}
async function join(){
  if(loading.value||!activity.value||activity.value.type==='purchase')return
  loading.value=true
  try{
    await activityApi.join(route.params.id)
    await router.push('/activity/'+route.params.id+'/participation')
  }catch(e){ await load() }
  finally{loading.value=false}
}
watch(()=>route.params.id,load,{immediate:true})
</script>
<style scoped>.activity-detail{max-width:820px;margin:0 auto}.card{border-radius:22px;padding:8px}.tag{display:inline-block;padding:5px 10px;border-radius:999px;background:rgba(200,164,92,.15);color:#9b2d20;font-size:12px}h1{font-size:32px;margin:12px 0 8px}.card>p{color:var(--ll-muted);font-size:15px}.rule{display:flex;gap:14px;padding:16px;margin:18px 0;background:var(--ll-paper-2,#f5f0e8);border-radius:14px}.rule span{color:var(--ll-muted)}</style>