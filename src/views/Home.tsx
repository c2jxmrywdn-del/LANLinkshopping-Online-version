import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, Card } from 'antd'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from '../components/BrandWordmark'
import { BrandSymbol } from '../components/BrandSymbol'
import { BannerCarousel } from '../components/BannerCarousel'
import { InteractiveProductCard } from '../components/InteractiveProductCard'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { industries, products } = useStore()

  const hotProducts = products.filter(p => p.status === 1).slice(0, 8)

  return (
    <div className="main-container">
      {/* Brand Hero Section */}
      <section
        style={{
          minHeight: '430px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '28px',
          padding: '60px 68px',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--ll-brand-hero-gradient)',
          boxShadow: '0 24px 70px rgba(19, 35, 58, 0.18)',
          color: '#fff',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '340px',
            height: '340px',
            right: '24%',
            top: '-140px',
            background: 'rgba(155, 45, 32, 0.46)',
            borderRadius: '50%',
            filter: 'blur(42px)',
            animation: 'ambientFloat 7s ease-in-out infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            right: '-110px',
            bottom: '-190px',
            background: 'rgba(200, 164, 92, 0.32)',
            borderRadius: '50%',
            filter: 'blur(42px)',
            animation: 'ambientFloat 9s 1s ease-in-out infinite reverse'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          <span
            style={{
              color: 'var(--ll-brand-gold-soft)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.17em',
              display: 'block',
              marginBottom: '16px'
            }}
          >
            LANLINK SHOPPING · CONNECTED COMMERCE
          </span>
          <BrandWordmark size="clamp(38px, 5vw, 54px)" />
          <h1 style={{ margin: '20px 0 14px', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, color: '#fff' }}>
            让每一次连接，都产生价值。
          </h1>
          <p style={{ margin: 0, maxWidth: '580px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.8 }}>
            连接商品、采购、商户与增长，让交易从发现开始，在同一个供应链网络里持续发生。
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
            <Button
              type="primary"
              size="large"
              style={{
                border: 0,
                background: 'linear-gradient(100deg, var(--ll-brand-gold), #F59E0B)',
                color: 'var(--ll-brand-base)',
                fontWeight: 750
              }}
              onClick={() => navigate('/mall')}
            >
              进入商城 →
            </Button>
            <Button
              size="large"
              style={{
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)'
              }}
              onClick={() => navigate('/about')}
            >
              了解平台
            </Button>
          </div>
        </div>

        <div style={{ position: 'absolute', right: '40px', top: '15px', display: 'none' /* hidden on small screen */ }} className="hero-orbit-wrap">
          <BrandSymbol size="380px" />
        </div>
      </section>

      {/* Brand Promise Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          margin: '14px 0 24px',
          padding: '12px 20px',
          border: '1px solid #D9D3C7',
          borderRadius: '14px',
          background: 'rgba(251, 249, 241, 0.82)',
          color: '#667085',
          fontSize: '11px',
          letterSpacing: '0.12em'
        }}
      >
        <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>01</span>
        <b style={{ color: 'var(--ll-brand-base)' }}>DISCOVER</b>
        <span style={{ color: 'var(--ll-brand-gold)', margin: '0 4px' }}>→</span>
        <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>02</span>
        <b style={{ color: 'var(--ll-brand-base)' }}>TRANSACT</b>
        <span style={{ color: 'var(--ll-brand-gold)', margin: '0 4px' }}>→</span>
        <span style={{ color: 'var(--ll-brand-red)', fontWeight: 800 }}>03</span>
        <b style={{ color: 'var(--ll-brand-base)' }}>GROW</b>
      </div>

      {/* Carousel */}
      <BannerCarousel />

      {/* 01 Industry Solutions */}
      <div style={{ marginTop: '36px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 16px', color: 'var(--ll-navy)' }}>
          <span style={{ color: 'var(--ll-brand-gold)', marginRight: '8px', fontSize: '13px' }}>01</span>
          行业解决方案
        </h2>

        <Row gutter={[16, 16]}>
          {industries.map(ind => (
            <Col key={ind.indId} xs={12} sm={6}>
              <Card
                hoverable
                onClick={() => navigate(`/mall?indId=${ind.indId}`)}
                style={{
                  textAlign: 'center',
                  height: '110px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ll-navy)' }}>
                  {ind.name}
                </div>
                <div style={{ color: 'var(--ll-muted)', fontSize: '12px', marginTop: '6px' }}>
                  查看{ind.name}专区商品 →
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 02 Hot Recommendations */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
            <span style={{ color: 'var(--ll-brand-gold)', marginRight: '8px', fontSize: '13px' }}>02</span>
            热销推荐
          </h2>
          <Button type="link" onClick={() => navigate('/mall')} style={{ color: 'var(--ll-primary)' }}>
            查看全部商品 →
          </Button>
        </div>

        <Row gutter={[20, 24]}>
          {hotProducts.map(p => (
            <Col key={p.prodId} xs={24} sm={12} md={6}>
              <InteractiveProductCard
                imageUrl={p.coverUrl}
                title={p.title}
                description={p.brand || 'LANLINK SELECTION'}
                price={`¥${p.price.toFixed(2)} / ${p.unit || '件'}`}
                onClick={() => navigate(`/product/${p.prodId}`)}
                footer={
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                    销量 {p.sales} · 库存 {p.stock}
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
