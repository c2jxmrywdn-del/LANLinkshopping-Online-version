import {
  User,
  Enterprise,
  Merchant,
  Industry,
  Category,
  Product,
  Activity,
  Promotion,
  MemberLevel,
  MemberCard,
  CreditAccount,
  SupportKnowledgeEntry,
  CustomerConversation,
  LearningCandidate
} from '../types'

export const INITIAL_USERS: User[] = [
  {
    userId: 1,
    phone: '13800000000',
    nickname: '平台运营',
    roleId: 3,
    roleCode: 'admin',
    unreadCount: 2,
    identity: {
      code: 'admin',
      name: '平台管理员',
      serviceScope: '全局管理权限 / 审核 / 交易与日志审计',
      permissions: ['admin:all']
    }
  },
  {
    userId: 2,
    phone: '13900000001',
    nickname: '重庆建工采购',
    roleId: 1,
    roleCode: 'buyer',
    unreadCount: 1,
    identity: {
      code: 'vip',
      name: 'VIP 采购方',
      serviceScope: '企业物资采购 / 账期申请 / 专属 95 折',
      permissions: ['cart:manage', 'order:create', 'order:view', 'credit:view', 'credit:apply', 'profile:manage', 'vip:discount']
    }
  },
  {
    userId: 3,
    phone: '13700000002',
    nickname: '华晨建材',
    roleId: 2,
    roleCode: 'merchant',
    entId: 1,
    unreadCount: 0,
    identity: {
      code: 'merchant',
      name: '已入驻商户',
      serviceScope: '商品发布 / 经营数据分析 / 订单发货',
      permissions: ['product:publish', 'merchant:manage', 'profile:manage']
    }
  }
]

export const INITIAL_ENTERPRISE: Enterprise = {
  entId: 1,
  name: '华晨建材集团有限公司',
  creditCode: '91500000MA5U0000XA',
  memberLevel: 2,
  createTime: '2025-01-15 10:00:00'
}

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    merId: 1,
    entId: 1,
    userId: 3,
    regType: '公司',
    regCapital: 5000000,
    taxStatus: 1,
    joinType: '邀约',
    reviewStatus: 1,
    licenseUrl: '/assets/contact/whatsapp-qr.png',
    taxProofUrls: '/assets/contact/whatsapp-qr.png',
    taxRegNo: '91500000MA5U0000XA',
    createTime: '2025-01-15 10:30:00',
    updateTime: '2025-01-16 14:00:00',
    enterprise: INITIAL_ENTERPRISE
  }
]

export const INITIAL_INDUSTRIES: Industry[] = [
  { indId: 1, name: '建筑建材', code: 'construction', sort: 1 },
  { indId: 2, name: '纺织服装', code: 'textile', sort: 2 },
  { indId: 3, name: '石油化工', code: 'petrochemical', sort: 3 },
  { indId: 4, name: '电子元器件', code: 'electronics', sort: 4 }
]

export const INITIAL_CATEGORIES: Category[] = [
  { catId: 1, parentId: 0, indId: 1, name: '建筑钢材', level: 1, sort: 1 },
  { catId: 2, parentId: 0, indId: 1, name: '水泥及混凝土', level: 1, sort: 2 },
  { catId: 3, parentId: 0, indId: 1, name: '工程管材', level: 1, sort: 3 },
  { catId: 4, parentId: 0, indId: 2, name: '纺织坯布', level: 1, sort: 4 },
  { catId: 5, parentId: 0, indId: 2, name: '化学纤维', level: 1, sort: 5 },
  { catId: 6, parentId: 0, indId: 2, name: '工业辅料', level: 1, sort: 6 },
  { catId: 7, parentId: 0, indId: 3, name: '基础化学品', level: 1, sort: 7 },
  { catId: 8, parentId: 0, indId: 3, name: '工业润滑油', level: 1, sort: 8 },
  { catId: 9, parentId: 0, indId: 4, name: '电阻电容', level: 1, sort: 9 },
  { catId: 10, parentId: 0, indId: 4, name: '接插件与端子', level: 1, sort: 10 },
  { catId: 11, parentId: 0, indId: 4, name: '工业显示屏', level: 1, sort: 11 }
]

