import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, InputNumber, Radio, Button, Upload, Alert, Modal, message } from 'antd'
import { ShopOutlined, UploadOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const MerchantApply: React.FC = () => {
  const navigate = useNavigate()
  const { applyMerchant, merchants, user } = useStore()
  const [loading, setLoading] = useState(false)

  const myMerchant = merchants.find(m => m.userId === user?.userId)

  const handleFinish = (values: any) => {
    setLoading(true)
    setTimeout(() => {
      applyMerchant({
        regType: values.regType,
        regCapital: values.regCapital,
        joinType: values.joinType,
        taxRegNo: values.taxRegNo,
        licenseUrl: '/assets/contact/whatsapp-qr.png',
        taxProofUrls: '/assets/contact/whatsapp-qr.png'
      })
      setLoading(false)
      Modal.success({
        title: '入驻申请提交成功',
        content: '平台运营将在 1 个工作日内完成主体资质与工商档案核验，审核通过后即可上架商品。',
        okText: '好的'
      })
    }, 600)
  }

  return (
    <div className="main-container" style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
          MERCHANT ONBOARDING
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
          商户 / 供应商入驻申请
        </h1>
        <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
          入驻成为平台供应商，面向大型央企国企工程承包商直发商品。
        </p>
      </div>

      {myMerchant && (
        <Alert
          type={myMerchant.reviewStatus === 1 ? 'success' : myMerchant.reviewStatus === 2 ? 'error' : 'warning'}
          showIcon
          style={{ borderRadius: '16px', marginBottom: '24px' }}
          message={
            myMerchant.reviewStatus === 1
              ? '您已成功入驻平台成为认证供应商'
              : myMerchant.reviewStatus === 2
              ? `入驻申请被驳回：${myMerchant.rejectReason || '材料不合规'}`
              : '入驻审核受理中'
          }
          description={
            myMerchant.reviewStatus === 1
              ? '您的商户权限已全部开放，可以前往「我的商品」发布货品，或在「流量管理」中分析店铺数据。'
              : '平台运营审核中，您可先在下方更新材料并重新提交。'
          }
          action={
            myMerchant.reviewStatus === 1 ? (
              <Button type="primary" onClick={() => navigate('/merchant/products')}>
                前往商品管理
              </Button>
            ) : undefined
          }
        />
      )}

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            regType: '公司',
            regCapital: 5000000,
            joinType: '入驻',
            taxRegNo: '91500000MA5U0000XA'
          }}
        >
          <Form.Item name="regType" label="主体经营类型" rules={[{ required: true }]}>
            <Radio.Group size="large" buttonStyle="solid">
              <Radio.Button value="公司">企业法人公司</Radio.Button>
              <Radio.Button value="个体工商户">个体工商户</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="regCapital" label="企业注册资本 (元)" rules={[{ required: true, message: '请填写注册资本' }]}>
            <InputNumber
              min={100000}
              max={1000000000}
              step={500000}
              size="large"
              style={{ width: '100%', fontSize: '16px', fontWeight: 700 }}
              prefix="¥"
            />
          </Form.Item>

          <Form.Item name="joinType" label="合作入驻模式" rules={[{ required: true }]}>
            <Radio.Group size="large" buttonStyle="solid">
              <Radio.Button value="入驻">标准自营入驻</Radio.Button>
              <Radio.Button value="加盟">特约核心加盟</Radio.Button>
              <Radio.Button value="邀约">平台战略邀约</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="taxRegNo" label="纳税人识别号 / 税务登记号" rules={[{ required: true, message: '请填写税务登记号' }]}>
            <Input size="large" placeholder="例如：91500000MA5U0000XA" />
          </Form.Item>

          <Form.Item label="营业执照正本 / 副本照片">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>上传营业执照文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="近期纳税记录材料 (PDF/JPG，可上传多份)">
            <Upload beforeUpload={() => false} maxCount={3}>
              <Button icon={<UploadOutlined />}>上传纳税完税证明材料</Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{
              height: '48px',
              fontSize: '16px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
              border: 'none',
              marginTop: '12px'
            }}
          >
            提交商户入驻材料
          </Button>
        </Form>
      </Card>
    </div>
  )
}
