import React, { useRef, useState, useEffect } from 'react'

export interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  spotlightColor?: string
  spotlightSize?: number
  tilt?: boolean
  maxTilt?: number
  borderBeam?: boolean
  beamColor?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * 21st.dev Signature Spotlight + 3D Perspective Tilt + Border Beam Card
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(200, 164, 92, 0.22)',
  spotlightSize = 360,
  tilt = false,
  maxTilt = 8,
  borderBeam = false,
  beamColor = '#C8A45C',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [tiltTransform, setTiltTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })

    if (tilt && e.pointerType !== 'touch') {
      const rx = ((y / rect.height) - 0.5) * -maxTilt * 2
      const ry = ((x / rect.width) - 0.5) * maxTilt * 2
      setTiltTransform(`perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`)
    }
  }

  const handlePointerEnter = () => {
    setHovered(true)
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (tilt) {
      setTiltTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`ll-spotlight-card ${borderBeam ? 'll-border-beam-wrap' : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        background: '#ffffff',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: hovered
          ? '0 20px 42px -12px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(200, 164, 92, 0.32)'
          : '0 6px 20px -6px rgba(15, 23, 42, 0.06)',
        transform: tilt ? tiltTransform : hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: hovered
          ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease, border-color 220ms ease'
          : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* Radial Cursor Spotlight Layer */}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 260ms ease',
          background: `radial-gradient(${spotlightSize}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`,
          zIndex: 1
        }}
      />

      {/* Animated Border Beam Layer */}
      {borderBeam && (
        <div
          aria-hidden="true"
          className="ll-border-beam-line"
          style={
            {
              '--beam-color': beamColor
            } as React.CSSProperties
          }
        />
      )}

      {/* Card Inner Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  strength?: number
  variant?: 'gold' | 'navy' | 'glass' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  shimmer?: boolean
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

/**
 * 21st.dev Magnetic Pull + Shimmer Light Sweep Button
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  strength = 0.28,
  variant = 'gold',
  size = 'md',
  shimmer = true,
  style,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || e.pointerType === 'touch' || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * strength
    const dy = (e.clientY - centerY) * strength
    setOffset({ x: dx, y: dy })
  }

  const handlePointerLeave = () => {
    setHovered(false)
    setOffset({ x: 0, y: 0 })
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '7px 16px', fontSize: '13px', borderRadius: '10px' },
    md: { padding: '11px 22px', fontSize: '14px', borderRadius: '12px' },
    lg: { padding: '14px 28px', fontSize: '15px', borderRadius: '14px' }
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    gold: {
      background: 'linear-gradient(105deg, #C8A45C 0%, #F59E0B 55%, #D97706 100%)',
      color: '#0F172A',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      boxShadow: hovered
        ? '0 12px 28px -6px rgba(245, 158, 11, 0.55)'
        : '0 6px 18px -4px rgba(200, 164, 92, 0.35)'
    },
    navy: {
      background: 'linear-gradient(135deg, #13233A 0%, #1F3864 60%, #1E6EB8 100%)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: hovered
        ? '0 14px 30px -6px rgba(19, 35, 58, 0.45)'
        : '0 6px 18px -4px rgba(19, 35, 58, 0.25)'
    },
    primary: {
      background: 'linear-gradient(135deg, #0EA5E9 0%, #1E6EB8 100%)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: hovered
        ? '0 12px 26px -6px rgba(14, 165, 233, 0.48)'
        : '0 6px 16px -4px rgba(30, 110, 184, 0.28)'
    },
    glass: {
      background: hovered ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.09)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.28)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      boxShadow: hovered ? '0 10px 24px rgba(0, 0, 0, 0.18)' : 'none'
    }
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`ll-magnetic-btn ${shimmer ? 'll-shimmer-btn' : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0) scale(${hovered ? 1.02 : 1})`,
        transition: hovered
          ? 'transform 90ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease, background 200ms ease'
          : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 280ms ease, background 280ms ease',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
    >
      {shimmer && (
        <span
          aria-hidden="true"
          className="ll-shimmer-sweep"
        />
      )}
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  )
}

export interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: boolean
  style?: React.CSSProperties
  className?: string
}

/**
 * 21st.dev Spring-Eased Animated Counting Number with Tabular Nums
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 950,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = true,
  style,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const prevValueRef = useRef(0)

  useEffect(() => {
    const startValue = prevValueRef.current
    const diff = value - startValue
    if (diff === 0) {
      setDisplayValue(value)
      return
    }

    let startTime: number | null = null
    let rafId: number

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = startValue + diff * eased
      setDisplayValue(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
        prevValueRef.current = value
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [value, duration])

  const formatted = (() => {
    const fixed = displayValue.toFixed(decimals)
    if (!separator) return fixed
    const parts = fixed.split('.')
    parts[0] = Number(parts[0]).toLocaleString('en-US')
    return parts.join('.')
  })()

  return (
    <span
      className={`ll-tabular-nums ${className}`}
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum"',
        display: 'inline-block',
        ...style
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/**
 * 21st.dev Shimmer Skeleton Loader for Mall & Bento Cards
 */
export const ShimmerSkeleton: React.FC<{ count?: number; height?: number }> = ({
  count = 4,
  height = 340
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%'
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="ll-shimmer-skeleton"
          style={{
            height: `${height}px`,
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '68px',
              borderRadius: '14px',
              background: '#f1f5f9'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ width: '45%', height: '24px', borderRadius: '999px', background: '#f1f5f9' }} />
            <div style={{ width: '100%', height: '36px', borderRadius: '10px', background: '#f1f5f9' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