export const INITIAL_PRODUCTS: Product[] = [
  {
    prodId: 1,
    merId: 1,
    catId: 1,
    indId: 1,
    title: '建筑钢材 HRB400 螺纹钢 Φ20',
    brand: '华晨',
    spec: 'Φ20*9m',
    price: 3850.0,
    unit: '吨',
    stock: 5000,
    sales: 320,
    coverUrl: '/products/1.jpg',
    detail: '国标抗震钢筋，具备优质力学性能，现货储备充足，支持质保单开具与批次溯源。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:00:00',
    updateTime: '2025-01-16 11:00:00'
  },
  {
    prodId: 2,
    merId: 1,
    catId: 2,
    indId: 1,
    title: '硅酸盐水泥 P.O42.5 袋装',
    brand: '华新',
    spec: '50kg/袋',
    price: 420.0,
    unit: '吨',
    stock: 8000,
    sales: 210,
    coverUrl: '/products/2.jpg',
    detail: '高抗压强度、早期强度高、抗冻耐磨性好，广泛适用于各类大型工民建工程与基础设施工程。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:05:00',
    updateTime: '2025-01-16 11:05:00'
  },
  {
    prodId: 3,
    merId: 1,
    catId: 3,
    indId: 1,
    title: 'PPR 给水管材 DN25',
    brand: '日丰',
    spec: '25mm*4m',
    price: 28.5,
    unit: '根',
    stock: 12000,
    sales: 150,
    coverUrl: '/products/3.jpg',
    detail: '耐热耐压、卫生无毒、冷热水通用，热熔连接无泄漏隐患，使用寿命长达50年以上。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:10:00',
    updateTime: '2025-01-16 11:10:00'
  },
  {
    prodId: 4,
    merId: 1,
    catId: 4,
    indId: 2,
    title: '全棉坯布 40*40 133*72',
    brand: '华纺',
    spec: '幅宽160cm',
    price: 8.6,
    unit: '米',
    stock: 30000,
    sales: 90,
    coverUrl: '/products/4.jpg',
    detail: '纯棉高密府绸布坯，纱支均匀，布面平整洁净，适宜各类衬衫、工作服及家纺面料染色加工。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:15:00',
    updateTime: '2025-01-16 11:15:00'
  },
  {
    prodId: 5,
    merId: 1,
    catId: 5,
    indId: 2,
    title: '涤纶短纤 1.56D*38mm',
    brand: '恒力',
    spec: '1.56D',
    price: 6800.0,
    unit: '吨',
    stock: 2000,
    sales: 60,
    coverUrl: '/products/5.jpg',
    detail: '纺织级聚酯短纤维，强力高、手感蓬松、卷曲弹性优异，纯纺或与棉麻混纺性能卓越。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:20:00',
    updateTime: '2025-01-16 11:20:00'
  },
  {
    prodId: 6,
    merId: 1,
    catId: 7,
    indId: 3,
    title: '工业级碳酸钠 99.2%',
    brand: '三友',
    spec: '25kg/袋',
    price: 1850.0,
    unit: '吨',
    stock: 4000,
    sales: 45,
    coverUrl: '/products/7.jpg',
    detail: '纯碱含量大于等于99.2%，氯化物低，适用于玻璃制造、冶金冶炼、纺织印染及化工合成。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:25:00',
    updateTime: '2025-01-16 11:25:00'
  },
  {
    prodId: 7,
    merId: 1,
    catId: 8,
    indId: 3,
    title: '抗磨液压油 L-HM46',
    brand: '长城',
    spec: '18L/桶',
    price: 360.0,
    unit: '桶',
    stock: 1500,
    sales: 75,
    coverUrl: '/products/8.jpg',
    detail: '优异抗磨性能与热氧化安定性，保护液压叶片泵与齿轮泵，延长工业设备使用寿命。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:30:00',
    updateTime: '2025-01-16 11:30:00'
  },
  {
    prodId: 8,
    merId: 1,
    catId: 9,
    indId: 4,
    title: '贴片电阻 0805 10KΩ',
    brand: '风华',
    spec: '0805 5%',
    price: 0.02,
    unit: '只',
    stock: 500000,
    sales: 980,
    coverUrl: '/products/9.jpg',
    detail: '厚膜贴片电阻，体积小阻值稳定，自动化贴片焊接可靠度高，广泛应用于主板及电源。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:35:00',
    updateTime: '2025-01-16 11:35:00'
  },
  {
    prodId: 9,
    merId: 1,
    catId: 10,
    indId: 4,
    title: '板对板连接器 2.0mm 双排',
    brand: '立讯',
    spec: '2x10P',
    price: 1.85,
    unit: '只',
    stock: 60000,
    sales: 260,
    coverUrl: '/products/10.jpg',
    detail: '精密间距双排插针连接器，磷铜镀金引脚接触电阻低，耐插拔循环上千次。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:40:00',
    updateTime: '2025-01-16 11:40:00'
  },
  {
    prodId: 10,
    merId: 1,
    catId: 11,
    indId: 4,
    title: 'IPS 显示面板 7寸 1024*600',
    brand: '京东方',
    spec: '7inch',
    price: 96.0,
    unit: '片',
    stock: 3000,
    sales: 130,
    coverUrl: '/products/6.jpg',
    detail: '全视角工控级IPS显示模组，高对比度与宽温适应，适合工业HMI界面与智能终端。',
    status: 1,
    reviewStatus: 1,
    createTime: '2025-01-16 11:45:00',
    updateTime: '2025-01-16 11:45:00'
  }
]

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    activityId: 1,
    title: '新客注册有礼',
    type: 'register',
    description: '注册即送 100 积分，首单更享专属优惠。',
    startTime: '2025-01-01 00:00:00',
    endTime: '2027-12-31 23:59:59',
    status: 1,
    joined: false
  },
  {
    activityId: 2,
    title: '行业采购节·消费有礼',
    type: 'purchase',
    description: '活动期间完成任意订单支付，自动累计积分并参与满减专场。',
    startTime: '2025-01-01 00:00:00',
    endTime: '2027-12-31 23:59:59',
    status: 1,
    joined: true
  }
]

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    promoId: 1,
    title: '全场满 500 减 50',
    type: 'full_reduce',
    threshold: 500,
    benefitAmount: 50,
    scope: 'all',
    startTime: '2025-01-01 00:00:00',
    endTime: '2027-12-31 23:59:59'
  },
  {
    promoId: 2,
    title: '建材行业 95 折',
    type: 'discount',
    threshold: 100,
    discountRate: 0.95,
    scope: 'ind',
    indId: 1,
    startTime: '2025-01-01 00:00:00',
    endTime: '2027-12-31 23:59:59'
  }
]

