import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, List, Tag, Empty } from 'antd'
import { WalletOutlined, ArrowRightOutlined, PlusOutlined, HistoryOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const Wallet: React.FC = () => {
  const navigate = useNavigate()
  const { walletBalance, walletLogs } = useStore()

  const labels: Record<string, string> = {
    recharge: '在线充值',
    pay: '订单支付',
    refund: '退款入账'
  }

  const colors: Record<string, string> = {
    recharge: 'blue',
    pay: 'orange',
    refund: 'green'
  }

  const cards = [
    { num: '01', title: '钱包流水', desc: '收入、支出、退款与订单关联全量明细', to: '/wallet/transactions' },
    { num: '02', title: '充值中心', desc: '支持快捷银行对公或模拟充值备用金', to: '/wallet/recharge' },
    { num: '03', title: '待付订单', desc: '查看待支付订单并使用钱包余额结算', to: '/orders' },
    { num: '04', title: '企业账期', desc: '授信额度、应付账单与还款对账计划', to: '/credit-term' }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ll-primary)' }}>
            LANLINK WALLET
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            我的钱包
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            统一管理采购专项备用金、在线充值与资金出入明细。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{ background: 'var(--ll-primary)' }}
            onClick={() => navigate('/wallet/recharge')}
          >
            充值
          </Button>
          <Button
            size="large"
            icon={<HistoryOutlined />}
            onClick={() => navigate('/wallet/transactions')}
          >
            全部流水
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div
        style={{
          padding: '32px',
          borderRadius: '24px',
          background: 'var(--ll-brand-hero-gradient)',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--ll-glass-shadow)',
          marginBottom: '20px'
        }}
      >
        <div>
          <span style={{ fontSize: '13px', opacity: 0.8 }}>可用钱包余额</span>
          <strong style={{ display: 'block', fontSize: '42px', fontWeight: 800, margin: '6px 0' }}>
            ¥{walletBalance.toFixed(2)}
          </strong>
          <small style={{ opacity: 0.7, fontSize: '12px' }}>
            钱包支付实时扣款入账 · 订单退款将原路实时退回至钱包
          </small>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            size="large"
            style={{
              background: 'linear-gradient(100deg, var(--ll-brand-gold), #F59E0B)',
              border: 'none',
              color: 'var(--ll-brand-base)',
              fontWeight: 700
            }}
            onClick={() => navigate('/wallet/recharge')}
          >
            立即充值
          </Button>
          <Button
            size="large"
            ghost
            style={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => navigate('/orders')}
          >
            去支付订单
          </Button>
        </div>
      </div>

      {/* 4 Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
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
            <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 10px', minHeight: '36px' }}>
              {c.desc}
            </p>
            <span style={{ color: 'var(--ll-primary)', fontSize: '12px', fontWeight: 600 }}>
              进入模块 →
            </span>
          </Card>
        ))}
      </div>

      {/* Recent Logs */}
      <Card
        title="最近资金流水"
        extra={<Button type="link" onClick={() => navigate('/wallet/transactions')}>查看全部流水 →</Button>}
        style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
      >
        {walletLogs.length > 0 ? (
          <List
            dataSource={walletLogs.slice(0, 6)}
            renderItem={item => (
              <List.Item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0'
                }}
              >
                <div>
                  <Tag color={colors[item.changeType] || 'default'}>
                    {labels[item.changeType] || item.changeType}
                  </Tag>
                  <span style={{ fontWeight: 500, fontSize: '14px', marginLeft: '6px' }}>
                    {item.remark}
                  </span>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>
                    {item.createTime}
                  </div>
                </div>

                <b
                  style={{
                    fontSize: '16px',
                    color: item.amount >= 0 ? '#10b981' : '#e11d48'
                  }}
                >
                  {item.amount >= 0 ? '+' : ''}¥{item.amount.toFixed(2)}
                </b>
              </List.Item>
            )}
          />
        ) : (
          <Empty description="暂无资金流水" />
        )}
      </Card>
    </div>
  )
}
