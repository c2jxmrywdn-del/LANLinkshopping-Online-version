import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Slide {
  key: string
  img: string
  tag: string
  title: string
  sub: string
  cta: string
  indId: number
}

const SLIDES: Slide[] = [
  {
    key: 'c',
    img: '/banners/01-construction.jpg',
    tag: '建筑行业',
    title: '建筑材料源头直供',
    sub: '钢材 · 水泥 · 工程管材，规格与供应能力一站核验',
    cta: '进入建筑专区',
    indId: 1
  },
  {
    key: 't',
    img: '/banners/02-textile.jpg',
    tag: '纺织制造',
    title: '纺织制造与面料大宗直采',
    sub: '棉坯布 · 聚酯短纤 · 辅料，连接制造端与工业采购',
    cta: '进入纺织专区',
    indId: 2
  },
  {
    key: 'p',
    img: '/banners/03-petrochemical.jpg',
    tag: '石油化工',
    title: '石油化工基础原料供应链',
    sub: '工业碳酸钠 · 抗磨液压油，危化资质与合规物流保障',
    cta: '进入石化专区',
    indId: 3
  },
  {
    key: 'e',
    img: '/banners/04-electronics.jpg',
    tag: '电子元器件',
    title: '工业级元器件与显示模组',
    sub: '贴片电阻 · 板对板连接器 · 工控液晶屏，原厂直供现货',
    cta: '进入元器件专区',
    indId: 4
  }
]

export const BannerCarousel: React.FC = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        height: '340px',
        margin: '28px 0',
        boxShadow: '0 16px 40px rgba(19,35,58,0.12)',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/mall?indId=${slide.indId}`)}
    >
      <img
        src={slide.img}
        alt={slide.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.8s ease'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.45) 55%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 60px',
          color: '#fff'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--ll-brand-gold-soft)',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          {slide.tag}
        </span>
        <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 10px', color: '#fff' }}>
          {slide.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', margin: '0 0 24px', maxWidth: '520px' }}>
          {slide.sub}
        </p>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              background: 'linear-gradient(90deg, var(--ll-brand-gold), #F59E0B)',
              color: 'var(--ll-brand-base)',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            {slide.cta} →
          </span>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '30px',
          display: 'flex',
          gap: '8px',
          zIndex: 2
        }}
        onClick={e => e.stopPropagation()}
      >
        {SLIDES.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setCurrent(idx)}
            style={{
              width: current === idx ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: current === idx ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  )
}
