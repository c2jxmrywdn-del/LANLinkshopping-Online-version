import React, { useState } from 'react'
import { Card, Table, Tag, Button, Input, Select, Modal, message, Space } from 'antd'
import { useStore } from '../../store/storeContext'
import { Product } from '../../types'

export const AdminProducts: React.FC = () => {
  const { products, updateProductStatus, reviewProduct } = useStore()
  const [keyword, setKeyword] = useState('')
  const [reviewStatus, setReviewStatus] = useState<number | null>(null)
  const [saleStatus, setSaleStatus] = useState<number | null>(null)
  const [rejectModal, setRejectModal] = useState<Product | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const filtered = products.filter(p => {
    if (keyword && !p.title.includes(keyword) && !p.brand.includes(keyword)) return false
    if (reviewStatus !== null && p.reviewStatus !== reviewStatus) return false
    if (saleStatus !== null && p.status !== saleStatus) return false
    return true
  })

  const handleApprove = (p: Product) => {
    reviewProduct(p.prodId, 1)
    message.success(`商品 [${p.title}] 审核通过并已上架`)
  }

  const handleConfirmReject = () => {
    if (!rejectModal) return
    if (!rejectReason.trim()) {
      message.warning('请填写驳回原因')
      return
    }
    reviewProduct(rejectModal.prodId, 2, rejectReason.trim())
    message.info(`商品 [${rejectModal.title}] 已驳回`)
    setRejectModal(null)
    setRejectReason('')
  }

  const columns = [
    { title: 'ID', dataIndex: 'prodId', key: 'id', width: 80 },
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      render: (v: string, r: Product) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={r.coverUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
          <div>
            <b>{v}</b>
            <div style={{ fontSize: '11px', color: '#64748b' }}>品牌：{r.brand} · 规格：{r.spec}</div>
          </div>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (v: number) => `¥${v.toFixed(2)}`
    },
    { title: '库存', dataIndex: 'stock', key: 'stock', width: 90 },
    { title: '销量', dataIndex: 'sales', key: 'sales', width: 90 },
    {
      title: '审核状态',
      key: 'review',
      width: 120,
      render: (_: any, r: Product) => {
        if (r.reviewStatus === 1) return <Tag color="green">审核通过</Tag>
        if (r.reviewStatus === 2) return <Tag color="red">审核驳回</Tag>
        return <Tag color="orange">待审核</Tag>
      }
    },
    {
      title: '在架状态',
      key: 'status',
      width: 100,
      render: (_: any, r: Product) => (
        <Tag color={r.status === 1 ? 'blue' : 'default'}>{r.status === 1 ? '可售' : '已下架'}</Tag>
      )
    },
    {
      title: '管理操作',
      key: 'op',
      width: 180,
      render: (_: any, r: Product) => (
        <Space size="small">
          {r.reviewStatus !== 1 && (
            <Button size="small" type="primary" onClick={() => handleApprove(r)}>通过</Button>
          )}
          {r.reviewStatus !== 2 && (
            <Button size="small" danger onClick={() => setRejectModal(r)}>驳回</Button>
          )}
          {r.reviewStatus === 1 && r.status === 1 && (
            <Button size="small" danger onClick={() => updateProductStatus(r.prodId, 0)}>下架</Button>
          )}
          {r.reviewStatus === 1 && r.status === 0 && (
            <Button size="small" onClick={() => updateProductStatus(r.prodId, 1)}>上架</Button>
          )}
        </Space>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
            商城全量商品管理
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            审核入驻商户提报的原材料物料、把控价格规范与上下架调控。
          </p>
        </div>

        <Space>
          <Input.Search
            placeholder="搜索商品名/品牌"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            style={{ width: '200px' }}
            allowClear
          />
          <Select
            placeholder="审核状态"
            style={{ width: '130px' }}
            allowClear
            value={reviewStatus}
            onChange={setReviewStatus}
            options={[
              { label: '全部审核', value: null },
              { label: '待审核', value: 0 },
              { label: '审核通过', value: 1 },
              { label: '审核驳回', value: 2 }
            ]}
          />
          <Select
            placeholder="可售状态"
            style={{ width: '120px' }}
            allowClear
            value={saleStatus}
            onChange={setSaleStatus}
            options={[
              { label: '全部状态', value: null },
              { label: '可售', value: 1 },
              { label: '已下架', value: 0 }
            ]}
          />
        </Space>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="prodId"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <Modal
        open={!!rejectModal}
        title="驳回商品上架申请"
        onCancel={() => setRejectModal(null)}
        onOk={handleConfirmReject}
        okText="确认驳回"
        cancelText="取消"
      >
        <div style={{ marginBottom: '10px', fontSize: '13px' }}>
          驳回商品：<b>{rejectModal?.title}</b>
        </div>
        <Input.TextArea
          rows={3}
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
          placeholder="说明驳回整改原因（例如：价格异常 / 分类不符 / 缺乏质保检测单）"
        />
      </Modal>
    </div>
  )
}
