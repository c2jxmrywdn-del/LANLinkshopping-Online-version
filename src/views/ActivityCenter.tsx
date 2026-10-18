import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Tag, Row, Col, message } from 'antd'
import { GiftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const ActivityCenter: React.FC = () => {
  const navigate = useNavigate()
  const { activities, joinActivity } = useStore()

  const handleJoin = (actId: number) => {
    joinActivity(actId)
    message.success('恭喜成功参与活动！100 积分奖励已到账。')
  }

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            LANLINK ACTIVITY
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            营销活动中心
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            发现平台大宗采购补贴、新人礼包并快速领取积分奖励。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => navigate('/activity/my')}>我的活动</Button>
          <Button onClick={() => navigate('/activity/rules')}>活动规则</Button>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        {activities.map(a => (
          <Col key={a.activityId} xs={24} md={12}>
            <Card
              hoverable
              style={{
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <Tag color={a.type === 'register' ? 'gold' : 'blue'} style={{ fontWeight: 600 }}>
                  {a.type === 'register' ? '注册有礼' : '消费有礼'}
                </Tag>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {a.joined ? '已参与' : '火热进行中'}
                </span>
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ll-navy)' }}>
                {a.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, minHeight: '44px', margin: '0 0 16px' }}>
                {a.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9'
                }}
              >
                <span style={{ color: 'var(--ll-brand-red)', fontWeight: 700, fontSize: '13px' }}>
                  🎁 专属奖励 +100 积分
                </span>

                {a.joined ? (
                  <Button disabled size="middle">已领取奖励</Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ background: 'var(--ll-primary)' }}
                    onClick={() => handleJoin(a.activityId)}
                  >
                    立即参与领奖 →
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        style={{
          marginTop: '24px',
          borderRadius: '18px',
          background: 'rgba(30, 110, 184, 0.04)',
          border: '1px dashed rgba(30, 110, 184, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <b style={{ color: 'var(--ll-navy)' }}>活动闭环</b>
            <span style={{ color: '#64748b', fontSize: '13px', marginLeft: '12px' }}>
              活动广场 → 参与确认 → 自动累计积分 → 订单结算直接抵现
            </span>
          </div>
          <Button type="link" onClick={() => navigate('/membership/points')}>
            前往积分中心查看 →
          </Button>
        </div>
      </Card>
    </div>
  )
}
