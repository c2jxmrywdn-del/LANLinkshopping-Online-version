import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Alert, Tag } from 'antd'
import { FileProtectOutlined, CheckCircleFilled, ArrowRightOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const CreditTermCenter: React.FC = () => {
  const navigate = useNavigate()
  const { creditAccount, creditBills } = useStore()

  const unpaidBills = creditBills.filter(b => b.status === 'UNPAID')
  const totalOutstanding = unpaidBills.reduce((sum, b) => sum + (b.amount - b.repaidAmount), 0)

  const usagePercent = creditAccount.creditLimit > 0
    ? Math.min(100, Math.round((creditAccount.usedLimit / creditAccount.creditLimit) * 100))
    : 0

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ll-primary)' }}>
            ENTERPRISE CREDIT
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            企业账期管理
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            授信额度、账单到期对账、周期性先货后款还款统一中枢。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {creditAccount.status !== 'ACTIVE' ? (
            <Button
              type="primary"
              size="large"
              style={{ background: 'var(--ll-primary)' }}
              onClick={() => navigate('/credit-term/apply')}
            >
              {creditAccount.status === 'PENDING' ? '查看申请进度' : '申请企业授信'}
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/credit-term/apply')}
            >
              提升额度
            </Button>
          )}

          <Button size="large" onClick={() => navigate('/credit-term/bills')}>
            账单中心
          </Button>
        </div>
      </div>

      {/* Status Notice */}
      {creditAccount.status === 'NOT_APPLIED' && (
        <Alert
          type="info"
          showIcon
          message="尚未开通企业账期授信"
          description="提交企业统一社会信用代码、经营纳税凭证与采购需求，平台审核通过后即可在订单结算时先货后款。"
          style={{ borderRadius: '16px', marginBottom: '20px' }}
        />
      )}
      {creditAccount.status === 'PENDING' && (
        <Alert
          type="warning"
          showIcon
          message="企业授信审核中"
          description="平台运营正在核验您的企业信息与采购规模，审核通过后可用额度将自动注入您的账户。"
          style={{ borderRadius: '16px', marginBottom: '20px' }}
        />
      )}
      {creditAccount.status === 'REJECTED' && (
        <Alert
          type="error"
          showIcon
          message="本次授信申请未通过"
          description={creditAccount.reviewRemark || '可补充近3个月纳税证明或营业执照重新发起申请。'}
          style={{ borderRadius: '16px', marginBottom: '20px' }}
        />
      )}

      {/* Active Credit Dashboard Card */}
      {creditAccount.status === 'ACTIVE' && (
        <div
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'var(--ll-brand-hero-gradient)',
            color: '#fff',
            boxShadow: 'var(--ll-glass-shadow)',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', opacity: 0.8 }}>当前可用授信额度</span>
              <strong style={{ display: 'block', fontSize: '42px', fontWeight: 800, margin: '6px 0' }}>
                ¥{creditAccount.availableLimit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </strong>
              <small style={{ opacity: 0.7, fontSize: '13px' }}>
                核定总额度：¥{creditAccount.creditLimit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </small>
            </div>
            <Tag color="green" style={{ fontSize: '13px', padding: '4px 10px', fontWeight: 700 }}>
              授信正常生效中
            </Tag>
          </div>

          {/* Usage Track */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.85, marginBottom: '6px' }}>
              <span>已使用额度：¥{creditAccount.usedLimit.toFixed(2)}</span>
              <span>使用率 {usagePercent}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${usagePercent}%`,
                  background: 'linear-gradient(90deg, #F59E0B, #10b981)',
                  borderRadius: '999px'
                }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', opacity: 0.7, display: 'block' }}>账期周期</span>
              <b style={{ fontSize: '18px' }}>{creditAccount.termDays} 天</b>
            </div>
            <div>
              <span style={{ fontSize: '12px', opacity: 0.7, display: 'block' }}>待还账单总额</span>
              <b style={{ fontSize: '18px', color: totalOutstanding > 0 ? '#fca5a5' : '#fff' }}>
                ¥{totalOutstanding.toFixed(2)}
              </b>
            </div>
            <div>
              <span style={{ fontSize: '12px', opacity: 0.7, display: 'block' }}>企业风险评级</span>
              <b style={{ fontSize: '18px' }}>{creditAccount.riskLevel || '标准评级'}</b>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Card
          hoverable
          onClick={() => navigate('/credit-term/bills')}
          style={{ borderRadius: '18px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '11px', color: 'var(--ll-brand-red)', fontWeight: 800, letterSpacing: '0.14em' }}>
            01
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '8px 0 4px', color: 'var(--ll-navy)' }}>
            应付账单中心
          </h3>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 12px' }}>
            查看未结清账单、逾期预警与已结清明细，支持钱包余额一键还款。
          </p>
          <span style={{ color: 'var(--ll-primary)', fontSize: '13px', fontWeight: 600 }}>
            进入账单中心 →
          </span>
        </Card>

        <Card
          hoverable
          onClick={() => navigate('/credit-term/bills')}
          style={{ borderRadius: '18px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '11px', color: 'var(--ll-brand-red)', fontWeight: 800, letterSpacing: '0.14em' }}>
            02
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '8px 0 4px', color: 'var(--ll-navy)' }}>
            到期与资金排期
          </h3>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 12px' }}>
            按到期日期由近至远对账排期，自动保障企业在平台上的良好信用履约。
          </p>
          <span style={{ color: 'var(--ll-primary)', fontSize: '13px', fontWeight: 600 }}>
            查看账单排期 →
          </span>
        </Card>
      </div>
    </div>
  )
}
