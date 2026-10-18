import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tag, Button, Row, Col } from 'antd'
import { FireOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const PromotionCenter: React.FC = () => {
  const navigate = useNavigate()
  const { promotions } = useStore()

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            LANLINK PROMOTION
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            营销促销中心
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            集中展示全场满减与行业专属折让，结算时系统自动生效叠加。
          </p>
        </div>

        <Button onClick={() => navigate('/mall')}>返回商城采购</Button>
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '12px',
          background: '#fff',
          border: '1px solid #e2e8f0',
          marginBottom: '20px'
        }}
      >
        <span style={{ fontSize: '13px', color: '#64748b' }}>当前生效营销规则：</span>
        <b style={{ fontSize: '22px', color: '#e11d48' }}>{promotions.length}</b>
        <span style={{ fontSize: '13px', color: '#64748b' }}>项</span>
      </div>

      <Row gutter={[20, 20]}>
        {promotions.map(p => (
          <Col key={p.promoId} xs={24} md={12}>
            <Card
              hoverable
              style={{
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Tag color={p.type === 'full_reduce' ? 'red' : 'purple'}>
                  {p.type === 'full_reduce' ? '满减补贴' : '折扣减免'}
                </Tag>
                <span style={{ color: '#64748b', fontSize: '12px' }}>
                  {p.scope === 'all' ? '全场通用' : '指定行业专享'}
                </span>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px', color: 'var(--ll-navy)' }}>
                {p.title}
              </h2>

              <div style={{ fontSize: '32px', fontWeight: 800, color: '#e11d48', marginBottom: '12px' }}>
                {p.type === 'full_reduce' ? `立减 ¥${p.benefitAmount}` : `${((p.discountRate || 1) * 10).toFixed(1)} 折`}
              </div>

              <div style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
                <div>门槛条件：满 <b>¥{p.threshold}</b> 元即刻适用</div>
                <div>有效期：长期有效（以结算时系统判定为准）</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>
                  {p.scope === 'all' ? '适用所有大宗工业品' : '建筑建材类物料专享'}
                </span>
                <Button
                  type="primary"
                  style={{ background: 'var(--ll-primary)' }}
                  onClick={() => navigate(p.indId ? `/mall?indId=${p.indId}` : '/mall')}
                >
                  去专区选购 →
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
