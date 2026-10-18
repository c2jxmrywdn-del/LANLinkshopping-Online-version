import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Form, Input, Button, Radio, message } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { BrandWordmark } from '../components/BrandWordmark'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useStore()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values: any) => {
    setLoading(true)
    try {
      await register({
        roleCode: values.roleCode,
        phone: values.phone,
        password: values.password,
        nickname: values.nickname,
        email: values.email
      })
      message.success('注册成功！系统已为您自动登录并送出 100 积分大礼包。')
      navigate('/')
    } catch (err: any) {
      message.error(err.message || '注册失败')
    } finally {
      setLoading(false)
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
          width: '460px',
          maxWidth: '100%',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(19, 35, 58, 0.1)',
          border: '1px solid #e2e8f0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <BrandWordmark size="24px" light />
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '12px 0 4px', color: 'var(--ll-navy)' }}>
            创建新用户账号
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            选择您的业务身份，开启高效供应链协作
          </span>
        </div>

        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            roleCode: 'buyer'
          }}
        >
          <Form.Item name="roleCode" label="注册业务身份" rules={[{ required: true }]}>
            <Radio.Group size="large" buttonStyle="solid" style={{ width: '100%', display: 'flex' }}>
              <Radio.Button value="buyer" style={{ flex: 1, textAlign: 'center' }}>
                采购方企业
              </Radio.Button>
              <Radio.Button value="merchant" style={{ flex: 1, textAlign: 'center' }}>
                商户 / 供应商
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号码' }
            ]}
          >
            <Input prefix={<MobileOutlined style={{ color: '#94a3b8' }} />} size="large" placeholder="11位手机号" />
          </Form.Item>

          <Form.Item name="nickname" label="企业名称 / 用户昵称" rules={[{ required: true, message: '请填写昵称' }]}>
            <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} size="large" placeholder="例如：华东工程采购部" />
          </Form.Item>

          <Form.Item name="email" label="企业电子邮箱（选填）">
            <Input size="large" placeholder="name@company.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="登录密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少 6 位' }
            ]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} size="large" placeholder="请设置登录密码" />
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
            立即注册并登录
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          已有账号？{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--ll-primary)' }}>
            立即登录
          </Link>
        </div>
      </Card>
    </div>
  )
}
