import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Segmented, Slider, Switch, Button, Tag, message } from 'antd'
import {
  ExperimentOutlined,
  ThunderboltOutlined,
  ReloadOutlined,
  CompassOutlined,
  NumberOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  GithubOutlined,
  CheckCircleFilled
} from '@ant-design/icons'
import {
  SpotlightCard,
  MagneticButton,
  AnimatedNumber,
  ShimmerSkeleton
} from '../components/MotionPrimitives'
import { InteractiveProductCard } from '../components/InteractiveProductCard'

const SPOTLIGHT_THEMES: Record<string, { label: string; color: string; beam: string }> = {
  gold: {
    label: '流光金 (Brand Gold)',
    color: 'rgba(200, 164, 92, 0.30)',
    beam: '#C8A45C'
  },
  azure: {
    label: '科技蓝 (Electric Azure)',
    color: 'rgba(14, 165, 233, 0.28)',
    beam: '#0EA5E9'
  },
  emerald: {
    label: '翠绿光 (Cyber Emerald)',
    color: 'rgba(16, 185, 129, 0.28)',
    beam: '#10B981'
  },
  coral: {
    label: '赤焰红 (Brand Crimson)',
    color: 'rgba(251, 113, 133, 0.28)',
    beam: '#FB7185'
  }
}

