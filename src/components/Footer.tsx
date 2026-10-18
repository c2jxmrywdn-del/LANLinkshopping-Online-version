import React from 'react'
import { Link } from 'react-router-dom'
import { BrandWordmark } from './BrandWordmark'
import { AuthorCard } from './AuthorCard'

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <BrandWordmark size="22px" />
            <p style={{ margin: '12px 0 6px', color: '#cbd5e1', fontSize: '14px' }}>
              让每一次连接，都产生价值。
            </p>
            <small style={{ color: 'var(--ll-brand-gold-soft)', fontSize: '11px', letterSpacing: '0.12em' }}>
              CONNECTED COMMERCE · B2B DEMO PLATFORM
            </small>
          </div>

          <div className="footer-links">
            <Link to="/mall">商城</Link>
            <Link to="/promotions">优惠活动</Link>
            <Link to="/about">关于我们</Link>
            <Link to="/privacy/cookies">隐私与 Cookie</Link>
            <Link to="/about#terms">知识产权声明</Link>
          </div>
        </div>

        <AuthorCard variant="compact" />

        <div className="footer-bottom">
          <span>LANLinkshopping 聚合型B2B电商平台 · 软件技术 2404 毕业设计全栈核心 MVP</span>
          <span>技术栈：React + TypeScript + Vite + Ant Design</span>
        </div>
      </div>
    </footer>
  )
}
