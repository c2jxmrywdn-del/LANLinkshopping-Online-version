import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  User,
  Product,
  CartItem,
  Order,
  OrderItem,
  WalletLog,
  CreditAccount,
  CreditBill,
  CreditRepayment,
  Merchant,
  Activity,
  Promotion,
  MemberCard,
  MemberPointLog,
  Address,
  AuditLog,
  LoginLog,
  CustomerConversation,
  CustomerMessage,
  LearningCandidate,
  SupportKnowledgeEntry
} from '../types'
import {
  INITIAL_USERS,
  INITIAL_ENTERPRISE,
  INITIAL_MERCHANTS,
  INITIAL_INDUSTRIES,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ACTIVITIES,
  INITIAL_PROMOTIONS,
  INITIAL_MEMBER_LEVELS,
  INITIAL_MEMBER_CARD,
  INITIAL_CREDIT_ACCOUNT,
  INITIAL_SUPPORT_ENTRIES,
  INITIAL_CONVERSATIONS,
  INITIAL_LEARNING_CANDIDATES
} from './mockData'

interface StoreContextType {
  // Auth
  user: User | null
  login: (phone: string, password: string) => Promise<{ success: boolean; require2fa?: boolean; hint?: string; message?: string }>
  login2fa: (ticket: string, code: string) => Promise<boolean>
  logout: () => void
  register: (payload: { roleCode: 'buyer' | 'merchant'; phone: string; password: string; nickname?: string; email?: string }) => Promise<boolean>
  updateUserSecurity: (patch: Partial<User>) => void
  
  // Products
  products: Product[]
  industries: typeof INITIAL_INDUSTRIES
  categories: typeof INITIAL_CATEGORIES
  addProduct: (product: Omit<Product, 'prodId' | 'sales' | 'createTime' | 'updateTime' | 'reviewStatus' | 'status'>) => void
  updateProductStatus: (prodId: number, status: number) => void
  reviewProduct: (prodId: number, reviewStatus: number, rejectReason?: string) => void

  // Cart
  cart: CartItem[]
  addToCart: (prodId: number, quantity: number) => void
  updateCartQty: (cartId: number, quantity: number) => void
  toggleCartChecked: (cartId: number, checked: boolean) => void
  toggleAllChecked: (checked: boolean) => void
  removeCartItem: (cartId: number) => void
  clearCheckedCart: () => void

  // Orders
  orders: Order[]
  createOrder: (payload: {
    cartIds: number[]
    receiver: string
    phone: string
    address: string
    remark?: string
    payType: 'corporate' | 'balance' | 'term'
    usePoints?: number
  }) => Promise<Order>
  payOrder: (orderNo: string, channel: string) => Promise<{ success: boolean; paid: boolean }>
  cancelOrder: (orderNo: string) => void
  refundOrder: (orderNo: string, amount: number, reason: string) => void

  // Wallet
  walletBalance: number
  walletLogs: WalletLog[]
  rechargeWallet: (amount: number, remark?: string) => void

  // Credit Terms
  creditAccount: CreditAccount
  creditBills: CreditBill[]
  creditRepayments: CreditRepayment[]
  applyCredit: (requestedLimit: number, termDays: number) => void
  reviewCredit: (accId: number, status: 'ACTIVE' | 'REJECTED', limit?: number, termDays?: number, remark?: string) => void
  repayCreditBill: (billId: number, amount: number, method?: string) => void

  // Merchant
  merchants: Merchant[]
  applyMerchant: (payload: {
    regType: string
    regCapital: number
    joinType: string
    taxRegNo?: string
    licenseUrl?: string
    taxProofUrls?: string
  }) => void
  reviewMerchant: (merId: number, status: number, rejectReason?: string) => void

  // Activities & Promotions
  activities: Activity[]
  joinActivity: (activityId: number) => void
  promotions: Promotion[]

  // Membership
  memberCard: MemberCard
  memberLevels: typeof INITIAL_MEMBER_LEVELS
  memberPointLogs: MemberPointLog[]
  redeemQuote: (points: number, orderAmount: number) => { points: number; amount: number; maxAmount: number; balance: number }

  // User details
  addresses: Address[]
  addAddress: (addr: Omit<Address, 'id'>) => void
  updateAddress: (id: number, addr: Partial<Address>) => void
  deleteAddress: (id: number) => void
  setDefaultAddress: (id: number) => void
  loginLogs: LoginLog[]
  auditLogs: AuditLog[]
  addAuditLog: (action: string, detail: string) => void

