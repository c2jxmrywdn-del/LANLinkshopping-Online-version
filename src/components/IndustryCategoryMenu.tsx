import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/storeContext'

interface IndustryCategoryMenuProps {
  onClose?: () => void
}

export const IndustryCategoryMenu: React.FC<IndustryCategoryMenuProps> = ({ onClose }) => {
  const navigate = useNavigate()
  const { industries, categories } = useStore()
  const [activeIndId, setActiveIndId] = useState<number>(1)

  const activeCategories = categories.filter(c => c.indId === activeIndId)

  const handleSelectIndustry = (indId: number) => {
    navigate(`/mall?indId=${indId}`)
    onClose?.()
  }

  const handleSelectCategory = (catId: number, indId: number) => {
    navigate(`/mall?indId=${indId}&catId=${catId}`)
    onClose?.()
  }

  const handleSelectAll = () => {
    navigate('/mall')
    onClose?.()
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '64px',
        left: '200px',
        width: '640px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 24px 60px rgba(19, 35, 58, 0.22)',
        border: '1px solid #e2e8f0',
        zIndex: 1100,
        display: 'flex',
        overflow: 'hidden'
      }}
      onMouseLeave={onClose}
    >
      {/* Left Industry List */}
      <div
        style={{
          width: '200px',
          background: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          padding: '16px 12px'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ll-muted)', padding: '0 12px 10px', letterSpacing: '0.1em' }}>
          行业直通 · INDUSTRIES
        </div>
        <button
          onClick={handleSelectAll}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            background: 'none',
            fontWeight: 600,
            fontSize: '13px',
            color: 'var(--ll-primary)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>全部商品专区</span>
          <span>→</span>
        </button>
        <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 0' }} />
        {industries.map(ind => (
          <button
            key={ind.indId}
            onMouseEnter={() => setActiveIndId(ind.indId)}
            onClick={() => handleSelectIndustry(ind.indId)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeIndId === ind.indId ? 'rgba(30, 110, 184, 0.1)' : 'none',
              color: activeIndId === ind.indId ? 'var(--ll-primary)' : 'var(--ll-ink)',
              fontWeight: activeIndId === ind.indId ? 700 : 500,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px'
            }}
          >
            <span>{ind.name}</span>
            <span style={{ color: 'var(--ll-muted)' }}>›</span>
          </button>
        ))}
      </div>

      {/* Right Category List */}
      <div style={{ flex: 1, padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <strong style={{ fontSize: '16px', color: 'var(--ll-navy)' }}>
            {industries.find(i => i.indId === activeIndId)?.name} · 二级分类
          </strong>
          <span style={{ fontSize: '12px', color: 'var(--ll-muted)' }}>
            共 {activeCategories.length} 个子品类
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {activeCategories.map(cat => (
            <button
              key={cat.catId}
              onClick={() => handleSelectCategory(cat.catId, activeIndId)}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--ll-primary)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ll-amber)' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ll-ink)' }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
