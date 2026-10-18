import React, { useState } from 'react'
import { Card, Table, Input, Button, Space, Tag, message } from 'antd'
import { SearchOutlined, DownloadOutlined, ReloadOutlined, AuditOutlined } from '@ant-design/icons'

interface AuditLogRecord {
  id: string
  time: string
  userId: string
  operatorName: string
  action: string
  detail: string
  clientIp: string
  userAgent: string
}

export const AdminAuditLog: React.FC = () => {
  const [searchAction, setSearchAction] = useState('')
  const [searchUserId, setSearchUserId] = useState('')

  const [logs] = useState<AuditLogRecord[]>([
    {
      id: '10081',
      time: '2026-10-18 11:42:05',
      userId: '1001',
      operatorName: '平台超级管理员',
      action: 'MERCHANT_APPROVE',
      detail: '审批通过商户入驻：常州重工精机制造有限公司 (MCH-20261015-001)，开通工业品经营品类',
      clientIp: '183.136.225.42',
      userAgent: 'Chrome 128.0 (Windows NT 10.0; Win64)'
    },
    {
      id: '10080',
      time: '2026-10-18 11:15:30',
      userId: '1001',
      operatorName: '平台超级管理员',
      action: 'CREDIT_LIMIT_UPDATE',
      detail: '调整苏州明锐电子企业账期额度：由 ¥200,000 上调至 ¥500,000，账期周期 30天',
      clientIp: '183.136.225.42',
      userAgent: 'Chrome 128.0 (Windows NT 10.0; Win64)'
    },
    {
      id: '10079',
      time: '2026-10-18 10:30:18',
      userId: '1002',
      operatorName: '陈志远 (采购主管)',
      action: 'ORDER_CREATE',
      detail: '提交大宗采购订单 ORD-20261018-0091，结算方式：企业月结账期，总额：¥42,800.00',
      clientIp: '121.229.41.98',
      userAgent: 'Firefox 130.0 (macOS)'
    },
    {
      id: '10078',
      time: '2026-10-18 09:50:11',
      userId: '1003',
      operatorName: '李维东 (店铺店长)',
      action: 'PRODUCT_PUBLISH',
      detail: '上架新供应链商品：【精密伺服电机驱动器 AC 220V】 库存 500台，单价 ¥1,850.00',
      clientIp: '114.218.15.63',
      userAgent: 'Chrome 128.0 (Windows NT 10.0)'
    },
    {
      id: '10077',
      time: '2026-10-18 08:24:00',
      userId: '1001',
      operatorName: '平台超级管理员',
      action: 'CACHE_CLEAR',
      detail: '手动刷新全站类目缓存与智能客服问答索引树',
      clientIp: '183.136.225.42',
      userAgent: 'Chrome 128.0 (Windows NT 10.0; Win64)'
    },
    {
      id: '10076',
      time: '2026-10-17 18:12:44',
      userId: '1004',
      operatorName: '张敏',
      action: 'ENABLE_2FA',
      detail: '用户自主启用 TOTP 两步身份验证器并绑定成功',
      clientIp: '222.92.112.5',
      userAgent: 'Safari 17.5 (iPhone; iOS 17.5)'
    }
  ])

  const actionColor = (action: string) => {
    switch (action) {
      case 'MERCHANT_APPROVE': return 'green'
      case 'CREDIT_LIMIT_UPDATE': return 'purple'
      case 'ORDER_CREATE': return 'blue'
      case 'PRODUCT_PUBLISH': return 'cyan'
      case 'CACHE_CLEAR': return 'orange'
      case 'ENABLE_2FA': return 'magenta'
      case 'PASSWORD_CHANGE': return 'volcano'
      default: return 'default'
    }
  }

  const filteredLogs = logs.filter(log => {
    if (searchAction && !log.action.toLowerCase().includes(searchAction.toLowerCase())) return false
    if (searchUserId && !log.userId.includes(searchUserId) && !log.operatorName.includes(searchUserId)) return false
    return true
  })

  const handleExportCSV = () => {
    const headers = ['ID', '操作时间', '用户ID', '操作人', '操作类型', '详情', '客户端IP', '客户端设备']
    const rows = filteredLogs.map(l => [
      l.id,
      l.time,
      l.userId,
      `"${l.operatorName}"`,
      l.action,
      `"${l.detail.replace(/"/g, '""')}"`,
      l.clientIp,
      `"${l.userAgent}"`
    ])
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit_logs_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    message.success('审计日志已导出为 CSV 文件')
  }

  const columns = [
    {
      title: '日志ID',
      dataIndex: 'id',
      key: 'id',
      width: 90
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      width: 170
    },
    {
      title: '操作人',
      key: 'operator',
      width: 160,
      render: (_: any, r: AuditLogRecord) => (
        <div>
          <b>{r.operatorName}</b>
          <div style={{ fontSize: '11px', color: '#64748b' }}>UID: {r.userId}</div>
        </div>
      )
    },
    {
      title: '动作类型',
      dataIndex: 'action',
      key: 'action',
      width: 170,
      render: (act: string) => <Tag color={actionColor(act)}>{act}</Tag>
    },
    {
      title: '详细操作记录',
      dataIndex: 'detail',
      key: 'detail'
    },
    {
      title: '客户端IP',
      dataIndex: 'clientIp',
      key: 'clientIp',
      width: 140
    },
    {
      title: '终端环境',
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 180,
      ellipsis: true
    }
  ]

  return (
    <div>
      <Card
        title={
          <Space>
            <AuditOutlined style={{ color: 'var(--ll-blue)' }} />
            <span>系统安全与运维审计日志</span>
          </Space>
        }
        extra={
          <Space wrap>
            <Input
              placeholder="按操作类型过滤 (如 ORDER)"
              value={searchAction}
              onChange={(e) => setSearchAction(e.target.value)}
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              allowClear
            />
            <Input
              placeholder="用户ID或姓名"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              style={{ width: 150 }}
              allowClear
            />
            <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
              导出 CSV
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => message.info('日志已刷新')}>
              刷新
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredLogs}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}
export default AdminAuditLog
