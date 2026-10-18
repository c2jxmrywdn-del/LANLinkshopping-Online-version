import React, { useState } from 'react'
import { Card, Switch, Button, message } from 'antd'

export const PrivacyCenter: React.FC = () => {
  const [essential] = useState(true)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  const handleSave = () => {
    localStorage.setItem('ll_cookie_consent', JSON.stringify({ essential, analytics, marketing }))
    message.success('隐私与 Cookie 偏好设置已成功保存！')
  }

  return (
    <div className="main-container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
          隐私与 Cookie 设置中心
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
          了解 LANLinkshopping 如何遵循数据安全与用户隐私保护标准。
        </p>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '15px' }}>必要性 Cookie 与本地存储</strong>
              <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
                保障登录鉴权、CSRF 防护、购物车与订单结算核心功能正常运作，无法停用。
              </div>
            </div>
            <Switch checked={essential} disabled />
          </div>

          <div style={{ height: '1px', background: '#f1f5f9' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '15px' }}>商户流量分析与页面行为统计</strong>
              <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
                用于帮助入驻供应商统计商品浏览频次、优化采购选品推荐与改进商城性能。
              </div>
            </div>
            <Switch checked={analytics} onChange={setAnalytics} />
          </div>

          <div style={{ height: '1px', background: '#f1f5f9' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '15px' }}>个性化营销与促销推荐</strong>
              <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
                向您展示契合您所属行业的满减政策与特惠活动。
              </div>
            </div>
            <Switch checked={marketing} onChange={setMarketing} />
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          style={{ marginTop: '32px', background: 'var(--ll-primary)' }}
          onClick={handleSave}
        >
          保存我的隐私偏好设置
        </Button>
      </Card>
    </div>
  )
}
