import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Form, Input, InputNumber, Select, message, Tooltip, Row, Col } from 'antd'
import { PlusOutlined, InfoCircleOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/storeContext'
import { Product } from '../types'

export const MerchantProducts: React.FC = () => {
  const navigate = useNavigate()
  const { products, addProduct, updateProductStatus, industries, categories } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handlePublish = (values: any) => {
    addProduct({
      merId: 1,
      catId: values.catId,
      indId: values.indId,
      title: values.title,
      brand: values.brand,
      spec: values.spec,
      price: values.price,
      unit: values.unit || '件',
      stock: values.stock,
      coverUrl: values.coverUrl || '/products/1.jpg',
      detail: values.detail
    })
    message.success('商品发布成功！已自动生效上架')
    setModalOpen(false)
    form.resetFields()
  }

  const columns = [
    {
      title: '商品',
      key: 'title',
      render: (_: any, r: Product) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={r.coverUrl} alt="" style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover' }} />
          <div>
            <b style={{ color: 'var(--ll-navy)', fontSize: '14px' }}>{r.title}</b>
            <div style={{ color: '#64748b', fontSize: '12px' }}>
              品牌：{r.brand} · 规格：{r.spec}
            </div>
          </div>
        </div>
      )
    },
    {
      title: '销售单价',
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (v: number, r: Product) => (
        <b style={{ color: '#e11d48' }}>¥{v.toFixed(2)} / {r.unit || '件'}</b>
      )
    },
    {
      title: '库存 / 销量',
      key: 'stock',
      width: 140,
      render: (_: any, r: Product) => (
        <span style={{ fontSize: '13px' }}>现货 {r.stock} · 已售 {r.sales}</span>
      )
    },
    {
      title: '审核状态',
      key: 'review',
      width: 120,
      render: (_: any, r: Product) => {
        if (r.reviewStatus === 1) return <Tag color="green">审核通过</Tag>
        if (r.reviewStatus === 2) {
          return (
            <Tooltip title={r.rejectReason ? `驳回原因：${r.rejectReason}` : '审核未通过'}>
              <Tag color="red" style={{ cursor: 'pointer' }}>已驳回 ⓘ</Tag>
            </Tooltip>
          )
        }
        return <Tag color="orange">待审核</Tag>
      }
    },
    {
      title: '上架状态',
      key: 'status',
      width: 110,
      render: (_: any, r: Product) => (
        <Tag color={r.status === 1 ? 'blue' : 'default'}>
          {r.status === 1 ? '正常在售' : '已下架'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'op',
      width: 160,
      render: (_: any, r: Product) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/product/${r.prodId}`)}
          >
            预览
          </Button>

          {r.status === 1 ? (
            <Button
              type="text"
              danger
              size="small"
              onClick={() => updateProductStatus(r.prodId, 0)}
            >
              下架
            </Button>
          ) : (
            <Button
              type="text"
              size="small"
              onClick={() => updateProductStatus(r.prodId, 1)}
            >
              上架
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            MERCHANT INVENTORY
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            我的商品管理
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            商户店铺物料上架、库存维护与状态调控。
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          style={{ background: 'var(--ll-primary)' }}
          onClick={() => setModalOpen(true)}
        >
          ＋ 发布新商品
        </Button>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="prodId"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* Publish Modal */}
      <Modal
        open={modalOpen}
        title="发布新商品到平台商城"
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={640}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handlePublish}
          initialValues={{
            brand: '华晨建材',
            spec: '国标批次合格',
            unit: '吨',
            stock: 2000,
            indId: 1,
            catId: 1,
            coverUrl: '/products/1.jpg'
          }}
        >
          <Form.Item name="title" label="商品名称" rules={[{ required: true, message: '请填写商品名称' }]}>
            <Input placeholder="例如：国标 HRB400 螺纹钢 Φ22" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="brand" label="品牌商标" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="spec" label="规格型号" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="price" label="批发单价 (元)" rules={[{ required: true }]}>
                <InputNumber min={0.01} step={10} style={{ width: '100%' }} prefix="¥" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unit" label="计量单位">
                <Input placeholder="吨 / 根 / 件" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="stock" label="现货库存" rules={[{ required: true }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="indId" label="所属行业" rules={[{ required: true }]}>
                <Select
                  options={industries.map(i => ({ label: i.name, value: i.indId }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="catId" label="所属分类" rules={[{ required: true }]}>
                <Select
                  options={categories.map(c => ({ label: c.name, value: c.catId }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="coverUrl" label="商品封面图 URL">
            <Select
              options={[
                { label: '钢材物料图 (products/1.jpg)', value: '/products/1.jpg' },
                { label: '水泥物料图 (products/2.jpg)', value: '/products/2.jpg' },
                { label: '管材物料图 (products/3.jpg)', value: '/products/3.jpg' },
                { label: '纺织布料图 (products/4.jpg)', value: '/products/4.jpg' },
                { label: '化工油料图 (products/8.jpg)', value: '/products/8.jpg' },
                { label: '电子芯片图 (products/9.jpg)', value: '/products/9.jpg' }
              ]}
            />
          </Form.Item>

          <Form.Item name="detail" label="商品详情描述">
            <Input.TextArea rows={3} placeholder="详细描述产品性能、质保说明、出库发运标准等..." />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{
              height: '44px',
              fontSize: '15px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
              border: 'none',
              marginTop: '12px'
            }}
          >
            确认上架商品
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
