# SPEC.md — Genseki

> *Genseki — You have something powerful inside you. Let's find it and put it to work.*

---

## 1. Concept & Vision

**SparkFun** is a platform that helps people discover latent talents they didn't know they had — and connects them to real pathways to use those gifts in the world.

Not a personality quiz. Not a course marketplace. A living, ongoing **discovery and activation engine** that meets people where they are, helps them see themselves clearly, and gives them tools and connections to start building.

**The feeling we want:** Warm. Honest. Empowering. Like a wise friend who sees your potential before you do.

**The anti-feeling:** Corporate. Extractive. "You're not enough, buy this." Algorithmic. Cold.

**Our guiding light:** We help people who appreciate it. Not takers — people who genuinely want to grow, discover, and contribute.

---

## 2. Who It's For

**Primary users:**
- People who feel stuck or directionless
- People who are skilled but don't *know* they're skilled
- Creators, learners, job seekers, career changers
- Anyone with potential who hasn't found their channel yet

**Who should feel at home:** Someone scrolling past, slightly lost, curious but skeptical. They land on the page and think: *"Oh. This feels different. This feels real."*

---

## 3. Core User Journey

```
Landing Page → Sign Up (free) → Discovery Experience → Personalized Profile → Activation Pathways
```

### Stage 1: Landing
Clean, warm, human. Hero section with a clear invitation — not a sales pitch. The message is the product.

### Stage 2: Sign Up
Minimal friction. Name, email, password. Optional: "What brought you here?" (single open field — helps us understand them, not just collect data).

### Stage 3: Discovery Experience
The heart of the platform.

- Guided conversation-style discovery (AI-powered, warm tone)
- Questions that reveal patterns, not just preferences
- Exercises and reflections, not just quizzes
- Users don't get a "type" — they get a **narrative portrait** of who they are

### Stage 4: Personalized Profile
A living profile that shows:
- Their discovered gifts/talents
- How those show up in real life
- What kind of work/creation those gifts naturally lean toward

### Stage 5: Activation Pathways
Connect users to:
- Learning resources matched to their gifts
- Communities and peers
- Projects or opportunities to practice
- Mentors (future phase)

---

## 4. MVP Scope (Phase 1)

### What we're building now:

**Landing Page**
- Hero section with the core message
- Value proposition (why this exists, why it matters)
- Call to action (Sign Up)
- About / Mission section (brief)
- No heavy feature lists — emotional connection over feature marketing

**User Registration**
- Sign up flow (email + password)
- Login / logout
- Basic user profile storage
- Web3-ready: wallet_address field in schema (for future wallet auth)

**Discovery Experience (lightweight)**
- A guided set of 5-10 thoughtful questions
- Simple response processing (not full AI — just enough to show the concept)
- Display a simple "gift profile" result

**What's NOT in MVP:**
- Full AI-powered discovery (we'll scope this properly in Phase 2)
- User dashboard with history
- Community features
- Payment / subscription
- Active wallet auth (schema ready, not live)

---

## 5. Design Direction

**Aesthetic:** Warm minimalism. Think Notion meets a thoughtful journal. Generous whitespace, human typography, subtle warmth.

**Color Palette:**
- Primary: Deep warm indigo/violet (#4A3F6B or similar)
- Accent: Soft gold/amber (#E8A838 or similar) — represents discovery, hidden treasure
- Background: Off-white / warm cream (#FAF8F5)
- Text: Warm charcoal (#2D2A32)
- Subtle: Muted sage or terracotta accents

**Typography:**
- Headings: Warm, humanist serif (e.g., Fraunces, Lora, or similar)
- Body: Clean, readable sans-serif (e.g., Inter, Source Sans 3)

**Tone of Voice:**
- Warm but not syrupy
- Direct but not clinical
- Empowering without being preachy
- Use "you" and "we" — never corporate third-person

**Imagery:** Abstract, warm — not generic stock photos. Subtle gradients, organic shapes, or hand-drawn elements.

---

## 6. Technical Approach

### Stack (for MVP)
- **Frontend:** Next.js (App Router) + React
- **Styling:** Tailwind CSS (fast iteration)
- **Backend:** Next.js API routes (serverless, simple)
- **Database:** SQLite via Prisma (simple, no setup, easy to migrate later)
- **Auth:** Simple email/password for now + web3-ready schema

### Architecture Principles
- Keep it modular — we want to expand without fighting old code
- Separate concerns: discovery logic, user data, display
- Frontend talks to backend via clean API endpoints
- Data model simple but extensible
- Wallet address field reserved for future web3 auth

### Project Structure
```
sparkfun/
├── SPEC.md
├── README.md
├── app/
│   ├── page.tsx              (landing page)
│   ├── signup/page.tsx
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   └── api/
│       ├── auth/
│       └── discovery/
├── components/
│   ├── ui/                   (reusable UI primitives)
│   └── sections/             (landing page sections)
├── lib/
│   ├── prisma.ts
│   └── questions.ts          (discovery questions)
├── prisma/
│   └── schema.prisma
└── ...everything else
```

---

## 7. Roadmap

### Phase 1 (NOW — MVP)
- [x] Vision & spec ✅
- [x] Name: SparkFun ✅
- [x] Domain: spark.fun (pending registration)
- [ ] Landing page (design + build)
- [ ] Sign up + login (backend + frontend)
- [ ] Basic discovery flow (5-10 questions)
- [ ] Simple gift profile display

### Phase 2 (After MVP)
- Full AI-powered discovery engine
- User dashboard with saved results
- Email capture / onboarding flow
- Richer profile system

### Phase 3 (Scale)
- Community features (peer matching, forums)
- Marketplace of resources
- Mentorship connections
- Wallet-based auth (web3 native)
- Mobile app?

---

## 8. Public Presence — X/Twitter

**Account:** @Mia (as Mia — project manager, human voice of SparkFun)

**Tone:** Personal, honest, journey-style. Not a corporate feed. Real.

**What gets posted:**
- Milestone summaries (not every conversation)
- "We just finished X — here's what it means for where we're going"
- Launch announcements
- Honest reflections on the build journey

**What stays private:**
- Raw internal conversations
- Early-stage messy brainstorming
- Things still forming

**How it works:**
- Mia manages the account manually (no automation spam)
- Cron posts on milestones (not a firehose)
- Human voice throughout

---

## 9. Domain & Branding

**Domain:** spark.fun
- Registrar: TBD (Namecheap or similar)
- Purpose: Landing page + platform home

**Branding:**
- Name: SparkFun
- Tagline: "You have something powerful inside you. Let's find it and put it to work."
- Web3-ready identity (wallet-native friendly)

---

## 10. Guiding Principles (for the build)

- **Whole picture > technical polish** at this stage
- **Enjoy the process** — we're building because we want to, not because we have to
- **Keep it honest** — if something feels corporate or extractive, cut it
- **Ship the feeling** — the MVP should make someone feel the heart of this, even with simple tech
- **We want to, not we have to** — joy over obligation in every step

---

*Last updated: 2026-04-09*
*Status: Aligned — building MVP*
