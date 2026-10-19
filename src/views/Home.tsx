import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, message } from 'antd'
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from '../components/BrandWordmark'
import { BrandSymbol } from '../components/BrandSymbol'
import { BannerCarousel } from '../components/BannerCarousel'
import { InteractiveProductCard } from '../components/InteractiveProductCard'
import {
  SpotlightCard,
  MagneticButton,
  AnimatedNumber
} from '../components/MotionPrimitives'

const INDUSTRY_META: Record<
  number,
  {
    code: string
    desc: string
    highlight: string
    accent: string
    span: number
  }
> = {
  1: {
    code: 'CONSTRUCTION · 01',
    desc: '螺纹钢、普通硅酸盐水泥、给水无缝管材等基建工程核心物资，支持批次质检报告核验与工地直发。',
    highlight: '钢厂源头直发 · 账期最高 90 天',
    accent: 'rgba(200, 164, 92, 0.26)',
    span: 7
  },
  2: {
    code: 'TEXTILE · 02',
    desc: '高支高密全棉坯布、涤纶短纤与功能性工装面料，面向服装厂与工业纺织集采。',
    highlight: '大宗坯布 · 支数克重定制',
    accent: 'rgba(14, 165, 233, 0.22)',
    span: 5
  },
  3: {
    code: 'PETROCHEMICAL · 03',
    desc: '重质纯碱、抗磨液压油与基础化工原料，全流程危化资质备案与罐车/专车专线配送。',
    highlight: '合规危化物流 · 批次溯源',
    accent: 'rgba(56, 189, 248, 0.22)',
    span: 5
  },
  4: {
    code: 'ELECTRONICS · 04',
    desc: '车规级贴片电阻、工业板对板连接器与高亮度工控液晶显示模组，原厂防伪编带直供。',
    highlight: '原厂现货 · BOM 一站配齐',
    accent: 'rgba(245, 158, 11, 0.24)',
    span: 7
  }
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { industries, products, merchants, user, addToCart } = useStore()
  const [heroSpot, setHeroSpot] = useState({ x: 320, y: 180 })

  const hotProducts = products.filter(p => p.status === 1).slice(0, 8)
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0)

  const handleQuickAdd = (e: React.MouseEvent, prodId: number, title: string) => {
    e.stopPropagation()
    if (!user) {
      message.warning('请先登录采购账号')
      navigate('/login')
      return
    }
    addToCart(prodId, 1)
    message.success(`已将「${title}」加入采购车`)
  }

  return (
    <div className="main-container">
      {/* 21st.dev Border-Beam & Interactive Spotlight Hero Section */}
      <section
        onPointerMove={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          setHeroSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }}
        style={{
          minHeight: '460px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '28px',
          padding: '54px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'var(--ll-brand-hero-gradient)',
          boxShadow: '0 26px 72px rgba(19, 35, 58, 0.22)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          color: '#fff',
          marginBottom: '22px'
        }}
      >
        {/* Animated Conic Border Beam */}
        <div
          aria-hidden="true"
          className="ll-border-beam-line"
          style={{ '--beam-color': '#F6D38A' } as React.CSSProperties}
        />

        {/* Cursor Radial Spotlight inside Hero */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(520px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(246, 211, 138, 0.14), transparent 70%)`
          }}
        />

        {/* Ambient Floating Orbs */}
        <div
          style={{
            position: 'absolute',
            width: '340px',
            height: '340px',
            right: '24%',
            top: '-140px',
            background: 'rgba(155, 45, 32, 0.44)',
            borderRadius: '50%',
            filter: 'blur(44px)',
            animation: 'ambientFloat 7s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            right: '-110px',
            bottom: '-190px',
            background: 'rgba(200, 164, 92, 0.30)',
            borderRadius: '50%',
            filter: 'blur(44px)',
            animation: 'ambientFloat 9s 1s ease-in-out infinite reverse',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '670px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ll-brand-gold-soft)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              marginBottom: '16px'
            }}
          >
            <span>LANLINK SHOPPING · CONNECTED B2B COMMERCE</span>
            <span style={{ opacity: 0.45 }}>·</span>
            <span style={{ color: '#38BDF8' }}>21ST.DEV MOTION EDITION</span>
          </div>

          <BrandWordmark size="clamp(36px, 4.8vw, 52px)" />

          <h1
            style={{
              margin: '18px 0 12px',
              fontSize: 'clamp(28px, 3.8vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#fff',
              letterSpacing: '-0.02em'
            }}
          >
            让每一次连接，都产生价值。
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: '580px',
              color: 'rgba(255, 255, 255, 0.82)',
              fontSize: '15px',
              lineHeight: 1.75
            }}
          >
            连接大宗工业物资、企业采购、源头供应商与授信账期，让交易从发现开始，在同一个数字化供应链网络里持续发生。
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px' }}>
            <MagneticButton
              variant="gold"
              size="lg"
              onClick={() => navigate('/mall')}
            >
              进入大宗商城 <ArrowRightOutlined />
            </MagneticButton>

            <MagneticButton
              variant="glass"
              size="lg"
              shimmer={false}
              onClick={() => navigate('/ui-lab')}
            >
              <ExperimentOutlined style={{ color: '#F6D38A' }} /> 21st.dev 动效实验室
            </MagneticButton>

            <MagneticButton
              variant="glass"
              size="lg"
              shimmer={false}
              onClick={() => navigate('/credit-term')}
            >
              <SafetyCertificateOutlined style={{ color: '#38BDF8' }} /> 企业授信账期
            </MagneticButton>
          </div>
        </div>

        {/* Live Animated Telemetry Strip inside Hero */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '38px',
            paddingTop: '22px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '18px'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
              在架源头工业物资
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
              <AnimatedNumber value={products.length} suffix=" 款" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
              实时现货储备总量
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#F6D38A', marginTop: '2px' }}>
              <AnimatedNumber value={totalStock} suffix=" 件/吨" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
              累计大宗成交批次
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', marginTop: '2px' }}>
              <AnimatedNumber value={totalSales} suffix=" 笔" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
              认证供应商主体
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>
              <AnimatedNumber value={merchants.length * 80} suffix="+ 家" />
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: '36px',
            top: '18px',
            display: 'none',
            pointerEvents: 'none',
            opacity: 0.92
          }}
          className="hero-orbit-wrap"
        >
          <BrandSymbol size="360px" />
        </div>
      </section>

      {/* Brand Promise Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          margin: '14px 0 24px',
          padding: '12px 22px',
          border: '1px solid #D9D3C7',
          borderRadius: '14px',
          background: 'rgba(251, 249, 241, 0.88)',
          color: '#667085',
          fontSize: '11px',
          letterSpacing: '0.1em'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>01</span>
          <b style={{ color: 'var(--ll-brand-base)' }}>DISCOVER 源头寻源</b>
          <span style={{ color: 'var(--ll-brand-gold)', margin: '0 4px' }}>→</span>
          <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>02</span>
          <b style={{ color: 'var(--ll-brand-base)' }}>TRANSACT 对公/账期结算</b>
          <span style={{ color: 'var(--ll-brand-gold)', margin: '0 4px' }}>→</span>
          <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>03</span>
          <b style={{ color: 'var(--ll-brand-base)' }}>GROW 履约与复购增长</b>
        </div>
        <span style={{ color: 'var(--ll-navy)', fontWeight: 600 }}>
          全链路 SSL 加密 · 电子合同存证 · 专车物流追踪
        </span>
      </div>

      {/* Carousel */}
      <BannerCarousel />

      {/* 01 Bento Grid Industry Solutions (21st.dev Style) */}
      <div style={{ marginTop: '40px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
              <span style={{ color: 'var(--ll-brand-gold)', marginRight: '8px', fontSize: '14px' }}>01</span>
              Bento 行业垂直供应链专区
            </h2>
            <p style={{ margin: '4px 0 0', color: 'var(--ll-muted)', fontSize: '13px' }}>
              移动光标体验 21st.dev 径向聚光灯追踪，点击即可按行业垂直筛选源头好货
            </p>
          </div>
          <Button type="link" onClick={() => navigate('/ui-lab')} style={{ color: 'var(--ll-primary)', fontWeight: 600 }}>
            探索更多交互组件 →
          </Button>
        </div>

        <Row gutter={[18, 18]}>
          {industries.map((ind, index) => {
            const meta = INDUSTRY_META[ind.indId] || INDUSTRY_META[1]
            const indProductsCount = products.filter(p => p.indId === ind.indId && p.status === 1).length
            const isFeatured = index === 0 || index === 3

            return (
              <Col key={ind.indId} xs={24} md={isFeatured ? 14 : 10}>
                <SpotlightCard
                  spotlightColor={meta.accent}
                  borderBeam={index === 0}
                  tilt
                  maxTilt={5}
                  onClick={() => navigate(`/mall?indId=${ind.indId}`)}
                  style={{
                    minHeight: '190px',
                    padding: '24px 26px',
                    background:
                      index === 0
                        ? 'linear-gradient(135deg, #13233A 0%, #1F3864 100%)'
                        : '#ffffff',
                    color: index === 0 ? '#ffffff' : 'var(--ll-ink)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          color: index === 0 ? 'var(--ll-brand-gold-soft)' : 'var(--ll-primary)'
                        }}
                      >
                        {meta.code}
                      </span>
                      <span
                        className="ll-tabular-nums"
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: index === 0 ? 'rgba(255,255,255,0.82)' : '#64748b'
                        }}
                      >
                        在售 {indProductsCount} 款核心物资 · {meta.highlight}
                      </span>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: index === 0 ? '#ffffff' : 'var(--ll-navy)',
                          marginBottom: '6px'
                        }}
                      >
                        {ind.name}供应链专区
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: index === 0 ? 'rgba(255,255,255,0.78)' : '#64748b'
                        }}
                      >
                        {meta.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '8px',
                        borderTop: index === 0 ? '1px solid rgba(255,255,255,0.12)' : '1px solid #f1f5f9',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: index === 0 ? '#F6D38A' : 'var(--ll-primary)'
                      }}
                    >
                      <span>进入{ind.name}目录直采</span>
                      <ArrowRightOutlined />
                    </div>
                  </div>
                </SpotlightCard>
              </Col>
            )
          })}
        </Row>
      </div>

      {/* 02 Hot Recommendations with 3D Tilt & Quick Cart Action */}
      <div style={{ marginTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
              <span style={{ color: 'var(--ll-brand-gold)', marginRight: '8px', fontSize: '14px' }}>02</span>
              源头直供 · 热销大宗物资
            </h2>
            <p style={{ margin: '4px 0 0', color: 'var(--ll-muted)', fontSize: '13px' }}>
              3D 景深悬浮与实时聚光灯卡片 · 支持一键加入企业采购车
            </p>
          </div>
          <Button type="link" onClick={() => navigate('/mall')} style={{ color: 'var(--ll-primary)', fontWeight: 600 }}>
            查看全部商品 ({products.filter(p => p.status === 1).length}) →
          </Button>
        </div>

        <Row gutter={[20, 24]}>
          {hotProducts.map((p, idx) => (
            <Col key={p.prodId} xs={24} sm={12} md={6} className="ll-stagger-item" style={{ animationDelay: `${idx * 45}ms` }}>
              <InteractiveProductCard
                imageUrl={p.coverUrl}
                title={p.title}
                description={`${p.brand || 'LANLINK'} · ${p.spec || '标准规格'}`}
                price={`¥${p.price.toFixed(2)} / ${p.unit || '件'}`}
                onClick={() => navigate(`/product/${p.prodId}`)}
                footer={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                      className="ll-tabular-nums"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'rgba(255,255,255,0.88)',
                        fontSize: '12px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.45)'
                      }}
                    >
                      <span>销量 {p.sales}</span>
                      <span>库存 {p.stock} {p.unit || '件'}</span>
                    </div>
                    <Button
                      type="primary"
                      size="small"
                      block
                      className="ll-add-cart"
                      icon={<ShoppingCartOutlined />}
                      onClick={e => handleQuickAdd(e, p.prodId, p.title)}
                    >
                      加入采购车
                    </Button>
                  </div>
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
