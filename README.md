# profit_wizard

Phase 0 complete — scaffold and local dev server

This repository contains a minimal Next.js (App Router) + TypeScript scaffold prepared for the Profit Wizard take-home.

What is in Phase 0
- Next.js + TypeScript project scaffold
- App Router root layout and placeholder pages (`/` and `/log-job`)
- `.gitignore` and `.env.example` to protect secrets
- Supabase client wrapper at `lib/supabaseClient.ts`

How to run locally (Phase 0)
1. Copy `.env.example` to `.env.local` and set your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Install dependencies and start dev server:

```bash
cd profit_wizard
cd profit_wizard
npm install
npm --prefix . run dev
```

3. Open http://localhost:3000 and visit `/log-job` to see the form placeholder.

What I tested in Phase 0
- Dev server starts and serves the home page and `/log-job` route.
- Supabase client file added (no keys committed). I also verified an insert into Supabase using the anon key in `.env.local`.

Next (Phase 1)
- Implement the job logging form and submission to Supabase (I can proceed with this now).

See the detailed plan: `Phase wise detailed plan.md`
