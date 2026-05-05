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

Phase 2 complete — jobs feed, running total, and refinements

What I implemented in Phase 2
- A feed below the form that fetches and displays the 10 most recent jobs (newest first).
- A running total that sums the visible jobs' `invoiced_amount` values.
- Refinements requested and implemented:
	- The `date_completed` field is restricted to a maximum of today (prevents future dates).
	- A `Home` button on the `/log-job` page to navigate back to the home page.
	- The home page now shows useful info: title, short description, and the recorded jobs count (fetched from Supabase).

How to test Phase 2 locally
1. Start the dev server (see Phase 1 instructions).
2. Visit http://localhost:3000 — confirm the page shows a title, description, and the recorded jobs count (or `loading…`).
3. Visit http://localhost:3000/log-job — verify:
	- The date picker does not allow selecting a future date.
	- The `Home` button navigates back to `/`.
	- Submitting a job inserts into Supabase and the Recent jobs feed updates (newest first) and the running total recalculates.

Next (Phase 3)
- Polish UI styling, ensure commit history is tidy, add final README notes (Claude Code prompts, deploy to Vercel), and create the Vercel deployment.

See the detailed plan: `Phase wise detailed plan.md`
