import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Paragraph, Title } = Typography

export const ActivityRules: React.FC = () => {
  return (
    <div className="main-container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/activity" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回活动中心
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', padding: '16px' }}>
        <Title level={2} style={{ color: 'var(--ll-navy)' }}>LANLinkshopping 活动与积分规则说明</Title>
        <Paragraph>
          1. <b>活动参与资格</b>：平台所有完成注册认证的采购方与企业商户，均可参与标记为进行中的活动。
        </Paragraph>
        <Paragraph>
          2. <b>积分奖励发放</b>：点击参与后，系统将自动把相应积分记入当前账号会员卡。
        </Paragraph>
        <Paragraph>
          3. <b>积分抵现规则</b>：订单结算时，每 100 积分等值抵扣人民币 1.00 元整。单笔订单积分最高抵扣比例为订单应付总额的 10%。
        </Paragraph>
        <Paragraph>
          4. <b>VIP 会员翻倍</b>：具备 VIP 采购资质的企业，在消费完成时自动享有 2 倍积分获取特权。
        </Paragraph>
      </Card>
    </div>
  )
}
