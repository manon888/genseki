# SparkFun

> _You have something powerful inside you. Let's find it and put it to work._

SparkFun is a platform that helps people discover latent talents they didn't know they had — and connects them to real pathways to use those gifts in the world.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React + Tailwind CSS
- **Backend:** Next.js API routes (serverless)
- **Database:** SQLite via Prisma

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
sparkfun/
├── src/
│   ├── app/               # Next.js App Router pages + API routes
│   │   ├── api/auth/      # Signup & login endpoints
│   │   ├── api/discovery/ # Discovery flow endpoint
│   │   ├── discovery/     # Discovery journey page
│   │   ├── dashboard/     # User dashboard
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   ├── page.tsx       # Landing page
│   │   └── layout.tsx     # Root layout
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client singleton
│   │   └── questions.ts   # Discovery questions
│   └── components/        # Reusable components (planned)
├── prisma/
│   └── schema.prisma     # Database schema
└── SPEC.md                # Full project spec
```

## Design

- **Colors:** Deep indigo/violet primary (#4A3F6B), soft gold accent (#E8A838), warm cream background (#FAF8F5)
- **Typography:** Humanist serif headings, clean sans-serif body
- **Feel:** Warm, honest, empowering — not corporate or extractive

## Status

**MVP in progress.** Currently complete:

- ✅ Landing page (hero + mission + CTA)
- ✅ User signup + login (email/password)
- ✅ Discovery flow (10 guided questions)
- ✅ Simple gift profile result
- ✅ SQLite database with Prisma

**Next:** User dashboard, full AI-powered discovery analysis, community features.

## Guiding Principles

- We want to, not we have to
- Keep it honest — if it feels corporate or extractive, cut it
- Ship the feeling first
- Start small, scale big, measure by gratitude