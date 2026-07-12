# LauchKix

**Ship the app. We'll ship the launch.**

AI-powered launch marketing kits for newly launched mobile apps — App Store / Play listings, ASO keywords, social calendar, launch emails, and more.

Built for **HackOnVibe 2026** · Business Success track.

## Stack

- **Next.js** (App Router)
- **Noviq UI design system** — CSS Modules + OKLCH tokens (no Tailwind)
- **OpenRouter → Gemini** (Phases 1–2)
- **Framer Motion** + Radix primitives

See [`implementation.md`](./implementation.md) for the full plan and [`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md) for UI rules.

## Setup

```bash
npm install
cp .env.example .env.local
# Add OPENROUTER_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Project status

- [x] Phase 0 — Bootstrap + design system
- [ ] Phase 0b — UI primitives
- [ ] Phase 1 — AI client + prompts
- [ ] Phase 2 — API routes
- [ ] Phase 3 — Generate UI
- [ ] Phase 4 — Landing + pricing
- [ ] Phase 5+ — Polish, deploy, submit
