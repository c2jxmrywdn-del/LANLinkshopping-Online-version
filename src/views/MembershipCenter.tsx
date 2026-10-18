import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Steps } from 'antd'
import { CrownOutlined, TrophyOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const MembershipCenter: React.FC = () => {
  const navigate = useNavigate()
  const { memberCard, memberLevels } = useStore()

  const currentLevel = memberLevels.find(l => l.levelId === memberCard.levelId) || memberLevels[0]
  const currentIdx = memberLevels.findIndex(l => l.levelId === memberCard.levelId)
  const nextLevel = memberLevels[currentIdx + 1]

  const growthPct = nextLevel
    ? Math.min(100, Math.round(((memberCard.growth - currentLevel.minGrowth) / (nextLevel.minGrowth - currentLevel.minGrowth)) * 100))
    : 100

  const cards = [
    { num: '01', title: '等级权益', desc: '成长值门槛、等级专属折扣与晋级说明', to: '/membership/levels' },
    { num: '02', title: '积分中心', desc: '积分余额、获取渠道、结算抵扣与变动流水', to: '/membership/points' },
    { num: '03', title: '会员特权', desc: '大宗折扣、双倍积分、急速出库等专属特权', to: '/membership/benefits' }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ll-primary)' }}>
            LANLINK MEMBERSHIP
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            会员权益中心
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            围绕企业采购等级、成长值累计、积分抵现与尊享特权建立完整激励闭环。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type="primary"
            size="large"
            style={{ background: 'var(--ll-primary)' }}
            onClick={() => navigate('/membership/points')}
          >
            积分中心
          </Button>
          <Button size="large" onClick={() => navigate('/membership/benefits')}>
            我的权益
          </Button>
        </div>
      </div>

      {/* Member Level Dashboard Card */}
      <div
        style={{
          padding: '32px',
          borderRadius: '24px',
          background: 'var(--ll-brand-hero-gradient)',
          color: '#fff',
          boxShadow: 'var(--ll-glass-shadow)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CrownOutlined style={{ fontSize: '24px', color: 'var(--ll-brand-gold-soft)' }} />
              <span style={{ fontSize: '28px', fontWeight: 800 }}>{currentLevel.levelName}</span>
            </div>
            <div style={{ opacity: 0.8, fontSize: '13px', marginTop: '6px' }}>
              成长值 <b>{memberCard.growth}</b> · 可用积分 <b>{memberCard.points}</b>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ll-brand-gold-soft)' }}>
              {currentLevel.discountRate >= 1 ? '标准价' : `${(currentLevel.discountRate * 10).toFixed(1)} 折`}
            </div>
            <small style={{ opacity: 0.7, fontSize: '11px' }}>等级专属直享折扣</small>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginTop: '28px' }}>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.18)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${growthPct}%`,
                background: 'linear-gradient(90deg, #F59E0B, var(--ll-brand-gold-soft))',
                borderRadius: '999px'
              }}
            />
          </div>
          <div style={{ opacity: 0.75, fontSize: '12px', marginTop: '6px' }}>
            {nextLevel
              ? `距离升级至 ${nextLevel.levelName} 还需 ${nextLevel.minGrowth - memberCard.growth} 成长值`
              : '您已达到平台最高尊贵会员等级'}
          </div>
        </div>
      </div>

      {/* 3 Nav Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {cards.map(c => (
          <Card
            key={c.num}
            hoverable
            onClick={() => navigate(c.to)}
            style={{ borderRadius: '18px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '11px', color: 'var(--ll-brand-red)', fontWeight: 800, letterSpacing: '0.14em' }}>
              {c.num}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0 4px', color: 'var(--ll-navy)' }}>
              {c.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 10px' }}>
              {c.desc}
            </p>
            <span style={{ color: 'var(--ll-primary)', fontSize: '12px', fontWeight: 600 }}>
              进入模块 →
            </span>
          </Card>
        ))}
      </div>

      {/* Steps Progression */}
      <Card title="会员等级梯度速览" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Steps
          current={currentIdx}
          items={memberLevels.map(l => ({
            title: l.levelName,
            description: `${l.minGrowth} 成长值 (${l.discountRate >= 1 ? '标准' : (l.discountRate * 10).toFixed(1) + '折'})`
          }))}
        />
      </Card>
    </div>
  )
}
