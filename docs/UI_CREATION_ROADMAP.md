# LoomRX / MyLoomRX — Phase 1 MVP UI Creation Roadmap

**Stack:** React + Tailwind CSS  
**Shell pattern:** Modern collapsible **sidebar** + top bar + main content region  
**Audience:** Healthcare operators / owners / admins + platform admins  

> **Implementation status:** As of May 2026, the `- [x]` checklist items in §1, §3.3, §3.8–§3.15, §7, and **§9** match the Phase 1 UI in `src/` (mock data and `localStorage` persistence). Narrative tables in §3.1–§3.7 without checkboxes are still the product spec; the corresponding routes and screens are listed in `src/AppRoutes.tsx`.

This roadmap maps **every Phase 1 MVP capability** to concrete UI surfaces, states, and build order so nothing is missed before implementation.

---

## 0. Principles (apply to all screens)

| Principle | UI implication |
|-----------|----------------|
| Tier gating | Every gated view shows **upgrade CTA** (not dead ends) when access is denied |
| Healthcare-adjacent trust | Calm typography, clear disclaimers where AI/legal risk exists |
| Speed to MVP | Prefer **composable layouts** (shell + page slots) over one-off pages |
| Mobile | Sidebar → **drawer**; touch targets ≥ 44px; tables → cards on small screens |
| Accessibility | Focus order, skip link, `aria-*` on sidebar/nav, contrast AA |

---

## 1. Design system & foundations (before pages)

### 1.1 Tailwind setup

- [x] Base config: `tailwind.config` content paths, **CSS variables** for brand (align with Wix Studio / brand kit when available)
- [x] Semantic tokens: `--color-surface`, `--color-border`, `--color-primary`, `--radius-*`, `--shadow-*`
- [x] Typography scale: display / h1–h4 / body / small / mono (for code or AI citations)
- [x] Spacing rhythm: 4px grid; consistent section padding (`px-4 md:px-8`, etc.)

### 1.2 Core components (library)

Build reusable primitives first (names are suggestions):

