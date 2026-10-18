import React, { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Card, Form, Input, Button, Tabs, Alert, message, Tag } from 'antd'
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from '../components/BrandWordmark'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const { login, login2fa } = useStore()

  const [twofaStep, setTwofaStep] = useState(false)
  const [loginTicket, setLoginTicket] = useState('')
  const [hintPhone, setHintPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const res = await login(values.phone, values.password)
      if (res.require2fa) {
        setTwofaStep(true)
        setLoginTicket(values.phone)
        setHintPhone(res.hint || values.phone)
        message.info('请输入 6 位动态两步验证码')
      } else if (res.success) {
        message.success('登录成功！')
        navigate(redirect)
      } else {
        message.error(res.message || '手机号或密码错误')
      }
    } finally {
      setLoading(false)
    }
  }

  const handle2faSubmit = async () => {
    if (!code || code.length !== 6) {
      message.warning('请输入完整的 6 位动态验证码')
      return
    }
    setLoading(true)
    const success = await login2fa(loginTicket, code)
    setLoading(false)
    if (success) {
      message.success('两步验证通过，已成功登录！')
      navigate(redirect)
    } else {
      message.error('动态验证码校验失败')
    }
  }

  const handleQuickLogin = async (phone: string) => {
    setLoading(true)
    const res = await login(phone, '123456')
    setLoading(false)
    if (res.success) {
      message.success(`已快速切换至演示账号（${phone}）`)
      navigate(redirect)
    }
  }

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px'
      }}
    >
      <Card
        style={{
          width: '420px',
          maxWidth: '100%',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(19, 35, 58, 0.1)',
          border: '1px solid #e2e8f0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <BrandWordmark size="24px" light />
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '12px 0 4px', color: 'var(--ll-navy)' }}>
            欢迎登录平台
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            聚合型一体多元化 B2B 电商解决方案
          </span>
        </div>

        {/* Demo Fast Login Buttons */}
        <div
          style={{
            background: '#f8fafc',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '20px'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ll-muted)', marginBottom: '8px' }}>
            ⚡ 演示账号一键登录（密码均为 123456）：
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Tag color="red" style={{ cursor: 'pointer', padding: '4px 8px' }} onClick={() => handleQuickLogin('13800000000')}>
              平台运营 Admin
            </Tag>
            <Tag color="gold" style={{ cursor: 'pointer', padding: '4px 8px' }} onClick={() => handleQuickLogin('13900000001')}>
              采购方 Buyer
            </Tag>
            <Tag color="blue" style={{ cursor: 'pointer', padding: '4px 8px' }} onClick={() => handleQuickLogin('13700000002')}>
              商户 Merchant
            </Tag>
          </div>
        </div>

        {!twofaStep ? (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="phone" label="手机号码" rules={[{ required: true, message: '请输入手机号' }]}>
              <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} size="large" placeholder="请输入已注册的手机号" />
            </Form.Item>

            <Form.Item name="password" label="登录密码" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} size="large" placeholder="请输入密码" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                height: '46px',
                fontSize: '15px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
                border: 'none',
                marginTop: '10px'
              }}
            >
              登 录
            </Button>
          </Form>
        ) : (
          <div>
            <Alert
              type="info"
              showIcon
              message="两步验证"
              description={`该账号已开启两步验证，请输入验证器 App 生成的 6 位动态码（手机号 ${hintPhone}）。`}
              style={{ marginBottom: '16px' }}
            />
            <Input
              prefix={<SafetyCertificateOutlined style={{ color: '#94a3b8' }} />}
              size="large"
              maxLength={6}
              placeholder="请输入 6 位动态验证码"
              value={code}
              onChange={e => setCode(e.target.value)}
              onPressEnter={handle2faSubmit}
              style={{ marginBottom: '16px', letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: 700 }}
            />
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handle2faSubmit}
              style={{ height: '46px', background: 'var(--ll-primary)' }}
            >
              验证并完成登录
            </Button>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <Button type="link" onClick={() => setTwofaStep(false)}>返回使用账号密码登录</Button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          还没有账号？{' '}
          <Link to="/register" style={{ fontWeight: 700, color: 'var(--ll-primary)' }}>
            立即注册新用户
          </Link>
        </div>
      </Card>
    </div>
  )
}
