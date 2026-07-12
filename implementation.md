# LauchKix — Implementation Plan

**Hackathon:** HackOnVibe · July 2026 · Business Success track  
**Theme:** Effective promotion of a newly launched mobile app  
**Stack:** Next.js (App Router) · Noviq UI design system (CSS Modules + tokens) · OpenRouter (Gemini)  
**UI guide:** [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md) — **the north star for all visuals**  
**Goal:** Ship a top-tier, demoable micro-product in the remaining hours that scores on usefulness, AI depth, and revenue path.

---

## 1. Product summary

### One-liner
Paste your new mobile app details → get a complete **AI launch marketing kit** (store listings, ASO keywords, social calendar, emails, press blurb, landing-page copy) in under a minute.

### Problem
Indie founders and small teams ship apps, then fail at promotion: weak store copy, no content calendar, no launch emails, no positioning. Freelancers charge $100–500 for the same work.

### Solution
A single polished web app that turns app facts into a full promo system — copyable, regenerable, exportable — with a clear freemium path to revenue.

### Target users
- Solo indie mobile founders  
- Small app studios (1–4 people)  
- Student / hackathon app teams  
- SMB internal app launches  

### Positioning for judges
| Criterion | How we win |
|-----------|------------|
| Usefulness & execution | Clear flow, working demo, instant value |
| AI & product depth | Multi-section structured generation, regenerate-by-section, tone/platform awareness |
| Business potential | Named ICP, pricing, first-user channels, roadmap |

---

## 2. Feature set (top-tier, still shippable)

Prioritize **P0** first. Ship **P1** if time allows. Mark **P2** as roadmap in the pitch (shows product thinking without blocking demo).

### P0 — Must ship (core demo)

| Feature | Description |
|---------|-------------|
| **App intake form** | App name, one-liner, long description, platform (iOS / Android / both), category, target user, tone, primary goal (downloads / waitlist / paid) |
| **Full launch kit generation** | One click → structured multi-section kit via Gemini (OpenRouter) |
| **App Store listing** | Title, subtitle, promotional text, full description, what’s new |
| **Google Play listing** | Short description, full description |
| **ASO keyword pack** | Primary + secondary keywords, long-tail ideas, do’s/don’ts |
| **7-day social calendar** | Posts for X, LinkedIn, Instagram (hooks + CTA) |
| **Launch email** | Subject lines + body for waitlist / early users |
| **Reddit / community post** | One authentic launch post (r/SideProject style) |
| **Copy buttons** | Per section + “copy all” |
| **Regenerate section** | Re-run AI for one section with same context |
| **Loading / empty / error states** | Skeleton, retry, friendly errors |
| **Landing hero** | Value prop, demo CTA, pricing teaser, how it works |

### P1 — High impact polish (do after P0 works)

| Feature | Description |
|---------|-------------|
| **Landing page copy block** | Hero, subhead, 3 features, CTA for app website |
| **Press / media blurb** | 100-word pitch + founder quote template |
| **A/B store listing variants** | Variant A vs B for title + short description |
| **Multi-language toggle** | Generate kit in EN + one other language (e.g. ES or FR) |
| **Export Markdown** | Download full kit as `.md` |
| **Export JSON** | Structured data for power users |
| **Example apps** | 2–3 one-click sample fills (fitness, productivity, finance) so judges try instantly |
| **History (localStorage)** | Last 3 kits saved client-side — no auth needed |
| **Print / PDF-friendly view** | Clean print CSS for “export PDF” via browser |
| **Noviq design-system UI** | Dark-first OKLCH, glass cards, mesh + grain, fluid type (see §3b) |

### P2 — Pitch / roadmap only (do not block submission)

| Feature | Description |
|---------|-------------|
| Auth + cloud save | Supabase / Clerk |
| Team workspaces | Shared kits |
| Competitor ASO compare | Paste competitor listing → gap analysis |
| Image prompts | Icon / screenshot style prompts for Midjourney |
| Stripe checkout | Live Pro plan |
| Chrome extension | Pull listing from store URL |
| Analytics dashboard | Which sections convert |

---

## 3. Tech architecture

