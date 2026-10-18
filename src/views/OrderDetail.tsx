import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Steps, Descriptions, Table, Tag, Button, Modal, message, Row, Col } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, CarOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const OrderDetail: React.FC = () => {
  const { orderNo } = useParams<{ orderNo: string }>()
  const navigate = useNavigate()
  const { orders, payOrder, cancelOrder } = useStore()

  const order = orders.find(o => o.orderNo === orderNo)

  if (!order) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>未找到该订单</h2>
        <Button type="primary" onClick={() => navigate('/orders')}>返回订单列表</Button>
      </div>
    )
  }

  const getStep = () => {
    if (order.orderStatus === 3) return -1
    if (order.payStatus === 0) return 0
    if (order.orderStatus === 1) return 2
    if (order.orderStatus === 2) return 4
    return 1
  }

  const handleInstantPay = async () => {
    try {
      await payOrder(order.orderNo, 'mock')
      message.success('支付成功')
    } catch (err: any) {
      message.error(err.message || '支付失败')
    }
  }

  const columns = [
    {
      title: '商品',
      key: 'title',
      render: (_: any, r: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {r.coverUrl && <img src={r.coverUrl} alt="" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />}
          <b>{r.title}</b>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (v: number) => `¥${v.toFixed(2)}`
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (v: number) => <b style={{ color: '#e11d48' }}>¥${v.toFixed(2)}</b>
    }
  ]

  return (
    <div className="main-container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回我的订单列表
        </Link>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>采购订单号</div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
              {order.orderNo}
            </h1>
            <span style={{ fontSize: '13px', color: '#64748b' }}>下单时间：{order.createTime}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>订单应付总额</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#e11d48' }}>
              ¥{order.totalAmount.toFixed(2)}
            </div>
            <Tag color={order.payStatus === 1 ? 'green' : 'orange'}>
              {order.payStatus === 1 ? '已支付' : '待支付'}
            </Tag>
          </div>
        </div>

        {order.orderStatus !== 3 ? (
          <Steps
            current={getStep()}
            items={[
              { title: '提交订单', description: '订单确认生成' },
              { title: '完成支付', description: order.payType === 'term' ? '账期已扣额' : '资金到账' },
              { title: '仓储出库', description: '批次检测备货' },
              { title: '干线物流', description: '专车发运中' },
              { title: '签收完成', description: '电子回单归档' }
            ]}
          />
        ) : (
          <Tag color="red" style={{ fontSize: '14px', padding: '6px 12px' }}>
            订单已取消 / 已关闭
          </Tag>
        )}
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="配送与联系信息" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="收货人">{order.receiver}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{order.phone}</Descriptions.Item>
              <Descriptions.Item label="收货地址">{order.address}</Descriptions.Item>
              <Descriptions.Item label="订单备注">{order.remark || '无'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="结算与支付信息" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="支付方式">
                {order.payType === 'term' ? '企业账期（先货后款）' : order.payType === 'balance' ? '企业钱包' : '对公转账'}
              </Descriptions.Item>
              <Descriptions.Item label="支付状态">
                {order.payStatus === 1 ? '已完成支付' : '尚未支付'}
              </Descriptions.Item>
              {order.originalAmount && (
                <Descriptions.Item label="商品原价">¥{order.originalAmount.toFixed(2)}</Descriptions.Item>
              )}
              {order.pointsDeducted && order.pointsDeducted > 0 ? (
                <Descriptions.Item label="积分抵扣金额">
                  <span style={{ color: '#10b981' }}>-¥{order.pointsDeducted.toFixed(2)}</span>
                </Descriptions.Item>
              ) : null}
            </Descriptions>

            {order.payStatus === 0 && order.orderStatus === 0 && (
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <Button type="primary" onClick={handleInstantPay}>
                  模拟立即支付
                </Button>
                <Button danger onClick={() => cancelOrder(order.orderNo)}>
                  取消该订单
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Card title="订购商品明细" style={{ marginTop: '24px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={order.items}
          columns={columns}
          rowKey="itemId"
          pagination={false}
        />
      </Card>
    </div>
  )
}
