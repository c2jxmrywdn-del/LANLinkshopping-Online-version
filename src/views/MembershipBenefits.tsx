import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Button } from 'antd'
import { ArrowLeftOutlined, TagOutlined, DollarOutlined, ClockCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons'

export const MembershipBenefits: React.FC = () => {
  const navigate = useNavigate()

  const benefits = [
    {
      title: '大宗采购专属折扣',
      desc: '银牌及以上会员在采购工程建材、工业化学品等大宗物料时，直接享受阶梯折让。',
      icon: <TagOutlined style={{ fontSize: '28px', color: '#f59e0b' }} />
    },
    {
      title: '订单全额积分抵现',
      desc: '下单结算时直接抵扣货款现金，每 100 积分抵 1 元，无使用门槛限制。',
      icon: <DollarOutlined style={{ fontSize: '28px', color: '#10b981' }} />
    },
    {
      title: '专车物流极速配货',
      desc: '专线仓储直发通道，保障大宗建筑钢筋与重型管材 24-48 小时直达工程项目现场。',
      icon: <ClockCircleOutlined style={{ fontSize: '28px', color: '#3b82f6' }} />
    },
    {
      title: '1对1 资深客户经理',
      desc: '配备专属对公客户顾问，协助对接开票、账期资质审批与合同法务合规。',
      icon: <CustomerServiceOutlined style={{ fontSize: '28px', color: '#8b5cf6' }} />
    }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '960px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/membership" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回会员中心
        </Link>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
          会员特权与尊享权益
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
          全方位覆盖大宗物资选品、交易折让、账期审批与履约交付。
        </p>
      </div>

      <Row gutter={[20, 20]}>
        {benefits.map(b => (
          <Col key={b.title} xs={24} md={12}>
            <Card
              style={{
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                height: '100%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#f8fafc',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0
                  }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 6px', color: 'var(--ll-navy)' }}>
                    {b.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <Button type="primary" size="large" onClick={() => navigate('/mall')}>
          进入商城选购使用特权
        </Button>
      </div>
    </div>
  )
}
