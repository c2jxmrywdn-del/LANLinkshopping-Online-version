import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Row, Col, Tag } from 'antd'
import { ShopOutlined, TransactionOutlined, RocketOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { BrandWordmark } from '../components/BrandWordmark'
import { AuthorCard } from '../components/AuthorCard'

export const AboutUs: React.FC = () => {
  const navigate = useNavigate()

  const capabilities = [
    {
      index: '01',
      title: '多行业大宗商品直采',
      desc: '覆盖建筑建材、纺织服装、石油化工、电子元器件四大实体工业领域，聚合源头实体工厂。',
      icon: <ShopOutlined style={{ fontSize: '24px', color: 'var(--ll-primary)' }} />
    },
    {
      index: '02',
      title: '灵活对公与企业授信账期',
      desc: '打破传统现金束缚，提供 30~90 天周期账期授信与企业钱包秒级自动扣款对账。',
      icon: <TransactionOutlined style={{ fontSize: '24px', color: '#10b981' }} />
    },
    {
      index: '03',
      title: '全周期商户流量与增长运营',
      desc: '商户入驻资质严格核验，专属后台提供流量来源洞察、转化漏斗分析与店铺经营诊断。',
      icon: <RocketOutlined style={{ fontSize: '24px', color: '#f59e0b' }} />
    },
    {
      index: '04',
      title: '受控知识沉淀与客服智能',
      desc: '基于权威知识库的高可靠客服响应，支持学习沙盒隔离测试与人工审核沉淀。',
      icon: <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#8b5cf6' }} />
    }
  ]

  return (
    <div className="main-container" style={{ maxWidth: '1040px' }}>
      {/* Hero */}
      <section
        style={{
          borderRadius: '28px',
          padding: '50px 60px',
          background: 'var(--ll-brand-hero-gradient)',
          color: '#fff',
          boxShadow: 'var(--ll-glass-shadow)',
          marginBottom: '32px'
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.16em', color: 'var(--ll-brand-gold-soft)' }}>
          ABOUT LANLINK SHOPPING
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          让采购、商品与增长<br />
          <span style={{ color: 'var(--ll-brand-gold-soft)' }}>在同一个供应链网络里连接。</span>
        </h1>
        <p style={{ maxWidth: '620px', color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
          LANLinkshopping 面向实体产业 B2B 场景，将商品展示、大宗交易、企业授信、会员积分、商户经营与平台运营汇聚到同一套数字化交易链路中。
        </p>

        <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
          <Button
            type="primary"
            size="large"
            style={{
              background: 'linear-gradient(100deg, var(--ll-brand-gold), #F59E0B)',
              color: 'var(--ll-brand-base)',
              border: 'none',
              fontWeight: 700
            }}
            onClick={() => navigate('/mall')}
          >
            进入商城选品 →
          </Button>
          <Button
            size="large"
            ghost
            style={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => {
              const el = document.getElementById('contact')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            联系平台
          </Button>
        </div>
      </section>

      {/* Capabilities */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ll-navy)', marginBottom: '16px' }}>
          平台四大核心支柱
        </h2>
        <Row gutter={[20, 20]}>
          {capabilities.map(c => (
            <Col key={c.index} xs={24} sm={12}>
              <Card
                style={{
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  height: '100%',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: '#f8fafc',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--ll-brand-red)', fontWeight: 800, letterSpacing: '0.1em' }}>
                      {c.index}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '4px 0 6px', color: 'var(--ll-navy)' }}>
                      {c.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Author & Project Details */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ll-navy)', marginBottom: '16px' }}>
          项目开发与学术归属
        </h2>
        <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', background: 'var(--ll-brand-base)', color: '#fff' }}>
          <AuthorCard variant="detailed" showSocials />
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
            本项目依据重庆软件技术 2404 毕业设计《LANLinkshopping 项目方案》与《Web 网站搭建方案》规范落地实施，全栈实现了认证鉴权、商户入驻、商品商城、购物车、订单结算支付以及链式业务拓展设计。
          </div>
        </Card>
      </div>

      {/* Contact Section */}
      <div id="contact" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ll-navy)', marginBottom: '16px' }}>
          平台联系与咨询
        </h2>
        <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={14}>
              <div style={{ fontSize: '14px', lineHeight: 2 }}>
                <div><b>企业地址：</b> 重庆市两江数字经济产业园软件技术研发中心</div>
                <div><b>业务咨询热线：</b> 400-888-LANLINK (09:00 - 18:00 工作日)</div>
                <div><b>商户入驻咨询：</b> merchant@lanlink-shopping.com</div>
                <div><b>大宗采购直连：</b> b2b-trade@lanlink-shopping.com</div>
              </div>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: 'center' }}>
              <img
                src="/assets/contact/whatsapp-qr.png"
                alt="联系二维码"
                style={{ width: '130px', height: '130px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                扫码添加官方企业微信顾问
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* IP Terms */}
      <div id="terms">
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ll-navy)', marginBottom: '16px' }}>
          知识产权与声明
        </h2>
        <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', lineHeight: 1.8 }}>
          <p>
            LANLinkshopping 平台所有视觉组件、交互代码、品牌色板标准与系统业务架构，均为该毕业设计项目作者所有。
            未经原作者与学校官方书面授权，任何机构与个人不得擅自抄袭、冒用、反编译或用于未经允许的商业盈利行为。
          </p>
        </Card>
      </div>
    </div>
  )
}
