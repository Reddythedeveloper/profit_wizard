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

Phase 1 complete — form implementation and submission testing

What I implemented in Phase 1
- A client-side job logging form at `/log-job` with fields: Service type, Invoiced amount, Date completed, Customer note.
- Integration with Supabase via `lib/supabaseClient.ts` using `NEXT_PUBLIC_` env vars.
- Basic validation for required fields and feedback on success / error.

How to test Phase 1 locally
1. Ensure `.env.local` contains your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Install and run the dev server (from repository root):

```bash
cd profit_wizard/profit_wizard
npm install
npm --prefix . run dev
```

3. Open http://localhost:3000/log-job, fill the form and click `Save job`.
4. On success you should see a confirmation message. Verify the new row appears in the `jobs` table in the Supabase dashboard (or run a SELECT query in the SQL editor):

```sql
SELECT * FROM jobs ORDER BY created_at DESC LIMIT 10;
```

Notes on verification
- I performed an automated insert test (using the anon key from `.env.local`) which returned a successful insert response — this confirms the client/server keys and table are reachable. If you see permission or 404 errors, ensure the `jobs` table exists and the `NEXT_PUBLIC_` env vars are correct.

Next (Phase 2)
- Implement the jobs feed (fetch and display the 10 most recent jobs, newest first) and optionally a running total of visible invoiced amounts.

See the detailed plan: `Phase wise detailed plan.md`
