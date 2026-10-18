import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Tag } from 'antd'
import { MessageOutlined, CloseOutlined, SendOutlined, CustomerServiceOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

interface Message {
  id: number
  sender: 'user' | 'agent'
  text: string
  time: string
}

const QUICK_QUESTIONS = [
  '如何注册',
  '两步验证',
  '找商品',
  '购物车结算',
  '商户入驻',
  '我的钱包',
  '企业账期',
  '积分怎么用'
]

export const SupportChat: React.FC = () => {
  const { askSupport } = useStore()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [visitorToken] = useState(() => {
    let t = localStorage.getItem('ll_visitor_token')
    if (!t) {
      t = 'vis_' + Math.random().toString(36).slice(2)
      localStorage.setItem('ll_visitor_token', t)
    }
    return t
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'agent',
      text: '您好！我是 LANLinkshopping 专属客服。请咨询平台账号注册与登录、商品浏览、购物车与订单、商户入驻、钱包与账期、会员与活动、站内消息或 Cookie 设置等已收录问题。',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim()
    if (!q) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { id: Date.now(), sender: 'user', text: q, time: now }
    setMessages(prev => [...prev, userMsg])
    if (!questionText) setInput('')
    setLoading(true)

    try {
      const res = await askSupport(q, visitorToken)
      const agentMsg: Message = {
        id: Date.now() + 1,
        sender: 'agent',
        text: res.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMsg])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: '客服暂时无法响应，请稍后重试。',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="support-floating-btn">
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<CustomerServiceOutlined />}
          onClick={() => setOpen(prev => !prev)}
          style={{
            height: '48px',
            padding: '0 20px',
            background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
            borderColor: 'var(--ll-brand-gold)',
            color: '#fff',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(19, 35, 58, 0.3)'
          }}
        >
          {open ? '关闭客服' : '专属客服'}
        </Button>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            right: '28px',
            bottom: '88px',
            width: '380px',
            maxWidth: 'calc(100vw - 40px)',
            height: '520px',
            maxHeight: 'calc(100vh - 120px)',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.25)',
            border: '1px solid #e2e8f0',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, var(--ll-navy), #233f5f)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--ll-primary)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff'
                }}
              >
                <CustomerServiceOutlined />
              </div>
              <div>
                <strong style={{ fontSize: '15px' }}>LANLink 知识库客服</strong>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>平台权威答疑 · 7x24 在线</div>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined style={{ color: '#fff' }} />}
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Quick Questions Banner */}
          <div
            style={{
              padding: '8px 12px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '6px'
            }}
          >
            {QUICK_QUESTIONS.map(q => (
              <Tag
                key={q}
                style={{ cursor: 'pointer', margin: 0 }}
                color="blue"
                onClick={() => handleSend(q)}
              >
                {q}
              </Tag>
            ))}
          </div>

          {/* Messages Body */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#f8fafc'
            }}
          >
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    background: m.sender === 'user' ? 'var(--ll-primary)' : '#fff',
                    color: m.sender === 'user' ? '#fff' : 'var(--ll-ink)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    wordBreak: 'break-word'
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
                  {m.time}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', color: '#94a3b8', fontSize: '12px' }}>
                客服正在查找知识库...
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
            <Input
              value={input}
              placeholder="请输入您要咨询的问题..."
              onChange={e => setInput(e.target.value)}
              onPressEnter={() => handleSend()}
              disabled={loading}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => handleSend()}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  )
}
