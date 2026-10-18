import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Steps, Descriptions, Tag, Button, Space, Modal, Input, message, Row, Col } from 'antd'
import { ArrowLeftOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { useStore } from '../../store/storeContext'

export const MerchantDetail: React.FC = () => {
  const { merId } = useParams<{ merId: string }>()
  const navigate = useNavigate()
  const { merchants, reviewMerchant } = useStore()

  const merchant = merchants.find(m => m.merId === Number(merId)) || merchants[0]
  const [rejectModal, setRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  if (!merchant) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>商户档案不存在</h2>
        <Button type="primary" onClick={() => navigate('/admin/merchants')}>返回商户列表</Button>
      </div>
    )
  }

  const handleApprove = () => {
    reviewMerchant(merchant.merId, 1)
    message.success('审核通过！已升级商户权限。')
  }

  const handleReject = () => {
    if (!rejectReason.trim()) {
      message.warning('请填写驳回原因')
      return
    }
    reviewMerchant(merchant.merId, 2, rejectReason.trim())
    message.info('已驳回商户入驻申请')
    setRejectModal(false)
  }

  const stepIndex = merchant.reviewStatus === 0 ? 1 : 2

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/admin/merchants" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回商户管理列表
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>MERCHANT ARCHIVE / #{merchant.merId}</div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
              {merchant.enterprise?.name || '华晨建材集团有限公司'}
            </h1>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              主体性质：{merchant.regType} · 注册资本：¥{merchant.regCapital?.toLocaleString()} 元
            </span>
          </div>

          <Tag color={merchant.reviewStatus === 1 ? 'green' : merchant.reviewStatus === 2 ? 'red' : 'orange'} style={{ fontSize: '14px', padding: '6px 14px' }}>
            {merchant.reviewStatus === 1 ? '入驻已通过' : merchant.reviewStatus === 2 ? '申请已驳回' : '等待平台审核'}
          </Tag>
        </div>

        <Steps
          current={stepIndex}
          items={[
            { title: '提交申请', description: merchant.createTime },
            { title: '资质核验', description: '执照与税务核对' },
            {
              title: '审核完成',
              description: merchant.reviewStatus === 1 ? '正式准入' : merchant.reviewStatus === 2 ? '材料需重整' : '审核受理中'
            }
          ]}
        />
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="工商档案资料" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="企业名称">{merchant.enterprise?.name || '华晨建材集团有限公司'}</Descriptions.Item>
              <Descriptions.Item label="统一社会信用代码">{merchant.enterprise?.creditCode || merchant.taxRegNo}</Descriptions.Item>
              <Descriptions.Item label="注册资本">¥{merchant.regCapital ? merchant.regCapital.toLocaleString() : '0'} 元</Descriptions.Item>
              <Descriptions.Item label="合作模式">{merchant.joinType || '标准入驻'}</Descriptions.Item>
              <Descriptions.Item label="提交时间">{merchant.createTime}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="资质核验与合规指标" style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircleFilled style={{ color: '#10b981' }} /> 营业执照核对一致
                </span>
                <Tag color="green">已核验</Tag>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircleFilled style={{ color: '#10b981' }} /> 近 3 个月纳税证明
                </span>
                <Tag color="green">稳定合规</Tag>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircleFilled style={{ color: '#10b981' }} /> 法人及负责人实名
                </span>
                <Tag color="green">通过</Tag>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {merchant.reviewStatus !== 1 && (
                <Button type="primary" size="large" onClick={handleApprove}>
                  审核通过
                </Button>
              )}
              {merchant.reviewStatus !== 2 && (
                <Button danger size="large" onClick={() => setRejectModal(true)}>
                  驳回整改
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        open={rejectModal}
        title="驳回入驻申请"
        onCancel={() => setRejectModal(false)}
        onOk={handleReject}
        okText="确认驳回"
        cancelText="取消"
      >
        <Input.TextArea
          rows={3}
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
          placeholder="说明需要商户整改或补充的材料原因"
        />
      </Modal>
    </div>
  )
}
