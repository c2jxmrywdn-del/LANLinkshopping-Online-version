// 轻量 i18n：locale ref + t('a.b') 取值，取不到回退中文再回退 key
import { ref } from 'vue'

export const locale = ref('zh-CN')

const zh = {
  acct: {
    title: '账号中心',
    nav: { profile: '个人信息', settings: '系统设置' },
    card: {
      role: '角色', phone: '手机', email: '邮箱', unbound: '未绑定',
      quick: '快捷入口', orders: '我的订单', cart: '购物车', merchant: '商户入驻',
      clearCache: '清空本地缓存', cacheCleared: '缓存已清空',
      accountInfo: '账号信息', userId: '用户ID', member: '会员等级'
    },
    loadFail: '数据加载失败',
    loadFailDesc: '请检查网络后重试',
    retry: '重试',
    discardTitle: '放弃未保存的修改？',
    discardContent: '当前编辑内容尚未保存，切换后修改将丢失。',
    leaveConfirm: '当前页面有未保存的修改，确定离开吗？',
    ok: '确定', cancelText: '取消',
    profile: {
      title: '个人信息',
      edit: '编辑', save: '保存', cancel: '取消',
      changeAvatar: '更换头像',
      realName: '姓名', nickname: '昵称', gender: '性别', birthday: '出生日期',
      bio: '个人简介', phone: '手机号', email: '邮箱',
      male: '男', female: '女', secret: '保密',
      notSet: '未设置',
      bioPlaceholder: '介绍一下自己吧（最多 500 字）',
      bioHelp: '剩余可输入 {n} 字',
      saveSuccess: '个人信息已保存',
      draftTitle: '恢复草稿',
      draftContent: '检测到上次未保存的修改，是否恢复？',
      restore: '恢复', discardDraft: '放弃',
      ruleRealNameRequired: '请输入姓名',
      ruleNicknameRequired: '请输入昵称',
      ruleTooLong: '长度不能超过 32 字',
      change: '更换',
      changePhone: '更换手机号',
      changeEmail: '更换邮箱',
      newPhone: '新手机号',
      newEmail: '新邮箱',
      sendCode: '获取验证码',
      resendIn: '{s}s 后重发',
      code: '验证码',
      codePlaceholder: '6 位验证码',
      codeSent: '验证码已发送至邮箱，5 分钟内有效',
      devCode: '演示验证码：{code}',
      submit: '提交',
      bindSuccess: '绑定信息已更新',
      invalidPhone: '手机号格式不正确',
      invalidEmail: '邮箱格式不正确',
      codeRequired: '请输入 6 位验证码'
    },
    avatar: {
      title: '编辑头像',
      dropHint: '点击或拖拽图片到此处上传',
      typeHint: '支持 JPG/PNG/WebP，≤5MB',
      invalidType: '仅支持 JPG/PNG/WebP 图片',
      invalidSize: '图片大小不能超过 5MB',
      zoom: '缩放',
      rotate: '旋转90°',
      reselect: '重新选择',
      upload: '上传',
      uploadFail: '上传失败，请重试',
      retry: '重试',
      done: '头像已更新'
    },
    settings: {
      security: '账户安全',
      changePwd: '修改密码',
      oldPwd: '原密码', newPwd: '新密码', confirmPwd: '确认新密码',
      ruleOldRequired: '请输入原密码',
      ruleNewRequired: '请输入新密码',
      ruleNewPattern: '8-20 位，需包含大小写字母、数字和特殊字符',
      ruleNewSameAsOld: '新密码不能与原密码相同',
      ruleConfirmRequired: '请再次输入新密码',
      ruleConfirmMismatch: '两次输入的密码不一致',
      strength: '密码强度',
      pwdConfirmTitle: '确认修改密码？',
      pwdConfirmContent: '修改密码后，下次登录需使用新密码。',
      pwdSuccess: '密码修改成功',
      submit: '提交',
      twofa: '两步验证（TOTP）',
      twofaOn: '已启用',
      twofaOff: '未启用',
      twofaDesc: '启用后登录需额外输入动态验证码，提升账号安全性。',
      firstTime: '首次验证时间',
      enable2fa: '启用两步验证',
      disable2fa: '关闭两步验证',
      twofaSetupTitle: '设置两步验证',
      twofaStart: '开始设置',
      twofaScan: '使用验证器 App（如 Google Authenticator）扫描二维码',
      twofaSecret: '无法扫码？手动输入密钥：',
      copy: '复制', copied: '已复制',
      twofaCodeLabel: '动态验证码',
      twofaVerifyEnable: '验证并启用',
      twofaEnabled: '两步验证已启用',
      twofaDisableTitle: '关闭两步验证',
      twofaDisableTip: '关闭后账号安全性将降低，请输入当前动态验证码确认。',
      twofaConfirmDisable: '确认关闭',
      twofaDisabled: '两步验证已关闭',
      codeRequired: '请输入 6 位验证码',
      notify: '通知偏好',
      notifyEmail: '邮件通知',
      notifyPush: '站内推送',
      notifySms: '短信提醒',
      notifyGroup: '分类通知',
      notifyOrder: '订单动态',
      notifyPromotion: '优惠活动',
      notifySystem: '系统公告',
      notifyAll: '全部开启 / 全部关闭',
      saved: '设置已保存',
      saveFail: '保存失败，已恢复原设置',
      appearance: '界面个性化',
      theme: '主题模式',
      themeLight: '亮色', themeDark: '暗色', themeSystem: '跟随系统',
      language: '语言',
      fontSize: '字体大小',
      fontStandard: '标准', fontLarge: '放大 120%', fontSmall: '缩小 80%',
      privacy: '隐私权限',
      recommend: '个性化推荐',
      recommendTip: '开启后将根据你的浏览与购买偏好推荐商品（对应隐私政策第 3 条）。',
      ads: '广告推送',
      adsTip: '开启后允许平台向你推送营销广告信息（对应隐私政策第 5 条）。',
      thirdAuth: '第三方授权管理',
      thirdEmpty: '暂无第三方应用授权',
      revoke: '撤回授权',
      revokeTitle: '撤回授权？',
      revokeContent: '撤回后，该应用将无法再访问你的账号信息。',
      revoked: '授权已撤回',
      scopes: '授权范围',
      authTime: '授权时间',
      reset: '恢复默认设置',
      resetTitle: '恢复默认设置？',
      resetContent: '仅重置系统设置（通知、外观、隐私），不影响个人信息。',
      resetDone: '已恢复默认设置'
    }
  }
}