```
vibe/
├── app/
│   ├── layout.tsx              # fonts, MotionConfig, no-FOUC theme script, metadata
│   ├── page.tsx                # marketing landing
│   ├── generate/page.tsx       # main product UI
│   ├── pricing/page.tsx        # pricing (static, for business track)
│   ├── styleguide/page.tsx     # living token/pattern reference (optional if time)
│   ├── api/
│   │   ├── generate/route.ts   # full kit generation
│   │   └── regenerate/route.ts # single-section regenerate
│   └── globals.css             # imports tokens + motion + base layer
├── styles/
│   ├── tokens.css              # 3-tier design tokens (from design system)
│   ├── motion.css              # easings + durations + reduced-motion kill-switch
│   └── patterns.module.css     # glassCard, edgeLight, filmGrain, mesh
├── components/
│   ├── landing/                # Hero, Features, HowItWorks, CTA (+ .module.css)
│   ├── form/                   # AppIntakeForm, ExampleChips
│   ├── kit/                    # KitResult, SectionCard, CopyButton
│   ├── layout/                 # Container, Nav, MeshBackground
│   └── ui/                     # Button, Card, Badge, Field, Skeleton, Tabs (Radix)
├── lib/
│   ├── openrouter.ts           # OpenRouter client (Gemini model)
│   ├── prompts.ts              # system + section prompts
│   ├── schema.ts               # Zod types for kit JSON
│   ├── examples.ts             # sample app payloads
│   ├── storage.ts              # localStorage helpers
│   └── motion.ts               # JS mirror of motion tokens + Framer presets
├── types/
│   └── kit.ts
├── .env.local                  # OPENROUTER_API_KEY
├── UI-DESIGN-SYSTEM.md         # full Noviq playbook (source of truth)
├── implementation.md
└── package.json
```

### Stack choices
| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 App Router | Fast deploy, API routes, SEO landing |
| Styling | **CSS Modules + CSS variables** (no Tailwind) | Matches Noviq design system; quiet luxury look |
| Design tokens | `styles/tokens.css` 3-tier OKLCH | Dark-first, one violet accent, tinted neutrals |
| Surface patterns | glass + edge-light + grain + mesh | 80% of the “wow” without heavy custom art |
| A11y primitives | Radix (Tabs, Toast, Tooltip, Dialog) | Accessible behavior; we style with tokens |
| UI motion | framer-motion + shared `motion.ts` | Reveals, stagger, `MotionConfig reducedMotion="user"` |
| Scroll motion | GSAP + ScrollTrigger (optional P1) | Landing “how it works” beat if time |
| Fonts | next/font: Space Grotesk + Geist + Geist Mono | Display / sans / mono roles |
| AI | OpenRouter → Gemini Flash | Fast, cheap, good structured JSON |
| Validation | Zod | Parse AI JSON safely |
| Icons | lucide-react | Polished UI |
| Deploy | Vercel | One-command public demo URL |
| State | React useState + localStorage | No backend DB in timebox |

### Environment
```env
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemini-2.0-flash-001
```
(Confirm exact Gemini model id available on OpenRouter at build time.)

---

## 3b. UI design system (mandatory)

**Source of truth:** [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md) (Noviq UI Playbook).  
Every visual decision must follow this file. Do **not** invent parallel color systems, Tailwind utility soup, or pure `#000`/`#fff`.

### The 10 rules (non-negotiable)
1. **Dark-first.** Design dark first; light only overrides semantic tokens if we ship a toggle.
2. **OKLCH only.** Neutrals tinted ~265°; never pure black/white.
3. **3-tier tokens.** primitives → semantic → component. Components use **only** tiers 2–3.
4. **One accent.** Electric violet ~285° + danger/success/warning. No rainbow.
5. **Fluid type** with `clamp()` — display / sans / mono; tabular-nums for counts.
6. **4px base / 8px rhythm.** Spacing only from the scale. No magic numbers.
7. **Reusable surfaces.** `glassCard`, `edgeLight`, `filmGrain`, `mesh` everywhere.
8. **Shared motion tokens.** CSS + Framer (and GSAP if used) share the same easings/durations.
9. **Respect the user.** `prefers-reduced-motion` (CSS kill-switch + MotionConfig + JS guards).
10. **CSS Modules + variables.** Co-located `Component.module.css`; no utility-class soup.

