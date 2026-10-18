import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Tag } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const MembershipLevels: React.FC = () => {
  const { memberLevels, memberCard } = useStore()

  const columns = [
    {
      title: '会员等级',
      dataIndex: 'levelName',
      key: 'name',
      render: (v: string, r: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <b>{v}</b>
          {r.levelId === memberCard.levelId && <Tag color="gold">当前等级</Tag>}
        </div>
      )
    },
    {
      title: '累计成长值门槛',
      dataIndex: 'minGrowth',
      key: 'growth',
      render: (v: number) => `≥ ${v} 点`
    },
    {
      title: '专属折扣特权',
      dataIndex: 'discountRate',
      key: 'discount',
      render: (v: number) => (
        <b style={{ color: v < 1 ? '#e11d48' : '#64748b' }}>
          {v < 1 ? `${(v * 10).toFixed(1)} 折` : '标准结算价'}
        </b>
      )
    },
    {
      title: '权益概览',
      key: 'privilege',
      render: (_: any, r: any) => {
        if (r.levelId === 1) return '全场正品物资直供、基础积分累计'
        if (r.levelId === 2) return '98 折批发专享、积分抵扣 10%、专属客服'
        if (r.levelId === 3) return '95 折批发特惠、双倍积分累计、急速发运'
        return '90 折顶级优惠、三倍积分奖励、1对1 资深客户经理'
      }
    }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/membership" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回会员中心
        </Link>
      </div>

      <Card title="会员等级体系与成长梯度" style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={memberLevels}
          columns={columns}
          rowKey="levelId"
          pagination={false}
        />
      </Card>
    </div>
  )
}