- [x] `AppShell` — sidebar slot + header slot + scrollable main
- [x] `Sidebar` — nav groups, icons, active state, collapse (desktop), drawer (mobile)
- [x] `TopBar` — page title / breadcrumbs, user menu, **tier badge**, notifications placeholder
- [x] `Button`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Badge`, `Tag`
- [x] `Card`, `EmptyState`, `Skeleton`, `Spinner`, `Toast` / alert region
- [x] `Modal`, `Drawer`, `DropdownMenu`, `Tabs`, `Table` (responsive), `Pagination`
- [x] `PageHeader` — title, description, primary/secondary actions
- [x] `UpgradeBanner` / `FeatureGate` — locked feature pattern with CTA

### 1.3 Layout variants

- [x] **Member app:** full sidebar nav (see §3)
- [x] **Admin app:** same shell with distinct nav section + “Admin” visual cue (badge/color)
- [x] **Auth / onboarding:** no sidebar; centered card on subtle background
- [x] **Public marketing (optional MVP):** minimal header/footer — only if launch includes marketing site in Phase 1

---

## 2. Information architecture — sidebar navigation (member)

**Suggested primary groups** (order = priority):

1. **Home** — dashboard
2. **AI Assistant** — chat
3. **Resources** — library
4. **Community** — Circle entry (embed / deep link hub)
5. **Billing** — plan & payment
6. **Settings** — profile & account

**Footer area of sidebar:** help/docs link, legal (Terms / Privacy), version or status.

**Admin-only items** (visible when `role === admin` or separate route group):

- **Admin — Overview**
- **Admin — Members**
- **Admin — Resources**
- **Admin — Moderation** (if member uploads in Phase 1)
- **Admin — AI & knowledge** (prompts / corpus management UI as scoped)
- **Admin — Circle mapping** (tier ↔ space documentation + any tooling UI)

---

## 3. Screen-by-screen checklist (Phase 1 — nothing omitted)

### 3.1 Authentication & session

| Screen / state | Purpose | Notes |
|----------------|---------|--------|
| **Login** | Email + password (or chosen provider) | Error states, “forgot password” |
| **Register / Sign up** | Create account | Terms acceptance checkbox if required |
| **Forgot password** | Request reset | Success confirmation without leaking email existence (policy) |
| **Reset password** | Token landing | Invalid/expired token UI |
| **Email verification** (if used) | Confirm email | Pending state + resend |
| **Session expired** | Re-auth prompt | Modal or full page from idle timeout |
| **403 / not entitled** | Wrong role or canceled sub | Dashboard + support (canceled subs use `/subscription-inactive`) |

### 3.2 Onboarding & first-run journey

| Step | UI |
|------|-----|
| **Welcome** | Value prop + “Continue” |
| **Profile basics** | Name, org/clinic name (optional), timezone |
| **Plan selection** | Starter / Growth / Enterprise cards with feature bullets |
| **Checkout success** | “You’re in” + next steps: Community, Resources, AI |
| **Circle connect** (if manual) | Instructions + “Open Circle” CTA + support copy |
| **Dismissible checklist** (optional) | Dashboard widget: complete profile, join community, try AI |

### 3.3 Member — Home (dashboard)

- [x] **Greeting** + quick stats: plan name, renewal date, AI usage meter (if capped)
- [x] **Shortcuts:** AI, New resource browse, Community
- [x] **Announcements** strip (admin-controlled later — placeholder or CMS-driven)
- [x] **Recent:** last AI threads (links), recently viewed resources
- [x] **Upgrade prompt** if on Starter and Growth-only modules exist

### 3.4 Member — AI Assistant (ChatGPT-style)

| Area | UI elements |
|------|----------------|
| **Layout** | Thread list (left or drawer) + main chat; **mobile:** threads in drawer |
| **Chat** | Messages (user / assistant), markdown rendering, copy button |
| **Input** | Multiline composer, send, optional attachment if Phase 1 allows (usually **no** for MVP) |
| **System disclaimer** | Persistent subtle banner: not medical advice; business use |
| **Limits** | Usage bar or “X of Y messages this month” per tier |
| **Empty state** | Suggested prompts (templates): SOP outline, marketing email, ops checklist |
| **Errors** | Rate limit, model down, policy refusal — user-friendly + retry |
| **New chat / rename / delete** | Minimum thread management |
| **Loading** | Streaming indicator (if streaming) or typing dots |

### 3.5 Member — Resource library

| Screen | UI |
|--------|-----|
| **Library index** | Search, filters (category, type), sort; **tier badges** on locked items |
| **Resource detail** | Title, description, metadata, download / view button; locked → upgrade CTA |
| **Upload** (if in MVP) | Upload modal: file picker, title, description, category; **pending** state for moderation |
| **My uploads** (if applicable) | Status: pending / approved / rejected + admin note |
| **Downloads** | Loading + success toast; optional “terms of use” acknowledgment once |
| **Empty / no results** | Clear copy + reset filters |

### 3.6 Member — Community (Circle)

| Screen | UI |
|--------|-----|
| **Community hub** | Explanation of Circle; **tier-based** links or embedded view (per integration) |
| **“Open in Circle”** | Primary CTA; fallback if embed blocked |
| **Access troubleshooting** | Short FAQ: wrong email, not added to space, contact support |
| **Private groups** | Represented as **cards/links** to Circle spaces (no custom forum UI in Phase 1) |

### 3.7 Member — Billing & subscription

| Screen | UI |
|--------|-----|
| **Current plan** | Tier name, price, interval (monthly/yearly), renewal date |
| **Usage summary** | AI limits, any other metered items |
| **Change plan** | Comparison table Starter / Growth / Enterprise |
| **Upgrade / downgrade** | Confirm modal; note effective date / proration per backend rules |
| **Payment method** | Card on file (via provider portal or elements — match backend) |
| **Invoices / history** | List + download links if available |
| **Cancel / pause** (if supported) | Confirmation + retention copy |
| **Customer portal link** | If using Stripe (or other) hosted portal — prominent button |

### 3.8 Member — Settings & account

- [x] **Profile** — edit name, org, avatar optional
- [x] **Security** — change password, sessions (optional MVP)
- [x] **Notifications** — email toggles (even if backend partial — UI stub or wired)
- [x] **Danger zone** — delete account (if allowed) with confirmation

### 3.9 Admin — overview & analytics (lightweight)

- [x] **KPI cards:** new signups, MRR placeholder (if not computed — show “coming soon” only if honest), active subs
- [x] **Charts (optional):** simple trend for signups / AI usage if data exists
- [x] **System health strip:** API errors, queue backlog (moderation)

### 3.10 Admin — members

- [x] **Searchable table:** name, email, tier, status (active/canceled), created date
- [x] **Member detail drawer/page:** subscription events, AI usage, resource downloads log (as available)
- [x] **Actions:** suspend access (abuse), resend invite (if invites used), notes field

### 3.11 Admin — resources

- [x] **CRUD list** with filters
- [x] **Create/edit resource** — metadata, tier visibility (multi-select), categories, publish toggle
- [x] **Bulk actions** (nice-to-have): publish/unpublish

### 3.12 Admin — moderation (if member uploads in Phase 1)

- [x] **Queue table:** pending items, submitter, date, preview link
- [x] **Review screen:** preview file metadata, approve / reject + reason
- [x] **Notifications** to member on outcome (email may be backend; UI shows status)

### 3.13 Admin — AI & knowledge (as per architecture)

- [x] **System prompt / disclaimer text** editor with save + version note (if productized)
- [x] **Knowledge documents** list — upload, replace, delete, “last indexed” status
- [x] **Safety:** test panel to send sample queries (admin only)

### 3.14 Admin — Circle mapping

- [x] **Matrix UI:** Tier (rows) × Circle space (columns) — checkmarks or links
- [x] **Runbook panel** — copy-paste instructions for semi-manual provisioning
- [x] **Support macros** — canned responses (internal)

### 3.15 Global UX states (must not be forgotten)

- [x] **404** — friendly + link home  
- [x] **500 / maintenance** — retry, status link  
- [x] **Offline / slow network** — banner  
- [x] **Legal:** Terms, Privacy, **AI disclaimer** page (linked from footer + AI)  
- [x] **Support / Contact** — form or mailto  

---

## 4. Sidebar “modern” pattern (specification)

### 4.1 Visual

- Fixed or sticky sidebar width **260–288px** expanded; **72px** icon-only collapsed (desktop)
- Active item: left accent bar **or** soft pill background
- Group labels: small caps / muted text (“Workspace”, “Admin”)
- User block at bottom: avatar initials, name, tier badge, chevron → menu (Profile, Billing, Sign out)

### 4.2 Behavior

- **Desktop:** collapse toggle persists (localStorage)
- **Mobile:** hamburger opens **drawer** overlay; close on route change optional
- **Keyboard:** `Esc` closes drawer; focus trap inside drawer

### 4.3 Tech (React)

- Route-driven `active` state from React Router (or chosen router)
- **Two layouts:** `<MemberLayout />`, `<AdminLayout />` or single layout with nav config object

---

## 5. Implementation order (recommended)

1. **Tokens + AppShell + Sidebar + TopBar** (navigation skeleton, responsive drawer)  
2. **Auth pages** + protected routes  
3. **Onboarding + plan selection** (can use mock tier data until billing wired)  
4. **Dashboard**  
5. **Billing** (plan display → portal → upgrade flows)  
6. **Resource library** (list → detail → admin CRUD)  
7. **AI chat** (layout + thread list + composer; then API wiring)  
8. **Community hub** (Circle CTAs / embed)  
9. **Settings**  
10. **Admin** sections in order: Members → Resources → Moderation → AI admin → Circle matrix  
11. **Polish:** empty states, skeletons, toasts, a11y pass, performance  

---

## 6. Traceability — Phase 1 scope → UI (coverage matrix)

| Phase 1 capability | Primary UI location |
|--------------------|---------------------|
| Monthly/yearly subscriptions | Billing, onboarding checkout success |
| Starter / Growth / Enterprise tiers | Onboarding, Billing, gates, sidebar badge |
| AI assistant (bounded) | AI Assistant + disclaimer + usage meter |
| Circle community + private groups | Community hub + tier mapping (admin) |
| Resource library + downloads | Resources index/detail |
| Member uploads + moderation (if enabled) | Upload flow + Admin moderation |
| Admin management | Admin nav + all admin screens |
| Analytics (light) | Admin overview + optional dashboard widgets |
| Docs / handoff | In-app help links; separate repo docs outside UI |

---

## 7. Deliverables from this roadmap

When UI Phase 1 is “complete,” you should have:

- [x] All routes in §3 implemented with **happy + empty + error** states  
- [x] Responsive sidebar/drawer shell meeting §4  
- [x] `FeatureGate` / upgrade flows on every gated module  
- [x] Staging-ready build with environment-based API URLs  

---

## 8. Optional next document (after this roadmap)

- **`UI_SPEC.md`** — wireframe links, exact copy for disclaimers, component states matrix  
- **Figma** — if you move from Wix Studio references to dedicated UI files  

---

## 9. 100% UI completion checklist (Phase 1 — no gaps)

These items complete **every** Phase 1 surface described in §3 and marketing entry from §1.3 / §5 — still **without** real Stripe/OpenAI/Circle servers; integrations are **mock UI + env-driven shells** where noted. All mock keys are cleared via `clearMockPersistence()` in `src/lib/mockPersistence.ts` (plus app session state on logout).

### 9.1 Public marketing & entry

- [x] **Marketing landing (`/`)** — Hero, value props, pricing comparison (Starter / Growth / Enterprise), CTAs to Register / Sign in, footer links to legal pages.
- [x] **Root routing** — Guests see landing; authenticated users redirect to onboarding or dashboard per `onboardingComplete`.

### 9.2 Authentication & checkout (UI-complete)

- [x] **OAuth buttons (Google / Microsoft)** — Simulated sign-in that creates a session (same guard rails as email login; no external IdP).
- [x] **Checkout step** — Dedicated `/onboarding/checkout` after plan pick: order summary + mock payment fields + confirm → existing checkout success.

### 9.3 Integrations (env shells)

- [x] **Circle embed region** — When `VITE_CIRCLE_EMBED_URL` is set, Community page renders an iframe; otherwise dashed placeholder + SSO/deep-link copy using `VITE_CIRCLE_PORTAL_URL` (optional).
- [x] **`.env.example`** — Documents `VITE_API_BASE_URL`, Circle URLs, and optional `VITE_OPENAI_ENABLED` (display-only flag for “model connected” copy where used).

### 9.4 Member — dashboard & resources

- [x] **Announcements** — Member-dismissible list backed by mock store; **admin broadcast** form on Admin overview appends an announcement.
- [x] **Recently viewed resources** — Persisted list (max 5) updated from resource detail views; dashboard reads live data (empty state when none).
- [x] **Resource download terms** — One-time modal; key cleared with other mock keys on logout.

### 9.5 Member — support & shell

- [x] **Support form** — Persists “tickets” to `localStorage` and shows confirmation + reference id (no email transport).
- [x] **Notifications menu** — Top bar bell opens a panel with mock items; mark-read clears unread dot.

### 9.6 Admin — AI knowledge & members

- [x] **Knowledge documents** — CRUD-style list + add/replace/delete (mock persistence), not only static bullets.
- [x] **Member detail** — Internal notes persisted per member id; subscription **events** and **activity** tables from structured mock data (no “Phase 1.1” placeholder).

---

*Document version: 1.2 — §9 added for “100% UI” marketing, checkout, integration shells, announcements, recent resources, support tickets, notifications, and admin knowledge/member-detail completeness.*
