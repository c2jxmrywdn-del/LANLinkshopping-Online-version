import { describe, it, expect, beforeEach } from 'vitest'
import { t, setLocale } from './index'

describe('轻量 i18n', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    setLocale('zh-CN')
  })

  it('中文取值', () => {
    expect(t('acct.nav.profile')).toBe('个人信息')
    expect(t('acct.profile.male')).toBe('男')
  })

  it('英文切换', () => {
    setLocale('en-US')
    expect(t('acct.nav.profile')).toBe('Profile')
    expect(t('acct.profile.male')).toBe('Male')
  })

  it('插值 {n}', () => {
    expect(t('acct.profile.bioHelp', { n: 12 })).toBe('剩余可输入 12 字')
  })

  it('未知 key 回退到 key 本身', () => {
    expect(t('no.such.key')).toBe('no.such.key')
  })

  it('核心商户资质词条可在英文界面正常显示', () => {
    document.body.innerHTML = '<div>营业执照 · 税务登记号 · 查看原件 · 记录</div>'
    setLocale('en-US')
    expect(document.body.textContent).toContain('Business License')
    expect(document.body.textContent).toContain('Tax Registration No.')
    expect(document.body.textContent).toContain('View Original')
    expect(document.body.textContent).toContain('Record')

    setLocale('zh-CN')
    expect(document.body.textContent).toContain('营业执照')
    expect(document.body.textContent).toContain('税务登记号')
    expect(document.body.textContent).toContain('查看原件')
    expect(document.body.textContent).toContain('记录')
  })

  it('英文 DOM 覆盖商城、账期、隐私和客服说明', async () => {
    document.body.innerHTML = '<main><p>查看全部商品 →</p><p>配送与履约</p><p>按到期日排序，提前安排资金与还款</p><p>运行沙盒测试</p><p>LANLinkshopping 为个人毕业设计项目。这里集中提供作者邮箱、社交平台与交流社区入口，便于项目展示、沟通与学术交流。</p><p data-live>当前正式客服回答（只读对照）</p></main>'
    setLocale('en-US')

    expect(document.body.textContent).toContain('View All Products →')
    expect(document.body.textContent).toContain('Shipping & Fulfillment')
    expect(document.body.textContent).toContain('Sort by due date to plan funds and repayments ahead of time')
    expect(document.body.textContent).toContain('Run Sandbox Test')
    expect(document.body.textContent).toContain('individual graduation project')
    expect(document.body.textContent).toContain('Current Published Support Response (Read-Only Comparison)')
    expect(document.body.textContent).not.toContain('查看全部商品')

    const liveText = document.querySelector('[data-live]').firstChild
    liveText.nodeValue = '运行沙盒测试'
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(document.querySelector('[data-live]').textContent).toBe('Run Sandbox Test')

    setLocale('zh-CN')
    expect(document.body.textContent).toContain('查看全部商品 →')
    expect(document.body.textContent).toContain('配送与履约')
    expect(document.querySelector('[data-live]').textContent).toBe('运行沙盒测试')
  })

  it('首页轮播、行业入口、客服和作者元数据在英文下完整翻译', () => {
    document.body.innerHTML = '<main><h2>建筑材料源头直供</h2><p>钢材 · 管材 · 工程材料，规格与供应能力一站核验</p><button>进入建筑专区</button><h3>建筑行业</h3><span>专区商品 →</span><p>纺织制造与面料采购</p><p>只回答专属知识库已收录的电商问题</p><p>专属客服</p><p>扫码登录</p><p>B2B 聚合型电商平台毕业设计</p><div aria-label="切换为中文"></div></main>'
    setLocale('en-US')

    expect(document.body.textContent).toContain('Building Materials Direct from Source')
    expect(document.body.textContent).toContain('Verify steel, pipes, construction materials')
    expect(document.body.textContent).toContain('Explore Building Materials')
    expect(document.body.textContent).toContain('Construction & Building Materials')
    expect(document.body.textContent).toContain('Category Products →')
    expect(document.body.textContent).toContain('Textile Manufacturing & Fabric Procurement')
    expect(document.body.textContent).toContain('Dedicated Support')
    expect(document.body.textContent).toContain('Scan to Sign In')
    expect(document.body.textContent).toContain('B2B Aggregated Commerce Graduation Project')
    expect(document.body.innerHTML).toContain('Switch to Chinese')
    expect(document.body.textContent).not.toContain('建筑行业')
    expect(document.body.textContent).not.toContain('纺织制造与面料采购')
  })

  it('非法语言回退中文', () => {
    setLocale('fr-FR')
    expect(t('acct.nav.profile')).toBe('个人信息')
  })
})