### Philosophy applied to LauchKix
**Quiet luxury for software** — near-black tinted surfaces, one electric accent, generous space, crisp type, motion that settles confidently. The product should feel *expensive and calm*, not like a generic AI form.

### Token map (brand)
| Role | Value |
|------|--------|
| Neutral hue | ~265° cool |
| Accent hue | ~285° electric violet |
| Surfaces | `--surface-0` … `--surface-3` |
| Text | `--text-primary` / secondary / muted / faint |
| Accent | `--accent` + hover/active/muted |
| Glass | `--glass-bg`, `--glass-border`, `--glass-highlight` |
| Focus | global `:focus-visible` → `--ring` |

### Surface composition (use these patterns)
| Surface | Classes / approach |
|---------|-------------------|
| Page background | Full-bleed `mesh` + `filmGrain` |
| Hero / kit cards | `glassCard` + `edgeLight` |
| Form panel | Card tokens (`--card-bg`, border, radius, padding) |
| Primary CTA | Accent button + hover `--shadow-accent-glow` |
| Loading | `Skeleton` using surface-inset, no spinner-only dead UI |

### Component kit to build first (Tier 3 tokens only)
`Button` · `Card` · `Badge` · `Field`/`Input`/`Textarea` · `Skeleton` · `Toast` · `Container` · `Tabs` (Radix) · `CopyButton`

Conventions from the playbook:
- Co-located `.tsx` + `.module.css`
- Local private vars for variants (`--_bg`, `--_fg`)
- Tap targets: sm 34px / md 44px / lg 52px min-height
- Semantic HTML + one global focus ring
- Button micro-interactions: hover glow, active scale 0.97, `aria-busy` loading state
- Transitions on specific properties only — never `transition: all`

### Motion (hackathon-scoped)
| Priority | What |
|----------|------|
| **P0** | Motion tokens + CSS transitions; Framer `fadeUp` on landing sections; generate result `AnimatePresence`; button press scale |
| **P1** | Staggered feature grid; section cards fade-in after generate |
| **Skip if tight** | GSAP pinned scroll storyboard, WebGL/R3F hero (CSS mesh is enough) |

### Fonts wiring
```ts
// layout.tsx — expose as --font-display-src / --font-sans-src / --font-mono-src
// Display: Space Grotesk | Sans: Geist | Mono: Geist Mono
```

### Landing page UI structure (Noviq-styled)
1. Mesh + grain full-bleed background  
2. Nav (glass sticky optional) — Logo · Generate · Pricing  
3. Hero: display type, one accent word, dual CTA (Generate kit / See pricing)  
4. Problem → solution in glass cards  
5. Feature grid with edge-light cards + stagger reveal  
6. How it works (3 steps)  
7. Pricing strip (3 tiers)  
8. Footer  

### Generate page UI structure
1. Same nav + subtle mesh  
2. Left (desktop): intake form in glass card; example chips as badges  
3. Right: tabbed kit results (Radix Tabs); each section a `SectionCard` with Copy + Regenerate  
4. Empty state: calm illustration copy, not a blank void  
5. Export bar: Copy all · Markdown · JSON as secondary buttons  

### Accessibility (from playbook)
- Labels on all fields  
- Global `:focus-visible` ring  
- Radix for tabs/toasts  
- `prefers-reduced-motion` honored three ways  
- Touch: no sticky hover (`hover: none` rules)  

### Styleguide
- Prefer `/styleguide` if ≥15 min spare after deploy smoke test  
- Or skip and keep tokens honest via the design system file alone  
- If shipped: `robots: noindex` so judges don’t land there by accident  

### UI anti-patterns (do not do)
- Tailwind / utility-class soup  
- Pure `#000` / `#fff`  
- Multiple accent rainbows  
- Magic spacing (e.g. `13px`, `margin: 17px`)  
- Inline style color dumps  
- Heavy WebGL before the product flow works  
- Ignoring reduced-motion

---

## 4. AI design (product depth)

