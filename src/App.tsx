import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Client Views
import { Home } from './views/Home'
import { Mall } from './views/Mall'
import { ProductDetail } from './views/ProductDetail'
import { Cart } from './views/Cart'
import { Checkout } from './views/Checkout'
import { MyOrders } from './views/MyOrders'
import { OrderDetail } from './views/OrderDetail'
import { Wallet } from './views/Wallet'
import { WalletRecharge } from './views/WalletRecharge'
import { WalletTransactions } from './views/WalletTransactions'
import { CreditTermCenter } from './views/CreditTermCenter'
import { CreditTermApply } from './views/CreditTermApply'
import { CreditTermBills } from './views/CreditTermBills'
import { CreditTermBillDetail } from './views/CreditTermBillDetail'
import { MerchantApply } from './views/MerchantApply'
import { MerchantProducts } from './views/MerchantProducts'
import { MerchantTraffic } from './views/MerchantTraffic'
import { ActivityCenter } from './views/ActivityCenter'
import { ActivityMy } from './views/ActivityMy'
import { ActivityRules } from './views/ActivityRules'
import { MembershipCenter } from './views/MembershipCenter'
import { MembershipLevels } from './views/MembershipLevels'
import { MembershipPoints } from './views/MembershipPoints'
import { MembershipBenefits } from './views/MembershipBenefits'
import { PromotionCenter } from './views/PromotionCenter'
import { PromotionDetail } from './views/PromotionDetail'
import { AboutUs } from './views/AboutUs'
import { PrivacyCenter } from './views/PrivacyCenter'
import { Me } from './views/Me'
import { AccountSettings } from './views/AccountSettings'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { UiLab } from './views/UiLab'

// Admin Views
import { AdminDashboard } from './views/admin/AdminDashboard'
import { MerchantReview } from './views/admin/MerchantReview'
import { MerchantDetail } from './views/admin/MerchantDetail'
import { AdminProducts } from './views/admin/AdminProducts'
import { AdminPayments } from './views/admin/AdminPayments'
import { AdminCreditTerms } from './views/admin/AdminCreditTerms'
import { AdminAuditLog } from './views/admin/AdminAuditLog'
import { CustomerCommunicationCenter } from './views/admin/CustomerCommunicationCenter'
import { SupportLearningSandbox } from './views/admin/SupportLearningSandbox'

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main User Facing Portal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mall" element={<Mall />} />
          <Route path="/ui-lab" element={<UiLab />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Orders & Bidirectional Route Aliases */}
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:orderNo" element={<OrderDetail />} />
          <Route path="/order/:orderNo" element={<OrderDetail />} />

          {/* Wallet & Payment */}
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/recharge" element={<WalletRecharge />} />
          <Route path="/wallet/transactions" element={<WalletTransactions />} />

          {/* Credit Terms (企业账期) */}
          <Route path="/credit-term" element={<CreditTermCenter />} />
          <Route path="/credit-term/apply" element={<CreditTermApply />} />
          <Route path="/credit-term/bills" element={<CreditTermBills />} />
          <Route path="/credit-term/bills/:id" element={<CreditTermBillDetail />} />

          {/* Merchant Features & Route Aliases */}
          <Route path="/merchant" element={<MerchantApply />} />
          <Route path="/merchant/apply" element={<MerchantApply />} />
          <Route path="/merchant/products" element={<MerchantProducts />} />
          <Route path="/merchant/traffic" element={<MerchantTraffic />} />

          {/* Activity Center */}
          <Route path="/activity" element={<ActivityCenter />} />
          <Route path="/activity/my" element={<ActivityMy />} />
          <Route path="/activity/rules" element={<ActivityRules />} />

          {/* Membership Center */}
          <Route path="/membership" element={<MembershipCenter />} />
          <Route path="/membership/levels" element={<MembershipLevels />} />
          <Route path="/membership/points" element={<MembershipPoints />} />
          <Route path="/membership/benefits" element={<MembershipBenefits />} />

          {/* Promotion Center */}
          <Route path="/promotions" element={<PromotionCenter />} />
          <Route path="/promotions/:id" element={<PromotionDetail />} />

          {/* User Profile & Account */}
          <Route path="/me" element={<Me />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/account/settings" element={<AccountSettings />} />

          {/* Info & Privacy Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyCenter />} />
          <Route path="/privacy/cookies" element={<PrivacyCenter />} />
        </Route>

        {/* Auth Pages (standalone) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Administration Platform */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="merchants" element={<MerchantReview />} />
          <Route path="merchants/:id" element={<MerchantDetail />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="credit-terms" element={<AdminCreditTerms />} />
          <Route path="audit" element={<AdminAuditLog />} />
          <Route path="communications" element={<CustomerCommunicationCenter />} />
          <Route path="support-learning" element={<SupportLearningSandbox />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
export default App
