import React, { useRef, useState } from 'react'

interface InteractiveProductCardProps {
  imageUrl?: string
  title: string
  description?: string
  price?: string | number
  clickable?: boolean
  onClick?: (e: React.MouseEvent) => void
  footer?: React.ReactNode
  spotlightColor?: string
  badgeText?: string
}

export const InteractiveProductCard: React.FC<InteractiveProductCardProps> = ({
  imageUrl,
  title,
  description = 'LANLINK SELECTION',
  price,
  clickable = true,
  onClick,
  footer,
  spotlightColor = 'rgba(246, 211, 138, 0.32)',
  badgeText = 'LL'
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [spot, setSpot] = useState({ x: 140, y: 140, active: false })
  const [imgError, setImgError] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -14
    const rotateY = ((x / rect.width) - 0.5) * 14

    setSpot({ x, y, active: true })
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.022, 1.022, 1.022)`,
      transition: 'transform 90ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease'
    })
  }

  const resetTilt = () => {
    setSpot(prev => ({ ...prev, active: false }))
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease'
    })
  }

  return (
    <div
      ref={cardRef}
      className="interactive-product-card"
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        minHeight: '350px',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        border: spot.active
          ? '2px solid var(--ll-brand-gold, #C8A45C)'
          : '2px solid var(--ll-brand-red, #9B2D20)',
        borderRadius: '24px',
        backgroundColor: 'var(--ll-brand-base, #13233A)',
        boxShadow: spot.active
          ? '0 22px 46px rgba(19, 35, 58, 0.28), 0 0 24px rgba(200, 164, 92, 0.24)'
          : '0 14px 32px rgba(24, 33, 47, 0.15)',
        cursor: clickable ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        ...tiltStyle
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={onClick}
    >
      {/* Product Image with Zero-Broken-Image Fallback */}
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: '2px',
            width: 'calc(100% - 4px)',
            height: 'calc(100% - 4px)',
            borderRadius: '21px',
            objectFit: 'cover',
            userSelect: 'none',
            transform: spot.active ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            width: 'calc(100% - 4px)',
            height: 'calc(100% - 4px)',
            borderRadius: '21px',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'linear-gradient(135deg, #13233A 0%, #1F3864 55%, #9B2D20 100%)',
            fontSize: '48px',
            fontWeight: 800
          }}
        >
          {title.slice(0, 2)}
        </div>
      )}

      {/* Scrim Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '21px',
          background:
            'linear-gradient(180deg, rgba(11, 17, 27, 0.28) 0%, rgba(11, 17, 27, 0.06) 35%, rgba(11, 17, 27, 0.82) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* 21st.dev Dynamic Radial Spotlight Layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '21px',
          pointerEvents: 'none',
          opacity: spot.active ? 1 : 0,
          transition: 'opacity 240ms ease',
          background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, ${spotlightColor}, transparent 75%)`,
          mixBlendMode: 'screen'
        }}
      />

      {/* Content Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glass Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px',
            border: spot.active
              ? '1px solid rgba(246, 211, 138, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '16px',
            background: 'rgba(19, 35, 58, 0.46)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            transition: 'border-color 200ms ease'
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: 1.32,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden'
              }}
              title={title}
            >
              {title}
            </h3>
            <p
              style={{
                margin: '4px 0 0',
                color: 'rgba(255, 255, 255, 0.78)',
                fontSize: '11px',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                letterSpacing: '0.03em'
              }}
            >
              {description}
            </p>
          </div>
          <span
            style={{
              display: 'grid',
              flex: '0 0 28px',
              width: '28px',
              height: '28px',
              placeItems: 'center',
              borderRadius: '8px',
              color: 'var(--ll-brand-base, #13233A)',
              background: spot.active
                ? 'linear-gradient(135deg, #F6D38A, #F59E0B)'
                : 'rgba(255, 255, 255, 0.95)',
              fontSize: '11px',
              fontWeight: 900,
              transition: 'background 200ms ease'
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* Price Tag with Tabular Nums */}
        {price !== undefined && (
          <div
            className="ll-tabular-nums"
            style={{
              alignSelf: 'flex-start',
              marginTop: '12px',
              padding: '5px 14px',
              border: '1px solid rgba(246, 211, 138, 0.35)',
              borderRadius: '999px',
              background: 'rgba(11, 18, 32, 0.72)',
              backdropFilter: 'blur(12px)',
              color: '#F6D38A',
              fontSize: '15px',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            {price}
          </div>
        )}

        {/* Footer Area */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          {footer}
        </div>
      </div>
    </div>
  )
}
