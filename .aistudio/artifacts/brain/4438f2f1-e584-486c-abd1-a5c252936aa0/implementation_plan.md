# LANLinkshopping — 21st.dev 风格前端视觉升级、UX 动态动效、全局代码修复与 GitHub 自动提交流程方案

本方案将融合 **21st.dev** 社区最具代表性的现代前端组件与丝滑交互动效（光标聚光灯卡片、3D 物理倾斜、流光边框、Bento 网格布局、磁吸按钮、动态数字翻转计数、磨砂玻璃导航与骨架屏过渡），全面升级 **LANLinkshopping** 核心业务界面，新增独立的 **「21st.dev 交互组件与动效实验室」** 预览专区，彻底修复现有路由跳转不一致与潜在交互缺陷，并在构建与校验通过后自动执行 **Git 版本提交与 GitHub 远端同步**。

---

## User Review & Critical Decisions

> [!IMPORTANT]
> 以下为根据您的偏好与最新补充要求确认的核心架构、修复清单与 GitHub 提交流程决策：

- **Confirmed Decision 1 — 双轨融合模式（升级核心页面 + 独立组件预览库）**：在全面升级商城前台与管理后台视觉与动效的同时，新增独立的 **「交互动效展厅（21st.dev UI Lab）」** 专区，支持实时交互体验、参数调节与动效代码/配置预览。
- **Confirmed Decision 2 — 全模块覆盖升级**：涵盖 **首页英雄区、轮播与 Bento 特色分类区块**、**商城商品列表与 3D 聚光灯商品卡片**、**磨砂玻璃顶部导航栏、个人中心与全局浮动智能客服**、以及 **后台管理控制台、动态数字看板与高密度表格交互**。
- **Confirmed Decision 3 — 四大类 21st.dev 标志性动效体系**：
  1. **光标跟随聚光灯（Spotlight Card）与 3D 物理透视倾斜（3D Tilt）**
  2. **丝滑弹簧物理过渡（Spring Physics）、Bento 视觉网格与流光边框（Border Beam / Shimmer）**
  3. **动态数字滚动计数（Animated Counting Number）与丝滑骨架屏过渡（Skeleton Reveal）**
  4. **磁吸按钮（Magnetic Button）、磨砂玻璃导航（Liquid Glass）与悬浮微交互**
- **Confirmed Decision 4 — 路由断链与代码缺陷全面修复**：修复导航栏、结算页、订单列表、页脚中的路由别名断链（如 `/orders` 与 `/my-orders`、`/merchant` 与 `/merchant/apply`、`/privacy/cookies` 与 `/privacy`），修复未读消息角标同步，以及同时更新 Vue 原目录与 React 主工程的一致性。
- **Confirmed Decision 5 — 任务完成后自动执行 Git Commit 与 GitHub 同步**：
  - 在完成所有代码升级并通过 `tsc --noEmit` 与 `vite build` 零错误验证后，自动初始化/校验 Git 仓库（`main` 分支），绑定远端仓库地址 `https://github.com/c2jxmrywdn-del/LANLinkshopping.git`，自动执行 `git add` 与规范化 `git commit`，并尝试推送至 GitHub（同时在管理端/动效实验室提供可视化的 Git 提交状态与一键同步脚本支持）。

---

## 1. Overview & Core Concept

- **What It Does**：
  1. **核心商城与管理后台动效重塑**：将 21st.dev 标杆级的现代 Web 交互体验注入 B2B 供应链采购场景。从首页流光英雄区、Bento 行业解决方案网格，到商城的 3D 聚光灯商品卡片、磁吸购买按钮、动态数字统计面板，实现兼具商业严谨感与现代科技美学的前端体验。
  2. **21st.dev 交互组件与动效实验室（UI Lab）**：提供专门的可交互预览中心，分类展示聚光灯卡片、流光按钮、磁吸交互、Bento 网格、数字滚动翻转器、微交互状态切换等组件，支持实时改变发光色彩、弹簧阻尼与倾斜角度。
  3. **全链路缺陷修复与 Git 自动提交闭环**：统一所有前台、商户端与管理后台的路由映射、导航高亮逻辑、表单校验与状态反馈；任务完工后自动完成 Git 版本归档与远端推送。
- **Target Audience / Persona**：企业采购商、供应商户、平台运营管理员，以及需要直观体验与检视现代 UI/UX 动态效果的评审人员。
- **Key Value**：在保持 B2B 平台高可读性与操作效率的前提下，显著提升视觉精致度、交互反馈即时性（≤200ms 硬件加速合成动画）与代码仓库的交付完整性。

