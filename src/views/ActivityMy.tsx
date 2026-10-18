import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Button, Empty } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const ActivityMy: React.FC = () => {
  const navigate = useNavigate()
  const { activities } = useStore()

  const myActivities = activities.filter(a => a.joined)

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
      render: (v: string) => <b style={{ color: 'var(--ll-navy)' }}>{v}</b>
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (v: string) => <Tag color="blue">{v === 'register' ? '注册赠礼' : '消费参与'}</Tag>
    },
    {
      title: '奖励记录',
      key: 'reward',
      render: () => <Tag color="green">+100 积分（已入账）</Tag>
    },
    {
      title: '有效截止期',
      dataIndex: 'endTime',
      key: 'end',
      render: (v: string) => <span style={{ color: '#64748b', fontSize: '13px' }}>{v}</span>
    }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/activity" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回活动中心
        </Link>
      </div>

      <Card title="我参与的营销活动" style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        {myActivities.length > 0 ? (
          <Table dataSource={myActivities} columns={columns} rowKey="activityId" pagination={false} />
        ) : (
          <Empty description="暂无参与的活动">
            <Button type="primary" onClick={() => navigate('/activity')}>去活动广场看看</Button>
          </Empty>
        )}
      </Card>
    </div>
  )
}
