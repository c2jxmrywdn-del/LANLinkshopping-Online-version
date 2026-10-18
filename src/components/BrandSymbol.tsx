import React from 'react'

interface BrandSymbolProps {
  size?: string
  className?: string
}

export const BrandSymbol: React.FC<BrandSymbolProps> = ({ size = '410px', className = '' }) => {
  return (
    <div
      className={`brand-symbol ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        flex: `0 0 ${size}`,
        overflow: 'visible',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: '4.88%',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.16)',
          transform: 'rotate(22deg) skewX(-8deg)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '19.51% 0.98%',
          borderRadius: '50%',
          border: '1px solid rgba(200,164,92,0.28)',
          transform: 'rotate(-25deg) skewY(-7deg)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32.2%',
          height: '32.2%',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          display: 'grid',
          placeContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: 800 }}>
          <span style={{ color: '#fff' }}>LAN</span>
          <span style={{ color: 'var(--ll-amber)' }}>Link</span>
        </div>
        <small style={{ color: 'var(--ll-brand-gold-soft)', fontSize: '8px', letterSpacing: '0.12em', marginTop: '4px' }}>
          NETWORK
        </small>
      </div>
      <i
        style={{
          position: 'absolute',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--ll-brand-gold)',
          boxShadow: '0 0 12px var(--ll-brand-gold)',
          top: '18%',
          left: '24%'
        }}
      />
      <i
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'var(--ll-cyan)',
          boxShadow: '0 0 16px var(--ll-cyan)',
          bottom: '22%',
          right: '18%'
        }}
      />
    </div>
  )
}
