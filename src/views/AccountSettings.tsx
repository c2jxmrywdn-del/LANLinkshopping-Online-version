import React, { useState } from 'react'
import { Card, Form, Input, Button, Switch, Segmented, Select, Divider, message, Modal, Space, Tag, Alert } from 'antd'
import { LockOutlined, SafetyCertificateOutlined, BellOutlined, SkinOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const AccountSettings: React.FC = () => {
  const { user } = useStore()
  const [pwdModalVisible, setPwdModalVisible] = useState(false)
  const [totpModalVisible, setTotpModalVisible] = useState(false)
  const [totpEnabled, setTotpEnabled] = useState(false)
  const [totpSecret] = useState('LANLINK7TOTPXEXAMPLESECRETKEY2026')
  const [totpCode, setTotpCode] = useState('')

  // Notification settings
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)
  const [notifySms, setNotifySms] = useState(false)
  const [notifyOrder, setNotifyOrder] = useState(true)
  const [notifyPromotion, setNotifyPromotion] = useState(true)
  const [notifySystem, setNotifySystem] = useState(true)

  // Appearance & Privacy
  const [themeMode, setThemeMode] = useState('light')
  const [language, setLanguage] = useState('zh-CN')
  const [fontSize, setFontSize] = useState('standard')
  const [recommendEnabled, setRecommendEnabled] = useState(true)
  const [adsEnabled, setAdsEnabled] = useState(false)

  // Third auths
  const [thirdApps, setThirdApps] = useState([
    { id: '1', appName: '钉钉组织协作集成', scopes: 'read:profile, notify:dingtalk', authTime: '2026-03-15 10:20:00' },
    { id: '2', appName: '飞书供应链协同机器人', scopes: 'read:order, write:notification', authTime: '2026-04-01 14:35:12' }
  ])

  const [pwdForm] = Form.useForm()

  const handlePasswordChange = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的新密码不一致')
      return
    }
    message.success('密码修改成功，请牢记新密码')
    pwdForm.resetFields()
    setPwdModalVisible(false)
  }

  const handleVerifyTotp = () => {
    if (totpCode.length !== 6) {
      message.error('请输入6位数字验证码')
      return
    }
    setTotpEnabled(true)
    message.success('两步验证 (TOTP) 已成功开启！')
    setTotpModalVisible(false)
    setTotpCode('')
  }

  const handleDisableTotp = () => {
    Modal.confirm({
      title: '确认停用两步验证？',
      content: '停用后，登录仅需要用户名和密码，账户安全级别将降低。',
      okText: '确认停用',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setTotpEnabled(false)
        message.info('两步验证已停用')
      }
    })
  }

  const handleRevokeThird = (id: string, name: string) => {
    Modal.confirm({
      title: '解除第三方授权',
      content: `确定撤销对【${name}】的授权许可吗？撤销后该应用将无法读取或接收相关通知。`,
      okText: '撤销授权',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setThirdApps(thirdApps.filter(app => app.id !== id))
        message.success(`已成功撤销【${name}】的授权`)
      }
    })
  }

  return (
    <div style={{ maxWidth: '960px', margin: '24px auto', padding: '0 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ll-navy)', marginBottom: '8px' }}>
          账户设置与安全中心
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          管理密码、两步验证(2FA)、消息推送偏好、多语言与隐私权限
        </p>
      </div>

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        {/* Security Card */}
        <Card
          title={
            <Space>
              <LockOutlined style={{ color: 'var(--ll-blue)' }} />
              <span>账户安全与认证</span>
            </Space>
          }
          extra={<Tag color={totpEnabled ? 'green' : 'orange'}>{totpEnabled ? '安全等级：高' : '安全等级：中等'}</Tag>}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>登录密码</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>定期更换高强度密码有助于保障企业采购账户资产安全</div>
            </div>
            <Button onClick={() => setPwdModalVisible(true)}>修改密码</Button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>两步验证 (TOTP 2FA)</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                {totpEnabled ? '已启用 Google Authenticator 或其他身份验证器' : '未开启。推荐使用身份验证器保护核心资金与订单操作'}
              </div>
            </div>
            {totpEnabled ? (
              <Button danger onClick={handleDisableTotp}>停用两步验证</Button>
            ) : (
              <Button type="primary" onClick={() => setTotpModalVisible(true)}>启用两步验证</Button>
            )}
          </div>
        </Card>

        {/* Notifications */}
        <Card
          title={
            <Space>
              <BellOutlined style={{ color: 'var(--ll-blue)' }} />
              <span>通知偏好配置</span>
            </Space>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
              <span>邮件通知 (Email)</span>
              <Switch checked={notifyEmail} onChange={setNotifyEmail} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
              <span>站内实时推送 (Web Push)</span>
              <Switch checked={notifyPush} onChange={setNotifyPush} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
              <span>短信紧急通知 (SMS)</span>
              <Switch checked={notifySms} onChange={setNotifySms} />
            </div>
          </div>

          <Divider orientation="left" style={{ fontSize: '13px', color: '#64748b' }}>订阅业务类型</Divider>

          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500 }}>订单履约与物流提醒</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>支付成功、出库发货、账期账单到期提醒</div>
              </div>
              <Switch checked={notifyOrder} onChange={setNotifyOrder} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500 }}>营销促销与采购特惠</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>行业专场立减、平台大促代金券分发</div>
              </div>
              <Switch checked={notifyPromotion} onChange={setNotifyPromotion} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500 }}>系统公告与安全提醒</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>异地登录预警、系统维护公告、规则升级</div>
              </div>
              <Switch checked={notifySystem} onChange={setNotifySystem} />
            </div>
          </Space>
        </Card>

        {/* Appearance & Language */}
        <Card
          title={
            <Space>
              <SkinOutlined style={{ color: 'var(--ll-blue)' }} />
              <span>界面偏好与语言</span>
            </Space>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>系统主题外观</div>
              <Segmented
                value={themeMode}
                onChange={(val) => setThemeMode(val as string)}
                options={[
                  { label: '亮色简约 (Light)', value: 'light' },
                  { label: '深色尊贵 (Dark)', value: 'dark' },
                  { label: '跟随系统 (Auto)', value: 'auto' }
                ]}
                block
              />
            </div>

            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>语言 / Language</div>
              <Select
                value={language}
                onChange={setLanguage}
                style={{ width: '100%' }}
                options={[
                  { label: '简体中文 (Simplified Chinese)', value: 'zh-CN' },
                  { label: 'English (US)', value: 'en-US' }
                ]}
              />
            </div>

            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>文字排版尺寸</div>
              <Segmented
                value={fontSize}
                onChange={(val) => setFontSize(val as string)}
                options={[
                  { label: '紧凑 (Compact)', value: 'compact' },
                  { label: '标准 (Standard)', value: 'standard' },
                  { label: '大号字体 (Large)', value: 'large' }
                ]}
                block
              />
            </div>
          </div>
        </Card>

        {/* Privacy & Third Party */}
        <Card
          title={
            <Space>
              <SecurityScanOutlined style={{ color: 'var(--ll-blue)' }} />
              <span>隐私与第三方应用授权</span>
            </Space>
          }
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: 500 }}>智能推荐算法</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>允许根据采购历史与浏览偏好智能匹配供应链货源</div>
            </div>
            <Switch checked={recommendEnabled} onChange={setRecommendEnabled} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: 500 }}>个性化商品广告推送</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>展示合作商家的优先采购推介，关闭后展示通用内容</div>
            </div>
            <Switch checked={adsEnabled} onChange={setAdsEnabled} />
          </div>

          <Divider orientation="left" style={{ fontSize: '13px', color: '#64748b' }}>已授权第三方应用</Divider>

          {thirdApps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8' }}>暂无绑定的第三方系统授权</div>
          ) : (
            thirdApps.map(app => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.appName}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    权限范围：<code>{app.scopes}</code> · 授权时间：{app.authTime}
                  </div>
                </div>
                <Button danger size="small" onClick={() => handleRevokeThird(app.id, app.appName)}>
                  解除授权
                </Button>
              </div>
            ))
          )}
        </Card>
      </Space>

      {/* Change Password Modal */}
      <Modal
        title="修改密码"
        open={pwdModalVisible}
        onCancel={() => setPwdModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={pwdForm} layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item name="oldPassword" label="当前原密码" rules={[{ required: true, message: '请输入原密码' }]}>
            <Input.Password placeholder="输入当前使用的密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '新密码长度至少6位' }
            ]}
          >
            <Input.Password placeholder="设置新的高强度密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[{ required: true, message: '请确认新密码' }]}
          >
            <Input.Password placeholder="再次输入新密码" />
          </Form.Item>
          <div style={{ textAlign: 'right', marginTop: '16px' }}>
            <Space>
              <Button onClick={() => setPwdModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">确认保存</Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Enable TOTP Modal */}
      <Modal
        title="启用两步验证 (TOTP)"
        open={totpModalVisible}
        onCancel={() => setTotpModalVisible(false)}
        onOk={handleVerifyTotp}
        okText="确认绑定"
        cancelText="取消"
      >
        <Alert
          message="使用身份验证器提升账户安全"
          description="请使用 Google Authenticator、Microsoft Authenticator 或 1Password 等应用扫描密钥或手动录入。"
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>安全密钥 (Secret Key)</div>
          <code style={{ fontSize: '15px', padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', letterSpacing: '1px' }}>
            {totpSecret}
          </code>
        </div>
        <Form layout="vertical" style={{ marginTop: '16px' }}>
          <Form.Item label="验证码 (6位数字)" required>
            <Input
              placeholder="输入验证器生成的6位动态口令"
              maxLength={6}
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default AccountSettings
