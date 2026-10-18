import React from 'react'

interface BrandWordmarkProps {
  size?: string
  light?: boolean
  className?: string
  ariaLabel?: string
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  size = 'inherit',
  light = false,
  className = '',
  ariaLabel = 'LANLinkshopping'
}) => {
  return (
    <div
      className={`ll-wordmark ${light ? 'll-wordmark-on-light' : ''} ${className}`}
      style={{
        fontSize: size,
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <span className="ll-lan" style={{ color: light ? 'var(--ll-ink)' : '#fff' }}>LAN</span>
      <span className="ll-link" style={{ color: 'var(--ll-amber)', fontWeight: 700 }}>Link</span>
      <span className="ll-shopping" style={{ color: light ? 'var(--ll-ink)' : 'rgba(255,255,255,0.92)', fontWeight: 700 }}>shopping</span>
    </div>
  )
}