export const INITIAL_MEMBER_LEVELS: MemberLevel[] = [
  { levelId: 1, levelName: '普通会员', minGrowth: 0, discountRate: 1.0 },
  { levelId: 2, levelName: '银牌会员', minGrowth: 1000, discountRate: 0.98 },
  { levelId: 3, levelName: '金牌会员', minGrowth: 3000, discountRate: 0.95 },
  { levelId: 4, levelName: '钻石会员', minGrowth: 10000, discountRate: 0.90 }
]

export const INITIAL_MEMBER_CARD: MemberCard = {
  growth: 1560,
  points: 1200,
  levelId: 2
}

export const INITIAL_CREDIT_ACCOUNT: CreditAccount = {
  accId: 1,
  entId: 1,
  userId: 2,
  status: 'ACTIVE',
  creditLimit: 500000,
  availableLimit: 382000,
  usedLimit: 118000,
  termDays: 60,
  riskLevel: 'AA级优质企业',
  createTime: '2025-01-10 09:00:00'
}

export const INITIAL_SUPPORT_ENTRIES: SupportKnowledgeEntry[] = [
  {
    id: 'account-registration',
    keywords: ['如何注册', '注册账号', '创建账号', '创建账户', '注册', '新用户', '怎么注册', '注册流程', '账号注册', '采购方注册', '供应商注册', '商家注册', '注册入口'],
    answer: '请打开登录页面并切换到“注册”标签，选择“采购方”或“商户/供应商”身份，填写手机号、密码及页面要求的信息后提交。注册成功后，使用注册的手机号和密码登录。'
  },
  {
    id: 'account-login',
    keywords: ['手机号或密码错误', '两步验证', '动态验证码', '登录失败', '密码错误', '如何登录', '登录', '登入', '账号登录', '怎么登录', '无法登录', '登录流程', '登录账号', '登陆'],
    answer: '请使用已注册的手机号和密码登录。如果该账号启用了两步验证，密码校验通过后还需要输入验证器 App 提供的 6 位动态验证码。演示账号密码均为 123456。'
  },
  {
    id: 'product-browsing',
    keywords: ['商品详情', '行业分类', '商品分类', '浏览商品', '查看商品', '找产品', '找商品', '商城', '商品', '商品列表', '商品搜索', '搜索商品', '类目导航'],
    answer: '首页提供行业分类和热门商品入口；打开“商城”后，可通过行业及分类菜单浏览商品并进入商品详情页，支持关键词搜索与按价格/销量排序。'
  },
  {
    id: 'cart-checkout',
    keywords: ['购物车', '加入购物车', '怎么结算', '如何结算', '购物车怎么结算', '购物车结算', '结算购物车', '结算页面', '结算流程', '购物车入口'],
    answer: '购物车和结算功能需要先登录。登录后可在商城或商品详情中使用购物车，勾选商品后再从“购物车”进入结算页面，支持选择收货地址和积分抵扣。'
  },
  {
    id: 'order-navigation',
    keywords: ['我的订单', '订单查询', '查看订单', '订单详情', '如何下单', '下单流程', '订单列表', '订单中心', '订单怎么查看', '查看我的订单'],
    answer: '登录后，可从页面导航或用户菜单进入“我的订单”，查看订单列表、订单详情、支付状态与履约状态，未支付订单可在详情页或列表中直接发起支付。'
  },
  {
    id: 'merchant-onboarding',
    keywords: ['商户入驻', '供应商入驻', '申请入驻', '商户申请', '开店', '供应商', '商户', '怎么入驻', '如何入驻', '入驻流程', '商家入驻', '企业入驻'],
    answer: '请先注册或登录，再从页面导航中的“商户入驻”入口提交申请。提交企业执照、注册资本与纳税资质，平台运营审核通过后即可上架商品和使用流量管理。'
  },
  {
    id: 'wallet',
    keywords: ['我的钱包', '钱包', '充值', '余额', '钱包入口', '钱包页面', '怎么打开钱包', '交易记录', '交易明细', '充值入口'],
    answer: '登录后打开用户菜单中的“我的钱包”。平台提供钱包概览、充值、交易记录和交易明细等页面，支持即时余额结算与退款原路到账。'
  },
  {
    id: 'credit-terms',
    keywords: ['企业账期', '账期申请', '账期账单', '账期还款', '账期', '账期入口', '账期中心', '怎么申请账期', '如何还账期', '企业账期账单'],
    answer: '登录后，如果账号具备相应权限，页面导航会显示“账期”入口。企业可提交授信额度申请，审核通过后可使用可用额度进行先货后款下单并按月对账还款。'
  },
  {
    id: 'membership',
    keywords: ['会员等级', '会员权益', '积分', '会员', 'vip', '会员中心', '会员权益入口', '积分入口', '积分怎么用', '成长值'],
    answer: '登录后从用户菜单进入“会员中心”，可查看会员等级、成长值进度、积分余额与专属权益。积分可在订单结算时按 100积分=1元 直接抵扣应付金额。'
  },
  {
    id: 'activities-promotions',
    keywords: ['活动中心', '参加活动', '活动', '促销', '优惠', '优惠中心', '促销中心', '促销活动', '优惠活动', '满减', '折扣'],
    answer: '页面顶部提供“优惠”入口可进入促销中心，查看全场满减与行业专属折扣；登录后还可打开“活动中心”领取积分奖励。'
  },
  {
    id: 'messages',
    keywords: ['消息中心', '站内消息', '未读消息', '通知', '消息', '消息入口', '系统通知'],
    answer: '登录后可使用顶栏的“🔔 消息”入口，或从用户菜单进入“消息中心”，查看系统公告、订单提醒和促销通知。'
  },
  {
    id: 'cookie-privacy',
    keywords: ['隐私与 cookie', 'cookie 设置', 'cookie', '隐私设置', 'cookie偏好', '管理cookie'],
    answer: '页面底部提供“隐私与 Cookie”入口，点击后可了解数据合规政策与配置分析 Cookie 的许可偏好。'
  },
  {
    id: 'account-addresses',
    keywords: ['收货地址管理', '地址管理', '地址簿', '新增收货地址', '修改收货地址', '收货地址入口', '地址入口', '收货地址'],
    answer: '登录后可进入个人中心的“收货地址”标签，添加、编辑或设为默认收货地址，结算页面会自动带出默认地址。'
  }
]