const en = {
  acct: {
    title: 'Account Center',
    nav: { profile: 'Profile', settings: 'Settings' },
    card: {
      role: 'Role', phone: 'Phone', email: 'Email', unbound: 'Not bound',
      quick: 'Quick Links', orders: 'My Orders', cart: 'Cart', merchant: 'Become a Merchant',
      clearCache: 'Clear Local Cache', cacheCleared: 'Cache cleared',
      accountInfo: 'Account Info', userId: 'User ID', member: 'Member Level'
    },
    loadFail: 'Failed to load',
    loadFailDesc: 'Check your network and retry',
    retry: 'Retry',
    discardTitle: 'Discard unsaved changes?',
    discardContent: 'Your edits have not been saved and will be lost after switching.',
    leaveConfirm: 'You have unsaved changes. Leave anyway?',
    ok: 'OK', cancelText: 'Cancel',
    profile: {
      title: 'Profile',
      edit: 'Edit', save: 'Save', cancel: 'Cancel',
      changeAvatar: 'Change Avatar',
      realName: 'Name', nickname: 'Nickname', gender: 'Gender', birthday: 'Birthday',
      bio: 'Bio', phone: 'Phone', email: 'Email',
      male: 'Male', female: 'Female', secret: 'Secret',
      notSet: 'Not set',
      bioPlaceholder: 'Introduce yourself (up to 500 chars)',
      bioHelp: '{n} characters remaining',
      saveSuccess: 'Profile saved',
      draftTitle: 'Restore Draft',
      draftContent: 'Unsaved changes from last time detected. Restore them?',
      restore: 'Restore', discardDraft: 'Discard',
      ruleRealNameRequired: 'Please enter your name',
      ruleNicknameRequired: 'Please enter a nickname',
      ruleTooLong: 'Must be within 32 characters',
      change: 'Change',
      changePhone: 'Change Phone',
      changeEmail: 'Change Email',
      newPhone: 'New Phone',
      newEmail: 'New Email',
      sendCode: 'Send Code',
      resendIn: 'Resend in {s}s',
      code: 'Code',
      codePlaceholder: '6-digit code',
      codeSent: 'Verification code sent to your email (valid for 5 minutes)',
      devCode: 'Demo code: {code}',
      submit: 'Submit',
      bindSuccess: 'Binding updated',
      invalidPhone: 'Invalid phone number',
      invalidEmail: 'Invalid email address',
      codeRequired: 'Please enter the 6-digit code'
    },
    avatar: {
      title: 'Edit Avatar',
      dropHint: 'Click or drag an image here',
      typeHint: 'JPG/PNG/WebP supported, ≤5MB',
      invalidType: 'Only JPG/PNG/WebP images are allowed',
      invalidSize: 'Image must be within 5MB',
      zoom: 'Zoom',
      rotate: 'Rotate 90°',
      reselect: 'Reselect',
      upload: 'Upload',
      uploadFail: 'Upload failed, please retry',
      retry: 'Retry',
      done: 'Avatar updated'
    },
    settings: {
      security: 'Account Security',
      changePwd: 'Change Password',
      oldPwd: 'Current Password', newPwd: 'New Password', confirmPwd: 'Confirm Password',
      ruleOldRequired: 'Please enter current password',
      ruleNewRequired: 'Please enter new password',
      ruleNewPattern: '8-20 chars incl. upper/lowercase letters, digits and symbols',
      ruleNewSameAsOld: 'New password must differ from the current one',
      ruleConfirmRequired: 'Please confirm new password',
      ruleConfirmMismatch: 'Passwords do not match',
      strength: 'Strength',
      pwdConfirmTitle: 'Change password?',
      pwdConfirmContent: 'You will need the new password at next login.',
      pwdSuccess: 'Password changed',
      submit: 'Submit',
      twofa: 'Two-Factor Auth (TOTP)',
      twofaOn: 'Enabled',
      twofaOff: 'Disabled',
      twofaDesc: 'Requires an extra dynamic code at login for better security.',
      firstTime: 'First verified at',
      enable2fa: 'Enable 2FA',
      disable2fa: 'Disable 2FA',
      twofaSetupTitle: 'Set up 2FA',
      twofaStart: 'Start Setup',
      twofaScan: 'Scan the QR code with an authenticator app',
      twofaSecret: 'Cannot scan? Enter the key manually:',
      copy: 'Copy', copied: 'Copied',
      twofaCodeLabel: 'Dynamic Code',
      twofaVerifyEnable: 'Verify & Enable',
      twofaEnabled: '2FA enabled',
      twofaDisableTitle: 'Disable 2FA',
      twofaDisableTip: 'Security will be reduced. Enter the current dynamic code to confirm.',
      twofaConfirmDisable: 'Confirm Disable',
      twofaDisabled: '2FA disabled',
      codeRequired: 'Please enter the 6-digit code',
      notify: 'Notifications',
      notifyEmail: 'Email',
      notifyPush: 'In-app Push',
      notifySms: 'SMS',
      notifyGroup: 'Categories',
      notifyOrder: 'Order Updates',
      notifyPromotion: 'Promotions',
      notifySystem: 'System Announcements',
      notifyAll: 'All On / All Off',
      saved: 'Settings saved',
      saveFail: 'Save failed, reverted',
      appearance: 'Appearance',
      theme: 'Theme',
      themeLight: 'Light', themeDark: 'Dark', themeSystem: 'System',
      language: 'Language',
      fontSize: 'Font Size',
      fontStandard: 'Standard', fontLarge: 'Large 120%', fontSmall: 'Small 80%',
      privacy: 'Privacy',
      recommend: 'Personalized Recommendations',
      recommendTip: 'Recommend products based on browsing and purchase history (Privacy Policy §3).',
      ads: 'Ad Push',
      adsTip: 'Allow marketing messages from the platform (Privacy Policy §5).',
      thirdAuth: 'Third-party Authorizations',
      thirdEmpty: 'No third-party authorizations',
      revoke: 'Revoke',
      revokeTitle: 'Revoke authorization?',
      revokeContent: 'The app will no longer access your account info.',
      revoked: 'Authorization revoked',
      scopes: 'Scopes',
      authTime: 'Authorized at',
      reset: 'Reset to Defaults',
      resetTitle: 'Reset settings?',
      resetContent: 'Only system settings (notifications, appearance, privacy) are reset; your profile is not affected.',
      resetDone: 'Settings reset to defaults'
    }
  }
}

const dicts = { 'zh-CN': zh, 'en-US': en }

function pick(dict, path) {
  let cur = dict
  for (const k of path.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = cur[k]
  }
  return cur
}

/**
 * 取文案，支持 {a.b} 路径与 {name} 插值
 * t('acct.profile.bioHelp', { n: 12 })
 */
export function t(key, params) {
  let s = pick(dicts[locale.value], key)
  if (s === undefined) s = pick(zh, key) // 回退中文
  if (s === undefined) return key // 再回退 key 本身
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replaceAll(`{${k}}`, String(v))
    }
  }
  return s
}

export function setLocale(l) {
  locale.value = dicts[l] ? l : 'zh-CN'
  try { localStorage.setItem('ll_locale', locale.value) } catch (e) {}
  applyDomLocale()
}


