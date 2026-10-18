export interface UserIdentity {
  code: 'buyer' | 'merchant' | 'admin' | 'vip' | 'guest'
  name: string
  serviceScope: string
  permissions: string[]
}

export interface User {
  userId: number
  phone: string
  nickname: string
  avatar?: string
  roleId: number
  roleCode: 'buyer' | 'merchant' | 'admin'
  entId?: number
  gender?: 'male' | 'female' | 'unknown'
  unreadCount?: number
  identity?: UserIdentity
  totpEnabled?: boolean
}

export interface Enterprise {
  entId: number
  name: string
  creditCode: string
  memberLevel: number
  createTime: string
}

export interface Merchant {
  merId: number
  entId: number
  userId: number
  regType: string
  regCapital: number
  taxStatus: number // 0 unknown, 1 stable
  joinType: string // 邀约, 加盟, 入驻
  reviewStatus: number // 0 pending, 1 approved, 2 rejected
  rejectReason?: string
  licenseUrl?: string
  taxProofUrls?: string
  taxRegNo?: string
  createTime: string
  updateTime: string
  enterprise?: Enterprise
}

export interface Industry {
  indId: number
  name: string
  code: string
  configJson?: string
  sort: number
}

export interface Category {
  catId: number
  parentId: number
  indId: number
  name: string
  level: number
  sort: number
  children?: Category[]
}

export interface Product {
  prodId: number
  merId: number
  catId: number
  indId: number
  title: string
  brand: string
  spec: string
  price: number
  unit?: string
  tierPriceJson?: string
  stock: number
  coverUrl: string
  detail?: string
  status: number // 1 on-shelf, 0 off-shelf
  reviewStatus: number // 0 pending, 1 approved, 2 rejected
  rejectReason?: string
  sales: number
  createTime: string
  updateTime: string
}

export interface CartItem {
  cartId: number
  prodId: number
  title: string
  price: number
  quantity: number
  stock: number
  coverUrl: string
  checked: number // 1 or 0
  subtotal: number
}

export interface OrderItem {
  itemId: number
  orderNo: string
  prodId: number
  title: string
  price: number
  quantity: number
  subtotal: number
  coverUrl?: string
}

export interface Order {
  orderNo: string
  userId: number
  merId: number
  totalAmount: number
  originalAmount?: number
  pointsDeducted?: number
  receiver: string
  phone: string
  address: string
  remark?: string
  payType: 'corporate' | 'balance' | 'term'
  payStatus: number // 0 unpaid, 1 paid, 2 refunded
  payChannel?: string // wallet, mock, wechat, alipay
  orderStatus: number // 0 unpaid, 1 paid, 2 completed, 3 closed
  refundStatus?: 'none' | 'success'
  refundAmount?: number
  createTime: string
  items: OrderItem[]
}

export interface Wallet {
  balance: number
}

export interface WalletLog {
  logId: number
  userId: number
  changeType: 'recharge' | 'pay' | 'refund'
  amount: number
  remark: string
  createTime: string
}

export interface CreditAccount {
  accId: number
  entId: number
  userId: number
  status: 'NOT_APPLIED' | 'PENDING' | 'ACTIVE' | 'REJECTED'
  creditLimit: number
  availableLimit: number
  usedLimit: number
  termDays: number
  riskLevel: string
  reviewRemark?: string
  createTime: string
}

export interface CreditBill {
  billId: number
  accId: number
  orderNo: string
  amount: number
  repaidAmount: number
  status: 'UNPAID' | 'PAID' | 'OVERDUE'
  dueDate: string
  createTime: string
}

export interface CreditRepayment {
  id: number
  billId: number
  amount: number
  method: string
  createTime: string
}

export interface Activity {
  activityId: number
  title: string
  type: 'register' | 'purchase'
  description: string
  startTime: string
  endTime: string
  status: number
  joined?: boolean
}

export interface Promotion {
  promoId: number
  title: string
  type: 'full_reduce' | 'discount'
  threshold?: number
  benefitAmount?: number
  discountRate?: number
  scope: 'all' | 'ind'
  indId?: number
  startTime?: string
  endTime?: string
}

export interface MemberLevel {
  levelId: number
  levelName: string
  minGrowth: number
  discountRate: number
}

export interface MemberCard {
  growth: number
  points: number
  levelId: number
}

export interface MemberPointLog {
  id: number
  points: number
  type: 'earn' | 'redeem'
  remark: string
  createTime: string
}

export interface Address {
  id: number
  receiver: string
  phone: string
  region: string
  detail: string
  isDefault: number
}

export interface AuditLog {
  id: number
  action: string
  operator: string
  detail: string
  ip: string
  createTime: string
}

export interface LoginLog {
  id: number
  ip: string
  location: string
  device: string
  browser: string
  status: string
  time: string
}

export interface CustomerMessage {
  id: number
  sender: 'user' | 'agent' | 'system'
  content: string
  createdAt: string
  visitorToken?: string
}

export interface CustomerConversation {
  id: string
  conversationNo: string
  visitorToken: string
  subject: string
  status: 'needs_reply' | 'assigned' | 'resolved'
  priority: 'low' | 'normal' | 'high'
  assignedTo?: string
  lastMessagePreview: string
  lastMessageAt: string
  createdAt: string
  messages: CustomerMessage[]
}

export interface LearningCandidate {
  id: string
  conversationId: string
  entryId: string
  keywords: string[]
  draftAnswer: string
  reason?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectionReason?: string
  createdAt: string
}

export interface SupportKnowledgeEntry {
  id: string
  keywords: string[]
  answer: string
}
