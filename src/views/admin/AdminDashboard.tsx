import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Statistic, Table, Tag, Button } from 'antd'
import { ShopOutlined, ClockCircleOutlined, CheckCircleOutlined, SkinOutlined } from '@ant-design/icons'
import { useStore } from '../../store/storeContext'
import { Merchant } from '../../types'

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { merchants, products, orders } = useStore()

  const pendingMerchants = merchants.filter(m => m.reviewStatus === 0).length
  const passedMerchants = merchants.filter(m => m.reviewStatus === 1).length
  const onShelfProducts = products.filter(p => p.status === 1).length
  const totalOrders = orders.length

  const columns = [
    { title: '商户ID', dataIndex: 'merId', key: 'id', width: 90 },
    {
      title: '企业主体 / 负责人',
      key: 'name',
      render: (_: any, r: Merchant) => (
        <div>
          <b>{r.enterprise?.name || `商户 #${r.merId}`}</b>
          <div style={{ color: '#64748b', fontSize: '11px' }}>主体类型：{r.regType}</div>
        </div>
      )
    },
    {
      title: '注册资本',
      dataIndex: 'regCapital',
      key: 'cap',
      width: 140,
      render: (v: number) => `¥${v ? v.toLocaleString() : '0'}`
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
      width: 100,
      render: (_: any, r: Merchant) => (
        <Button type="link" size="small" onClick={() => navigate(`/admin/merchants/${r.merId}`)}>
          审核档案 →
        </Button>
      )
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
          平台运营工作台概览
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
          全局把控商户准入、物资商品上下架、大宗采购交易与合规审核。
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic title="商户主体总数" value={merchants.length} prefix={<ShopOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title="待审核商户申请"
              value={pendingMerchants}
              valueStyle={{ color: '#f59e0b', fontWeight: 700 }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title="认证通过商户"
              value={passedMerchants}
              valueStyle={{ color: '#10b981', fontWeight: 700 }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title="商城在售商品"
              value={onShelfProducts}
              valueStyle={{ color: 'var(--ll-primary)', fontWeight: 700 }}
              prefix={<SkinOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="近期商户准入审核列表"
        extra={<Button type="link" onClick={() => navigate('/admin/merchants')}>前往商户管理 →</Button>}
        style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
      >
        <Table
          dataSource={merchants.slice(0, 6)}
          columns={columns}
          rowKey="merId"
          pagination={false}
        />
      </Card>
    </div>
  )
}