---

## 2. User Experience & Visual Design

- **Key User Flows**：
  1. **首页沉浸探索流**：进入首页 → 体验带有流光边框（Border Beam）与动态环境光斑的英雄区 → 点击磁吸主行动按钮（Magnetic CTA）或浏览 **Bento 网格化行业解决方案**（鼠标移入触发径向聚光灯追踪与微抬升） → 浏览热销商品 3D 倾斜卡片并一键丝滑加入购物车（触发顶部购物车徽标弹性脉冲）。
  2. **商城筛选与骨架屏丝滑切换流**：进入商城列表 → 切换行业分类或搜索条件时展示高贴合度流光骨架屏（Shimmer Skeleton） → 商品网格以错落弹簧动画（Staggered Reveal）切入 → 鼠标划过卡片呈现实时光标径向高光与 3D 景深悬浮。
  3. **21st.dev 动效实验室体验流**：从顶部导航进入「21st 动效库」 → 在交互沙盒中实时测试 Spotlight 聚光灯卡片、Magnetic 磁吸按钮、Shimmer 流光边框、Animated Number 动态计数器、Spring 弹簧手风琴等组件 → 支持实时切换主题光效与动效参数。
  4. **后台运营数据看板与工作台流**：进入管理后台 → 顶部核心 KPI 指标以动态数字滚动（Counting Number + Tabular Nums）呈现 → 审核表格与沟通中心具备平滑行高亮、状态过滤与抽屉/弹窗过渡。
- **Visual Identity & Theme**：
  - *Aesthetic Direction*：现代精密商务美学（Precision Enterprise & 21st.dev Modern Craft）——深海蓝（Navy `#13233A`）与流光金（Gold `#C8A45C`）、科技蓝（Azure `#0EA5E9`）结合高透毛玻璃与细腻高光边线。
  - *Color Palette & Mood*：遵循 **60-30-10 色彩法则**：60% 纯净浅灰白/深空暗色画布（`#F5F6F8` / `#0B1220`），30% 结构化卡片表面与 1px 极细高光分割线，10% 高意图流光金与电光蓝交互焦点。
  - *Typography & Hierarchy*：标题采用几何无衬线字体（`Plus Jakarta Sans` / 系统高现代感无衬线），正文保持高清晰度阅读比例，所有价格、金额、库存、订单号及看板统计数据严格启用等宽对齐数字（`font-variant-numeric: tabular-nums`）。
  - *Component Styling & Layout*：遵循零冗余胶囊标签原则（Zero-Pill Metadata Discipline），静态元数据采用干净的文字与 `·` 分隔符呈现；可交互筛选器采用分段控制器（Segmented Controls）样式；保持单层卡片海拔深度。
- **Interactive Feedback & Motion**：
  - **硬件加速合成（Compositor-Only）**：所有动效仅驱动 `transform` 与 `opacity` 及 CSS 变量径向渐变坐标（`--mouse-x`, `--mouse-y`），响应延迟控制在 100–200ms 内，采用 `cubic-bezier(0.16, 1, 0.3, 1)` 弹簧阻尼曲线。
  - **无障碍动效降级**：支持 `prefers-reduced-motion` 自动平缓降级，确保长时间操作的舒适度。

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — 原生高性能动效引擎 vs. 重量级外部动画依赖**
  - *Chosen Approach*：基于 React Hooks（`requestAnimationFrame` 节流指针追踪、物理弹簧插值）+ 模块化 CSS 变量（`--spotlight-x`, `--spotlight-y`, `@keyframes border-beam`）构建全套 21st.dev 核心组件。
  - *Why*：零额外包体积膨胀，避免与 React 18 / Ant Design 5 产生版本冲突，同时实现 60fps 丝滑的径向聚光灯、3D 倾斜、磁吸位移与数字滚动计数。
  - *Alternatives Considered*：引入多个散装第三方动效库可能导致样式冲突与构建不稳定。
- **Decision 2 — 路由双向兼容与错误代码根治**
  - *Chosen Approach*：不仅修正所有组件内的跳转链接（如 `/my-orders`、`/merchant/apply`、`/privacy`），同时在路由层保留别名映射（`/orders`、`/order/:id`、`/merchant`、`/privacy/cookies`），确保任何历史链接或深层跳转 100% 可达。
  - *Why*：彻底消除点击「我的订单」、「商户入驻」、「支付完成跳转」或「隐私设置」时被回退到首页的缺陷。
