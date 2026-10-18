import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Badge, Button, Dropdown, MenuProps } from 'antd'
import { BellOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from './BrandWordmark'
import { IndustryCategoryMenu } from './IndustryCategoryMenu'

export const Navbar: React.FC = () => {
  const { user, logout, cart } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [mallMenuOpen, setMallMenuOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const unreadCount = user?.unreadCount || 0

  const hasPerm = (perm: string) => {
    if (!user) return false
    const perms = user.identity?.permissions || []
    if (perms.includes('admin:all')) return true
    return perms.includes(perm)
  }

  const isAdmin = user?.roleCode === 'admin'
  const isMerchant = user?.roleCode === 'merchant'
  const isVip = user?.identity?.code === 'vip'

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'identity',
      disabled: true,
      label: (
        <div style={{ padding: '6px 4px' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>当前身份</div>
          <strong style={{ color: 'var(--ll-navy)', fontSize: '14px' }}>
            {user?.identity?.name || user?.nickname}
          </strong>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            {user?.identity?.serviceScope}
          </div>
        </div>
      )
    },
    { type: 'divider' },
    {
      key: 'wallet',
      label: '💰 我的钱包',
      onClick: () => navigate('/wallet')
    },
    hasPerm('credit:view')
      ? {
          key: 'credit',
          label: '📑 企业账期',
          onClick: () => navigate('/credit-term')
        }
      : null,
    {
      key: 'activity',
      label: '🎯 活动中心',
      onClick: () => navigate('/activity')
    },
    {
      key: 'membership',
      label: '👑 会员中心',
      onClick: () => navigate('/membership')
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: '👤 个人资料',
      onClick: () => navigate('/me?tab=profile')
    },
    {
      key: 'messages',
      label: '🔔 消息中心',
      onClick: () => navigate('/me?tab=messages')
    },
    {
      key: 'address',
      label: '📍 收货地址',
      onClick: () => navigate('/me?tab=address')
    },
    {
      key: 'login-log',
      label: '🛡️ 登录安全',
      onClick: () => navigate('/me?tab=login-log')
    },
    {
      key: 'settings',
      label: '⚙️ 账户设置',
      onClick: () => navigate('/me?tab=settings')
    },
    { type: 'divider' },
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
      onClick: () => {
        logout()
        navigate('/')
      }
    }
  ].filter(Boolean) as MenuProps['items']

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo and Brand */}
        <div className="logo-area" onClick={() => navigate('/')}>
          <img src="/logo-256.png" alt="LANLink" className="logo-img" />
          <BrandWordmark size="20px" />
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            首页
          </Link>

          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setMallMenuOpen(true)}
          >
            <Link
              to="/mall"
              className={`nav-item ${location.pathname.startsWith('/mall') ? 'active' : ''}`}
            >
              商城 ▾
            </Link>
            {mallMenuOpen && (
              <IndustryCategoryMenu onClose={() => setMallMenuOpen(false)} />
            )}
          </div>

          <Link
            to="/promotions"
            className={`nav-item ${location.pathname.startsWith('/promotions') ? 'active' : ''}`}
          >
            优惠
          </Link>

          {hasPerm('credit:view') && (
            <Link
              to="/credit-term"
              className={`nav-item ${location.pathname.startsWith('/credit-term') ? 'active' : ''}`}
            >
              账期
            </Link>
          )}

          {hasPerm('order:view') && (
            <Link
              to="/orders"
              className={`nav-item ${location.pathname.startsWith('/orders') ? 'active' : ''}`}
            >
              我的订单
            </Link>
          )}

          {isAdmin ? (
            <Link
              to="/admin/merchants"
              className={`nav-item ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
            >
              商户管理
            </Link>
          ) : user && !isMerchant ? (
            <Link
              to="/merchant"
              className={`nav-item ${location.pathname === '/merchant' ? 'active' : ''}`}
            >
              商户入驻
            </Link>
          ) : null}

          {hasPerm('merchant:manage') && (
            <Link
              to="/merchant/traffic"
              className={`nav-item ${location.pathname === '/merchant/traffic' ? 'active' : ''}`}
            >
              流量管理
            </Link>
          )}

          {hasPerm('product:publish') && (
            <Link
              to="/merchant/products"
              className={`nav-item ${location.pathname === '/merchant/products' ? 'active' : ''}`}
            >
              我的商品
            </Link>
          )}

          <Link
            to="/about"
            className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
          >
            关于我们
          </Link>
        </nav>

        {/* Right Tools */}
        <div className="header-right">
          {user && (
            <Badge count={unreadCount} overflowCount={99} size="small">
              <Button
                type="text"
                icon={<BellOutlined style={{ color: '#fff' }} />}
                style={{ color: '#fff' }}
                onClick={() => navigate('/me?tab=messages')}
              >
                消息
              </Button>
            </Badge>
          )}

          <Badge count={cartCount} overflowCount={99} size="small">
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ color: '#fff' }} />}
              style={{ color: '#fff' }}
              onClick={() => navigate('/cart')}
            >
              购物车
            </Button>
          </Badge>

          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div className="user-trigger">
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--ll-primary)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '12px'
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    <UserOutlined />
                  )}
                </div>
                {isVip && <span className="id-badge id-vip">VIP</span>}
                {isAdmin && <span className="id-badge id-admin">ADMIN</span>}
                {isMerchant && <span className="id-badge id-merchant">商户</span>}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{user.nickname} ▾</span>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              ghost
              style={{ color: '#fff', borderColor: '#fff' }}
              onClick={() => navigate('/login')}
            >
              登录 / 注册
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
