import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Row, Col, Statistic, Alert, Modal, Input, message } from 'antd'
import { ExperimentOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { mockKnowledgeBase } from '../../store/mockData'

interface ConversationRecord {
  id: string
  conversationNo: string
  subject: string
  customerName: string
  category: string
  status: 'open' | 'waiting_agent' | 'waiting_customer' | 'resolved'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  lastMessagePreview: string
  updatedAt: string
}

export const CustomerCommunicationCenter: React.FC = () => {
  const navigate = useNavigate()
  const [selectedConversation, setSelectedConversation] = useState<ConversationRecord | null>(null)
  const [replyText, setReplyText] = useState('')

  const [conversations, setConversations] = useState<ConversationRecord[]>([
    {
      id: 'c1',
      conversationNo: 'CS-20261018-001',
      subject: '关于大宗电子元器件采购增值税专票开具流程',
      customerName: '苏州明锐电子有限公司',
      category: '发票与结算',
      status: 'waiting_agent',
      priority: 'high',
      lastMessagePreview: '请问我们上周五完成的芯片采购订单，何时可以开具13%增值税专用发票？',
      updatedAt: '2026-10-18 11:20:15'
    },
    {
      id: 'c2',
      conversationNo: 'CS-20261018-002',
      subject: '企业30天免息账期授信申请进度查询',
      customerName: '深圳创智供应链科技有限公司',
      category: '企业账期',
      status: 'open',
      priority: 'urgent',
      lastMessagePreview: '提交了营业执照和上一年度财报，请问风控授信额度何时审批完成？',
      updatedAt: '2026-10-18 10:45:00'
    },
    {
      id: 'c3',
      conversationNo: 'CS-20261018-003',
      subject: '智能数控机床售后安装与现场调试指导',
      customerName: '常州重工制造装备厂',
      category: '售后技术服务',
      status: 'waiting_customer',
      priority: 'normal',
      lastMessagePreview: '工程师已安排于明天上午9点到达工厂，请准备好380V工业动力电源。',
      updatedAt: '2026-10-18 09:15:30'
    },
    {
      id: 'c4',
      conversationNo: 'CS-20261018-004',
      subject: '工业防护手套整箱批发订购规格咨询',
      customerName: '武汉光谷实业有限公司',
      category: '商品咨询',
      status: 'resolved',
      priority: 'low',
      lastMessagePreview: '已确认整箱50包起批，享受金牌会员9折优惠与全国包邮。',
      updatedAt: '2026-10-17 16:30:10'
    }
  ])

  const statusLabel = (st: string) => {
    switch (st) {
      case 'open': return <Tag color="orange">待处理</Tag>
      case 'waiting_agent': return <Tag color="red">待客服回复</Tag>
      case 'waiting_customer': return <Tag color="blue">等待客户反馈</Tag>
      case 'resolved': return <Tag color="green">已解决归档</Tag>
      default: return <Tag>{st}</Tag>
    }
  }

  const priorityLabel = (p: string) => {
    switch (p) {
      case 'urgent': return <Tag color="error">紧急</Tag>
      case 'high': return <Tag color="warning">高</Tag>
      case 'normal': return <Tag color="processing">普通</Tag>
      default: return <Tag>低</Tag>
    }
  }

  const handleReply = () => {
    if (!replyText.trim() || !selectedConversation) return
    setConversations(conversations.map(c => {
      if (c.id === selectedConversation.id) {
        return {
          ...c,
          status: 'waiting_customer',
          lastMessagePreview: `【客服回复】：${replyText}`,
          updatedAt: '刚刚'
        }
      }
      return c
    }))
    message.success('回复已送达客户并记录审计日志')
    setSelectedConversation(null)
    setReplyText('')
  }

  const pendingCount = conversations.filter(c => c.status === 'open' || c.status === 'waiting_agent').length

  const columns = [
    {
      title: '工单/会话编号',
      dataIndex: 'conversationNo',
      key: 'conversationNo',
      render: (text: string, r: ConversationRecord) => (
        <div>
          <Button type="link" onClick={() => setSelectedConversation(r)} style={{ padding: 0, fontWeight: 600 }}>
            {text}
          </Button>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{r.customerName}</div>
        </div>
      )
    },
    {
      title: '咨询主题',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string) => <div style={{ maxWidth: 300 }}>{text}</div>
    },
    {
      title: '业务分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <Tag>{text}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => statusLabel(text)
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => priorityLabel(text)
    },
    {
      title: '最新消息预览',
      dataIndex: 'lastMessagePreview',
      key: 'lastMessagePreview',
      ellipsis: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, r: ConversationRecord) => (
        <Space>
          <Button size="small" type="primary" onClick={() => setSelectedConversation(r)}>
            处理
          </Button>
          {r.status !== 'resolved' && (
            <Button
              size="small"
              onClick={() => {
                setConversations(conversations.map(c => c.id === r.id ? { ...c, status: 'resolved' } : c))
                message.success('工单已标记为已解决')
              }}
            >
              归档
            </Button>
          )}
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '0 8px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #13233a 0%, #1c3656 60%, #274563 100%)',
          padding: '24px 32px',
          borderRadius: '12px',
          color: '#fff',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#c8a45c', letterSpacing: '2px', fontWeight: 700, marginBottom: '6px' }}>
            SUPPORT OPERATIONS · LANLINKSHOPPING
          </div>
          <h2 style={{ color: '#fff', margin: '0 0 8px', fontSize: '24px' }}>
            客户沟通中心 与 智能问答闭环
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px', maxWidth: '640px' }}>
            统一收件箱、人工跟进与受控知识沉淀。遵循“先解决问题，再审核学习；脱敏受控发布”的安全准则。
          </p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => message.info('数据已刷新')}>
            刷新
          </Button>
          <Button
            type="primary"
            icon={<ExperimentOutlined />}
            style={{ background: '#c8a45c', borderColor: '#c8a45c', color: '#13233a', fontWeight: 600 }}
            onClick={() => navigate('/admin/support-learning')}
          >
            进入学习沙盒
          </Button>
        </Space>
      </div>

      <Alert
        message="数据保护与知识沉淀规范"
        description="所有网站客服会话在保存与提炼知识前进行个人信息与敏感凭据脱敏。对话只能生成待审核候选，需由管理员在沙盒试跑通过后才能更新线上问答库。"
        type="info"
        showIcon
        style={{ marginBottom: '20px' }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic title="待处理客服会话" value={pendingCount} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic title="今日总会话数" value={conversations.length} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic title="沉淀知识库条目" value={mockKnowledgeBase.length} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic title="知识问答准召率" value={98.6} suffix="%" valueStyle={{ color: '#389e0d' }} />
          </Card>
        </Col>
      </Row>

      <Card title="最近客服会话记录" bordered={false}>
        <Table
          columns={columns}
          dataSource={conversations}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* Reply Modal */}
      <Modal
        title={`处理客户工单 · ${selectedConversation?.conversationNo || ''}`}
        open={Boolean(selectedConversation)}
        onCancel={() => setSelectedConversation(null)}
        footer={[
          <Button key="cancel" onClick={() => setSelectedConversation(null)}>关闭</Button>,
          <Button
            key="sandbox"
            icon={<ExperimentOutlined />}
            onClick={() => {
              navigate('/admin/support-learning')
            }}
          >
            沉淀至学习沙盒
          </Button>,
          <Button key="submit" type="primary" onClick={handleReply}>
            发送回复并更新状态
          </Button>
        ]}
        width={680}
      >
        {selectedConversation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: '#64748b' }}>客户单位：<b>{selectedConversation.customerName}</b></div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', marginTop: '4px' }}>
                {selectedConversation.subject}
              </div>
              <div style={{ marginTop: '8px', padding: '10px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', fontSize: '12px' }}>客户最新留言：</span>
                <p style={{ margin: '4px 0 0', color: '#1e293b' }}>{selectedConversation.lastMessagePreview}</p>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>回复内容（回复后将直接同步至客户通知并发送脱敏知识提炼）：</div>
              <Input.TextArea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="输入专业、详尽的业务解答..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
export default CustomerCommunicationCenter