// ===== 全站双语层（无需第三方运行时依赖） =====
const UI_ZH_EN = {
  '首页':'Home','商城':'Mall','优惠':'Promotions','账期':'Credit Terms','我的订单':'My Orders','商户管理':'Merchant Management','商户入驻':'Become a Merchant','流量管理':'Traffic Management','我的商品':'My Products','关于我们':'About Us',
  '消息':'Messages','购物车':'Cart','登录 / 注册':'Login / Register','退出登录':'Log out','退出':'Log out','返回前台':'Back to Storefront',
  '当前身份':'Current Identity','我的钱包':'My Wallet','企业账期':'Business Credit','活动中心':'Activity Center','会员中心':'Membership Center','个人资料':'Profile','消息中心':'Messages','收货地址':'Shipping Addresses','登录安全':'Login Security','账户设置':'Account Settings',
  '让每一次连接，都产生价值。':'Make every connection create value.','隐私与 Cookie':'Privacy & Cookies','知识产权声明':'Intellectual Property',
  '关于我们页面导航':'About page navigation','联系平台':'Contact Platform','进入商城':'Enter Mall','跳过':'Skip',
  '项目作者':'Project Author','版权所有':'All Rights Reserved','未经授权请勿擅自复制、冒用或商业化':'Unauthorized copying, impersonation or commercialization is prohibited.',
  '社交平台':'Social Platforms','开发者交流区':'Developer Community','项目讨论区':'Project Discussions','社区交流':'Community','项目联系 / 日常沟通':'Project contact / daily communication','备用联系邮箱':'Secondary contact email',
  '联系我们':'Contact Us','主要邮箱':'Primary Email','备用邮箱':'Secondary Email','复制邮箱':'Copy Email','已复制':'Copied','复制成功':'Copied successfully',
  'WhatsApp':'WhatsApp','打开 WhatsApp':'Open WhatsApp','直接打开 WhatsApp':'Open WhatsApp directly','显示二维码':'Show QR Code','收起二维码':'Hide QR Code','扫码添加 / 联系 OuyangJason':'Scan to connect with OuyangJason','点击“显示二维码”查看扫码方式，也可直接打开 WhatsApp。':'Tap “Show QR Code” to scan, or open WhatsApp directly.',
  '平台定位':'Platform Overview','能力矩阵':'Capability Map','平台架构':'Platform Architecture','服务条款':'Terms of Service','知识产权':'Intellectual Property',
  '不是单一商城，而是一条完整的交易链路':'More than a storefront — a complete commerce journey','五种身份，一套协同逻辑':'Five identities, one collaboration model','从获客到复购，能力彼此衔接':'From acquisition to repurchase, every capability connects.',
  '我们解决什么':'What We Solve','平台生态':'Platform Ecosystem','演示平台':'Demo Platform',
  '商品与采购':'Products & Procurement','商户经营':'Merchant Operations','营销中台':'Marketing Hub','平台运营':'Platform Operations',
  '交易':'Transactions','营销':'Marketing','增长':'Growth','订单':'Orders','钱包':'Wallet','支付':'Payments','活动':'Campaigns','促销':'Promotions','会员':'Membership','流量':'Traffic','转化':'Conversion','诊断':'Diagnostics',
  '访客':'Guest','普通用户':'Buyer','VIP 用户':'VIP User','商户':'Merchant','管理员':'Administrator','浏览':'Browse','采购':'Procure','权益':'Benefits','经营':'Operate','运营':'Administer',
  '让采购、商品与增长':'Connect procurement, products and growth','在同一个网络里连接。':'within one network.','欢迎来到 LANLinkshopping':'Welcome to LANLinkshopping',
  '搜索':'Search','筛选':'Filter','重置':'Reset','确认':'Confirm','取消':'Cancel','保存':'Save','编辑':'Edit','删除':'Delete','新增':'Add','提交':'Submit','下一步':'Next','上一步':'Previous','返回':'Back','查看':'View','详情':'Details','关闭':'Close','完成':'Done','加载中':'Loading','暂无数据':'No data','暂无':'None','重试':'Retry','刷新':'Refresh',
  '商品':'Product','商品详情':'Product Details','商品分类':'Product Categories','行业分类':'Industry Categories','全部商品':'All Products','热销商品':'Best Sellers','热门商品':'Popular Products','推荐商品':'Recommended Products','库存':'Inventory','销量':'Sales','价格':'Price','起价':'From','数量':'Quantity','规格':'Specifications','单位':'Unit','品牌':'Brand','产地':'Origin','描述':'Description','参数':'Specifications','包装':'Packaging','商品编号':'SKU','上架':'Published','下架':'Unpublished',
  '加入购物车':'Add to Cart','立即购买':'Buy Now','收藏':'Add to Favorites','已收藏':'Favorited','分享':'Share','加入成功':'Added successfully','购买数量':'Purchase Quantity','小计':'Subtotal','合计':'Total','应付金额':'Amount Due','去结算':'Checkout','继续购物':'Continue Shopping','购物车为空':'Your cart is empty',
  '结算':'Checkout','收货信息':'Shipping Information','支付方式':'Payment Method','订单备注':'Order Note','订单确认':'Order Confirmation','提交订单':'Place Order','支付订单':'Pay Order','订单已创建':'Order created','订单已支付':'Order paid','订单编号':'Order No.','订单状态':'Order Status','创建时间':'Created At','更新时间':'Updated At',
  '待支付':'Pending Payment','待发货':'Pending Shipment','配送中':'In Transit','已完成':'Completed','已取消':'Cancelled','退款中':'Refunding','已退款':'Refunded',
  '全部订单':'All Orders','待付款':'Pending Payment','待收货':'Pending Receipt','已完成订单':'Completed Orders','取消订单':'Cancel Order','确认收货':'Confirm Receipt','申请退款':'Request Refund',
  '钱包余额':'Wallet Balance','充值':'Top Up','充值金额':'Top-up Amount','充值记录':'Top-up History','交易记录':'Transactions','交易详情':'Transaction Details','可用余额':'Available Balance','收入':'Income','支出':'Expense',
  '会员等级':'Membership Level','会员权益':'Membership Benefits','积分':'Points','积分明细':'Points History','积分详情':'Point Details','成长值':'Growth Value','当前等级':'Current Level','升级':'Upgrade',
  '活动详情':'Campaign Details','活动规则':'Campaign Rules','我的活动':'My Campaigns','立即参加':'Join Now','参与结果':'Participation Result','活动时间':'Campaign Time','活动状态':'Campaign Status',
  '商户中心':'Merchant Center','商户申请':'Merchant Application','商品管理':'Product Management','发布商品':'Publish Product','流量分析':'Traffic Analytics','访客数':'Visitors','转化率':'Conversion Rate','来源':'Source','经营数据':'Business Data',
  '数据概览':'Dashboard','交易管理':'Transaction Management','账期审核':'Credit Review','审计日志':'Audit Log','商户审核':'Merchant Review','系统管理':'System Management',
  '个人信息':'Profile','个人简介':'Bio','手机号码':'Phone Number','手机号':'Phone Number','邮箱':'Email','姓名':'Name','昵称':'Nickname','性别':'Gender','出生日期':'Birthday','男':'Male','女':'Female','保密':'Private','未设置':'Not set','更换头像':'Change Avatar',
  '系统设置':'Settings','界面个性化':'Appearance','主题模式':'Theme','亮色':'Light','暗色':'Dark','跟随系统':'System','语言':'Language','字体大小':'Font Size','标准':'Standard','放大 120%':'Large 120%','缩小 80%':'Small 80%',
  '账户安全':'Account Security','修改密码':'Change Password','原密码':'Current Password','新密码':'New Password','确认新密码':'Confirm Password','密码强度':'Password Strength','两步验证（TOTP）':'Two-Factor Authentication (TOTP)','已启用':'Enabled','未启用':'Disabled','启用两步验证':'Enable 2FA','关闭两步验证':'Disable 2FA',
  '邮件通知':'Email Notifications','站内推送':'In-app Notifications','短信提醒':'SMS Alerts','订单动态':'Order Updates','优惠活动':'Promotions','系统公告':'System Announcements','全部开启 / 全部关闭':'Toggle All',
  '隐私权限':'Privacy','个性化推荐':'Personalized Recommendations','广告推送':'Ad Push','第三方授权管理':'Third-party Authorizations','撤回授权':'Revoke Authorization','授权范围':'Scopes','授权时间':'Authorized At',
  'Cookie 与隐私偏好':'Cookie & Privacy Preferences','管理 Cookie':'Manage Cookies','必要 Cookie':'Necessary Cookies','偏好 Cookie':'Preference Cookies','分析 Cookie':'Analytics Cookies','营销 Cookie':'Marketing Cookies','始终启用':'Always On','仅必要 Cookie':'Necessary Cookies Only','接受全部':'Accept All','接受全部 Cookie':'Accept All Cookies','保存选择':'Save Choices','Cookie 偏好已保存':'Cookie preferences saved','Cookie 偏好设置':'Cookie Preferences','查看 Cookie 详情与偏好':'View Cookie details & preferences',
  '隐私中心':'Privacy Center','隐私政策':'Privacy Policy','数据保护':'Data Protection',
  '请选择':'Please select','请输入':'Please enter','请输入验证码':'Please enter the verification code','验证码':'Verification Code','获取验证码':'Get Code','重新获取':'Resend','秒后重发':'s before resend',
  '登录成功':'Signed in successfully','注册成功':'Registration successful','登录失败':'Sign-in failed','注册':'Register','登录':'Sign in','忘记密码':'Forgot password','没有账号？':'No account?','已有账号？':'Already have an account?','退出成功':'Signed out',
  '密码':'Password','确认密码':'Confirm Password','手机号格式不正确':'Invalid phone number','邮箱格式不正确':'Invalid email address',
  '策略版本':'Policy version','最近更新':'Last updated','当前状态':'Current status','尚未选择':'Not selected','策略版本 v1.0':'Policy v1.0',
  '项目作者：Jason Ouyang':'Project Author: Jason Ouyang','本页面公开的联系方式由项目作者本人提供，仅用于项目展示、交流与联系。':'The contact details on this page are provided by the project author for project presentation, communication and academic exchange.',
  '毕业设计原创性及知识产权声明':'Originality & Intellectual Property Statement','请尊重知识产权':'Please Respect Intellectual Property','未经许可请勿使用、冒用或商业化。':'Do not use, impersonate or commercialize without permission.',
  '开发者社区':'Developer Community',
  '聚合 · 连接 · 一体多元解决方案':'Aggregate · Connect · Integrated Multi-Solution','关于 LANLinkshopping':'About LANLinkshopping','查看详情':'View Details',
  '行业':'Industry','行业列表':'Industry List','全部行业':'All Industries','行业数据暂时无法更新':'Industry data is temporarily unavailable','自动同步':'Auto Sync','同步中…':'Syncing…','该行业暂无细分分类':'No subcategories in this industry yet','行业已自动接入，等待商品分类配置。':'This industry is connected automatically and is waiting for category configuration.','综合商品中心':'All-Industry Product Center','覆盖平台当前全部行业采购供给。':'Covers procurement supply across all industries on the platform.','采购入口':'Procurement','热销采购':'Best-Selling Procurement','查看全平台供给':'View platform-wide supply','按销量快速筛选':'Quickly filter by sales','采购优惠':'Procurement Offers','满减与行业折扣':'Threshold discounts and industry offers','类':'categories','进入':'Enter',
  '待审核':'Pending Review','已通过':'Approved','已驳回':'Rejected','审核通过':'Approve','审核完成':'Review Completed','资质核验':'Qualification Check','提交申请':'Application Submitted','材料':'Materials','已入驻':'Onboarded','原因':'Reason','工商信息':'Business Registration','主体类型':'Entity Type','注册资本':'Registered Capital','入驻方式':'Onboarding Method','企业ID':'Enterprise ID','商户ID':'Merchant ID','纳税申报':'Tax Filing','证照材料':'Licensing Documents','申请时间':'Application Time','营业执照':'Business License','查看原件':'View Original','近期纳税记录':'Recent Tax Records','税务登记号':'Tax Registration No.','纳税记录材料':'Tax Record Documents','记录':'Record','已具备资质':'Existing Qualifications','驳回原因':'Rejection Reason','操作':'Actions','快速查看':'Quick View','档案':'Profile','通过':'Approve','驳回':'Reject','商户档案详情':'Merchant Profile Details','驳回入驻申请':'Reject Onboarding Application','驳回原因（必填，将展示给商户用于整改）':'Rejection reason (required; shown to the merchant for remediation)','请输入驳回原因':'Please enter a rejection reason','确认通过':'Confirm Approval','审核通过该商户入驻申请':'Approve this merchant onboarding application',
  '平台运营 13800000000':'Platform Ops 13800000000','采购方':'Buyer','商户/供应商':'Merchant / Supplier','注册身份':'Registration Role','邮箱（选填）':'Email (optional)','11 位手机号':'11-digit phone number','至少 8 位，含字母与数字':'At least 8 characters, including letters and numbers','两次输入的密码不一致':'The passwords do not match','密码强度不足，至少 8 位且含字母与数字':'Password is too weak; use at least 8 characters with letters and numbers','演示账号（密码均 123456）':'Demo accounts (all passwords are 123456)','演示: 13900000001':'Demo: 13900000001','演示密码: 123456':'Demo password: 123456','动态验证码':'One-Time Code','验证并登录':'Verify & Sign In','返回重新登录':'Back to Sign In','去登录':'Go to Sign In','注册账号':'Create Account','请填写 6 位动态验证码':'Enter the 6-digit one-time code','验证码错误或未获取':'Invalid or missing verification code',
  '必要 Cookie 用于登录、会话和安全功能；可选 Cookie 用于记住偏好、分析平台使用情况及改善营销体验。':'Necessary cookies support sign-in, sessions and security; optional cookies remember preferences, analyze usage and improve marketing experiences.','你可以接受全部，也可以仅启用必要 Cookie。':'You can accept all cookies or enable only necessary cookies.','必要 Cookie 用于身份认证、会话保持、CSRF 防护和核心交易流程，无法关闭。':'Necessary cookies support authentication, sessions, CSRF protection and core transaction flows and cannot be disabled.','当前状态：尚未选择':'Current status: Not selected','当前：':'Current:','更新时间：':'Updated:','管理必要、偏好、分析和营销 Cookie。必要 Cookie 始终启用。':'Manage necessary, preference, analytics and marketing cookies. Necessary cookies are always enabled.','当前平台默认不启用第三方广告追踪':'Third-party ad tracking is disabled by default on this platform',

  // Supplemental translations for commerce, merchant, billing, privacy, and support views.
  "平台管理员": "Platform Administrator",
  "入驻商户": "Onboarded Merchant",
  "管理后台": "Admin Console",
  "客户沟通中心": "Customer Communication Center",
  "沟通概览": "Communication Overview",
  "会话工作台": "Conversation Workspace",
  "对话学习审核": "Conversation Learning Review",
  "学习沙盒": "Learning Sandbox",
  "系统正在繁忙处理": "The system is busy",
  "当前请求较多，正在为你保持连接。请稍候，无需重复操作。": "We are handling a high volume of requests and keeping your connection active. Please wait; there is no need to retry.",
  "正在优化请求队列": "Optimizing the request queue",
  "继续等待": "Keep Waiting",
  "查看全部商品 →": "View All Products →",
  "查看订单状态、支付进度与履约信息。": "View order status, payment progress, and fulfillment details.",
  "到手价": "Final Price",
  "登录后购买": "Sign in to Purchase",
  "订单金额": "Order Amount",
  "对公转账": "Corporate Bank Transfer",
  "服务说明": "Service Information",
  "规格参数": "Specifications",
  "加购": "Add to Cart",
  "价格降序": "Price: High to Low",
  "价格升序": "Price: Low to High",
  "进入账期账单 →": "Go to Credit Bills →",
  "来自个人中心": "From Account Center",
  "了解平台": "Learn About the Platform",
  "累计销量": "Total Sales",
  "立即支付": "Pay Now",
  "连接商品、采购、商户与增长，让交易从发现开始，在同一个网络里持续发生。": "Connecting products, procurement, merchants, and growth—so commerce starts with discovery and continues in one network.",
  "默认": "Default",
  "配送": "Shipping",
  "配送时效、运费及具体履约规则以商户页面及订单信息为准。": "Shipping times, fees, and fulfillment terms are subject to the merchant page and order details.",
  "配送与履约": "Shipping & Fulfillment",
  "企业钱包": "Business Wallet",
  "全部": "All",
  "全选": "Select All",
  "热销推荐": "Hot Recommendations",
  "如遇商品或订单问题，可根据平台及商户售后规则申请处理。": "For product or order issues, request assistance under the platform and merchant after-sales policies.",
  "删除已选": "Remove Selected",
  "商户编号": "Merchant ID",
  "商户认证": "Merchant Verification",
  "商品介绍": "Product Overview",
  "商品信息以商户实际发布内容为准，订单通过平台流程完成。": "Product details are provided by the merchant. Orders are completed through the platform workflow.",
  "售后": "After-Sales",
  "售后服务": "After-Sales Service",
  "售后支持": "After-Sales Support",
  "挑选商品后再进入结算，选择状态会自动保存。": "Choose products before checkout. Your selections are saved automatically.",
  "我的购物车": "My Cart",
  "下单后按商户规则发货": "Orders ship according to the merchant's policies",
  "销量优先": "Sort by Sales",
  "行业解决方案": "Industry Solutions",
  "已关闭": "Closed",
  "已支付": "Paid",
  "以商品及商户售后政策为准": "Subject to the product and merchant after-sales policies",
  "暂时缺货": "Temporarily Out of Stock",
  "正品保障": "Authenticity Guaranteed",
  "正品与交易": "Authenticity & Transactions",
  "综合排序": "Recommended Sorting",
  "VIP 专享": "VIP Exclusive",
  "按到期日排序，提前安排资金与还款": "Sort by due date to plan funds and repayments ahead of time",
  "查看到期计划 →": "View Due-Date Schedule →",
  "查看未结清、逾期及已结清账单": "View open, overdue, and settled bills",
  "从“找到商品”到“完成交易”，再到“持续经营”，每一个角色都有对应的工作台与能力。": "From product discovery to completed transactions and ongoing operations, every role has a dedicated workspace and capabilities.",
  "从流量来源到成交转化，一屏掌握店铺增长机会。": "Track traffic sources and conversions in one view to uncover growth opportunities.",
  "待还金额": "Amount Due",
  "当前生效": "Currently Active",
  "当前授权状态": "Current Authorization Status",
  "到期管理": "Due-Date Management",
  "发现平台活动、领取奖励并追踪参与记录。": "Discover platform campaigns, claim rewards, and track participation.",
  "返回商城": "Back to Mall",
  "风险等级": "Risk Level",
  "服务中断": "Service Interruption",
  "个体工商户": "Sole Proprietorship",
  "公司": "Company",
  "管理 Cookie 偏好": "Manage Cookie Preferences",
  "管理授信申请 →": "Manage Credit Applications →",
  "活动闭环": "Campaign Workflow",
  "活动广场 → 活动详情 → 参与确认 → 积分流水": "Campaign Hub → Campaign Details → Participation Confirmation → Points Ledger",
  "加盟": "Join the Platform",
  "简体中文": "Simplified Chinese",
  "奖励 +100 积分": "Reward: +100 Points",
  "交易规范": "Transaction Standards",
  "交易网络": "Commerce Network",
  "近 30 天": "Last 30 Days",
  "近 7 天": "Last 7 Days",
  "近 90 天": "Last 90 Days",
  "可用授信": "Available Credit",
  "进入账单中心 →": "Go to Billing Center →",
  "平台邀约": "Platform Invitation",
  "钱包支付实时到账 · 退款按钱包渠道入账": "Wallet payments are credited instantly; refunds are returned to the wallet",
  "去看积分": "View Points",
  "去选购 →": "Start Shopping →",
  "去支付订单": "Pay for Order",
  "全部流水": "All Transactions",
  "商户经营数据中心": "Merchant Business Analytics",
  "商户义务": "Merchant Responsibilities",
  "商户应保证商品质量与证照信息真实有效，并按约定时效履约。": "Merchants must ensure product quality and valid licensing information, and fulfill orders within the agreed timeframe.",
  "授信调整": "Credit Limit Adjustment",
  "授信额度、账单到期、还款与对账统一管理。": "Manage credit limits, bill due dates, repayments, and reconciliation in one place.",
  "刷新数据": "Refresh Data",
  "说明": "Description",
  "统一管理余额、充值与资金流水。": "Manage balance, top-ups, and transaction history in one place.",
  "销售趋势": "Sales Trend",
  "演示环境支持钱包、模拟、微信与支付宝渠道；真实渠道需完成对应商户配置。": "The demo supports wallet, simulated, WeChat, and Alipay payment methods. Live methods require merchant configuration.",
  "业务规模变化后重新申请更匹配的额度": "Reapply for a credit limit that better fits your business as it grows",
  "应付账单": "Bills Payable",
  "用户应使用真实企业信息注册并完成身份认证，妥善保管账号、密码及两步验证凭证。": "Users must register with accurate business information, complete identity verification, and protect account credentials and two-factor authentication methods.",
  "用于演示平台交易、账号与商户经营的基本规则。": "Basic rules for demonstrating platform transactions, accounts, and merchant operations.",
  "优惠中心": "Offers Center",
  "暂无正在进行的优惠活动，逛逛商城看看精选商品。": "There are no active offers right now. Browse the mall to discover featured products.",
  "账单中心": "Billing Center",
  "账号与实名": "Account & Identity Verification",
  "账期管理": "Credit Terms Management",
  "支付金额与订单走势": "Payment Amounts & Order Trends",
  "支付与退款": "Payments & Refunds",
  "自主入驻": "Self-Service Onboarding",
  "审核授信、调整额度并跟踪企业账期状态。": "Review credit applications, adjust limits, and track business credit status.",
  "当前正式客服回答（只读对照）": "Current Published Support Response (Read-Only Comparison)",
  "导出候选 JSON": "Export Candidate JSON",
  "订单合计": "Order Total",
  "返回候选列表": "Back to Candidate List",
  "返回候选详情": "Back to Candidate Details",
  "返回会话": "Back to Conversation",
  "返回交易管理处理退款": "Return to Transaction Management to Process Refunds",
  "返回审核列表": "Back to Review List",
  "管理你的收货地址，最多可保存多条，并可将任意一条设为默认。": "Manage your shipping addresses. You can save multiple addresses and set any one as the default.",
  "候选回答预览（尚未发布）": "Candidate Response Preview (Not Published)",
  "进入四级审核": "Open Level-Four Review",
  "清空测试结果": "Clear Test Results",
  "设为默认": "Set as Default",
  "设为默认收货地址": "Set as Default Shipping Address",
  "运行沙盒测试": "Run Sandbox Test",
  "＋ 新增地址": "+ Add Address",
  "导出 CSV": "Export CSV",
  "企业账期审核": "Business Credit Review",
  "审核驳回": "Review Rejected",
  "未支付": "Unpaid",
  "可售": "Available for Sale",
  "不可售": "Unavailable for Sale",
  "纳税材料": "Tax Documents",
  "VIP 价": "VIP Price",
  "商品由入驻商户发布并经平台审核；下单前请核对规格、价格与库存。": "Products are listed by onboarded merchants and reviewed by the platform. Check specifications, prices, and stock before ordering.",
  "身份决定可见内容与操作边界；权限由前端路由与后端接口共同校验。": "Your role determines what you can view and do. Permissions are enforced by both frontend routing and backend APIs.",
  "因系统维护、不可抗力等导致服务中断时，平台将尽快恢复服务。": "If service is interrupted by maintenance or force majeure, the platform will restore it as soon as possible.",
  "你的数据偏好，由你决定": "Your Data Preferences, Your Choice",
  "你可以随时修改 Cookie 偏好。撤回分析授权后，平台会同时清除本地分析会话；不会清除服务端登录会话。": "You can change cookie preferences at any time. Revoking analytics consent clears the local analytics session, but does not end your server-side login session.",
  "LANLinkshopping 面向 B2B 场景，将商品展示、在线交易、会员营销、商户经营与平台运营 汇聚到同一套数字化交易链路中。": "LANLinkshopping brings product discovery, online transactions, membership marketing, merchant operations, and platform management together in one digital B2B commerce flow.",
  "LANLinkshopping 为个人毕业设计项目。这里集中提供作者邮箱、社交平台与交流社区入口，便于项目展示、沟通与学术交流。": "LANLinkshopping is an individual graduation project. This page gathers the author's email, social platforms, and community links for project presentation, communication, and academic exchange.",
  "LANLinkshopping 只在获得对应授权后启用可选的偏好、分析与营销能力。必要 Cookie 始终保持开启，以保障登录、会话、安全验证和核心交易流程。": "LANLinkshopping enables optional preference, analytics, and marketing features only with the relevant consent. Necessary cookies always remain enabled for sign-in, sessions, security verification, and core transactions.",
  "QQ邮箱": "QQ Mail",
  "已审核": "Reviewed",
  "申请材料": "Application Documents",
  "企业信息": "Business Information",
  "提交审核": "Submit for Review",
  "审核记录": "Review History",
  "客户消息": "Customer Messages",
  "内部备注": "Internal Notes",
  "学习候选": "Learning Candidate",
  "知识库": "Knowledge Base",
  "候选回答": "Candidate Response",
  "发送消息": "Send Message",
  "客户服务": "Customer Service",
  "客服学习": "Support Learning",
  "客服学习沙盒": "Support Learning Sandbox",
  "已发布": "Published",
  "未发布": "Not Published",
  "撤回发布": "Unpublish",
  "发布候选": "Publish Candidate",
  "测试输入": "Test Input",
  "测试输出": "Test Output",
  "运行测试": "Run Test",
  "测试结果": "Test Results",
  "清空": "Clear",
  "暂无记录": "No Records",
  "暂无消息": "No Messages",
  "搜索商品": "Search Products",
  "搜索订单": "Search Orders",
  "请输入关键词": "Enter a keyword",
  "请选择状态": "Select a status",
  "商户资质": "Merchant Qualifications",
  "营业资料": "Business Documents",
  "税务资料": "Tax Documents",
  "业务类型": "Business Type",
  "申请进度": "Application Progress",
  "审核状态": "Review Status",
  "待处理": "Pending",
  "处理中": "Processing",
  "处理完成": "Processed",
  "支付处理中": "Payment Processing",
  "退款处理中": "Refund Processing",
  "退款成功": "Refund Successful",
  "退款失败": "Refund Failed",
  "支付成功": "Payment Successful",
  "支付失败": "Payment Failed",
  "已发货": "Shipped",
  "已收货": "Delivered",
  "已生效": "Active",
  "已使用": "Used",
  "未使用": "Unused",
  "可用": "Available",
  "不可用": "Unavailable",
  "生效时间": "Effective Time",
  "失效时间": "Expiration Time",
  "截止时间": "Deadline",
  "剩余时间": "Time Remaining",
  "操作时间": "Action Time",
  "操作人": "Operator",
  "操作记录": "Activity Log",
  "操作说明": "Action Description",
  "查看记录": "View Records",
  "更多信息": "More Information",
  "业务说明": "Business Details",
  "账户余额": "Account Balance",
  "钱包充值": "Wallet Top-Up",
  "充值成功": "Top-Up Successful",
  "充值失败": "Top-Up Failed",
  "确认支付": "Confirm Payment",
  "付款方式": "Payment Method",
  "退款原因": "Refund Reason",
  "退款金额": "Refund Amount",
  "收款账户": "Receiving Account",
  "付款账户": "Payer Account",
  "账单金额": "Bill Amount",
  "到期日期": "Due Date",
  "已逾期": "Overdue",
  "未结清": "Outstanding",
  "已结清": "Settled",
  "还款记录": "Repayment History",
  "对账": "Reconciliation",
  "授信额度": "Credit Limit",
  "可用额度": "Available Limit",
  "已用额度": "Used Limit",
  "总额度": "Total Limit",
  "未读消息": "Unread Messages",
  "标记已读": "Mark as Read",
  "回复客户": "Reply to Customer",
  "会话详情": "Conversation Details",
  "消息详情": "Message Details",
  "原始消息": "Original Message",
  "学习状态": "Learning Status",
  "审核详情": "Review Details",
  "审核意见": "Review Comments",
  "通过审核": "Approve",
  "驳回申请": "Reject Application",
  "查看材料": "View Documents",
  "下载材料": "Download Documents",
  "打开原件": "Open Original",
  "候选状态": "Candidate Status",
  "来源会话": "Source Conversation",
  "知识库来源": "Knowledge Base Source",
  "引用来源": "Cited Source",
  "无权限访问": "Access Denied",
  "请先登录": "Please Sign In",
  "请求失败": "Request Failed",
  "保存失败": "Save Failed",
  "加载失败": "Failed to Load",
  "操作成功": "Action Successful",
  "操作失败": "Action Failed",
  "网络异常": "Network Error",
  "服务暂不可用": "Service Temporarily Unavailable",

  // Additional activity, membership, wallet, account, and dynamic-label translations.
  "← 活动广场": "← Campaign Hub",
  "100 积分": "100 Points",
  "参与说明": "Participation Details",
  "同一活动仅可参与一次；消费有礼在符合条件的支付完成后由系统自动参与。": "Each campaign can be joined only once. Eligible purchase-reward campaigns enroll automatically after qualifying payments.",
  "立即参与": "Join Now",
  "已参与": "Joined",
  "查看参与记录、奖励积分与活动状态。": "View participation history, reward points, and campaign status.",
  "活动广场": "Campaign Hub",
  "查看活动": "View Campaign",
  "参与成功": "Participation Successful",
  "你已加入「": "You joined “",
  "」，奖励积分将进入会员积分流水。": "”. Reward points will be added to your membership points ledger.",
  "查看积分": "View Points",
  "继续逛活动": "Explore More Campaigns",
  "← 活动中心": "← Activity Center",
  "首次参与注册类活动后，按活动规则发放积分；同一活动不可重复参与。": "Points are awarded under the campaign rules after first participation in registration campaigns. Each campaign can only be joined once.",
  "订单支付成功后自动参与当前有效的消费活动，奖励按活动配置发放。": "Successfully paid orders automatically join eligible purchase campaigns. Rewards follow the campaign configuration.",
  "活动奖励写入会员积分流水；订单取消、退款等场景按对应积分规则处理。": "Campaign rewards are recorded in the membership points ledger. Cancellations and refunds follow the applicable points rules.",
  "网络拥堵时不要重复提交，系统会通过幂等校验避免重复参与。": "Do not resubmit during network congestion. Idempotency checks prevent duplicate participation.",
  "申请企业账期": "Apply for Business Credit",
  "根据采购规模填写申请额度与账期，审核通过后即可在结算页使用。": "Enter a requested credit limit and term based on procurement volume. Once approved, it can be used at checkout.",
  "30 天": "30 Days",
  "60 天": "60 Days",
  "90 天": "90 Days",
  "账期账单 #": "Credit Bill #",
  "关联订单 ": "Related Order ",
  "已还": "Repaid",
  "到期日": "Due Date",
  "确认还款": "Confirm Repayment",
  "演示环境会记录还款流水并同步恢复可用授信额度。": "In the demo environment, repayments are recorded and the available credit limit is restored accordingly.",
  "按到期日管理应付账单与还款计划。": "Manage bills payable and repayment schedules by due date.",
  "返回账期中心": "Back to Credit Center",
  "← 会员中心": "← Membership Center",
  "围绕等级、成长、积分与权益建立完整会员闭环。": "A complete membership experience across tiers, growth, points, and benefits.",
  "积分中心": "Points Center",
  "我的权益": "My Benefits",
  "成长值 ": "Growth Value ",
  " · 积分 ": " · Points ",
  "等级折扣": "Tier Discount",
  "进入 →": "Enter →",
  "← 返回积分中心": "← Back to Points Center",
  "当前积分": "Current Points",
  "可抵扣价值": "Redemption Value",
  "← 返回钱包": "← Back to Wallet",
  "演示环境即时到账；真实渠道需配置商户凭证。": "Demo top-ups are credited instantly; live payment channels require merchant credentials.",
  "确认充值": "Confirm Top-Up",
  "充值已完成": "Top-Up Complete",
  "资金已进入钱包余额，可用于后续订单支付。": "Funds have been added to your wallet balance and can be used for future orders.",
  "查看钱包": "View Wallet",
  "查看流水": "View Transactions",
  "流水参考：": "Transaction Reference: ",
  "← 返回": "← Back",
  "钱包流水": "Wallet Transactions",
  "按收入、支出、退款查看完整资金轨迹。": "Review complete fund activity by income, expenses, and refunds.",
  "返回钱包": "Back to Wallet",
  "消费": "Purchase",
  "退款": "Refund",
  "近 ": "Last ",
  " 条登录安全记录": " login security records",
  "系统": "System",
  "全部标为已读": "Mark All as Read",
  "（余额 ¥": " (Balance ¥",
  "件已售": " sold",
  "件商品 · 已选": " items · selected",
  "促销进行中": "Promotion in Progress",
  "安全支付": "Secure Payment",
  "门槛：满 ¥": "Minimum spend: ¥",
  "已用 ¥": "Used ¥",
  "项营销规则": " marketing rules",
  "平台默认": "Platform Default",
  "商品咨询": "Product Inquiry",
  "订单跟踪": "Order Tracking",
  "库存充足": "In Stock",
  "暂无库存": "Out of Stock",
  "优惠券": "Coupons",
  "满减优惠": "Spend-and-Save Offer",
  "立即查看": "View Now",
  "查看详情 →": "View Details →",
  "更多商品": "More Products",
  "没有找到相关商品": "No matching products found",
  "暂无符合条件的商品": "No products match these criteria",
  "筛选条件": "Filter Criteria",
  "已选商品": "Selected Products",
  "已选地址": "Selected Address",
  "新增收货地址": "Add Shipping Address",
  "添加收货地址": "Add Shipping Address",
  "确认订单信息": "Confirm Order Details",
  "提交并支付": "Submit and Pay",
  "返回订单": "Back to Orders",
  "继续支付": "Continue to Payment",
  "订单已取消": "Order Cancelled",
  "退款申请已提交": "Refund Request Submitted",
  "申请处理中": "Application Processing",
  "返回订单列表": "Back to Order List",
  "交易保障": "Transaction Protection",
  "平台审核": "Platform Review",
  "平台客服": "Platform Support",
  "账户概览": "Account Overview",
  "收货地址管理": "Shipping Address Management",
  "登录记录": "Login History",
  "站内消息": "Inbox Messages",
  "消息设置": "Message Settings",
  "登录设备": "Login Device",
  "登录时间": "Login Time",
  "登录地点": "Login Location",
  "IP 地址": "IP Address",
  "安全提示": "Security Notice",
  "暂无登录记录": "No login history",
  "查看全部消息": "View All Messages",
  "未读": "Unread",
  "已读": "Read",
  "全部标记已读": "Mark All as Read",
  "安全验证": "Security Verification",
  "账号保护": "Account Protection",
  "找不到对应的记录": "No matching record found",
  "加载中，请稍候": "Loading, please wait",
  "请稍后重试": "Please try again later",

  // Full-sentence translations for cookie consent, support chat, and merchant publishing.
  "我们使用 Cookie 优化 LANLinkshopping": "We use cookies to improve LANLinkshopping",
  "必要 Cookie 用于登录、会话和安全功能；可选 Cookie 用于记住偏好、分析平台使用情况及改善营销体验。 你可以接受全部，也可以仅启用必要 Cookie。": "Necessary cookies support sign-in, sessions, and security. Optional cookies remember preferences, analyze platform usage, and improve marketing. You can accept all cookies or enable only necessary cookies.",
  "你可以随时修改可选 Cookie。必要 Cookie 用于身份认证、会话保持、CSRF 防护和核心交易流程，无法关闭。": "You can change optional cookie settings at any time. Necessary cookies support authentication, sessions, CSRF protection, and core transactions and cannot be disabled.",
  "最近更新：": "Last updated: ",
  "专属客服": "Dedicated Support",
  "LANLinkshopping 客服": "LANLinkshopping Support",
  "只回答专属知识库已收录的电商问题": "Answers only e-commerce questions covered by the dedicated knowledge base",
  "可以先试试": "Try asking",
  "账号注册": "Account Registration",
  "购物车结算": "Cart Checkout",
  "正在检索知识库…": "Searching the knowledge base…",
  "输入电商相关问题": "Enter an e-commerce question",
  "发送": "Send",
  "允许保存脱敏对话，供客服跟进与改进知识库（可选）": "Allow anonymized conversations to be saved for support follow-up and knowledge-base improvement (optional)",
  "不勾选时仍可使用知识库客服，但本次对话不会保存到客服工作台。请勿发送密码、验证码或银行卡信息。": "You can still use knowledge-base support without opting in, but this conversation will not be saved to the support workspace. Do not send passwords, verification codes, or bank card details.",
  "用于项目讨论、开发协作、问题反馈与社区交流。": "For project discussions, development collaboration, issue reporting, and community interaction.",
  "＋ 添加规格参数": "+ Add Specification",
  "上传主图": "Upload Main Image",
  "JPG/PNG/WebP，≤5MB，建议 ≥100×100": "JPG/PNG/WebP, up to 5 MB, recommended size at least 100×100",
  "存草稿": "Save Draft",
  "恢复上次草稿": "Restore Previous Draft",
  "查看参与记录": "View Participation History",
  "商品主图": "Product Main Image",
  "图片上传": "Image Upload",
  "删除图片": "Remove Image",
  "重新上传": "Upload Again",
  "库存数量": "Stock Quantity",
  "价格区间": "Price Range",
  "请选择商品分类": "Select a Product Category",
  "请输入商品名称": "Enter a product name",
  "请输入商品描述": "Enter a product description",
  "草稿已保存": "Draft Saved",
  "草稿恢复成功": "Draft Restored",
  "保存商品": "Save Product",
  "图片上传失败": "Image Upload Failed",
  "商品发布成功": "Product Published Successfully",
  "商品保存成功": "Product Saved Successfully"
}