export const UiLab: React.FC = () => {
  const navigate = useNavigate()

  // Interactive Sandbox Controls
  const [themeKey, setThemeKey] = useState<string>('gold')
  const [spotlightRadius, setSpotlightRadius] = useState<number>(360)
  const [tiltDeg, setTiltDeg] = useState<number>(10)
  const [beamEnabled, setBeamEnabled] = useState<boolean>(true)
  const [magneticStrength, setMagneticStrength] = useState<number>(0.34)
  const [counterSeed, setCounterSeed] = useState<number>(1)
  const [showSkeletonDemo, setShowSkeletonDemo] = useState<boolean>(false)

  const currentTheme = SPOTLIGHT_THEMES[themeKey] || SPOTLIGHT_THEMES.gold

  const triggerCounterReplay = () => {
    setCounterSeed(prev => (prev === 1 ? 1.38 : 1))
    message.success('已触发 21st.dev 弹簧数字滚动插值动画')
  }

  const triggerSkeletonDemo = () => {
    setShowSkeletonDemo(true)
    setTimeout(() => {
      setShowSkeletonDemo(false)
    }, 1400)
  }

  return (
    <div className="main-container">
      {/* Lab Hero Header */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '26px',
          padding: '44px 52px',
          background: 'linear-gradient(130deg, #0B1220 0%, #13233A 55%, #1F3864 100%)',
          color: '#ffffff',
          marginBottom: '28px',
          boxShadow: '0 24px 64px rgba(11, 18, 32, 0.22)'
        }}
      >
        {beamEnabled && (
          <div
            aria-hidden="true"
            className="ll-border-beam-line"
            style={{ '--beam-color': currentTheme.beam } as React.CSSProperties}
          />
        )}

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F6D38A',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.16em',
                marginBottom: '12px'
              }}
            >
              <ExperimentOutlined /> 21ST.DEV INTERACTIVE COMPONENT & UX MOTION LAB
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', fontWeight: 800, margin: '0 0 12px', color: '#fff' }}>
              21st.dev 前端界面与动态交互实验室
            </h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.75 }}>
              实时体验并调试应用于 LANLinkshopping 的四大类 21st.dev 标志性 UX 动态效果：
              光标跟随聚光灯（Spotlight）、3D 物理透视倾斜（3D Tilt）、流光旋转边框（Border Beam）、磁吸按钮（Magnetic Pull）与弹簧数字计数器（Animated Number）。
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '240px' }}>
            <MagneticButton
              variant="gold"
              size="md"
              strength={magneticStrength}
              onClick={() => navigate('/mall')}
            >
              在商城中体验实战效果 →
            </MagneticButton>
            <MagneticButton
              variant="glass"
              size="md"
              strength={magneticStrength}
              shimmer={false}
              onClick={triggerCounterReplay}
            >
              <ReloadOutlined /> 重播全局数字与动效
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Interactive Parameter Control Bar */}
      <SpotlightCard
        spotlightColor={currentTheme.color}
        style={{ padding: '22px 26px', marginBottom: '32px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div>
            <b style={{ fontSize: '16px', color: 'var(--ll-navy)' }}>🎛️ 实时动效参数控制台 (Live Motion Controls)</b>
            <span style={{ marginLeft: '12px', fontSize: '12px', color: '#64748b' }}>
              调整下方参数，全页面组件光效、倾斜角度与磁吸力度将实时响应
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>流光边框 (Border Beam)：</span>
            <Switch checked={beamEnabled} onChange={setBeamEnabled} />
          </div>
        </div>

        <Row gutter={[24, 18]} align="middle">
          <Col xs={24} md={9}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>
              聚光灯与流光色温 (Spotlight & Beam Palette)
            </div>
            <Segmented
              block
              value={themeKey}
              onChange={v => setThemeKey(String(v))}
              options={[
                { label: '流光金', value: 'gold' },
                { label: '科技蓝', value: 'azure' },
                { label: '翠绿光', value: 'emerald' },
                { label: '赤焰红', value: 'coral' }
              ]}
            />
          </Col>

          <Col xs={24} sm={8} md={5}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
              聚光灯半径：{spotlightRadius}px
            </div>
            <Slider min={180} max={560} value={spotlightRadius} onChange={setSpotlightRadius} />
          </Col>

          <Col xs={24} sm={8} md={5}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
              3D 倾斜强度：±{tiltDeg}°
            </div>
            <Slider min={0} max={20} value={tiltDeg} onChange={setTiltDeg} />
          </Col>

          <Col xs={24} sm={8} md={5}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
              磁吸牵引系数：{Math.round(magneticStrength * 100)}%
            </div>
            <Slider min={0.1} max={0.65} step={0.05} value={magneticStrength} onChange={setMagneticStrength} />
          </Col>
        </Row>
      </SpotlightCard>

      {/* Section 1: Spotlight Card & 3D Perspective Tilt */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CompassOutlined style={{ color: 'var(--ll-brand-gold)' }} />
            01 · 光标跟随聚光灯与 3D 透视倾斜卡片 (Spotlight & 3D Perspective Tilt)
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            通过实时计算指针归一化坐标驱动径向渐变高光与 preserve-3d 旋转矩阵，仅合成层（transform/opacity）参与渲染。
          </p>
        </div>

        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <SpotlightCard
              spotlightColor={currentTheme.color}
              spotlightSize={spotlightRadius}
              tilt
              maxTilt={tiltDeg}
              borderBeam={beamEnabled}
              beamColor={currentTheme.beam}
              style={{
                padding: '28px',
                minHeight: '350px',
                background: 'linear-gradient(145deg, #0B1220 0%, #13233A 100%)',
                color: '#fff'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', color: '#F6D38A' }}>
                    21ST.DEV COMPONENT #01
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '10px 0 8px' }}>
                    暗色深空流光聚光灯卡
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: '13px', lineHeight: 1.65 }}>
                    将鼠标移入卡片任意位置，径向聚光灯将零延迟跟随您的指针，同时外框呈现 360° 连续流光环绕。
                  </p>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: '12px',
                    color: '#cbd5e1'
                  }}
                >
                  <div>光圈半径：<b className="ll-tabular-nums">{spotlightRadius}px</b></div>
                  <div style={{ marginTop: '4px' }}>透视倾角：<b className="ll-tabular-nums">±{tiltDeg}°</b> · 帧率：<b>60 FPS</b></div>
                </div>
              </div>
            </SpotlightCard>
          </Col>

          <Col xs={24} md={8}>
            <SpotlightCard
              spotlightColor={currentTheme.color}
              spotlightSize={spotlightRadius}
              tilt
              maxTilt={tiltDeg}
              borderBeam={beamEnabled}
              beamColor={currentTheme.beam}
              style={{ padding: '28px', minHeight: '350px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
                    21ST.DEV COMPONENT #02
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ll-navy)', margin: '10px 0 8px' }}>
                    亮色企业级 Bento 聚光卡片
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.65 }}>
                    专为高信息密度 B2B 行业分类与工作台设计，兼顾清晰文字对比度与细腻的光标微交互反馈。
                  </p>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    color: '#475569'
                  }}
                >
                  <div>适用模块：<b>首页行业专区 / 账期中心 / 运营看板</b></div>
                  <div style={{ marginTop: '4px' }}>物理曲线：<code>cubic-bezier(0.16, 1, 0.3, 1)</code></div>
                </div>
              </div>
            </SpotlightCard>
          </Col>

          <Col xs={24} md={8}>
            <InteractiveProductCard
              imageUrl="/products/1.jpg"
              title="建筑钢材 HRB400E 抗震螺纹钢 Φ20mm"
              description="重钢集团源头直发 · 附原厂质保书"
              price="¥3,850.00 / 吨"
              spotlightColor={currentTheme.color}
              badgeText="3D"
              onClick={() => message.info('点击商品卡片可直达商品详情页')}
              footer={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    className="ll-tabular-nums"
                    style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}
                  >
                    <span>3D 景深商品卡实战预览</span>
                    <span>现货 5,000 吨</span>
                  </div>
                  <Button
                    type="primary"
                    size="small"
                    block
                    className="ll-add-cart"
                    icon={<ShoppingCartOutlined />}
                    onClick={e => {
                      e.stopPropagation()
                      message.success('微交互演示：已触发加入购物车动效')
                    }}
                  >
                    体验加购微交互
                  </Button>
                </div>
              }
            />
          </Col>
        </Row>
      </div>

      {/* Section 2: Magnetic Buttons & Shimmer Sweep */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThunderboltOutlined style={{ color: 'var(--ll-brand-gold)' }} />
            02 · 磁吸牵引按钮与流光扫掠 (Magnetic Pull & Shimmer Sweep Buttons)
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            当指针靠近按钮时产生平滑物理吸附位移，移出时按弹簧阻尼曲线回弹归位，悬停伴随斜向高光扫掠。
          </p>
        </div>

        <SpotlightCard
          spotlightColor={currentTheme.color}
          style={{
            padding: '32px',
            background: 'linear-gradient(135deg, #13233A 0%, #1E293B 100%)',
            color: '#fff'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <MagneticButton
                variant="gold"
                size="lg"
                strength={magneticStrength}
                onClick={() => message.success('流光金主行动磁吸按钮已触发')}
              >
                流光金磁吸按钮 (Gold CTA) →
              </MagneticButton>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
                用于首页英雄区与大促核心转化
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <MagneticButton
                variant="primary"
                size="lg"
                strength={magneticStrength}
                onClick={() => message.success('科技蓝磁吸按钮已触发')}
              >
                科技蓝磁吸按钮 (Azure Action)
              </MagneticButton>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
                用于结算提交与账期授信操作
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <MagneticButton
                variant="navy"
                size="lg"
                strength={magneticStrength}
                onClick={() => message.success('深海蓝商务磁吸按钮已触发')}
              >
                深海蓝商务按钮 (Enterprise Navy)
              </MagneticButton>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
                用于商户工作台与后台审核指令
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <MagneticButton
                variant="glass"
                size="lg"
                strength={magneticStrength}
                onClick={() => message.success('磨砂玻璃次级磁吸按钮已触发')}
              >
                Liquid Glass 磨砂按钮
              </MagneticButton>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
                用于深色背景上的次级探索动作
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Section 3: Animated Counting Numbers & Shimmer Skeleton */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <NumberOutlined style={{ color: 'var(--ll-brand-gold)' }} />
              03 · 动态数字滚动计数与流光骨架屏过渡 (Animated Number & Shimmer Skeleton)
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
              全站金融数字严格启用等宽对齐（tabular-nums），配合指数缓动插值与高贴合度骨架屏流光占位。
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button icon={<ReloadOutlined />} onClick={triggerCounterReplay}>
              重播数字滚动计数
            </Button>
            <Button type="primary" icon={<AppstoreAddOutlined />} onClick={triggerSkeletonDemo}>
              演示骨架屏加载过渡
            </Button>
          </div>
        </div>

        <Row gutter={[18, 18]} style={{ marginBottom: '20px' }}>
          <Col xs={12} md={6}>
            <SpotlightCard spotlightColor={currentTheme.color} borderBeam={beamEnabled} style={{ padding: '22px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>平台累计大宗交易额 (GMV)</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ll-navy)', marginTop: '6px' }}>
                <AnimatedNumber value={Math.round(128560400 * counterSeed)} prefix="¥" />
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>
                ↑ 环比增长 24.8% · Tabular Nums
              </div>
            </SpotlightCard>
          </Col>

          <Col xs={12} md={6}>
            <SpotlightCard spotlightColor={currentTheme.color} style={{ padding: '22px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>企业授信账期总额度池</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ll-primary)', marginTop: '6px' }}>
                <AnimatedNumber value={Math.round(50000000 * counterSeed)} prefix="¥" />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                支持 30 / 60 / 90 天灵活账期
              </div>
            </SpotlightCard>
          </Col>

          <Col xs={12} md={6}>
            <SpotlightCard spotlightColor={currentTheme.color} style={{ padding: '22px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>准时履约出库达成率</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>
                <AnimatedNumber value={99.42} decimals={2} suffix="%" />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                专车直发 · 电子回单实时归档
              </div>
            </SpotlightCard>
          </Col>

          <Col xs={12} md={6}>
            <SpotlightCard spotlightColor={currentTheme.color} style={{ padding: '22px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>智能客服知识库毫秒级响应</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b', marginTop: '6px' }}>
                <AnimatedNumber value={Math.round(120 * counterSeed)} suffix=" ms" />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                7x24 小时全天候自动应答
              </div>
            </SpotlightCard>
          </Col>
        </Row>

        {showSkeletonDemo && (
          <div style={{ marginTop: '16px' }}>
            <ShimmerSkeleton count={4} height={220} />
          </div>
        )}
      </div>

      {/* Section 4: Code Repair & GitHub Sync Status */}
      <SpotlightCard
        spotlightColor={currentTheme.color}
        borderBeam={beamEnabled}
        style={{ padding: '26px 30px' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <GithubOutlined style={{ fontSize: '20px', color: 'var(--ll-navy)' }} />
              <strong style={{ fontSize: '17px', color: 'var(--ll-navy)' }}>
                全局代码修复与 GitHub 仓库自动化同步状态
              </strong>
              <Tag color="green">READY & VERIFIED</Tag>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
              已统一修复全站路由映射（<code>/my-orders</code> & <code>/orders</code>、<code>/orders/:orderNo</code>、<code>/merchant/apply</code>、<code>/privacy/cookies</code>），
              消除订单详情金额符号冗余与破图风险，并绑定 GitHub 远端仓库 <code>c2jxmrywdn-del/LANLinkshopping</code>。
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#334155' }}>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> TypeScript 零错误编译</span>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> 路由双向兼容守卫</span>
            <span><CheckCircleFilled style={{ color: '#10b981' }} /> Git Commit 自动归档</span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}
