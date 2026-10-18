import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Tag, Radio } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { WalletLog } from '../types'

export const WalletTransactions: React.FC = () => {
  const { walletLogs } = useStore()
  const [filter, setFilter] = useState<'all' | 'recharge' | 'pay' | 'refund'>('all')

  const filteredLogs = walletLogs.filter(l => {
    if (filter === 'all') return true
    return l.changeType === filter
  })

  const labels: Record<string, string> = {
    recharge: '充值入账',
    pay: '订单扣除',
    refund: '退款入账'
  }

  const colors: Record<string, string> = {
    recharge: 'blue',
    pay: 'orange',
    refund: 'green'
  }

  const columns = [
    {
      title: '交易类型',
      dataIndex: 'changeType',
      key: 'changeType',
      width: 120,
      render: (v: string) => <Tag color={colors[v] || 'default'}>{labels[v] || v}</Tag>
    },
    {
      title: '变动金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 160,
      render: (v: number) => (
        <b style={{ color: v >= 0 ? '#10b981' : '#e11d48', fontSize: '15px' }}>
          {v >= 0 ? '+' : ''}¥{v.toFixed(2)}
        </b>
      )
    },
    {
      title: '摘要与备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (v: string) => <span style={{ color: '#64748b', fontSize: '12px' }}>{v}</span>
    }
  ]

  return (
    <div className="main-container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/wallet" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回我的钱包
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
            钱包全量交易流水
          </h1>

          <Radio.Group value={filter} onChange={e => setFilter(e.target.value)} buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="recharge">充值</Radio.Button>
            <Radio.Button value="pay">消费扣款</Radio.Button>
            <Radio.Button value="refund">退款</Radio.Button>
          </Radio.Group>
        </div>

        <Table
          dataSource={filteredLogs}
          columns={columns}
          rowKey="logId"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}
