import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Form, Input, InputNumber, Radio, Button, Upload, Modal, message } from 'antd'
import { ArrowLeftOutlined, UploadOutlined, FileProtectOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const CreditTermApply: React.FC = () => {
  const navigate = useNavigate()
  const { applyCredit, creditAccount } = useStore()
  const [loading, setLoading] = useState(false)

  const handleFinish = (values: any) => {
    setLoading(true)
    setTimeout(() => {
      applyCredit(values.limit, values.termDays)
      setLoading(false)
      Modal.success({
        title: '账期申请已提交',
        content: '申请已进入平台运营审核流程。核验营业执照与大宗物资采购真实性后，授信额度将生效。',
        okText: '返回账期中心',
        onOk: () => navigate('/credit-term')
      })
    }, 600)
  }

  return (
    <div className="main-container" style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/credit-term" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回账期中心
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(30, 110, 184, 0.1)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--ll-primary)',
              fontSize: '22px'
            }}
          >
            <FileProtectOutlined />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
              申请企业授信账期
            </h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
              面向具备工程承包或稳定制造采购需求的企业法人，享 30~90 天先货后款额度。
            </p>
          </div>
        </div>

        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            entName: '华晨建材集团有限公司',
            creditCode: '91500000MA5U0000XA',
            limit: 500000,
            termDays: 60
          }}
        >
          <Form.Item name="entName" label="企业主体全称" rules={[{ required: true, message: '请填写企业名称' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="creditCode" label="统一社会信用代码" rules={[{ required: true, message: '请填写信用代码' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="limit" label="申请授信额度 (元)" rules={[{ required: true, message: '请填写申请金额' }]}>
            <InputNumber
              min={50000}
              max={10000000}
              step={50000}
              size="large"
              style={{ width: '100%', fontSize: '16px', fontWeight: 700 }}
              prefix="¥"
            />
          </Form.Item>

          <Form.Item name="termDays" label="期望结算周期" rules={[{ required: true }]}>
            <Radio.Group size="large" buttonStyle="solid">
              <Radio.Button value={30}>30 天周结</Radio.Button>
              <Radio.Button value={60}>60 天双月结（推荐）</Radio.Button>
              <Radio.Button value={90}>90 天季度结</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="营业执照复印件 (盖公章)">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>上传营业执照图片 / PDF (≤10MB)</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="近 3 个月纳税完税凭证或财务报表">
            <Upload beforeUpload={() => false} maxCount={3}>
              <Button icon={<UploadOutlined />}>上传纳税凭证 (支持上传多份)</Button>
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
            提交授信审核
          </Button>
        </Form>
      </Card>
    </div>
  )
}