### Input → Output contract
**Input (`AppBrief`):**
```ts
{
  name: string
  tagline: string
  description: string
  platforms: ("ios" | "android")[]
  category: string
  targetAudience: string
  tone: "professional" | "playful" | "bold" | "friendly"
  goal: "downloads" | "waitlist" | "paid"
  language: "en" | "es" | "fr" // P1
}
```

**Output (`LaunchKit`) — structured JSON only:**
```ts
{
  appStore: { title, subtitle, promotionalText, description, whatsNew }
  playStore: { shortDescription, fullDescription }
  aso: { primaryKeywords[], secondaryKeywords[], longTail[], tips[] }
  socialCalendar: [{ day, platform, hook, body, cta }]  // 7 items, mixed platforms
  email: { subjects[], body }
  communityPost: { title, body }
  landingPage?: { hero, subhead, features[], cta }
  pressBlurb?: { summary, founderQuote }
  variants?: { a: {...}, b: {...} }  // P1 A/B titles + shorts
}
```

### Prompt strategy
1. **System prompt:** You are a senior mobile growth marketer + ASO specialist. Output valid JSON only matching the schema. No markdown fences.  
2. **User prompt:** Inject structured `AppBrief` + constraints (char limits for store fields where relevant).  
3. **Regenerate:** Same brief + “only regenerate section X; return that section object only.”  
4. **Temperature:** ~0.7 for creative copy; slightly lower for ASO keywords if needed.

### Character-aware rules (ASO realism)
- App Store title: ≤ 30 chars  
- Subtitle: ≤ 30 chars  
- Promotional text: ≤ 170 chars  
- Play short description: ≤ 80 chars  

Enforce in prompt; optionally trim in UI if model overshoots.

### Safety / reliability
- API route never exposes key to client  
- Zod parse; if invalid, one automatic repair pass (“fix JSON to match schema”)  
- Timeout + user-facing retry  
- Rate-limit lightly in memory if abuse risk during public demo  

---

## 5. UX / UI (top-tier feel)

> Full visual system is defined in **§3b** and [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md).  
> This section is product UX only — visuals always defer to the design system.

### Brand
- **Name:** LauchKix  
- **Tagline:** Ship the app. We’ll ship the launch.  
- **Vibe:** Quiet luxury — dark-first OKLCH, electric violet accent, glass + mesh + grain  
- **Fonts:** Space Grotesk (display) · Geist (sans) · Geist Mono (mono)  

### Pages
1. **`/` Landing**  
   - Mesh/grain backdrop + hero + generate CTA  
   - Problem → solution glass cards  
   - Feature grid (edge-light cards)  
   - How it works (3 steps)  
   - Pricing strip  
   - Footer with “Built for HackOnVibe”  

2. **`/generate` Product**  
   - Left (or top on mobile): intake form + example chips  
   - Right: Radix tabbed kit results (Store / ASO / Social / Email / Press / Landing)  
   - Sticky “Generate” + skeleton progress  
   - Export bar: Copy all · Markdown · JSON  

3. **`/pricing` Business story**  
   - Free / Pro / Studio tiers (static; Stripe = roadmap)  
   - Who it’s for + ROI vs freelancers  

### Micro-interactions (token-driven)
- Button: hover accent glow, active scale 0.97, `aria-busy` loading  
- Section cards: fade-up after generate (`fadeUp` preset)  
- Toast on copy (Radix toast or lightweight toast)  
- Badge: “AI-generated · edit before publish” for trust  

### Accessibility
- See §3b — labels, focus ring, Radix tabs, reduced-motion, contrast via OKLCH tokens

---

## 6. Business model (Business Success track)

### Pricing (show on site)
| Plan | Price | Limits |
|------|-------|--------|
| **Free** | $0 | 1 full kit / day, EN only, watermark on export optional |
| **Pro** | $19 / mo | Unlimited kits, multi-language, A/B variants, priority model |
| **Studio** | $49 / mo | 5 seats, shared history (roadmap), brand tone presets |

