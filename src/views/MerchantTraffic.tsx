import React, { useState } from 'react'
import { Card, Radio, Row, Col, Progress, Tag, Table } from 'antd'
import { RiseOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons'

export const MerchantTraffic: React.FC = () => {
  const [days, setDays] = useState<number>(30)

  const metrics = [
    { label: '支付成交总额 (GMV)', value: days === 7 ? '¥128,450.00' : days === 30 ? '¥682,900.00' : '¥1,920,400.00', icon: <DollarOutlined />, sub: '+18.4% 环比增长', color: '#10b981' },
    { label: '店铺访客数 (UV)', value: days === 7 ? '3,420' : days === 30 ? '18,650' : '52,800', icon: <UserOutlined />, sub: '+12.6% 环比增长', color: '#3b82f6' },
    { label: '成交订单数', value: days === 7 ? '42 单' : days === 30 ? '198 单' : '586 单', icon: <ShoppingCartOutlined />, sub: '+8.2% 稳定上升', color: '#f59e0b' },
    { label: '采购转化率', value: '3.62%', icon: <RiseOutlined />, sub: '高于行业均值 2.1%', color: '#8b5cf6' }
  ]

  const trendData = [
    { date: '10-01', amount: 18000, orders: 4 },
    { date: '10-05', amount: 24500, orders: 6 },
    { date: '10-09', amount: 32000, orders: 8 },
    { date: '10-13', amount: 19800, orders: 5 },
    { date: '10-17', amount: 48000, orders: 12 },
    { date: '10-21', amount: 36200, orders: 9 },
    { date: '10-25', amount: 52000, orders: 14 },
    { date: '10-29', amount: 64000, orders: 18 }
  ]

  const maxAmount = Math.max(...trendData.map(d => d.amount))

  const sources = [
    { source: '首页热门专区直达', uv: 8420, percent: 45 },
    { source: '商城品类与行业筛选', uv: 5240, percent: 28 },
    { source: '企业大宗采购节活动专场', uv: 3100, percent: 17 },
    { source: '采购商常购复购收藏', uv: 1890, percent: 10 }
  ]

  return (
    <div className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            MERCHANT ANALYTICS
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            商户流量与经营数据中心
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            从供应链流量入口到大宗采销成交转化，实时把控店铺增长脉搏。
          </p>
        </div>

        <Radio.Group value={days} onChange={e => setDays(e.target.value)} buttonStyle="solid">
          <Radio.Button value={7}>近 7 天</Radio.Button>
          <Radio.Button value={30}>近 30 天</Radio.Button>
          <Radio.Button value={90}>近 90 天</Radio.Button>
        </Radio.Group>
      </div>

      {/* KPI Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {metrics.map(m => (
          <Col key={m.label} xs={12} lg={6}>
            <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px' }}>
                <span>{m.label}</span>
                <span style={{ fontSize: '18px', color: m.color }}>{m.icon}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, margin: '8px 0 4px', color: 'var(--ll-navy)' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                {m.sub}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts & Analysis */}
      <Row gutter={[24, 24]}>
        {/* Sales Trend Bar Chart */}
        <Col xs={24} lg={15}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>销售与履约趋势</span>
                <Tag color="blue">{days} 天统计区间</Tag>
              </div>
            }
            style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '16px 8px 8px' }}>
              {trendData.map(d => {
                const heightPct = Math.round((d.amount / maxAmount) * 100)
                return (
                  <div
                    key={d.date}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      height: '100%',
                      justifyContent: 'flex-end'
                    }}
                    title={`${d.date} 成交额 ¥${d.amount} / ${d.orders}单`}
                  >
                    <span style={{ fontSize: '10px', color: '#64748b' }}>
                      ¥{(d.amount / 1000).toFixed(0)}k
                    </span>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '36px',
                        height: `${heightPct}%`,
                        background: 'linear-gradient(180deg, var(--ll-primary), #60a5fa)',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                    />
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{d.date}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </Col>

        {/* Traffic Sources */}
        <Col xs={24} lg={9}>
          <Card title="流量来源渠道排行" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sources.map(s => (
                <div key={s.source}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <b>{s.source}</b>
                    <span style={{ color: '#64748b' }}>{s.uv} UV ({s.percent}%)</span>
                  </div>
                  <Progress percent={s.percent} showInfo={false} strokeColor="var(--ll-primary)" />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '24px',
                padding: '12px 16px',
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <CheckCircleOutlined style={{ color: '#10b981', fontSize: '18px' }} />
              <div style={{ fontSize: '12px', color: '#065f46' }}>
                <b>店铺健康度 96/100</b> · 商品准入合规，履约无逾期预警
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
