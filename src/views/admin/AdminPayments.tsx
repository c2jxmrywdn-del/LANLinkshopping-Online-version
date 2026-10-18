import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Input, message } from 'antd'
import { useStore } from '../../store/storeContext'
import { Order } from '../../types'

export const AdminPayments: React.FC = () => {
  const { orders, refundOrder } = useStore()
  const [refundModalOrder, setRefundModalOrder] = useState<Order | null>(null)
  const [refundReason, setRefundReason] = useState('')

  const handleRefund = () => {
    if (!refundModalOrder) return
    refundOrder(refundModalOrder.orderNo, refundModalOrder.totalAmount, refundReason || '平台运营发起全额退款')
    message.success(`订单 ${refundModalOrder.orderNo} 已成功全额退款 ¥${refundModalOrder.totalAmount.toFixed(2)}，资金已退回买家钱包`)
    setRefundModalOrder(null)
    setRefundReason('')
  }

  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'no' },
    {
      title: '交易金额',
      dataIndex: 'totalAmount',
      key: 'amount',
      render: (v: number) => <b style={{ color: '#e11d48' }}>¥{v.toFixed(2)}</b>
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'type',
      render: (v: string) => {
        if (v === 'term') return <Tag color="purple">企业账期</Tag>
        if (v === 'balance') return <Tag color="green">企业钱包</Tag>
        return <Tag color="blue">对公转账</Tag>
      }
    },
    {
      title: '支付状态',
      key: 'status',
      render: (_: any, r: Order) => {
        if (r.payStatus === 1) return <Tag color="green">已支付</Tag>
        if (r.payStatus === 2) return <Tag color="purple">已退款 (¥{r.refundAmount || r.totalAmount})</Tag>
        return <Tag color="orange">未支付</Tag>
      }
    },
    { title: '交易时间', dataIndex: 'createTime', key: 'time' },
    {
      title: '操作',
      key: 'op',
      render: (_: any, r: Order) => (
        <div>
          {r.payStatus === 1 && (
            <Button size="small" danger onClick={() => setRefundModalOrder(r)}>
              发起退款
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
          交易与支付管理
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
          监控全平台大宗采购对公转账、企业钱包与账期支付流水，支持特殊场景退款处理。
        </p>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="orderNo"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <Modal
        open={!!refundModalOrder}
        title="平台运营发起退款"
        onCancel={() => setRefundModalOrder(null)}
        onOk={handleRefund}
        okText="确认退款"
        cancelText="取消"
      >
        <div style={{ marginBottom: '12px' }}>
          将对订单 <b>{refundModalOrder?.orderNo}</b> 执行全额退款：
          <b style={{ color: '#e11d48', fontSize: '18px', marginLeft: '6px' }}>
            ¥{refundModalOrder?.totalAmount.toFixed(2)}
          </b>
        </div>
        <Input.TextArea
          rows={3}
          value={refundReason}
          onChange={e => setRefundReason(e.target.value)}
          placeholder="说明退款原因（例如：供需双方协商一致退货退款）"
        />
      </Modal>
    </div>
  )
}
