import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Table, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const CreditTermBillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { creditBills, creditRepayments, orders } = useStore()

  const bill = creditBills.find(b => b.billId === Number(id))
  const relatedOrder = bill ? orders.find(o => o.orderNo === bill.orderNo) : null
  const repayments = creditRepayments.filter(r => r.billId === Number(id))

  if (!bill) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>未找到该账单</h2>
        <Button type="primary" onClick={() => navigate('/credit-term/bills')}>返回账单列表</Button>
      </div>
    )
  }

  const columns = [
    { title: '还款记录ID', dataIndex: 'id', key: 'id' },
    { title: '还款金额', dataIndex: 'amount', key: 'amount', render: (v: number) => `¥${v.toFixed(2)}` },
    { title: '还款方式', dataIndex: 'method', key: 'method' },
    { title: '还款时间', dataIndex: 'createTime', key: 'createTime' }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '880px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/credit-term/bills" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回账单列表
        </Link>
      </div>

      <Card title={`账单详情 · #${bill.billId}`} style={{ borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="账单编号">#{bill.billId}</Descriptions.Item>
          <Descriptions.Item label="关联订单号">
            <Link to={`/orders/${bill.orderNo}`}>{bill.orderNo}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="账单金额">
            <b style={{ color: '#e11d48' }}>¥{bill.amount.toFixed(2)}</b>
          </Descriptions.Item>
          <Descriptions.Item label="已还金额">
            <b style={{ color: '#10b981' }}>¥{bill.repaidAmount.toFixed(2)}</b>
          </Descriptions.Item>
          <Descriptions.Item label="待还剩余">
            ¥{(bill.amount - bill.repaidAmount).toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="到期还款日">{bill.dueDate}</Descriptions.Item>
          <Descriptions.Item label="账单状态">
            <Tag color={bill.status === 'PAID' ? 'green' : 'orange'}>
              {bill.status === 'PAID' ? '已全额结清' : '待还款'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{bill.createTime}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="该账单还款流水" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={repayments}
          columns={columns}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: '该账单尚未有还款记录' }}
        />
      </Card>
    </div>
  )
}
