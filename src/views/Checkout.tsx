import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Radio, Button, Checkbox, InputNumber, Tag, Row, Col, Modal, message, Alert } from 'antd'
import { CheckCircleOutlined, WalletOutlined, FileProtectOutlined, BankOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const {
    cart,
    user,
    addresses,
    walletBalance,
    creditAccount,
    memberCard,
    redeemQuote,
    createOrder,
    payOrder
  } = useStore()

  const checkedItems = cart.filter(i => i.checked)
  const rawTotal = checkedItems.reduce((sum, item) => sum + item.subtotal, 0)

  const defaultAddr = addresses.find(a => a.isDefault === 1) || addresses[0]

  const [form] = Form.useForm()
  const [selectedAddrId, setSelectedAddrId] = useState<number | null>(defaultAddr ? defaultAddr.id : null)
  const [payType, setPayType] = useState<'corporate' | 'balance' | 'term'>('corporate')
  const [usePoints, setUsePoints] = useState(false)
  const [pointsInput, setPointsInput] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (defaultAddr) {
      form.setFieldsValue({
        receiver: defaultAddr.receiver,
        phone: defaultAddr.phone,
        address: `${defaultAddr.region} ${defaultAddr.detail}`
      })
    }
  }, [defaultAddr, form])

  const quote = redeemQuote(usePoints ? pointsInput : 0, rawTotal)
  const payableTotal = Math.max(0, rawTotal - quote.amount)

  const walletInsufficient = walletBalance < payableTotal
  const termUnavailable = creditAccount.status !== 'ACTIVE' || creditAccount.availableLimit < payableTotal

  const handlePickAddress = (addr: typeof addresses[0]) => {
    setSelectedAddrId(addr.id)
    form.setFieldsValue({
      receiver: addr.receiver,
      phone: addr.phone,
      address: `${addr.region} ${addr.detail}`
    })
    message.success(`已选用 ${addr.receiver} 的地址`)
  }

  const handleSubmit = async (values: any) => {
    if (checkedItems.length === 0) {
      message.warning('没有选中的商品')
      navigate('/cart')
      return
    }

    if (payType === 'balance' && walletInsufficient) {
      message.error('钱包余额不足，请先充值或更换支付方式')
      return
    }

    if (payType === 'term' && termUnavailable) {
      message.error('账期额度不足或未生效')
      return
    }

    setSubmitting(true)
    try {
      const order = await createOrder({
        cartIds: checkedItems.map(i => i.cartId),
        receiver: values.receiver,
        phone: values.phone,
        address: values.address,
        remark: values.remark,
        payType,
        usePoints: usePoints ? quote.points : undefined
      })

      if (payType === 'term') {
        Modal.success({
          title: '企业账期订单已生成',
          content: `订单号 ${order.orderNo} 已生成，占用授信额度 ¥${order.totalAmount.toFixed(2)}。账单已记录在账期中心，请在到期前还款。`,
          okText: '查看账期账单',
          onOk: () => navigate('/credit-term/bills')
        })
      } else {
        Modal.confirm({
          title: '订单提交成功',
          content: `订单号 ${order.orderNo}，应付总计 ¥${order.totalAmount.toFixed(2)}。是否立即完成支付？`,
          okText: '立即支付',
          cancelText: '稍后支付',
          onOk: async () => {
            try {
              await payOrder(order.orderNo, payType === 'balance' ? 'wallet' : 'mock')
              message.success('支付成功！已进入发货流程')
              navigate('/my-orders')
            } catch (err: any) {
              message.error(err.message || '支付失败')
              navigate('/my-orders')
            }
          },
          onCancel: () => navigate('/my-orders')
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="main-container">
      <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 24px', color: 'var(--ll-navy)' }}>
        确认订单与结算
      </h1>

      <Row gutter={[24, 24]}>
        {/* Left Form */}
        <Col xs={24} lg={15}>
          <Card title="配送与结算信息" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            {/* Address Selection */}
            {addresses.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '10px', fontSize: '14px' }}>
                  快捷选用收货地址
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                  {addresses.map(a => (
                    <div
                      key={a.id}
                      onClick={() => handlePickAddress(a)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: selectedAddrId === a.id ? '2px solid var(--ll-primary)' : '1px solid #e2e8f0',
                        background: selectedAddrId === a.id ? 'rgba(30, 110, 184, 0.05)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '13px' }}>{a.receiver}</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{a.phone}</span>
                        {a.isDefault === 1 && <Tag color="red" style={{ margin: 0, fontSize: '10px' }}>默认</Tag>}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                        {a.region} {a.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="receiver" label="收货人" rules={[{ required: true, message: '请填写收货人姓名' }]}>
                <Input placeholder="请填写收货人姓名" size="large" />
              </Form.Item>

              <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请填写联系电话' }]}>
                <Input placeholder="请填写联系手机或电话" size="large" />
              </Form.Item>

              <Form.Item name="address" label="收货详细地址" rules={[{ required: true, message: '请填写收货地址' }]}>
                <Input.TextArea placeholder="施工工地现场 / 仓库详细地址" rows={2} />
              </Form.Item>

              {/* Payment Methods */}
              <Form.Item label="支付方式">
                <Radio.Group
                  value={payType}
                  onChange={e => setPayType(e.target.value)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}
                >
                  <Radio value="corporate" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BankOutlined style={{ color: 'var(--ll-primary)' }} />
                      <b>对公转账 / 模拟网关支付</b>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>（大宗工程物资采购支持对公现款直付）</span>
                    </div>
                  </Radio>

                  <Radio value="balance" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <WalletOutlined style={{ color: '#10b981' }} />
                      <b>企业钱包余额支付</b>
                      <span style={{ color: walletInsufficient ? '#ef4444' : '#64748b', fontSize: '12px' }}>
                        （当前余额 ¥{walletBalance.toFixed(2)}{walletInsufficient ? '，余额不足' : ''}）
                      </span>
                    </div>
                  </Radio>

                  <Radio
                    value="term"
                    disabled={termUnavailable}
                    style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileProtectOutlined style={{ color: '#f59e0b' }} />
                      <b>企业授信账期（先货后款）</b>
                      <span style={{ color: termUnavailable ? '#ef4444' : '#64748b', fontSize: '12px' }}>
                        （可用授信 ¥{creditAccount.availableLimit.toFixed(2)} · 账期 {creditAccount.termDays} 天）
                      </span>
                    </div>
                  </Radio>
                </Radio.Group>

                {payType === 'term' && termUnavailable && (
                  <Alert
                    type="warning"
                    showIcon
                    style={{ marginTop: '10px' }}
                    message="企业账期不可用"
                    description="当前账期可用授信额度不足，或账期申请尚未通过审核。可前往「账期中心」提升额度。"
                  />
                )}
              </Form.Item>

              <Form.Item name="remark" label="订单备注（选填）">
                <Input placeholder="例如：请随货附带检验合格证两份" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={submitting}
                style={{
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
                  border: 'none',
                  marginTop: '12px'
                }}
              >
                确认并提交订单
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Order Summary */}
        <Col xs={24} lg={9}>
          <Card title="商品清单与费用明细" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
              {checkedItems.map(item => (
                <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ maxWidth: '65%' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ll-navy)' }}>{item.title}</div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>
                      ¥{item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                  <b style={{ color: '#e11d48' }}>¥{item.subtotal.toFixed(2)}</b>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '16px 0' }} />

            {/* Points Redemption */}
            <div
              style={{
                background: 'rgba(30, 110, 184, 0.04)',
                border: '1px dashed rgba(30, 110, 184, 0.3)',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Checkbox checked={usePoints} onChange={e => setUsePoints(e.target.checked)}>
                  <b>会员积分抵扣</b>
                </Checkbox>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  可用 <b>{memberCard.points}</b> 积分
                </span>
              </div>

              {usePoints && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <InputNumber
                      min={0}
                      max={memberCard.points}
                      step={100}
                      value={pointsInput}
                      onChange={v => setPointsInput(v || 0)}
                      placeholder="使用积分数量"
                      style={{ flex: 1 }}
                    />
                    <Button size="small" onClick={() => setPointsInput(memberCard.points)}>
                      全部使用
                    </Button>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                    规则：每 100 积分抵扣 1 元，单笔最多抵扣订单总金额的 10%
                  </div>
                  {quote.amount > 0 && (
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                      ✓ 实际抵扣 {quote.points} 积分，立减 ¥{quote.amount.toFixed(2)}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>商品总价</span>
                <span>¥{rawTotal.toFixed(2)}</span>
              </div>

              {quote.amount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>积分抵扣</span>
                  <span>-¥{quote.amount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>运费 / 物流</span>
                <span style={{ color: '#10b981' }}>免运费（专车包配）</span>
              </div>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <b style={{ fontSize: '16px', color: 'var(--ll-navy)' }}>应付总计</b>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#e11d48' }}>
                  ¥{payableTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