  // Customer Support & Knowledge Base
  conversations: CustomerConversation[]
  learningCandidates: LearningCandidate[]
  supportEntries: SupportKnowledgeEntry[]
  askSupport: (question: string, visitorToken: string) => Promise<{ answer: string; entryId?: string }>
  replyConversation: (convId: string, content: string, sender: 'agent' | 'user') => void
  updateConversationStatus: (convId: string, status: 'needs_reply' | 'assigned' | 'resolved') => void
  assignConversation: (convId: string, agentName: string) => void
  createLearningCandidate: (payload: { conversationId: string; entryId: string; keywords: string[]; draftAnswer: string; reason?: string }) => void
  reviewLearningCandidate: (candId: string, status: 'APPROVED' | 'REJECTED', rejectionReason?: string) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStorage = <T,>(key: string, fallback: T): T => {
    try {
      const v = localStorage.getItem(`lanlink_${key}`)
      return v ? JSON.parse(v) : fallback
    } catch {
      return fallback
    }
  }

  const setStorage = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`lanlink_${key}`, JSON.stringify(value))
    } catch {
      // ignore
    }
  }

  // State
  const [users, setUsers] = useState<User[]>(() => getStorage('users', INITIAL_USERS))
  const [user, setUser] = useState<User | null>(() => getStorage('curr_user', INITIAL_USERS[1])) // default logged in as buyer for smooth exploration
  const [products, setProducts] = useState<Product[]>(() => getStorage('products', INITIAL_PRODUCTS))
  const [cart, setCart] = useState<CartItem[]>(() => getStorage('cart', [
    {
      cartId: 1,
      prodId: 1,
      title: '建筑钢材 HRB400 螺纹钢 Φ20',
      price: 3850,
      quantity: 2,
      stock: 5000,
      coverUrl: '/products/1.jpg',
      checked: 1,
      subtotal: 7700
    }
  ]))
  const [orders, setOrders] = useState<Order[]>(() => getStorage('orders', [
    {
      orderNo: 'ORD20250117001',
      userId: 2,
      merId: 1,
      totalAmount: 3850,
      originalAmount: 3850,
      pointsDeducted: 0,
      receiver: '张工',
      phone: '13900000001',
      address: '重庆市渝北区金开大道 88 号施工现场指挥部',
      remark: '急用物资，附带原厂检测合格报告',
      payType: 'corporate',
      payStatus: 1,
      payChannel: 'wallet',
      orderStatus: 1,
      createTime: '2025-01-17 14:20:00',
      items: [
        {
          itemId: 1,
          orderNo: 'ORD20250117001',
          prodId: 1,
          title: '建筑钢材 HRB400 螺纹钢 Φ20',
          price: 3850,
          quantity: 1,
          subtotal: 3850,
          coverUrl: '/products/1.jpg'
        }
      ]
    }
  ]))
  const [walletBalance, setWalletBalance] = useState<number>(() => getStorage('wallet_balance', 85600.0))
  const [walletLogs, setWalletLogs] = useState<WalletLog[]>(() => getStorage('wallet_logs', [
    {
      logId: 1,
      userId: 2,
      changeType: 'recharge',
      amount: 100000,
      remark: '企业采购专项备用金银行转账充值',
      createTime: '2025-01-15 09:30:00'
    },
    {
      logId: 2,
      userId: 2,
      changeType: 'pay',
      amount: -14400,
      remark: '结算订单 ORD20250116892 货款',
      createTime: '2025-01-16 16:45:00'
    }
  ]))
  const [creditAccount, setCreditAccount] = useState<CreditAccount>(() => getStorage('credit_account', INITIAL_CREDIT_ACCOUNT))
  const [creditBills, setCreditBills] = useState<CreditBill[]>(() => getStorage('credit_bills', [
    {
      billId: 1,
      accId: 1,
      orderNo: 'ORD20250116892',
      amount: 14400,
      repaidAmount: 0,
      status: 'UNPAID',
      dueDate: '2025-03-16',
      createTime: '2025-01-16 16:45:00'
    }
  ]))
  const [creditRepayments, setCreditRepayments] = useState<CreditRepayment[]>(() => getStorage('credit_repayments', []))
  const [merchants, setMerchants] = useState<Merchant[]>(() => getStorage('merchants', INITIAL_MERCHANTS))
  const [activities, setActivities] = useState<Activity[]>(() => getStorage('activities', INITIAL_ACTIVITIES))
  const [promotions] = useState<Promotion[]>(INITIAL_PROMOTIONS)
  const [memberCard, setMemberCard] = useState<MemberCard>(() => getStorage('member_card', INITIAL_MEMBER_CARD))
  const [memberPointLogs, setMemberPointLogs] = useState<MemberPointLog[]>(() => getStorage('member_point_logs', [
    {
      id: 1,
      points: 1000,
      type: 'earn',
      remark: '新客户企业开户迎新赠礼',
      createTime: '2025-01-10 10:00:00'
    },
    {
      id: 2,
      points: 200,
      type: 'earn',
      remark: '参与采购节活动奖励',
      createTime: '2025-01-15 15:30:00'
    }
  ]))
  const [addresses, setAddresses] = useState<Address[]>(() => getStorage('addresses', [
    {
      id: 1,
      receiver: '张工（重庆建工）',
      phone: '13900000001',
      region: '重庆市 渝北区',
      detail: '金开大道 88 号两江数字产业园 3 号楼 12 层采购部',
      isDefault: 1
    },
    {
      id: 2,
      receiver: '李仓管',
      phone: '13900000001',
      region: '重庆市 江北区',
      detail: '寸滩保税港区物流园 5 号钢材仓库',
      isDefault: 0
    }
  ]))
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStorage('audit_logs', [
    {
      id: 1,
      action: 'merchant.review',
      operator: '平台运营 (13800000000)',
      detail: '商户 #1 (华晨建材) 审核通过，统一社会信用代码核验一致',
      ip: '192.168.1.100',
      createTime: '2025-01-16 14:00:00'
    },
    {
      id: 2,
      action: 'credit.grant',
      operator: '平台运营 (13800000000)',
      detail: '批准 重庆建工采购 授信 500,000 元，账期 60 天',
      ip: '192.168.1.100',
      createTime: '2025-01-16 14:05:00'
    }
  ]))
  const [loginLogs] = useState<LoginLog[]>([
    { id: 1, ip: '113.204.225.10', location: '中国 重庆市', device: 'PC (Chrome 122)', browser: 'Chrome 122', status: '成功', time: '2025-01-18 09:12:44' },
    { id: 2, ip: '113.204.225.10', location: '中国 重庆市', device: 'PC (Chrome 122)', browser: 'Chrome 122', status: '成功', time: '2025-01-17 14:02:11' },
    { id: 3, ip: '113.204.225.10', location: '中国 重庆市', device: 'Mobile (Safari 17)', browser: 'Safari 17', status: '成功', time: '2025-01-16 20:30:00' }
  ])
  const [conversations, setConversations] = useState<CustomerConversation[]>(() => getStorage('conversations', INITIAL_CONVERSATIONS))
  const [learningCandidates, setLearningCandidates] = useState<LearningCandidate[]>(() => getStorage('learning_candidates', INITIAL_LEARNING_CANDIDATES))
  const [supportEntries, setSupportEntries] = useState<SupportKnowledgeEntry[]>(() => getStorage('support_entries', INITIAL_SUPPORT_ENTRIES))

  // Persistence effects
  useEffect(() => setStorage('users', users), [users])
  useEffect(() => setStorage('curr_user', user), [user])
  useEffect(() => setStorage('products', products), [products])
  useEffect(() => setStorage('cart', cart), [cart])
  useEffect(() => setStorage('orders', orders), [orders])
  useEffect(() => setStorage('wallet_balance', walletBalance), [walletBalance])
  useEffect(() => setStorage('wallet_logs', walletLogs), [walletLogs])
  useEffect(() => setStorage('credit_account', creditAccount), [creditAccount])
  useEffect(() => setStorage('credit_bills', creditBills), [creditBills])
  useEffect(() => setStorage('credit_repayments', creditRepayments), [creditRepayments])
  useEffect(() => setStorage('merchants', merchants), [merchants])
  useEffect(() => setStorage('activities', activities), [activities])
  useEffect(() => setStorage('member_card', memberCard), [memberCard])
  useEffect(() => setStorage('member_point_logs', memberPointLogs), [memberPointLogs])
  useEffect(() => setStorage('addresses', addresses), [addresses])
  useEffect(() => setStorage('audit_logs', auditLogs), [auditLogs])
  useEffect(() => setStorage('conversations', conversations), [conversations])
  useEffect(() => setStorage('learning_candidates', learningCandidates), [learningCandidates])
  useEffect(() => setStorage('support_entries', supportEntries), [supportEntries])

  // Auth Methods
  const login = async (phone: string, pass: string) => {
    const matched = users.find(u => u.phone === phone)
    if (!matched) {
      return { success: false, message: '手机号或密码错误' }
    }
    if (pass !== '123456') {
      return { success: false, message: '手机号或密码错误' }
    }
    if (matched.totpEnabled) {
      return { success: false, require2fa: true, hint: `${phone.slice(0, 3)}****${phone.slice(-4)}` }
    }
    setUser(matched)
    return { success: true }
  }

  const login2fa = async (ticket: string, code: string) => {
    if (code && code.length === 6) {
      const matched = users.find(u => u.phone === ticket || u.totpEnabled) || users[1]
      setUser(matched)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (payload: { roleCode: 'buyer' | 'merchant'; phone: string; password: string; nickname?: string; email?: string }) => {
    if (users.some(u => u.phone === payload.phone)) {
      throw new Error('该手机号已注册')
    }
    const newUser: User = {
      userId: Date.now(),
      phone: payload.phone,
      nickname: payload.nickname || (payload.roleCode === 'merchant' ? '新入驻商家' : '企业采购用户'),
      roleId: payload.roleCode === 'merchant' ? 2 : 1,
      roleCode: payload.roleCode,
      unreadCount: 1,
      identity: {
        code: payload.roleCode,
        name: payload.roleCode === 'merchant' ? '商户' : '采购方',
        serviceScope: payload.roleCode === 'merchant' ? '商品发布 / 流量分析' : '企业采购 / 账期申请',
        permissions: payload.roleCode === 'merchant'
          ? ['product:publish', 'merchant:manage', 'profile:manage']
          : ['cart:manage', 'order:create', 'order:view', 'credit:view', 'credit:apply', 'profile:manage']
      }
    }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    // Add welcome point
    setMemberPointLogs(prev => [
      { id: Date.now(), points: 100, type: 'earn', remark: '新客注册赠送积分', createTime: new Date().toLocaleString() },
      ...prev
    ])
    setMemberCard(prev => ({ ...prev, points: prev.points + 100 }))
    return true
  }

  const updateUserSecurity = (patch: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...patch }
    setUser(updated)
    setUsers(prev => prev.map(u => u.userId === user.userId ? updated : u))
  }

  // Product Methods
  const addProduct = (p: Omit<Product, 'prodId' | 'sales' | 'createTime' | 'updateTime' | 'reviewStatus' | 'status'>) => {
    const newProd: Product = {
      ...p,
      prodId: Date.now(),
      sales: 0,
      status: 1,
      reviewStatus: 1, // auto approve in sandbox
      createTime: new Date().toLocaleString(),
      updateTime: new Date().toLocaleString()
    }
    setProducts(prev => [newProd, ...prev])
  }

  const updateProductStatus = (prodId: number, status: number) => {
    setProducts(prev => prev.map(p => p.prodId === prodId ? { ...p, status } : p))
  }

  const reviewProduct = (prodId: number, reviewStatus: number, rejectReason?: string) => {
    setProducts(prev => prev.map(p => p.prodId === prodId ? { ...p, reviewStatus, rejectReason, status: reviewStatus === 1 ? 1 : 0 } : p))
  }

  // Cart Methods
  const addToCart = (prodId: number, quantity: number) => {
    const prod = products.find(p => p.prodId === prodId)
    if (!prod) return
    setCart(prev => {
      const existing = prev.find(item => item.prodId === prodId)
      if (existing) {
        const nextQty = existing.quantity + quantity
        return prev.map(item => item.prodId === prodId ? { ...item, quantity: nextQty, subtotal: nextQty * item.price } : item)
      } else {
        return [
          ...prev,
          {
            cartId: Date.now(),
            prodId,
            title: prod.title,
            price: prod.price,
            quantity,
            stock: prod.stock,
            coverUrl: prod.coverUrl,
            checked: 1,
            subtotal: prod.price * quantity
          }
        ]
      }
    })
  }

  const updateCartQty = (cartId: number, quantity: number) => {
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity, subtotal: i.price * quantity } : i))
  }

  const toggleCartChecked = (cartId: number, checked: boolean) => {
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, checked: checked ? 1 : 0 } : i))
  }

  const toggleAllChecked = (checked: boolean) => {
    setCart(prev => prev.map(i => ({ ...i, checked: checked ? 1 : 0 })))
  }

  const removeCartItem = (cartId: number) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId))
  }

  const clearCheckedCart = () => {
    setCart(prev => prev.filter(i => !i.checked))
  }

  // Order Methods
  const createOrder = async (payload: {
    cartIds: number[]
    receiver: string
    phone: string
    address: string
    remark?: string
    payType: 'corporate' | 'balance' | 'term'
    usePoints?: number
  }) => {
    const items = cart.filter(c => payload.cartIds.includes(c.cartId))
    const rawTotal = items.reduce((sum, item) => sum + item.subtotal, 0)
    const pointsDeduction = payload.usePoints ? Math.floor(payload.usePoints / 100) : 0
    const finalAmount = Math.max(0, rawTotal - pointsDeduction)
    const orderNo = `ORD${Date.now()}`

    const newOrder: Order = {
      orderNo,
      userId: user?.userId || 2,
      merId: 1,
      totalAmount: finalAmount,
      originalAmount: rawTotal,
      pointsDeducted: pointsDeduction,
      receiver: payload.receiver,
      phone: payload.phone,
      address: payload.address,
      remark: payload.remark,
      payType: payload.payType,
      payStatus: 0,
      orderStatus: 0,
      createTime: new Date().toLocaleString(),
      items: items.map((it, idx) => ({
        itemId: Date.now() + idx,
        orderNo,
        prodId: it.prodId,
        title: it.title,
        price: it.price,
        quantity: it.quantity,
        subtotal: it.subtotal,
        coverUrl: it.coverUrl
      }))
    }

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const cartMatched = items.find(it => it.prodId === p.prodId)
      if (cartMatched) {
        return { ...p, stock: Math.max(0, p.stock - cartMatched.quantity), sales: p.sales + cartMatched.quantity }
      }
      return p
    }))

    // Points deduction
    if (payload.usePoints && payload.usePoints > 0) {
      setMemberCard(prev => ({ ...prev, points: Math.max(0, prev.points - (payload.usePoints || 0)) }))
      setMemberPointLogs(prev => [
        { id: Date.now(), points: -payload.usePoints!, type: 'redeem', remark: `订单 ${orderNo} 抵现使用`, createTime: new Date().toLocaleString() },
        ...prev
      ])
    }

    // If Credit Term:
    if (payload.payType === 'term') {
      newOrder.payStatus = 1
      newOrder.orderStatus = 1
      newOrder.payChannel = 'term'
      setCreditAccount(prev => ({
        ...prev,
        usedLimit: prev.usedLimit + finalAmount,
        availableLimit: Math.max(0, prev.availableLimit - finalAmount)
      }))
      const newBill: CreditBill = {
        billId: Date.now(),
        accId: creditAccount.accId,
        orderNo,
        amount: finalAmount,
        repaidAmount: 0,
        status: 'UNPAID',
        dueDate: new Date(Date.now() + creditAccount.termDays * 86400000).toISOString().split('T')[0],
        createTime: new Date().toLocaleString()
      }
      setCreditBills(prev => [newBill, ...prev])
    }

    setOrders(prev => [newOrder, ...prev])
    clearCheckedCart()
    return newOrder
  }

  const payOrder = async (orderNo: string, channel: string) => {
    const o = orders.find(ord => ord.orderNo === orderNo)
    if (!o) return { success: false, paid: false }
    if (channel === 'wallet') {
      if (walletBalance < o.totalAmount) {
        throw new Error('钱包余额不足')
      }
      setWalletBalance(b => b - o.totalAmount)
      setWalletLogs(prev => [
        {
          logId: Date.now(),
          userId: user?.userId || 2,
          changeType: 'pay',
          amount: -o.totalAmount,
          remark: `订单 ${orderNo} 支付`,
          createTime: new Date().toLocaleString()
        },
        ...prev
      ])
    }

    setOrders(prev => prev.map(ord => ord.orderNo === orderNo ? { ...ord, payStatus: 1, orderStatus: 1, payChannel: channel } : ord))

    // Membership rewards: earn points equal to amount spent (double for VIP)
    const multiplier = user?.identity?.code === 'vip' ? 2 : 1
    const earnedPoints = Math.floor(o.totalAmount * multiplier)
    setMemberCard(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      growth: prev.growth + Math.floor(o.totalAmount)
    }))
    setMemberPointLogs(prev => [
      { id: Date.now(), points: earnedPoints, type: 'earn', remark: `订单 ${orderNo} 完成奖励`, createTime: new Date().toLocaleString() },
      ...prev
    ])

    return { success: true, paid: true }
  }

  const cancelOrder = (orderNo: string) => {
    const o = orders.find(ord => ord.orderNo === orderNo)
    if (!o) return
    if (o.payType === 'term' && o.payStatus === 1) {
      setCreditAccount(prev => ({
        ...prev,
        usedLimit: Math.max(0, prev.usedLimit - o.totalAmount),
        availableLimit: prev.availableLimit + o.totalAmount
      }))
      setCreditBills(prev => prev.filter(b => b.orderNo !== orderNo))
    }
    setOrders(prev => prev.map(ord => ord.orderNo === orderNo ? { ...ord, orderStatus: 3 } : ord))
  }

  const refundOrder = (orderNo: string, amount: number, reason: string) => {
    const o = orders.find(ord => ord.orderNo === orderNo)
    if (!o) return
    setOrders(prev => prev.map(ord => ord.orderNo === orderNo ? {
      ...ord,
      payStatus: 2,
      refundStatus: 'success',
      refundAmount: amount,
      orderStatus: 3
    } : ord))

    // refund to wallet
    setWalletBalance(b => b + amount)
    setWalletLogs(prev => [
      {
        logId: Date.now(),
        userId: o.userId,
        changeType: 'refund',
        amount,
        remark: `订单 ${orderNo} 退款: ${reason}`,
        createTime: new Date().toLocaleString()
      },
      ...prev
    ])
  }

  // Wallet
  const rechargeWallet = (amount: number, remark?: string) => {
    setWalletBalance(b => b + amount)
    setWalletLogs(prev => [
      {
        logId: Date.now(),
        userId: user?.userId || 2,
        changeType: 'recharge',
        amount,
        remark: remark || '钱包在线充值',
        createTime: new Date().toLocaleString()
      },
      ...prev
    ])
  }

  // Credit Terms
  const applyCredit = (requestedLimit: number, termDays: number) => {
    setCreditAccount(prev => ({
      ...prev,
      creditLimit: requestedLimit,
      availableLimit: requestedLimit,
      termDays,
      status: 'PENDING',
      createTime: new Date().toLocaleString()
    }))
  }

  const reviewCredit = (accId: number, status: 'ACTIVE' | 'REJECTED', limit?: number, termDays?: number, remark?: string) => {
    setCreditAccount(prev => ({
      ...prev,
      status,
      creditLimit: limit || prev.creditLimit,
      availableLimit: limit || prev.availableLimit,
      termDays: termDays || prev.termDays,
      reviewRemark: remark
    }))
    addAuditLog('credit.review', `审核账期申请 #${accId}，结果: ${status}`)
  }

  const repayCreditBill = (billId: number, amount: number, method = 'wallet') => {
    const bill = creditBills.find(b => b.billId === billId)
    if (!bill) return
    if (method === 'wallet') {
      if (walletBalance < amount) throw new Error('钱包余额不足以还款')
      setWalletBalance(b => b - amount)
      setWalletLogs(prev => [
        {
          logId: Date.now(),
          userId: user?.userId || 2,
          changeType: 'pay',
          amount: -amount,
          remark: `账期账单 #${billId} 还款`,
          createTime: new Date().toLocaleString()
        },
        ...prev
      ])
    }
    const nextRepaid = bill.repaidAmount + amount
    const isPaid = nextRepaid >= bill.amount
    setCreditBills(prev => prev.map(b => b.billId === billId ? {
      ...b,
      repaidAmount: nextRepaid,
      status: isPaid ? 'PAID' : 'UNPAID'
    } : b))
    setCreditAccount(prev => ({
      ...prev,
      usedLimit: Math.max(0, prev.usedLimit - amount),
      availableLimit: prev.availableLimit + amount
    }))
    setCreditRepayments(prev => [
      { id: Date.now(), billId, amount, method, createTime: new Date().toLocaleString() },
      ...prev
    ])
  }

  // Merchant
  const applyMerchant = (payload: {
    regType: string
    regCapital: number
    joinType: string
    taxRegNo?: string
    licenseUrl?: string
    taxProofUrls?: string
  }) => {
    const newMerchant: Merchant = {
      merId: Date.now(),
      entId: INITIAL_ENTERPRISE.entId,
      userId: user?.userId || 3,
      regType: payload.regType,
      regCapital: payload.regCapital,
      taxStatus: payload.taxProofUrls ? 1 : 0,
      joinType: payload.joinType,
      reviewStatus: 0,
      taxRegNo: payload.taxRegNo,
      licenseUrl: payload.licenseUrl || '/assets/contact/whatsapp-qr.png',
      taxProofUrls: payload.taxProofUrls || '/assets/contact/whatsapp-qr.png',
      createTime: new Date().toLocaleString(),
      updateTime: new Date().toLocaleString(),
      enterprise: INITIAL_ENTERPRISE
    }
    setMerchants(prev => [newMerchant, ...prev])
  }

  const reviewMerchant = (merId: number, status: number, rejectReason?: string) => {
    setMerchants(prev => prev.map(m => m.merId === merId ? { ...m, reviewStatus: status, rejectReason, updateTime: new Date().toLocaleString() } : m))
    if (status === 1) {
      // upgrade user permissions to merchant
      const m = merchants.find(item => item.merId === merId)
      if (m && user && user.userId === m.userId) {
        const upgraded: User = {
          ...user,
          roleCode: 'merchant',
          identity: {
            code: 'merchant',
            name: '入驻商户',
            serviceScope: '商品发布 / 经营数据分析 / 订单发货',
            permissions: ['product:publish', 'merchant:manage', 'profile:manage']
          }
        }
        setUser(upgraded)
        setUsers(prev => prev.map(u => u.userId === user.userId ? upgraded : u))
      }
    }
    addAuditLog('merchant.review', `审核商户 #${merId}，状态: ${status === 1 ? '通过' : '驳回'}`)
  }

  // Activities
  const joinActivity = (activityId: number) => {
    setActivities(prev => prev.map(a => a.activityId === activityId ? { ...a, joined: true } : a))
    setMemberCard(prev => ({ ...prev, points: prev.points + 100 }))
    setMemberPointLogs(prev => [
      { id: Date.now(), points: 100, type: 'earn', remark: '参与营销活动奖励', createTime: new Date().toLocaleString() },
      ...prev
    ])
  }

  // Membership Quote
  const redeemQuote = (points: number, orderAmount: number) => {
    const maxPercent = 0.1 // 10%
    const maxAllowedAmount = orderAmount * maxPercent
    const requestedAmount = points / 100
    const actualAmount = Math.min(requestedAmount, maxAllowedAmount, memberCard.points / 100)
    const actualPoints = Math.floor(actualAmount * 100)
    return {
      points: actualPoints,
      amount: Number(actualAmount.toFixed(2)),
      maxAmount: Number(maxAllowedAmount.toFixed(2)),
      balance: memberCard.points
    }
  }

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = { ...addr, id: Date.now() }
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: 0 })).concat(newAddr))
    } else {
      setAddresses(prev => [...prev, newAddr])
    }
  }

  const updateAddress = (id: number, addr: Partial<Address>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...addr } : (addr.isDefault ? { ...a, isDefault: 0 } : a)))
  }

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
  }

  const setDefaultAddress = (id: number) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id ? 1 : 0 })))
  }

  // Audit
  const addAuditLog = (action: string, detail: string) => {
    setAuditLogs(prev => [
      {
        id: Date.now(),
        action,
        operator: user ? `${user.nickname} (${user.phone})` : 'System',
        detail,
        ip: '127.0.0.1',
        createTime: new Date().toLocaleString()
      },
      ...prev
    ])
  }

  // Support & KB
  const askSupport = async (question: string, visitorToken: string) => {
    const qLower = question.toLowerCase().trim()
    let matchedEntry: SupportKnowledgeEntry | undefined

    for (const entry of supportEntries) {
      for (const kw of entry.keywords) {
        if (qLower.includes(kw.toLowerCase())) {
          matchedEntry = entry
          break
        }
      }
      if (matchedEntry) break
    }

    const answer = matchedEntry
      ? matchedEntry.answer
      : '抱歉，当前客服仅能解答 LANLinkshopping 专属知识库已收录的电商相关问题。可咨询账号注册与登录、商品浏览、购物车与订单、商户入驻、钱包与账期、会员与活动、站内消息及 Cookie 设置；其他问题暂不在可答范围内。'

    // Record to conversations
    const userMsg: CustomerMessage = {
      id: Date.now(),
      sender: 'user',
      content: question,
      createdAt: new Date().toLocaleString(),
      visitorToken
    }
    const agentMsg: CustomerMessage = {
      id: Date.now() + 1,
      sender: 'agent',
      content: answer,
      createdAt: new Date().toLocaleString(),
      visitorToken
    }

    setConversations(prev => {
      const existing = prev.find(c => c.visitorToken === visitorToken)
      if (existing) {
        return prev.map(c => c.visitorToken === visitorToken ? {
          ...c,
          lastMessagePreview: question,
          lastMessageAt: new Date().toLocaleString(),
          messages: [...c.messages, userMsg, agentMsg]
        } : c)
      } else {
        const newConv: CustomerConversation = {
          id: `conv-${Date.now()}`,
          conversationNo: `CC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
          visitorToken,
          subject: question.slice(0, 24),
          status: 'needs_reply',
          priority: 'normal',
          lastMessagePreview: question,
          lastMessageAt: new Date().toLocaleString(),
          createdAt: new Date().toLocaleString(),
          messages: [userMsg, agentMsg]
        }
        return [newConv, ...prev]
      }
    })

    return { answer, entryId: matchedEntry?.id }
  }

  const replyConversation = (convId: string, content: string, sender: 'agent' | 'user') => {
    const newMsg: CustomerMessage = {
      id: Date.now(),
      sender,
      content,
      createdAt: new Date().toLocaleString()
    }
    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      lastMessagePreview: content,
      lastMessageAt: new Date().toLocaleString(),
      status: sender === 'agent' ? 'resolved' : 'needs_reply',
      messages: [...c.messages, newMsg]
    } : c))
  }

  const updateConversationStatus = (convId: string, status: 'needs_reply' | 'assigned' | 'resolved') => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, status } : c))
  }

  const assignConversation = (convId: string, agentName: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, assignedTo: agentName, status: 'assigned' } : c))
  }

  const createLearningCandidate = (payload: { conversationId: string; entryId: string; keywords: string[]; draftAnswer: string; reason?: string }) => {
    const candidate: LearningCandidate = {
      id: `cand-${Date.now()}`,
      conversationId: payload.conversationId,
      entryId: payload.entryId,
      keywords: payload.keywords,
      draftAnswer: payload.draftAnswer,
      reason: payload.reason,
      status: 'PENDING',
      createdAt: new Date().toLocaleString()
    }
    setLearningCandidates(prev => [candidate, ...prev])
  }

  const reviewLearningCandidate = (candId: string, status: 'APPROVED' | 'REJECTED', rejectionReason?: string) => {
    const cand = learningCandidates.find(c => c.id === candId)
    setLearningCandidates(prev => prev.map(c => c.id === candId ? { ...c, status, rejectionReason } : c))
    if (status === 'APPROVED' && cand) {
      setSupportEntries(prev => [
        ...prev.filter(e => e.id !== cand.entryId),
        { id: cand.entryId, keywords: cand.keywords, answer: cand.draftAnswer }
      ])
      addAuditLog('support.learning_publish', `知识候选 #${candId} 审核通过并同步发布至正式知识库`)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        login2fa,
        logout,
        register,
        updateUserSecurity,
        products,
        industries: INITIAL_INDUSTRIES,
        categories: INITIAL_CATEGORIES,
        addProduct,
        updateProductStatus,
        reviewProduct,
        cart,
        addToCart,
        updateCartQty,
        toggleCartChecked,
        toggleAllChecked,
        removeCartItem,
        clearCheckedCart,
        orders,
        createOrder,
        payOrder,
        cancelOrder,
        refundOrder,
        walletBalance,
        walletLogs,
        rechargeWallet,
        creditAccount,
        creditBills,
        creditRepayments,
        applyCredit,
        reviewCredit,
        repayCreditBill,
        merchants,
        applyMerchant,
        reviewMerchant,
        activities,
        joinActivity,
        promotions,
        memberCard,
        memberLevels: INITIAL_MEMBER_LEVELS,
        memberPointLogs,
        redeemQuote,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        loginLogs,
        auditLogs,
        addAuditLog,
        conversations,
        learningCandidates,
        supportEntries,
        askSupport,
        replyConversation,
        updateConversationStatus,
        assignConversation,
        createLearningCandidate,
        reviewLearningCandidate
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
