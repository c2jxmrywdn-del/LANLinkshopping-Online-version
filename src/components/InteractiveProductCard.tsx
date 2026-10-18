import React, { useRef, useState } from 'react'

interface InteractiveProductCardProps {
  imageUrl?: string
  title: string
  description?: string
  price?: string | number
  clickable?: boolean
  onClick?: (e: React.MouseEvent) => void
  footer?: React.ReactNode
}

export const InteractiveProductCard: React.FC<InteractiveProductCardProps> = ({
  imageUrl,
  title,
  description = 'LANLINK SELECTION',
  price,
  clickable = true,
  onClick,
  footer
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -16
    const rotateY = ((x / rect.width) - 0.5) * 16

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 80ms ease-out'
    })
  }

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 400ms ease-in-out'
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
        minHeight: '340px',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        border: '3px solid var(--ll-brand-red, #9B2D20)',
        borderRadius: '24px',
        backgroundColor: 'var(--ll-brand-red, #9B2D20)',
        boxShadow: '0 16px 34px rgba(24, 33, 47, 0.16)',
        cursor: clickable ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        ...tiltStyle
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={onClick}
    >
      {/* Product Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: 'absolute',
            inset: '3px',
            width: 'calc(100% - 6px)',
            height: 'calc(100% - 6px)',
            borderRadius: '19px',
            objectFit: 'cover',
            userSelect: 'none'
          }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            width: 'calc(100% - 6px)',
            height: 'calc(100% - 6px)',
            borderRadius: '19px',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255, 255, 255, 0.82)',
            background: 'linear-gradient(135deg, #1F3864, #9B2D20)',
            fontSize: '52px',
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
          inset: '3px',
          borderRadius: '19px',
          background: 'linear-gradient(180deg, rgba(11, 17, 27, 0.25) 0%, rgba(11, 17, 27, 0.05) 30%, rgba(11, 17, 27, 0.75) 100%)',
          pointerEvents: 'none'
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
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: 1.3,
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
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '11px',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
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
              background: 'rgba(255, 255, 255, 0.95)',
              fontSize: '11px',
              fontWeight: 900
            }}
          >
            LL
          </span>
        </div>

        {/* Price Tag */}
        {price !== undefined && (
          <div
            style={{
              alignSelf: 'flex-start',
              marginTop: '12px',
              padding: '4px 14px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              background: 'rgba(19, 35, 58, 0.65)',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 800
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
