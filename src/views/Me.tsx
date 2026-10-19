import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Card, Tabs, Form, Input, Button, Table, Tag, List, Badge, Modal, Switch, message, Popconfirm, Row, Col } from 'antd'
import {
  UserOutlined,
  BellOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  PlusOutlined,
  WalletOutlined,
  CrownOutlined,
  FileProtectOutlined
} from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { Address } from '../types'
import { SpotlightCard, AnimatedNumber } from '../components/MotionPrimitives'

export const Me: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const {
    user,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    loginLogs,
    updateUserSecurity,
    walletBalance,
    creditAccount,
    memberCard
  } = useStore()

  const currentTab = searchParams.get('tab') || 'profile'

  const [profileForm] = Form.useForm()
  const [addrModalOpen, setAddrModalOpen] = useState(false)
  const [editingAddr, setEditingAddr] = useState<Address | null>(null)
  const [addrForm] = Form.useForm()

  const [messagesList, setMessagesList] = useState([
    { id: 1, title: '系统欢迎提醒', content: '欢迎加入 LANLinkshopping 供应链大宗交易网络！', time: '2025-01-18 09:00', read: false },
    { id: 2, title: '账期额度生效通知', content: '您的企业账期申请已成功核定，可用额度为 ¥500,000.00 元。', time: '2025-01-17 14:10', read: false },
    { id: 3, title: '订单出库发货提醒', content: '您的订单 ORD20250117001 螺纹钢物料已安排物流专车发货。', time: '2025-01-16 11:20', read: true }
  ])

  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        nickname: user.nickname,
        phone: user.phone,
        roleName: user.identity?.name || user.roleCode
      })
    }
  }, [user, profileForm])

  const handleUpdateProfile = (vals: any) => {
    updateUserSecurity({ nickname: vals.nickname })
    message.success('个人资料更新成功！')
  }

  const handleSaveAddress = (vals: any) => {
    if (editingAddr) {
      updateAddress(editingAddr.id, vals)
      message.success('地址更新成功')
    } else {
      addAddress({
        receiver: vals.receiver,
        phone: vals.phone,
        region: vals.region,
        detail: vals.detail,
        isDefault: vals.isDefault ? 1 : 0
      })
      message.success('新收货地址添加成功')
    }
    setAddrModalOpen(false)
    setEditingAddr(null)
    addrForm.resetFields()
  }

  const handleMarkOneRead = (id: number) => {
    setMessagesList(prev => {
      const next = prev.map(m => (m.id === id ? { ...m, read: true } : m))
      const unread = next.filter(m => !m.read).length
      if (user) updateUserSecurity({ unreadCount: unread })
      return next
    })
  }

  const handleMarkAllRead = () => {
    setMessagesList(prev => prev.map(m => ({ ...m, read: true })))
    if (user) updateUserSecurity({ unreadCount: 0 })
    message.success('已全部标记为已读')
  }

  const toggleTotp = (checked: boolean) => {
    updateUserSecurity({ totpEnabled: checked })
    message.success(checked ? '已成功启用两步验证（动态口令）' : '已停用两步验证')
  }

  return (
    <div className="main-container" style={{ maxWidth: '1080px' }}>
      {/* 21st.dev Spotlight User Profile & Asset Summary Header */}
      <SpotlightCard
        spotlightColor="rgba(200, 164, 92, 0.24)"
        borderBeam
        style={{
          padding: '28px 32px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #13233A 0%, #1F3864 100%)',
          color: '#fff'
        }}
      >
        <Row gutter={[24, 20]} align="middle">
          <Col xs={24} md={11}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C8A45C, #F59E0B)',
                  color: '#0F172A',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '24px',
                  fontWeight: 800,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                }}
              >
                {user?.nickname ? user.nickname.slice(0, 1) : <UserOutlined />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#fff' }}>
                    {user?.nickname || '未登录用户'}
                  </h1>
                  {user?.identity?.code === 'vip' && <Tag color="gold">VIP 采购商</Tag>}
                  {user?.roleCode === 'admin' && <Tag color="red">平台管理员</Tag>}
                  {user?.roleCode === 'merchant' && <Tag color="blue">认证商户</Tag>}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', marginTop: '4px' }}>
                  绑定手机：{user?.phone} · {user?.identity?.serviceScope || '企业标准采购权限'}
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} md={13}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}
            >
              <div
                onClick={() => navigate('/wallet')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <WalletOutlined /> 企业钱包余额
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#F6D38A', marginTop: '4px' }}>
                  <AnimatedNumber value={walletBalance} prefix="¥" decimals={2} />
                </div>
              </div>

              <div
                onClick={() => navigate('/credit-term')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FileProtectOutlined /> 可用授信账期
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
                  <AnimatedNumber value={creditAccount.availableLimit} prefix="¥" />
                </div>
              </div>

              <div
                onClick={() => navigate('/membership')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CrownOutlined /> 会员可用积分
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#34D399', marginTop: '4px' }}>
                  <AnimatedNumber value={memberCard.points} suffix=" 分" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </SpotlightCard>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <Tabs
          activeKey={currentTab}
          onChange={k => setSearchParams({ tab: k })}
          items={[
            {
              key: 'profile',
              label: <span><UserOutlined /> 个人资料</span>,
              children: (
                <div style={{ maxWidth: '520px', padding: '12px 0' }}>
                  <Form form={profileForm} layout="vertical" onFinish={handleUpdateProfile}>
                    <Form.Item name="nickname" label="用户昵称" rules={[{ required: true }]}>
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item name="phone" label="登录账号 (手机号)">
                      <Input size="large" disabled />
                    </Form.Item>
                    <Form.Item name="roleName" label="系统角色身份">
                      <Input size="large" disabled />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large" style={{ background: 'var(--ll-primary)' }}>
                      保存基本信息
                    </Button>
                  </Form>
                </div>
              )
            },
            {
              key: 'messages',
              label: (
                <Badge count={messagesList.filter(m => !m.read).length} offset={[10, 0]} size="small">
                  <span><BellOutlined /> 消息通知</span>
                </Badge>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                      点击单条未读消息即可标记为已读，顶部导航角标实时同步
                    </span>
                    <Button onClick={handleMarkAllRead}>全部标为已读</Button>
                  </div>
                  <List
                    dataSource={messagesList}
                    renderItem={item => (
                      <List.Item
                        onClick={() => !item.read && handleMarkOneRead(item.id)}
                        style={{
                          background: item.read ? '#fff' : '#f8fafc',
                          padding: '16px',
                          borderRadius: '12px',
                          marginBottom: '8px',
                          border: item.read ? '1px solid #e2e8f0' : '1px solid rgba(30, 110, 184, 0.35)',
                          cursor: item.read ? 'default' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '15px', color: item.read ? '#334155' : 'var(--ll-navy)' }}>
                              {!item.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48', display: 'inline-block', marginRight: '6px' }} />}
                              {item.title}
                            </strong>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</span>
                          </div>
                          <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>{item.content}</p>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )
            },
            {
              key: 'address',
              label: <span><EnvironmentOutlined /> 收货地址簿</span>,
              children: (
                <div style={{ padding: '8px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>
                      已保存 <b>{addresses.length}</b> 个有效送货地点
                    </span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ background: 'var(--ll-primary)' }}
                      onClick={() => {
                        setEditingAddr(null)
                        addrForm.resetFields()
                        setAddrModalOpen(true)
                      }}
                    >
                      新增收货地址
                    </Button>
                  </div>

                  <Row gutter={[16, 16]}>
                    {addresses.map(a => (
                      <Col key={a.id} xs={24} md={12}>
                        <Card
                          style={{
                            borderRadius: '16px',
                            border: a.isDefault ? '2px solid var(--ll-primary)' : '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <strong style={{ fontSize: '15px' }}>{a.receiver}</strong>
                            <div>
                              {a.isDefault === 1 && <Tag color="red">默认地址</Tag>}
                              <span style={{ fontSize: '13px', color: '#64748b' }}>{a.phone}</span>
                            </div>
                          </div>
                          <div style={{ color: '#64748b', fontSize: '13px', minHeight: '38px', marginBottom: '12px' }}>
                            {a.region} {a.detail}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            {a.isDefault !== 1 && (
                              <Button size="small" type="link" onClick={() => setDefaultAddress(a.id)}>
                                设为默认
                              </Button>
                            )}
                            <Button
                              size="small"
                              type="link"
                              onClick={() => {
                                setEditingAddr(a)
                                addrForm.setFieldsValue(a)
                                setAddrModalOpen(true)
                              }}
                            >
                              编辑
                            </Button>
                            <Popconfirm title="确定删除该地址？" onConfirm={() => deleteAddress(a.id)}>
                              <Button size="small" type="link" danger>删除</Button>
                            </Popconfirm>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            },
            {
              key: 'login-log',
              label: <span><SafetyCertificateOutlined /> 登录安全记录</span>,
              children: (
                <div style={{ padding: '8px 0' }}>
                  <Table
                    dataSource={loginLogs}
                    columns={[
                      { title: '登录时间', dataIndex: 'time', key: 'time' },
                      { title: 'IP 地址', dataIndex: 'ip', key: 'ip' },
                      { title: '归属地', dataIndex: 'location', key: 'loc' },
                      { title: '操作系统与终端', dataIndex: 'device', key: 'dev' },
                      { title: '状态', dataIndex: 'status', key: 'st', render: (v: string) => <Tag color="green">{v}</Tag> }
                    ]}
                    rowKey="id"
                    pagination={false}
                  />
                </div>
              )
            },
            {
              key: 'settings',
              label: <span><SettingOutlined /> 账户安全设置</span>,
              children: (
                <div style={{ maxWidth: '600px', padding: '12px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <strong style={{ fontSize: '15px' }}>两步验证 (2FA 动态安全码)</strong>
                      <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
                        登录时除了密码外，需校验验证器 App 提供的 6 位动态验证码。
                      </div>
                    </div>
                    <Switch
                      checked={Boolean(user?.totpEnabled)}
                      onChange={toggleTotp}
                    />
                  </div>

                  <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '24px' }} />

                  <div>
                    <strong style={{ fontSize: '15px' }}>修改登录密码</strong>
                    <Form
                      layout="vertical"
                      style={{ marginTop: '12px' }}
                      onFinish={() => {
                        message.success('登录密码修改成功！请牢记新密码。')
                      }}
                    >
                      <Form.Item label="原密码" name="oldPass" rules={[{ required: true }]}>
                        <Input.Password placeholder="请输入当前密码（默认 123456）" />
                      </Form.Item>
                      <Form.Item label="新密码" name="newPass" rules={[{ required: true, min: 6 }]}>
                        <Input.Password placeholder="至少 6 位字母和数字组合" />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">更新密码</Button>
                    </Form>
                  </div>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Address Edit Modal */}
      <Modal
        open={addrModalOpen}
        title={editingAddr ? '编辑收货地址' : '新增收货地址'}
        onCancel={() => {
          setAddrModalOpen(false)
          setEditingAddr(null)
        }}
        footer={null}
      >
        <Form form={addrForm} layout="vertical" onFinish={handleSaveAddress}>
          <Form.Item name="receiver" label="收货人" rules={[{ required: true, message: '请填写收货人姓名' }]}>
            <Input placeholder="例如：李采购" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请填写联系电话' }]}>
            <Input placeholder="例如：13900000001" />
          </Form.Item>
          <Form.Item name="region" label="省市区" rules={[{ required: true, message: '请填写省市区' }]}>
            <Input placeholder="例如：重庆市 渝北区" />
          </Form.Item>
          <Form.Item name="detail" label="详细地址" rules={[{ required: true, message: '请填写具体工程地点/仓库门牌' }]}>
            <Input.TextArea rows={2} placeholder="例如：金开大道88号项目工地仓库" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Switch /> <span style={{ marginLeft: '8px', fontSize: '13px' }}>设为默认收货地址</span>
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">保存收货地址</Button>
        </Form>
      </Modal>
    </div>
  )
}
