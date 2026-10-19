import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagneticButton } from './MotionPrimitives'

interface Slide {
  key: string
  img: string
  tag: string
  title: string
  sub: string
  cta: string
  indId: number
  metric: string
}

const SLIDES: Slide[] = [
  {
    key: 'c',
    img: '/banners/01-construction.jpg',
    tag: '01 · 建筑工程材料',
    title: '建筑材料源头直供',
    sub: '钢材 · 水泥 · 工程管材，规格与供应能力一站核验，支持大宗账期结算',
    cta: '进入建筑专区',
    indId: 1,
    metric: '已认证钢厂/水泥源头厂 320+ 家'
  },
  {
    key: 't',
    img: '/banners/02-textile.jpg',
    tag: '02 · 纺织制造原料',
    title: '纺织制造与面料大宗直采',
    sub: '棉坯布 · 聚酯短纤 · 工业辅料，连接制造端与工业大宗采购网络',
    cta: '进入纺织专区',
    indId: 2,
    metric: '批次色牢度与支数检测 100% 溯源'
  },
  {
    key: 'p',
    img: '/banners/03-petrochemical.jpg',
    tag: '03 · 石油化工原料',
    title: '石油化工基础原料供应链',
    sub: '工业碳酸钠 · 抗磨液压油，危化资质与合规专车物流全程保障',
    cta: '进入石化专区',
    indId: 3,
    metric: '支持 30/60/90 天企业授信账期'
  },
  {
    key: 'e',
    img: '/banners/04-electronics.jpg',
    tag: '04 · 电子元器件',
    title: '工业级元器件与显示模组',
    sub: '贴片电阻 · 板对板连接器 · 工控液晶屏，原厂直供现货极速发运',
    cta: '进入元器件专区',
    indId: 4,
    metric: '原厂防伪溯源 · 24h 极速出库'
  }
]

export const BannerCarousel: React.FC = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [paused])

  const slide = SLIDES[current]

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        height: '350px',
        margin: '28px 0',
        boxShadow: '0 20px 48px rgba(19, 35, 58, 0.14)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => navigate(`/mall?indId=${slide.indId}`)}
    >
      <img
        key={slide.key}
        src={slide.img}
        alt={slide.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: paused ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(11, 18, 32, 0.90) 0%, rgba(15, 23, 42, 0.56) 55%, rgba(15, 23, 42, 0.12) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '44px 56px',
          color: '#fff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: 'var(--ll-brand-gold-soft)',
              textTransform: 'uppercase'
            }}
          >
            {slide.tag}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.78)' }}>
            {slide.metric}
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(26px, 3.2vw, 34px)',
            fontWeight: 800,
            margin: '0 0 10px',
            color: '#fff',
            letterSpacing: '-0.02em'
          }}
        >
          {slide.title}
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.84)',
            margin: '0 0 26px',
            maxWidth: '520px',
            lineHeight: 1.65
          }}
        >
          {slide.sub}
        </p>
        <div onClick={e => e.stopPropagation()}>
          <MagneticButton
            variant="gold"
            size="md"
            onClick={() => navigate(`/mall?indId=${slide.indId}`)}
          >
            {slide.cta} →
          </MagneticButton>
        </div>
      </div>

      {/* Interactive Slide Switcher */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '32px',
          display: 'flex',
          gap: '8px',
          zIndex: 2,
          padding: '6px 10px',
          borderRadius: '999px',
          background: 'rgba(11, 18, 32, 0.45)',
          backdropFilter: 'blur(12px)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {SLIDES.map((s, idx) => (
          <button
            key={s.key}
            aria-label={s.title}
            onClick={() => setCurrent(idx)}
            style={{
              width: current === idx ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: current === idx ? '#F6D38A' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  )
}