### Revenue narrative for pitch
- **Who pays:** Indie founders post-ship; they already pay freelancers or waste weekends writing copy  
- **Why now:** App launches are weekly; promotion is the bottleneck, not code  
- **Acquisition:** Product Hunt, Indie Hackers, r/androiddev, r/iOSProgramming, X indie makers, student incubators  
- **Unit economics:** Gemini via OpenRouter ~cents per kit → high margin SaaS  
- **First 100 users:** Free kits + “Powered by LauchKix” share template  

### Metrics to mention (even if projected)
- Time to first kit: < 60s  
- Sections per kit: 6–8  
- Freelancer replacement value: $150–400 per launch  

---

## 7. Phased implementation

> **Time reality:** Few hours left. Follow phases in order. Do not start P1 until P0 demo path works end-to-end.

---

### Phase 0 — Project bootstrap (15–25 min)

**Goal:** Runnable Next.js app with env, design tokens, and deploy path.

- [ ] `npx create-next-app@latest .` (TypeScript, App Router, ESLint — **no Tailwind**)  
- [ ] Install UI core:  
  `framer-motion zod lucide-react clsx`  
  `@radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip`  
  (optional later: `gsap` only if landing scroll beat is in scope)  
- [ ] Scaffold design system files from [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md):  
  - `styles/tokens.css` (primitives + semantic + component)  
  - `styles/motion.css`  
  - `styles/patterns.module.css` (`glassCard`, `edgeLight`, `filmGrain`, `mesh`)  
  - `app/globals.css` imports tokens → motion → base  
  - `lib/motion.ts` (easings, durations, fadeUp / stagger presets)  
- [ ] Wire fonts via `next/font` → `--font-display-src`, `--font-sans-src`, `--font-mono-src`  
- [ ] `layout.tsx`: no-FOUC theme script, `MotionConfig reducedMotion="user"`, mesh-ready body  
- [ ] Create folders: `components/`, `lib/`, `types/`, `styles/`  
- [ ] Create `.env.local` + `.env.example`  
- [ ] Set metadata title/description for LauchKix  
- [ ] Verify `npm run dev` — dark surface + tokens apply  

**Exit criteria:** Blank app loads with Noviq dark base; env server-only; no Tailwind.

---

### Phase 0b — UI primitive kit (20–30 min)

**Goal:** Reusable components so pages never invent one-off styles.

- [ ] `Button` (accent / secondary / ghost; sizes sm/md/lg; loading + `aria-busy`)  
- [ ] `Card` (optionally composes `glassCard` + `edgeLight`)  
- [ ] `Badge`, `Field` (label + input/textarea + error)  
- [ ] `Skeleton`, `Container`, `Nav`  
- [ ] Mesh background helper: `<div className={patterns.mesh + filmGrain} />`  
- [ ] Toast helper for copy success  

**Exit criteria:** Styleguide-level primitives exist; buttons/fields match tokens.

---

### Phase 1 — Types, prompts, OpenRouter client (20–30 min)

**Goal:** Reliable AI backbone before page polish.

- [ ] Define `AppBrief` + `LaunchKit` types (`types/kit.ts`)  
- [ ] Zod schemas matching types (`lib/schema.ts`)  
- [ ] `lib/openrouter.ts`: `chatCompletion({ messages, json: true })`  
- [ ] `lib/prompts.ts`: system prompt + `buildFullKitPrompt(brief)` + `buildSectionPrompt(brief, section)`  
- [ ] Unit-smoke: optional temporary script or API test with curl  

**Exit criteria:** Server can call Gemini and return parseable JSON for a sample brief.

---

### Phase 2 — API routes (15–25 min)

**Goal:** Secure generation endpoints.

- [ ] `POST /api/generate`  
  - Validate body with Zod  
  - Call OpenRouter  
  - Parse + repair once if needed  
  - Return `{ kit, meta: { model, ms } }`  
- [ ] `POST /api/regenerate`  
  - Body: `{ brief, section }`  
  - Return single section payload  
- [ ] Error mapping: 400 validation, 502 AI failure, 429 optional  

**Exit criteria:** Postman/curl (or browser fetch) returns a full kit JSON.

---

### Phase 3 — Core product UI (45–70 min)

