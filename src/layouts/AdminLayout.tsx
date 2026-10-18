import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, Tag } from 'antd'
import {
  DashboardOutlined,
  ShopOutlined,
  SkinOutlined,
  DollarOutlined,
  AuditOutlined,
  FileProtectOutlined,
  MessageOutlined,
  ExperimentOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from '../components/BrandWordmark'

const { Header, Sider, Content } = Layout

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useStore()

  const selectedKey = location.pathname

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '运营概览',
      onClick: () => navigate('/admin/dashboard')
    },
    {
      key: '/admin/merchants',
      icon: <ShopOutlined />,
      label: '商户审核',
      onClick: () => navigate('/admin/merchants')
    },
    {
      key: '/admin/products',
      icon: <SkinOutlined />,
      label: '商品管理',
      onClick: () => navigate('/admin/products')
    },
    {
      key: '/admin/payments',
      icon: <DollarOutlined />,
      label: '交易管理',
      onClick: () => navigate('/admin/payments')
    },
    {
      key: '/admin/credit-terms',
      icon: <FileProtectOutlined />,
      label: '账期审核',
      onClick: () => navigate('/admin/credit-terms')
    },
    {
      key: '/admin/audit',
      icon: <AuditOutlined />,
      label: '审计日志',
      onClick: () => navigate('/admin/audit')
    },
    {
      key: '/admin/communications',
      icon: <MessageOutlined />,
      label: '客户沟通中心',
      onClick: () => navigate('/admin/communications')
    },
    {
      key: '/admin/support-learning',
      icon: <ExperimentOutlined />,
      label: '客服学习沙盒',
      onClick: () => navigate('/admin/support-learning')
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: 'var(--ll-brand-base)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')}>
            <BrandWordmark size="18px" />
          </div>
          <Tag color="red" style={{ fontWeight: 700 }}>管理后台 · ADMIN OPS</Tag>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#fff', fontSize: '13px' }}>
            当前操作员：<b>{user?.nickname || '平台运营'}</b>
          </span>
          <Button
            type="primary"
            ghost
            icon={<HomeOutlined />}
            size="small"
            style={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => navigate('/')}
          >
            返回前台商城
          </Button>
        </div>
      </Header>

      <Layout>
        <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #e2e8f0' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ height: '100%', borderRight: 0, paddingTop: '12px' }}
          />
        </Sider>

        <Content style={{ padding: '24px 32px', background: 'var(--ll-page)', overflowY: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
