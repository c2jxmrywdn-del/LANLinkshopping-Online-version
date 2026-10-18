import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, Button, Tag } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const PromotionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { promotions } = useStore()

  const promo = promotions.find(p => p.promoId === Number(id)) || promotions[0]

  return (
    <div className="main-container" style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/promotions" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回优惠列表
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <Tag color="red">{promo.type === 'full_reduce' ? '满减补贴' : '折扣减免'}</Tag>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '14px 0 10px', color: 'var(--ll-navy)' }}>
          {promo.title}
        </h1>
        <div style={{ fontSize: '36px', fontWeight: 800, color: '#e11d48', margin: '12px 0 20px' }}>
          {promo.type === 'full_reduce' ? `立减 ¥${promo.benefitAmount}` : `${((promo.discountRate || 1) * 10).toFixed(1)} 折`}
        </div>

        <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.8 }}>
          该促销规则由平台官方发起并出资补贴，面向大宗物资采购商提供实质性采购降本。
          只要订单商品满足最低门槛金额 ¥{promo.threshold}，在确认订单页由结算引擎自动计算扣减，可与会员积分同时叠加使用。
        </p>

        <Button
          type="primary"
          size="large"
          style={{ background: 'var(--ll-primary)', marginTop: '20px' }}
          onClick={() => navigate('/mall')}
        >
          立即前往商城选品
        </Button>
      </Card>
    </div>
  )
}
