import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Form, InputNumber, Input, message } from 'antd'
import { useStore } from '../../store/storeContext'
import { CreditAccount } from '../../types'

export const AdminCreditTerms: React.FC = () => {
  const { creditAccount, reviewCredit } = useStore()
  const [reviewModal, setReviewModal] = useState<CreditAccount | null>(null)
  const [form] = Form.useForm()

  const handleReview = (vals: any) => {
    if (!reviewModal) return
    reviewCredit(reviewModal.accId, vals.status, vals.creditLimit, vals.termDays, vals.remark)
    message.success('企业账期授信审核已完成！')
    setReviewModal(null)
  }

  const columns = [
    { title: '授信账号ID', dataIndex: 'accId', key: 'id' },
    {
      title: '授信企业主体',
      key: 'ent',
      render: () => '重庆建工集团股份有限公司'
    },
    {
      title: '核定总授信',
      dataIndex: 'creditLimit',
      key: 'limit',
      render: (v: number) => `¥${v ? v.toLocaleString() : '0'}`
    },
    {
      title: '可用额度',
      dataIndex: 'availableLimit',
      key: 'avail',
      render: (v: number) => <b style={{ color: '#10b981' }}>¥{v ? v.toLocaleString() : '0'}</b>
    },
    {
      title: '结算周期',
      dataIndex: 'termDays',
      key: 'days',
      render: (v: number) => `${v} 天`
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, r: CreditAccount) => {
        if (r.status === 'ACTIVE') return <Tag color="green">正常生效</Tag>
        if (r.status === 'PENDING') return <Tag color="orange">申请待审核</Tag>
        if (r.status === 'REJECTED') return <Tag color="red">已拒绝</Tag>
        return <Tag color="default">未开通</Tag>
      }
    },
    {
      title: '操作',
      key: 'op',
      render: (_: any, r: CreditAccount) => (
        <Button size="small" type="primary" onClick={() => {
          setReviewModal(r)
          form.setFieldsValue({
            status: 'ACTIVE',
            creditLimit: r.creditLimit || 500000,
            termDays: r.termDays || 60,
            remark: '企业资产与工程结算流水核验合格，批准授信'
          })
        }}>
          审核 / 调整额度
        </Button>
      )
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
          企业账期授信管理
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
          审核企业法人资信材料、评定信用等级并动态授予先货后款额度。
        </p>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={[creditAccount]}
          columns={columns}
          rowKey="accId"
          pagination={false}
        />
      </Card>

      <Modal
        open={!!reviewModal}
        title="企业账期额度审批与调控"
        onCancel={() => setReviewModal(null)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleReview}>
          <Form.Item name="status" label="审核决定" rules={[{ required: true }]}>
            <Button.Group style={{ display: 'flex' }}>
              <Button style={{ flex: 1 }} type="primary">批准生效</Button>
            </Button.Group>
          </Form.Item>

          <Form.Item name="creditLimit" label="核定授信额度 (元)" rules={[{ required: true }]}>
            <InputNumber step={50000} style={{ width: '100%' }} prefix="¥" />
          </Form.Item>

          <Form.Item name="termDays" label="结算账期周期 (天)" rules={[{ required: true }]}>
            <InputNumber min={15} max={180} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="remark" label="审核批注与风控评语">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" style={{ background: 'var(--ll-primary)' }}>
            确认授信并生效
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
