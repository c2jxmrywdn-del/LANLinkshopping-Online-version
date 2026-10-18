import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Button, InputNumber, Tag, Row, Col, Tabs, message } from 'antd'
import { ShoppingCartOutlined, ThunderboltOutlined, CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, user, addToCart } = useStore()
  const [qty, setQty] = useState(1)

  const product = products.find(p => p.prodId === Number(id))

  if (!product) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>商品不存在或已下架</h2>
        <Button type="primary" onClick={() => navigate('/mall')}>返回商城</Button>
      </div>
    )
  }

  const isVip = user?.identity?.code === 'vip'
  const vipPrice = (product.price * 0.95).toFixed(2)

  const handleAdd = () => {
    if (!user) {
      message.warning('请先登录')
      navigate('/login')
      return
    }
    addToCart(product.prodId, qty)
    message.success(`已添加 ${qty} 件商品到购物车`)
  }

  const handleBuyNow = () => {
    if (!user) {
      message.warning('请先登录')
      navigate('/login')
      return
    }
    addToCart(product.prodId, qty)
    navigate('/cart')
  }

  return (
    <div className="main-container">
      {/* Breadcrumbs */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
        <Link to="/mall" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeftOutlined /> 返回商城
        </Link>
        <span>/</span>
        <span>{product.brand}</span>
        <span>/</span>
        <b style={{ color: 'var(--ll-ink)' }}>{product.title}</b>
      </div>

      <Row gutter={[32, 32]}>
        {/* Left Column: Image Gallery */}
        <Col xs={24} md={10}>
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              background: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}
          >
            <img
              src={product.coverUrl}
              alt={product.title}
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '14px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              color: '#64748b'
            }}
          >
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> 源头厂家直供</span>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> 支持大宗对公</span>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> 资质溯源完备</span>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> 专属客服支持</span>
          </div>
        </Col>

        {/* Right Column: Buying Details */}
        <Col xs={24} md={14}>
          <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <Tag color="blue">{product.brand || '精选优品'}</Tag>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '12px 0 6px', color: 'var(--ll-navy)' }}>
              {product.title}
            </h1>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
              规格参数：<b>{product.spec || '国标正品'}</b> · 计量单位：<b>{product.unit || '件'}</b>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px'
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b' }}>现货直发批发电商单价</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0' }}>
                <span style={{ fontSize: '18px', color: '#e11d48', fontWeight: 700 }}>¥</span>
                <span style={{ fontSize: '36px', color: '#e11d48', fontWeight: 800 }}>
                  {product.price.toFixed(2)}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px' }}>/ {product.unit || '件'}</span>

                {isVip && (
                  <Tag color="gold" style={{ marginLeft: '12px', fontWeight: 700 }}>
                    VIP 95折 ¥{vipPrice}
                  </Tag>
                )}
              </div>
              {isVip && (
                <div style={{ fontSize: '12px', color: '#b45309' }}>
                  ✓ 当前账号享有 VIP 专属 95 折结账抵扣优惠
                </div>
              )}
            </div>

            {/* Meta Attributes */}
            <div style={{ display: 'flex', gap: '32px', marginBottom: '24px', fontSize: '13px', color: '#475569' }}>
              <div>已累计销量：<b style={{ color: 'var(--ll-ink)' }}>{product.sales}</b></div>
              <div>可用库存：<b style={{ color: 'var(--ll-ink)' }}>{product.stock} {product.unit || '件'}</b></div>
              <div>供货保障：<b style={{ color: '#10b981' }}>现货充足</b></div>
            </div>

            {/* Quantity Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>购买数量：</span>
              <InputNumber
                min={1}
                max={product.stock}
                value={qty}
                onChange={v => setQty(v || 1)}
                size="large"
                style={{ width: '120px' }}
              />
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                小计：<b style={{ color: '#e11d48' }}>¥{(product.price * qty).toFixed(2)}</b>
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button
                type="primary"
                size="large"
                className="ll-add-cart"
                icon={<ShoppingCartOutlined />}
                style={{ flex: 1, height: '48px', fontSize: '16px' }}
                onClick={handleAdd}
              >
                加入购物车
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                style={{
                  flex: 1,
                  height: '48px',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
                  border: 'none'
                }}
                onClick={handleBuyNow}
              >
                立即去结算
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Card style={{ marginTop: '36px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <Tabs
          defaultActiveKey="detail"
          items={[
            {
              key: 'detail',
              label: '商品详情介绍',
              children: (
                <div style={{ lineHeight: 1.8, fontSize: '14px', color: '#334155', padding: '12px 0' }}>
                  <p>{product.detail}</p>
                  <p>
                    LANLinkshopping 聚合型一体多元化 B2B 供应链平台，所有在架工业物料与原材料均经过供应商准入工商审核与税务资质查验。
                    提供完整产品质量合格证、批次检测报告与送货清单，全面适配中铁、中建、大型国企与工程承包商集中统一采购结算规范。
                  </p>
                </div>
              )
            },
            {
              key: 'specs',
              label: '规格与供应指标',
              children: (
                <div style={{ lineHeight: 2, fontSize: '14px', padding: '12px 0' }}>
                  <div>品牌名称：{product.brand}</div>
                  <div>执行规格：{product.spec}</div>
                  <div>供货周期：下单后 24-48 小时内完成出库发运</div>
                  <div>配送方式：专车直达 / 物流自提 / 铁路集装箱联运</div>
                </div>
              )
            },
            {
              key: 'terms',
              label: '账期与支付条款',
              children: (
                <div style={{ lineHeight: 1.8, fontSize: '14px', padding: '12px 0' }}>
                  <p>1. 支持对公银行转账、企业钱包实时结算及企业账期 30/60/90 天周期对账还款。</p>
                  <p>2. 已开通账期额度的优质企业用户，在订单结算页选择“账期/尾款”即可先货后款采购。</p>
                </div>
              )
            }
          ]}
        />
      </Card>
    </div>
  )
}
