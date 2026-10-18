import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Button } from 'antd'
import { ArrowLeftOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const MembershipPoints: React.FC = () => {
  const navigate = useNavigate()
  const { memberCard, memberPointLogs } = useStore()

  const columns = [
    {
      title: '积分变动',
      dataIndex: 'points',
      key: 'points',
      width: 150,
      render: (v: number) => (
        <b style={{ color: v > 0 ? '#10b981' : '#e11d48', fontSize: '15px' }}>
          {v > 0 ? `+${v}` : v} 分
        </b>
      )
    },
    {
      title: '变动类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (v: string) => <Tag color={v === 'earn' ? 'green' : 'orange'}>{v === 'earn' ? '积分获取' : '抵现扣除'}</Tag>
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '记录时间',
      dataIndex: 'createTime',
      key: 'time',
      width: 180,
      render: (v: string) => <span style={{ color: '#64748b', fontSize: '12px' }}>{v}</span>
    }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/membership" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回会员中心
        </Link>
      </div>

      <div
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background: 'var(--ll-brand-hero-gradient)',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--ll-glass-shadow)',
          marginBottom: '24px'
        }}
      >
        <div>
          <span style={{ fontSize: '13px', opacity: 0.8 }}>当前会员可用积分</span>
          <strong style={{ display: 'block', fontSize: '42px', fontWeight: 800, margin: '4px 0' }}>
            {memberCard.points} <span style={{ fontSize: '20px', fontWeight: 400 }}>积分</span>
          </strong>
          <small style={{ opacity: 0.75, fontSize: '12px' }}>
            抵扣比例：100 积分 = 1.00 元整 · 单笔订单上限 10%
          </small>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          style={{
            background: 'linear-gradient(100deg, var(--ll-brand-gold), #F59E0B)',
            color: 'var(--ll-brand-base)',
            border: 'none',
            fontWeight: 700
          }}
          onClick={() => navigate('/mall')}
        >
          去商城抵扣使用
        </Button>
      </div>

      <Card title="积分变动明细" style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={memberPointLogs}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  )
}