- **Decision 3 — 自动化 Git 归档与远端 GitHub 推送保障**
  - *Chosen Approach*：在构建与类型检查通过后，通过命令行自动执行 Git 仓库初始化（若 `.git` 缺失）、配置提交者信息与远端 `origin`（`https://github.com/c2jxmrywdn-del/LANLinkshopping.git`），生成结构化 Commit 记录并执行推送。
  - *Why*：确保所有 21st.dev 界面升级与缺陷修复完整记录在 Git 版本历史中，满足一键同步 GitHub 的交付需求。

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**：

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    App Router & Route Alias Guard                       │
│   (/, /mall, /ui-lab, /my-orders|/orders, /merchant/apply|/merchant,    │
│    /me, /wallet, /credit-term, /promotions, /privacy, /admin/*)         │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
                    ▼                                 ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│      MainLayout (Liquid Glass)        │ │   AdminLayout (Ops Console)   │
│  ┌─────────────────────────────────┐  │ │  ┌─────────────────────────┐  │
│  │ Glass Navbar + Magnetic Actions │  │ │  │ Animated KPI Stat Cards │  │
│  └─────────────────────────────────┘  │ │  │ (Counting Number + Beam)│  │
│                   │                   │ │  └─────────────────────────┘  │
│  ┌────────────────┴────────────────┐  │ │  ┌─────────────────────────┐  │
│  │ 21st.dev Motion Primitives      │  │ │  │ Interactive Data Tables │  │
│  │ • SpotlightCard (Radial Track)  │  │ │  │ • Smooth Row Highlights │  │
│  │ • Tilt3DCard (Perspective)      │  │ │  │ • Status Filter Tabs    │  │
│  │ • BorderBeam & ShimmerButton    │  │ │  │ • Drawer/Modal Audit    │  │
│  │ • MagneticButton (Cursor Pull)  │  │ │  └─────────────────────────┘  │
│  │ • AnimatedNumber (Spring Count) │  │ └───────────────────────────────┘
│  │ • BentoGrid & SkeletonLoader    │  │
│  └────────────────┬────────────────┘  │
│                   ▼                   │
│  ┌─────────────────────────────────┐  │
│  │ Upgraded Core Views & UI Lab    │  │
│  │ • Home (Beam Hero + Bento Grid) │  │
│  │ • Mall (Shimmer + 3D Cards)     │  │
│  │ • UI Lab (/ui-lab Interactive)  │  │
│  │ • Spring SupportChat Widget     │  │
│  └────────────────┬────────────────┘  │
└───────────────────┼───────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│             Automated Build Verification & Git/GitHub Sync              │
│   tsc --noEmit ──► vite build ──► git commit -m "feat: 21st.dev UI"     │
│                ──► git push origin main                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**：
  - **全局业务状态（StoreContext）**：管理用户身份切换、商品目录、购物车勾选与数量计算、订单状态机、企业钱包流水、账期授信与账单、会员积分及智能客服会话。
  - **21st.dev 交互状态**：组件内部维护高帧率指针位置状态（`x, y, isHovered`）、磁吸偏移向量（`dx, dy`）、数字插值动画帧以及交互沙盒配置参数（聚光灯半径、光效颜色、3D 倾斜强度、流光速度）。
- **Interactive Component & State Mapping**：
  - **Spotlight & 3D Tilt 商品卡片**：监听 `onPointerMove` 计算相对容器的归一化坐标，实时更新径向发光遮罩与 `perspective(1000px) rotateX/Y`，点击「加入购物车」触发磁吸回弹与顶部徽标缩放动画。
  - **Bento 行业与特色网格**：采用非对称响应式网格（大跨度主推卡 + 紧凑行业卡），支持悬停流光边线、动态指标预览与一键筛选跳转。
  - **Animated Number 计数器**：在首页核心指标、个人中心资产卡片、后台运营看板中，使用 `requestAnimationFrame` 缓动函数实现从 `0` 或旧值到目标数值的平滑滚动递增。
  - **21st.dev 交互实验室（`/ui-lab`）**：提供控制面板切换聚光灯色温（金/蓝/青/翠绿）、开启/关闭流光边框、触发数字重播与骨架屏加载演示，并附带各动效的设计说明与交互测试。
  - **代码修复与 Git 自动化闭环**：
    1. 统一 `Navbar`、`Checkout`、`MyOrders`、`OrderDetail`、`Footer` 中的所有导航路径与路由表。
    2. 修复个人中心与账户设置同步逻辑，确保消息已读状态与顶部未读角标实时联动。
    3. 完善图片加载失败的零破图优雅降级容器（Zero-Broken-Image Policy）。
    4. 编译验证通过后自动运行 Git 提交与远端推送。