**Goal:** Usable generate flow for live demo — **styled with Noviq tokens only**.

- [ ] `/generate` layout: form + results on mesh/grain  
- [ ] `AppIntakeForm` in glass card; all brief fields + validation  
- [ ] Example chips (3 presets) as badges auto-fill form  
- [ ] Generate button → API → kit state  
- [ ] `SectionCard` (glass + edge-light): title, content, Copy, Regenerate  
- [ ] Radix Tabs: Store · Play · ASO · Social · Email · Community  
- [ ] Loading: Skeleton cards (not spinner-only)  
- [ ] Error banner + retry  
- [ ] Empty state copy before first generate  

**Exit criteria:** Full path: fill form → generate → read → copy works and looks on-brand.

---

### Phase 4 — Landing + pricing (25–40 min)

**Goal:** Quiet-luxury marketing surface, not a form dump.

- [ ] `/` hero (display type + accent word), problem, features, how it works, CTA → `/generate`  
- [ ] Framer `fadeUp` / stagger on sections (respect reduced-motion)  
- [ ] Pricing strip on landing + full `/pricing` page (three tiers)  
- [ ] Footer: hackathon credit  
- [ ] Consistent `Nav`: Logo · Generate · Pricing  
- [ ] Skip GSAP pin / WebGL unless >1h spare after P0  

**Exit criteria:** Stranger understands product in 10 seconds; homepage feels premium.

---

### Phase 5 — P1 polish features (40–60 min, timebox)

**Goal:** “Top tier” product depth without scope creep.

Ship in this order if time remains:

1. [ ] Landing page copy section in kit + tab  
2. [ ] Press blurb section  
3. [ ] Export Markdown  
4. [ ] Export JSON  
5. [ ] A/B title/subtitle variants  
6. [ ] localStorage history (last 3)  
7. [ ] Multi-language select  
8. [ ] Print-friendly CSS  
9. [ ] Optional `/styleguide` (noindex)  

**Exit criteria:** At least items 1–4 shipped; rest optional.

---

### Phase 6 — Visual polish & UX hardening (20–35 min)

**Goal:** Judges feel design-system quality.

- [ ] Audit: no magic numbers; only token spacing/type/color  
- [ ] Responsive: form stacks above results on mobile  
- [ ] Toasts on copy; double-submit guard  
- [ ] Character count warnings on store fields if over limit  
- [ ] Favicon + Open Graph meta  
- [ ] Reduced-motion quick check  
- [ ] Contrast pass on text/muted/accent  

**Exit criteria:** No layout breakage; mobile usable; still calm and restrained.

---

### Phase 7 — Deploy (10–15 min)

**Goal:** Public URL for submission.

- [ ] Push to GitHub  
- [ ] Deploy Vercel; set env vars  
- [ ] Smoke test production generate  
- [ ] Confirm no key leakage in client bundle  

**Exit criteria:** Shareable HTTPS demo works.

---

### Phase 8 — Demo assets & submission pack (30–45 min)

**Goal:** Complete HackOnVibe submission cleanly.

- [ ] **Demo video (1–2 min):**  
  1. Homepage value prop (5s)  
  2. Load example app (5s)  
  3. Generate kit live (20–40s)  
  4. Walk Store + Social + Email (30s)  
  5. Pricing + “who pays” (15s)  
  6. Roadmap teaser (10s)  
- [ ] **Product description** (for form): problem, users, what we built this weekend  
- [ ] **README.md**: setup, env, features, pricing, roadmap  
- [ ] Screenshots: landing, form, results  

**Exit criteria:** Demo URL + video + description ready before deadline.

---

## 8. Suggested timebox (remaining hours)

| Block | Focus |
|-------|--------|
| 0:00–0:25 | Phase 0 bootstrap + design tokens |
| 0:25–0:50 | Phase 0b UI primitives |
| 0:50–1:20 | Phase 1 AI layer |
| 1:20–1:45 | Phase 2 API |
| 1:45–2:55 | Phase 3 product UI |
| 2:55–3:35 | Phase 4 landing + pricing |
| 3:35–4:25 | Phase 5 P1 features (top of list) |
| 4:25–4:50 | Phase 6 polish |
| 4:50–5:05 | Phase 7 deploy |
| 5:05–5:50 | Phase 8 video + submission text |

