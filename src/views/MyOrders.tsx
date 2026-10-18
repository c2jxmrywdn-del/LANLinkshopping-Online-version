import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Radio, Button, Modal, Empty, message } from 'antd'
import { WalletOutlined, ExperimentOutlined, EyeOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { Order } from '../types'

export const MyOrders: React.FC = () => {
  const navigate = useNavigate()
  const { orders, walletBalance, payOrder, cancelOrder } = useStore()
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid' | 'done' | 'closed'>('all')
  const [payModalOrder, setPayModalOrder] = useState<Order | null>(null)
  const [paying, setPaying] = useState(false)

  const filteredOrders = orders.filter(o => {
    if (filter === 'unpaid') return o.orderStatus === 0 && o.payStatus === 0
    if (filter === 'paid') return o.payStatus === 1 && o.orderStatus === 1
    if (filter === 'done') return o.orderStatus === 2
    if (filter === 'closed') return o.orderStatus === 3
    return true
  })

  const handlePay = async (channel: string) => {
    if (!payModalOrder) return
    setPaying(true)
    try {
      await payOrder(payModalOrder.orderNo, channel)
      message.success('订单支付成功！')
      setPayModalOrder(null)
    } catch (err: any) {
      message.error(err.message || '支付失败')
    } finally {
      setPaying(false)
    }
  }

  const columns = [
    {
      title: '订单号 / 时间',
      key: 'orderNo',
      render: (_: any, r: Order) => (
        <div>
          <b style={{ color: 'var(--ll-navy)' }}>{r.orderNo}</b>
          <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{r.createTime}</div>
        </div>
      )
    },
    {
      title: '商品清单',
      key: 'items',
      render: (_: any, r: Order) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {r.items.map(it => (
            <div key={it.itemId} style={{ fontSize: '12px' }}>
              {it.title} <span style={{ color: '#64748b' }}>× {it.quantity}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '订单金额',
      key: 'total',
      width: 120,
      render: (_: any, r: Order) => (
        <b style={{ color: '#e11d48', fontSize: '15px' }}>¥{r.totalAmount.toFixed(2)}</b>
      )
    },
    {
      title: '支付方式',
      key: 'payType',
      width: 120,
      render: (_: any, r: Order) => {
        const text = r.payType === 'term' ? '企业账期' : r.payType === 'balance' ? '钱包支付' : '对公转账'
        return <Tag color={r.payType === 'term' ? 'purple' : 'blue'}>{text}</Tag>
      }
    },
    {
      title: '支付状态',
      key: 'payStatus',
      width: 110,
      render: (_: any, r: Order) => {
        if (r.payStatus === 1) return <Tag color="green">已支付</Tag>
        if (r.payStatus === 2) return <Tag color="purple">已退款</Tag>
        return <Tag color="orange">未支付</Tag>
      }
    },
    {
      title: '订单状态',
      key: 'orderStatus',
      width: 110,
      render: (_: any, r: Order) => {
        if (r.orderStatus === 0) return <Tag color="gold">待处理</Tag>
        if (r.orderStatus === 1) return <Tag color="blue">履约中</Tag>
        if (r.orderStatus === 2) return <Tag color="green">已完成</Tag>
        return <Tag color="default">已关闭</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, r: Order) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/orders/${r.orderNo}`)}
          >
            详情
          </Button>

          {r.payStatus === 0 && r.orderStatus === 0 && (
            <Button
              type="primary"
              size="small"
              onClick={() => setPayModalOrder(r)}
            >
              支付
            </Button>
          )}

          {r.orderStatus === 0 && (
            <Button
              type="text"
              danger
              size="small"
              onClick={() => cancelOrder(r.orderNo)}
            >
              取消
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="main-container">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
          ORDER CENTER
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
          我的订单
        </h1>
        <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
          实时查看大宗物资采购订单状态、支付记录与发运追踪。
        </p>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <div style={{ marginBottom: '20px' }}>
          <Radio.Group
            value={filter}
            onChange={e => setFilter(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部订单</Radio.Button>
            <Radio.Button value="unpaid">待支付</Radio.Button>
            <Radio.Button value="paid">已支付 / 履约中</Radio.Button>
            <Radio.Button value="done">已完成</Radio.Button>
            <Radio.Button value="closed">已关闭</Radio.Button>
          </Radio.Group>
        </div>

        {filteredOrders.length > 0 ? (
          <Table
            dataSource={filteredOrders}
            columns={columns}
            rowKey="orderNo"
            pagination={{ pageSize: 8 }}
          />
        ) : (
          <Empty description="暂无相关订单记录" style={{ padding: '40px 0' }} />
        )}
      </Card>

      {/* Payment Channel Modal */}
      {payModalOrder && (
        <Modal
          open={!!payModalOrder}
          title={`订单快捷支付 · ${payModalOrder.orderNo}`}
          footer={null}
          onCancel={() => setPayModalOrder(null)}
        >
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>本次应付金额</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#e11d48', marginTop: '4px' }}>
              ¥{payModalOrder.totalAmount.toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Wallet Option */}
            <div
              onClick={() => handlePay('wallet')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                cursor: walletBalance < payModalOrder.totalAmount ? 'not-allowed' : 'pointer',
                opacity: walletBalance < payModalOrder.totalAmount ? 0.6 : 1,
                background: '#fff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <WalletOutlined style={{ fontSize: '24px', color: '#10b981' }} />
                <div>
                  <strong style={{ fontSize: '14px' }}>💰 企业钱包余额支付</strong>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    可用余额：¥{walletBalance.toFixed(2)}
                    {walletBalance < payModalOrder.totalAmount && (
                      <span style={{ color: '#e11d48', marginLeft: '6px' }}>（余额不足）</span>
                    )}
                  </div>
                </div>
              </div>
              <Tag color="green">推荐</Tag>
            </div>

            {/* Mock Gateway Option */}
            <div
              onClick={() => handlePay('mock')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                cursor: 'pointer',
                background: '#fff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ExperimentOutlined style={{ fontSize: '24px', color: '#f59e0b' }} />
                <div>
                  <strong style={{ fontSize: '14px' }}>🧪 演示环境模拟支付网关</strong>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>模拟在线网银扣款，即时到账</div>
                </div>
              </div>
              <Tag color="blue">即时</Tag>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
