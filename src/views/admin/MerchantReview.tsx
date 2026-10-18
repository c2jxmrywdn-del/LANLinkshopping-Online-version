import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Button, Radio, Input, Modal, message, Space, Tooltip, Drawer, Descriptions } from 'antd'
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useStore } from '../../store/storeContext'
import { Merchant } from '../../types'

export const MerchantReview: React.FC = () => {
  const navigate = useNavigate()
  const { merchants, reviewMerchant } = useStore()
  const [filter, setFilter] = useState<number | null>(null)
  const [keyword, setKeyword] = useState('')
  const [rejectModalMer, setRejectModalMer] = useState<Merchant | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [drawerMer, setDrawerMer] = useState<Merchant | null>(null)

  const filteredMerchants = merchants.filter(m => {
    if (filter !== null && m.reviewStatus !== filter) return false
    if (keyword) {
      const matchName = m.enterprise?.name?.toLowerCase().includes(keyword.toLowerCase())
      const matchId = String(m.merId).includes(keyword)
      const matchTax = m.taxRegNo?.includes(keyword)
      if (!matchName && !matchId && !matchTax) return false
    }
    return true
  })

  const handleApprove = (m: Merchant) => {
    reviewMerchant(m.merId, 1)
    message.success(`商户 #${m.merId} 审核通过！该商户已具备商品上架权限。`)
  }

  const handleConfirmReject = () => {
    if (!rejectModalMer) return
    if (!rejectReason.trim()) {
      message.warning('请填写驳回原因')
      return
    }
    reviewMerchant(rejectModalMer.merId, 2, rejectReason.trim())
    message.info(`商户 #${rejectModalMer.merId} 申请已驳回`)
    setRejectModalMer(null)
    setRejectReason('')
  }

  const columns = [
    { title: '商户ID', dataIndex: 'merId', key: 'id', width: 90 },
    {
      title: '企业主体名称',
      key: 'name',
      render: (_: any, r: Merchant) => (
        <div>
          <b>{r.enterprise?.name || '华晨建材集团有限公司'}</b>
          <div style={{ color: '#64748b', fontSize: '12px' }}>信用代码：{r.enterprise?.creditCode || r.taxRegNo}</div>
        </div>
      )
    },
    { title: '主体类型', dataIndex: 'regType', key: 'type', width: 110 },
    {
      title: '注册资本',
      dataIndex: 'regCapital',
      key: 'cap',
      width: 140,
      render: (v: number) => `¥${v ? v.toLocaleString() : '0'}`
    },
    {
      title: '纳税资质',
      key: 'tax',
      width: 110,
      render: (_: any, r: Merchant) => (
        <Tag color={r.taxStatus === 1 ? 'green' : 'default'}>
          {r.taxStatus === 1 ? '纳税稳定' : '待补充'}
        </Tag>
      )
    },
    {
      title: '审核状态',
      key: 'status',
      width: 120,
      render: (_: any, r: Merchant) => {
        if (r.reviewStatus === 1) return <Tag color="green">审核通过</Tag>
        if (r.reviewStatus === 2) {
          return (
            <Tooltip title={`驳回原因：${r.rejectReason || '未填写'}`}>
              <Tag color="red" style={{ cursor: 'pointer' }}>已驳回 ⓘ</Tag>
            </Tooltip>
          )
        }
        return <Tag color="orange">待审核</Tag>
      }
    },
    {
      title: '操作',
      key: 'op',
      width: 220,
      render: (_: any, r: Merchant) => (
        <Space size="small">
          <Button size="small" onClick={() => setDrawerMer(r)}>快速查看</Button>
          <Button size="small" type="link" onClick={() => navigate(`/admin/merchants/${r.merId}`)}>档案详情</Button>
          {r.reviewStatus !== 1 && (
            <Button size="small" type="primary" onClick={() => handleApprove(r)}>通过</Button>
          )}
          {r.reviewStatus !== 2 && (
            <Button size="small" danger onClick={() => setRejectModalMer(r)}>驳回</Button>
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
            供应商与商户入驻管理
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            严格审核商户资质、统一社会信用代码与近3个月纳税记录。
          </p>
        </div>

        <Space>
          <Input.Search
            placeholder="搜索企业/商户ID"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            style={{ width: '220px' }}
            allowClear
          />
          <Radio.Group value={filter} onChange={e => setFilter(e.target.value)} buttonStyle="solid">
            <Radio.Button value={null}>全部</Radio.Button>
            <Radio.Button value={0}>待审核</Radio.Button>
            <Radio.Button value={1}>已通过</Radio.Button>
            <Radio.Button value={2}>已驳回</Radio.Button>
          </Radio.Group>
        </Space>
      </div>

      <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <Table
          dataSource={filteredMerchants}
          columns={columns}
          rowKey="merId"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* Reject Modal */}
      <Modal
        open={!!rejectModalMer}
        title="驳回商户入驻申请"
        onCancel={() => {
          setRejectModalMer(null)
          setRejectReason('')
        }}
        onOk={handleConfirmReject}
        okText="确认驳回"
        cancelText="取消"
      >
        <div style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
          驳回对象：<b>{rejectModalMer?.enterprise?.name || `商户 #${rejectModalMer?.merId}`}</b>
        </div>
        <Input.TextArea
          rows={3}
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
          placeholder="说明需要商户补充或整改的材料（例如：执照不清晰/纳税记录缺失）"
        />
      </Modal>

      {/* Quick View Drawer */}
      <Drawer
        open={!!drawerMer}
        title="商户快速档案预览"
        width={500}
        onClose={() => setDrawerMer(null)}
      >
        {drawerMer && (
          <div>
            <Descriptions title="工商与注册信息" column={1} bordered size="small" style={{ marginBottom: '20px' }}>
              <Descriptions.Item label="企业名称">{drawerMer.enterprise?.name || '华晨建材集团有限公司'}</Descriptions.Item>
              <Descriptions.Item label="社会信用代码">{drawerMer.enterprise?.creditCode || drawerMer.taxRegNo}</Descriptions.Item>
              <Descriptions.Item label="注册资本">¥{drawerMer.regCapital ? drawerMer.regCapital.toLocaleString() : '0'}</Descriptions.Item>
              <Descriptions.Item label="合作模式">{drawerMer.joinType}</Descriptions.Item>
              <Descriptions.Item label="申请时间">{drawerMer.createTime}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="资质与核验" column={1} bordered size="small" style={{ marginBottom: '20px' }}>
              <Descriptions.Item label="营业执照">
                <Tag color="green">已核验合格</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="税务缴纳凭证">
                <Tag color="green">近 3 个月完税记录齐全</Tag>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', gap: '10px' }}>
              {drawerMer.reviewStatus !== 1 && (
                <Button type="primary" onClick={() => { handleApprove(drawerMer); setDrawerMer(null) }}>
                  审核通过
                </Button>
              )}
              {drawerMer.reviewStatus !== 2 && (
                <Button danger onClick={() => { setRejectModalMer(drawerMer); setDrawerMer(null) }}>
                  驳回申请
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