const _zhOrder = Object.keys(UI_ZH_EN).sort((a,b)=>b.length-a.length)
const _nodeSources = new WeakMap()
const _attrSources = new WeakMap()
const _lastTranslatedNodes = new WeakMap()
const _lastTranslatedAttrs = new WeakMap()
let _observer = null
let _domApplying = false

function _translateString(value, toEn) {
  if (!value || !toEn || !/[\u4e00-\u9fff]/.test(value)) return value
  let out = value
  for (const zhKey of _zhOrder) out = out.includes(zhKey) ? out.split(zhKey).join(UI_ZH_EN[zhKey]) : out
  return out
}

function _walkAndTranslate(root=document.body) {
  if (!root || locale.value !== 'en-US') return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p=node.parentElement
      if (!p || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT
      return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    }
  })
  const nodes=[]
  while(walker.nextNode()) nodes.push(walker.currentNode)
  for(const node of nodes){
    if(!_nodeSources.has(node)) _nodeSources.set(node,node.nodeValue)
    const source=_nodeSources.get(node)
    const next=_translateString(source,true)
    if(next!==node.nodeValue) {
      _lastTranslatedNodes.set(node,next)
      node.nodeValue=next
    }
  }
  const attrs=['placeholder','title','aria-label','alt']
  root.querySelectorAll?.('*').forEach(el=>{
    for(const attr of attrs){
      if(!el.hasAttribute(attr)) continue
      const key=el
      let cache=_attrSources.get(key)
      if(!cache){cache={};_attrSources.set(key,cache)}
      if(cache[attr]===undefined) cache[attr]=el.getAttribute(attr)
      const next=_translateString(cache[attr],true)
      if(next!==el.getAttribute(attr)) {
        let last=_lastTranslatedAttrs.get(el)
        if(!last){last={};_lastTranslatedAttrs.set(el,last)}
        last[attr]=next
        el.setAttribute(attr,next)
      }
    }
  })
}

