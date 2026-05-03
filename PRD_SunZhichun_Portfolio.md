# PRD - Sun Zhichun Personal Portfolio

## 1. Document Info

- Project Name: `Sun Zhichun - Personal Portfolio`
- Product Type: Personal resume and brand website
- Language: Chinese only (`zh-CN`)
- Deployment Target: Alibaba Cloud
- Current Version: `v1.0`

## 2. Product Goals

- Build a minimalist, modern, highly structured personal website.
- Emphasize information clarity and subtle micro-interactions.
- Fully responsive for desktop and mobile.
- Frontend-first delivery: all interactive modules have complete UI shells, with API hooks reserved where needed.

## 3. Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion (simple and restrained animations only)

## 4. Design System (Single Light Theme)

### 4.1 Color Palette

- Background: `#FFFFFF`
- Surface / Muted: `#F6F6F6`
- Primary Text: `#020002`
- Accent Mint: `#CFF3E7`
- Accent Blue: `#E0F2FC`
- Accent Orange: `#ED9D82`

### 4.2 UI / UX Rules

- Card-first layout for core modules (education, experience, etc.).
- Rounded corners: prioritize `rounded-2xl` to `rounded-3xl`.
- Soft shadow style: use wide and light shadows (example: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
- Glassmorphism for sticky header, modal, floating overlays:
  - `backdrop-blur-md`
  - `bg-white/70`
  - `border border-white/20`
- Typography:
  - Modern sans-serif (`Inter` with Chinese system fallback, e.g. `PingFang SC`)
  - Distinguish hierarchy with weight (`font-bold`, `font-normal`)
  - No underlined links; use color/background contrast instead.

### 4.3 Visual Source of Truth

- Figma annotations are the only source of truth for spacing, size, and component measurements.
- The 5 provided screenshots are visual references and content placeholders.

## 5. Information Architecture

- Sticky Header (anchor navigation)
- Section 1: Hero & About
- Section 2: Education Timeline (+ cross-major easter egg)
- Section 3: Experience Cards
- Section 4: Skills Grid
- Section 5: AI Lab & Learning Content

## 6. Module Requirements

### 6.1 Sticky Header

- Sticky top navigation with glassmorphism.
- Navigation anchors:
  - About
  - Education
  - Experience
  - Skills
  - AI Lab
- Clicking anchor smoothly scrolls to section.
- Logo uses geometric placeholder in v1.

### 6.2 Hero & About

- Layout:
  - Desktop: two-column (left text + right avatar placeholder)
  - Mobile: stacked layout
- Main title (static): `Hi，我是孙致纯`
- Subtitle (typewriter loop):
  - `Product & Program Manager`
  - `AI Explorer`
  - `ESTJ`
- Intro paragraph:
  - `拥有近3年B端大厂产品策划及项目管理经验，擅长从0到1搭建业务系统与数据分析框架。致力于通过 AI解决实际业务痛点。`
- CTA buttons:
  - A: 下载简历（white background + black border）
  - B: 联系我（mint background）
- Contact overlay (on CTA B click):
  - WeChat: `19821609251`
  - Email: `sunzhichun1998@163.com`
  - Anti-scraping strategy: **Plan A** (frontend segmented display and assembled rendering)
- Resume file naming:
  - Unified filename base: `sunzhichun_resume`
  - Implementation must support updateable file naming (do not hard-code single fixed filename path in component logic).
- JD matcher — **阶段 0 范围（已冻结）**:
  - **输入**：仅 JD 文本（粘贴）。
  - **输出**：综合等级、综合分（0–100）、四维匹配矩阵（每项含分数与一句话依据）、匹配亮点（JD 要求 ↔ 简历证据）、**单段**连贯总结。
  - **本期不包含**：gap 分析、改进建议、多轮对话；接入阿里云 DashScope 与真实 prompt 在后续阶段完成（阶段 0 可用 mock 数据）。
  - UI：占位文案 `粘贴 JD 查看匹配度...`，CTA `AI 匹配`；预留 loading/error 与 `POST /api/match` 接入点。

### 6.3 Education Timeline + Easter Egg

- Vertical timeline with wheel-like navigation behavior.
- Wheel arrows switch timeline nodes.
- Node content uses screenshot text as source of truth for v1.
- Required node entries:
  - 东北林业大学（2016.09-2020.06）木材科学与工程（本科/前1%）
  - 上海交通大学（2020.09-2023.03）新闻与传播（硕士/前10%）
- Course and tag details for v1 follow screenshot content.
- Tag color rules:
  - Orange for national/achievement highlights
  - Mint for scholarship highlights

#### Cross-major Easter Egg Card

- Located under education card.
- Book-page layered shadow style.
- Two-page horizontal slide:
  - `为什么？` (orange-themed top gradient strip)
  - `我做了什么？` (mint-themed top gradient strip)
- Bottom controls:
  - Left/right page buttons
  - Colored capsule progress dots
- Content source for v1: screenshot copy.
- Future edits expected: content must be data-driven for easy replacement.

### 6.4 Experience Cards

- Vertical stacked wide cards.
- Card structure:
  - Top: company, role/department, date
  - Middle: responsibilities + pill tags
  - Bottom: highlight moment card (`icon + title + text`)
- Data source:
  - Must be separated into standalone JSON array (not hard-coded in JSX).
- Experience list (v1):
  1. 宁德时代（merge with 上海智科 context in one unified experience）
  2. 美团
  3. 腾讯
- Ningde Times sub-projects (must exist as independent entries):
  1. 分布式电驱产品市场策划
  2. 需求管理平台搭建
  3. 项目流程与工具标准化
- Interaction:
  - Clicking `查看详情` opens modal with project introduction (not inline expand).
- Content source for v1:
  - Use screenshot-based placeholder copy + replaceable data fields.

### 6.5 Skills Grid

- No progress bars.
- Minimal grid with icon + label cards.
- Categories:
  - Data analysis (mint): `SQL`, `SPSS`
  - Tools (blue): `Axure`, `Figma`
  - Certification & language (orange): `PMP认证`, `雅思7.0`

### 6.6 AI Lab & Learning

- Two-column layout.

#### Left: Vibe Coding Works

- Large preview card.
- Thumbnail list below to switch active project.
- Each item contains:
  - cover image
  - project name
  - tech tags
  - short intro
  - top-right external-link affordance
- v1 projects:
  - MeetWe
  - Clozy
  - 个人简历网站
- Link status in v1:
  - placeholder links allowed; real URLs will be provided later.

#### Right: Learning & Content

- CSS smartphone mockup container.
- Inside content: show **home feed/list style only**.
- Two high-performing notes are shown as placeholder cards in v1.
- Real URLs will be provided later.

## 7. Animation and Interaction Principles

- Motion should support readability, never distract from content.
- Framer Motion usage scope:
  - Typewriter subtitle
  - Card appearance transitions
  - Modal open/close transitions
  - Simple slide transitions for easter egg pages
- Respect reduced-motion preference when possible.

## 8. Responsive Strategy

- Breakpoints:
  - Mobile-first implementation
  - Desktop enhancement for split layouts
- Key responsive behavior:
  - Hero: two-column -> stacked
  - AI Lab: two-column -> stacked
  - Timeline and cards maintain readable spacing and touch targets on narrow screens.

## 9. Data and Content Strategy

- All major content should be configuration-driven.
- Recommended content files:
  - `content/about.json`
  - `content/education.json`
  - `content/experience.json`
  - `content/skills.json`
  - `content/ai-lab.json`
- v1 allows screenshot-derived placeholder copy.
- Future edits should require only content file updates, not component rewrites.

## 10. Non-Goals (v1)

- No dark mode.
- No multilingual support.
- No backend matching logic for JD matcher in v1 (UI shell only).
- No ICP备案 footer placeholder required.

## 11. Acceptance Criteria (v1)

- Full page sections implemented and navigable via sticky anchors.
- Design matches Figma metrics and visual style.
- All key modules are responsive on desktop and mobile.
- Ningde Times sub-project details open in modal.
- Contact overlay displays anti-scraping-safe segmented info render.
- Resume download entry references updateable `sunzhichun_resume` naming strategy.
- Content can be updated through data files.

## 12. Open Items for Later

- Replace placeholder project and note links with real URLs.
- Replace placeholder cover images with final assets.
- Replace screenshot placeholder copy with finalized personal copy where needed.
