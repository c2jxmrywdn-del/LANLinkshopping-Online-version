import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Table, Tag, Button, Segmented } from 'antd'
import {
  ShopOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SkinOutlined,
  DollarOutlined,
  ExperimentOutlined
} from '@ant-design/icons'
import { useStore } from '../../store/storeContext'
import { Merchant } from '../../types'
import { SpotlightCard, AnimatedNumber } from '../../components/MotionPrimitives'

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { merchants, products, orders } = useStore()
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'passed'>('all')

  const pendingMerchants = merchants.filter(m => m.reviewStatus === 0).length
  const passedMerchants = merchants.filter(m => m.reviewStatus === 1).length
  const onShelfProducts = products.filter(p => p.status === 1).length
  const totalOrderVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0)

  const filteredMerchants = merchants.filter(m => {
    if (statusFilter === 'pending') return m.reviewStatus === 0
    if (statusFilter === 'passed') return m.reviewStatus === 1
    return true
  })

  const columns = [
    {
      title: '商户ID',
      dataIndex: 'merId',
      key: 'id',
      width: 90,
      render: (v: number) => <span className="ll-tabular-nums">#{v}</span>
    },
    {
      title: '企业主体 / 负责人',
      key: 'name',
      render: (_: any, r: Merchant) => (
        <div>
          <b style={{ color: 'var(--ll-navy)' }}>{r.enterprise?.name || `商户 #${r.merId}`}</b>
          <div style={{ color: '#64748b', fontSize: '11px' }}>
            主体类型：{r.regType} · 合作模式：{r.joinType || '标准供应商'}
          </div>
        </div>
      )
    },
    {
      title: '注册资本',
      dataIndex: 'regCapital',
      key: 'cap',
      width: 150,
      render: (v: number) => (
        <span className="ll-tabular-nums" style={{ fontWeight: 600 }}>
          ¥{v ? v.toLocaleString() : '0'} 万
        </span>
      )
    },
    {
      title: '审核状态',
      key: 'status',
      width: 110,
      render: (_: any, r: Merchant) => {
        if (r.reviewStatus === 1) return <Tag color="green">已通过</Tag>
        if (r.reviewStatus === 2) return <Tag color="red">已驳回</Tag>
        return <Tag color="orange">待审核</Tag>
      }
    },
    {
      title: '操作',
      key: 'op',
      width: 120,
      render: (_: any, r: Merchant) => (
        <Button type="link" size="small" onClick={() => navigate(`/admin/merchants/${r.merId}`)}>
          审核档案 →
        </Button>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            ENTERPRISE OPERATIONS CONSOLE · 21ST.DEV EDITION
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '4px 0 0', color: 'var(--ll-navy)' }}>
            平台运营工作台概览
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            全局把控商户准入、物资商品上下架、大宗采购交易与合规审核。
          </p>
        </div>

        <Button
          icon={<ExperimentOutlined />}
          onClick={() => navigate('/ui-lab')}
        >
          打开 21st.dev 动效实验室
        </Button>
      </div>

      {/* 21st.dev Spotlight + AnimatedNumber KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} lg={6}>
          <SpotlightCard
            spotlightColor="rgba(30, 110, 184, 0.20)"
            onClick={() => navigate('/admin/merchants')}
            style={{ padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px' }}>
              <span>商户主体总数</span>
              <ShopOutlined style={{ color: 'var(--ll-primary)', fontSize: '18px' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ll-navy)', marginTop: '8px' }}>
              <AnimatedNumber value={merchants.length} suffix=" 家" />
            </div>
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '6px' }}>
              ✓ 资质档案实时联网核验
            </div>
          </SpotlightCard>
        </Col>

        <Col xs={12} lg={6}>
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.24)"
            borderBeam={pendingMerchants > 0}
            beamColor="#F59E0B"
            onClick={() => navigate('/admin/merchants')}
            style={{ padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px' }}>
              <span>待审核商户申请</span>
              <ClockCircleOutlined style={{ color: '#f59e0b', fontSize: '18px' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#f59e0b', marginTop: '8px' }}>
              <AnimatedNumber value={pendingMerchants} suffix=" 笔" />
            </div>
            <div style={{ fontSize: '12px', color: '#b45309', marginTop: '6px' }}>
              {pendingMerchants > 0 ? '⚡ 优先处理准入审批' : '全部申请已办结'}
            </div>
          </SpotlightCard>
        </Col>

        <Col xs={12} lg={6}>
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.22)"
            onClick={() => navigate('/admin/products')}
            style={{ padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px' }}>
              <span>商城在售物资 SKU</span>
              <SkinOutlined style={{ color: '#10b981', fontSize: '18px' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#10b981', marginTop: '8px' }}>
              <AnimatedNumber value={onShelfProducts} suffix=" 款" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              已认证商户 {passedMerchants} 家供货中
            </div>
          </SpotlightCard>
        </Col>

        <Col xs={12} lg={6}>
          <SpotlightCard
            spotlightColor="rgba(200, 164, 92, 0.26)"
            onClick={() => navigate('/admin/payments')}
            style={{ padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px' }}>
              <span>订单累计结算金额</span>
              <DollarOutlined style={{ color: 'var(--ll-brand-gold)', fontSize: '18px' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ll-navy)', marginTop: '8px' }}>
              <AnimatedNumber value={totalOrderVolume} prefix="¥" decimals={2} />
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              共 {orders.length} 笔大宗采购单
            </div>
          </SpotlightCard>
        </Col>
      </Row>

      <Card
        title="近期商户准入审核列表"
        extra={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Segmented
              size="small"
              value={statusFilter}
              onChange={v => setStatusFilter(v as any)}
              options={[
                { label: `全部 (${merchants.length})`, value: 'all' },
                { label: `待审核 (${pendingMerchants})`, value: 'pending' },
                { label: `已通过 (${passedMerchants})`, value: 'passed' }
              ]}
            />
            <Button type="link" onClick={() => navigate('/admin/merchants')}>
              前往商户管理 →
            </Button>
          </div>
        }
        style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
      >
        <Table
          dataSource={filteredMerchants.slice(0, 6)}
          columns={columns}
          rowKey="merId"
          pagination={false}
        />
      </Card>
    </div>
  )
}