Adjust if fewer hours: **cut Phase 5 items 5–9 first**, never cut generate → results → copy path.  
**UI cuts if desperate:** skip styleguide, GSAP, WebGL — keep tokens + glass + mesh.

---

## 9. Definition of done (prize-ready checklist)

### Product
- [ ] Working public demo URL  
- [ ] End-to-end generation with Gemini via OpenRouter  
- [ ] At least 6 kit sections visible  
- [ ] Copy + regenerate (or regenerate on full kit if time)  
- [ ] Landing + pricing pages  

### AI
- [ ] Structured JSON kit, not raw free text only  
- [ ] Meaningful, on-theme mobile launch content  
- [ ] Server-side key only  

### Business
- [ ] Clear ICP on site  
- [ ] Pricing tiers visible  
- [ ] First-user acquisition story in description/video  

### Submission
- [ ] Demo video  
- [ ] Product description + target users  
- [ ] What was built during hackathon listed  

---

## 10. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| AI returns invalid JSON | Zod + one repair pass; fallback message |
| Slow model | Use Gemini Flash; show skeleton + progress copy |
| Scope explosion | P0 lock; P1 ordered list; P2 pitch-only |
| Key abuse on public demo | Env on server; optional simple rate limit |
| Ugly generic UI | Enforce Noviq tokens + glass/mesh; no Tailwind |
| Design drift / magic CSS | Components only use Tier 2–3 tokens; check design system |
| Motion too heavy / jank | Prefer CSS + light Framer; skip WebGL/GSAP |
| Demo fails live | Pre-generate 1 example kit cached as fallback |

---

## 11. Out of scope (explicit)

- Native mobile app  
- Real Stripe payments  
- User auth / multi-tenant DB  
- Scraping App Store URLs  
- Fine-tuning models  
- Mobile push / analytics SDKs  

These strengthen the **roadmap slide**, not the weekend build.

---

## 12. Pitch outline (30–60s)

1. **Hook:** “Most apps die at launch — not because the product is bad, but because the promo is.”  
2. **Product:** LauchKix turns app facts into a full launch kit in 60 seconds.  
3. **Demo:** Generate live with FitTrack example.  
4. **AI:** Gemini structures ASO, social, email, press — not a chatbot.  
5. **Business:** Free → Pro $19/mo; replaces $200 freelance listing work; margin positive.  
6. **Ask:** Business Success track — clearest path to paying indie founders this weekend.

---

## 13. Build order reminder

```
Bootstrap + tokens → UI primitives → AI client → API → Generate UI → Landing/Pricing → Polish/Export → Deploy → Video/Submit
```

**Rules:**
1. Never polish what doesn’t generate yet.  
2. Never invent styles outside [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md).  
3. Prefer shipping mesh + glass over fancy WebGL.

---

## 14. Design-system drop-in directive (for implementer)

When building UI, follow this (condensed from the playbook):

> Build UI as a **3-tier design-token system** (primitives → semantic → component) in `tokens.css`. **Dark-first**; OKLCH only; never `#000`/`#fff`. One accent hue (~285° violet). Fluid `clamp()` type; 4px/8px spacing scale. Patterns: **glass card, edge-light, film grain, mesh**. Shared motion tokens for CSS + Framer. Respect `prefers-reduced-motion`. **CSS Modules only (no Tailwind)**. Radix for accessible behavior. Global `:focus-visible` ring. Quiet luxury — calm, spacious, restrained.

---

## 15. Approval gate

After you approve this plan (or note changes: name, extra features, language, model id), implementation starts at **Phase 0**.

### Optional decisions for you
1. **Product name:** LauchKix  
2. **Accent:** keep electric violet ~285° from the design system (recommended)  
3. **Default language:** English only for P0?  
4. **Model id:** confirm Gemini model string on your OpenRouter account  
5. **Light theme toggle:** skip for hackathon (dark-only) unless you care  

---

*Document version: 1.1 · HackOnVibe 2026 · Business Success track · Noviq UI integrated*
