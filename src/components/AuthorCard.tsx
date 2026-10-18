import React from 'react'

interface AuthorCardProps {
  variant?: 'compact' | 'detailed'
  showSocials?: boolean
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ variant = 'compact', showSocials = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: variant === 'detailed' ? '20px 24px' : '12px 0',
        borderRadius: variant === 'detailed' ? '16px' : '0',
        background: variant === 'detailed' ? 'rgba(255,255,255,0.04)' : 'none',
        border: variant === 'detailed' ? '1px solid rgba(255,255,255,0.08)' : 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--ll-primary)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            fontSize: '14px'
          }}
        >
          JO
        </div>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--ll-brand-gold-soft)', letterSpacing: '0.1em' }}>
            PROJECT AUTHOR · LANLINKSHOPPING
          </div>
          <strong style={{ color: '#fff', fontSize: '14px' }}>Jason Ouyang</strong>
          <span style={{ color: '#94a3b8', fontSize: '12px', marginLeft: '8px' }}>
            软件技术 2404 毕业设计 · 全栈核心 MVP
          </span>
        </div>
      </div>

      <div style={{ color: '#64748b', fontSize: '12px' }}>
        <span>© {new Date().getFullYear()} Jason Ouyang · 版权所有</span>
      </div>
    </div>
  )
}