export const INITIAL_CONVERSATIONS: CustomerConversation[] = [
  {
    id: 'conv-101',
    conversationNo: 'CC-20250118-001',
    visitorToken: 'vis-buyer-001',
    subject: '企业大宗采购账期额度提升咨询',
    status: 'needs_reply',
    priority: 'high',
    assignedTo: '平台客服01',
    lastMessagePreview: '请问我们集团本月工程追加需要临时将账期额度提至80万，需要哪些附加材料？',
    lastMessageAt: '2025-01-18 10:20:00',
    createdAt: '2025-01-18 10:15:00',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: '您好，我们是重庆建工采购部。',
        createdAt: '2025-01-18 10:15:00'
      },
      {
        id: 2,
        sender: 'user',
        content: '请问我们集团本月工程追加需要临时将账期额度提至80万，需要哪些附加材料？',
        createdAt: '2025-01-18 10:20:00'
      }
    ]
  },
  {
    id: 'conv-102',
    conversationNo: 'CC-20250118-002',
    visitorToken: 'vis-guest-002',
    subject: '商户入驻纳税资质审核标准',
    status: 'assigned',
    priority: 'normal',
    assignedTo: '平台运营',
    lastMessagePreview: '一般纳税人近3个月税务证明上传时有格式大小限制吗？',
    lastMessageAt: '2025-01-18 09:40:00',
    createdAt: '2025-01-18 09:30:00',
    messages: [
      {
        id: 3,
        sender: 'user',
        content: '你好，准备入驻建材专区。一般纳税人近3个月税务证明上传时有格式大小限制吗？',
        createdAt: '2025-01-18 09:30:00'
      },
      {
        id: 4,
        sender: 'agent',
        content: '您好！纳税凭证支持 JPG、PNG 与 PDF 格式，单份材料大小请控制在 10MB 以内，系统支持上传多份近3个月纳税完税凭证。',
        createdAt: '2025-01-18 09:40:00'
      }
    ]
  }
]

export const INITIAL_LEARNING_CANDIDATES: LearningCandidate[] = [
  {
    id: 'cand-001',
    conversationId: 'conv-102',
    entryId: 'merchant-tax-proof-size',
    keywords: ['纳税证明格式', '税务证明大小限制', '纳税凭证大小', '上传材料限制'],
    draftAnswer: '商户入驻材料中，纳税完税证明支持 JPG/PNG/PDF 格式，每份文件不超过 10MB，可上传多份并填写对应税务登记号。',
    reason: '从商户常见入驻问询中提取材料格式与大小规则',
    status: 'PENDING',
    createdAt: '2025-01-18 10:00:00'
  }
]

export const mockKnowledgeBase = INITIAL_SUPPORT_ENTRIES