function _restoreChinese(root=document.body) {
  if(!root) return
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT)
  const nodes=[]
  while(walker.nextNode()) nodes.push(walker.currentNode)
  for(const node of nodes){
    const source=_nodeSources.get(node)
    if(source!==undefined && node.nodeValue!==source) node.nodeValue=source
  }
  const attrs=['placeholder','title','aria-label','alt']
  root.querySelectorAll?.('*').forEach(el=>{
    const cache=_attrSources.get(el)
    if(!cache) return
    for(const attr of attrs) if(cache[attr]!==undefined && el.getAttribute(attr)!==cache[attr]) el.setAttribute(attr,cache[attr])
  })
}

function applyDomLocale(){
  if(typeof document==='undefined') return
  document.documentElement.lang=locale.value
  document.documentElement.setAttribute('data-locale',locale.value)
  if(_observer) _observer.disconnect()
  _domApplying=true
  if(locale.value==='en-US') _walkAndTranslate(document.body)
  else _restoreChinese(document.body)
  document.title=locale.value==='en-US' ? 'LANLinkshopping · Connected Commerce' : 'LANLinkshopping · 聚合型B2B电商平台'
  _domApplying=false
  _observeDom()
}

function _observeDom(){
  if(typeof MutationObserver==='undefined' || !document.body) return
  if(_observer) _observer.disconnect()
  _observer=new MutationObserver(mutations=>{
    if(_domApplying || locale.value!=='en-US') return
    _domApplying=true
    for(const m of mutations){
      if(m.type==='characterData' && m.target){
        const node=m.target
        const current=node.nodeValue ?? ''
        const lastTranslated=_lastTranslatedNodes.get(node)
        if(lastTranslated===current){
          _lastTranslatedNodes.delete(node)
          continue
        }
        // Vue may reuse a text node for a different route or API response. Capture the new
        // Chinese source instead of replaying stale text from a prior render.
        if(/[\u4e00-\u9fff]/.test(current)) _nodeSources.set(node,current)
        // Capture the exact new value whenever Vue changes a node, so stale Chinese text is never replayed.
        _nodeSources.set(node,current)
        const source=_nodeSources.get(node)
        const next=_translateString(source,true)
        if(next!==current){
          _lastTranslatedNodes.set(node,next)
          node.nodeValue=next
        }
      } else if(m.type==='childList'){
        m.addedNodes.forEach(n=>{ if(n.nodeType===Node.ELEMENT_NODE) _walkAndTranslate(n); else if(n.nodeType===Node.TEXT_NODE && n.nodeValue?.trim()){_nodeSources.set(n,n.nodeValue);n.nodeValue=_translateString(n.nodeValue,true)} })
      } else if(m.type==='attributes'){
        const el=m.target
        const attr=m.attributeName
        if(['placeholder','title','aria-label','alt'].includes(attr)){
          const current=el.getAttribute(attr) ?? ''
          let last=_lastTranslatedAttrs.get(el)
          if(last && last[attr]===current){ delete last[attr]; continue }
          let cache=_attrSources.get(el)
          if(!cache){cache={};_attrSources.set(el,cache)}
          if(/[\u4e00-\u9fff]/.test(current) || cache[attr]===undefined) cache[attr]=current
          const next=_translateString(cache[attr],true)
          if(next!==current){
            if(!last){last={};_lastTranslatedAttrs.set(el,last)}
            last[attr]=next
            el.setAttribute(attr,next)
          }
        }
      }
    }
    _domApplying=false
  })
  _observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt']})
}

export function initI18nDom(){
  if(typeof window==='undefined') return
  const saved=localStorage.getItem('ll_locale')
  if(saved && dicts[saved]) locale.value=saved
  applyDomLocale()
}

export const switchLocale = setLocale
