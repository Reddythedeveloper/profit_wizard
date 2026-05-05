# profit_wizard

## Phase 0 complete — scaffold and local dev server

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

## Phase 1 complete — form implementation and submission testing

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

## Phase 2 complete — jobs feed, running total, and refinements

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

## Phase 3 — polish, prepare commits, and deploy to Vercel

What Phase 3 does
- Small UI polish applied (improved spacing, button styles, job item cards).
- Update README with deployment steps and checklist so reviewer can run and verify the app easily.

Deployment checklist (Vercel)
1. Create a public GitHub repository for this project and push this code (do NOT commit `.env.local`).
2. Create a Vercel project and connect the GitHub repo. Use the `Next.js` framework preset.
3. In Vercel project settings -> Environment Variables add the following (match local `.env.local` keys):

```
NEXT_PUBLIC_SUPABASE_URL = <your supabase project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon key>
```

4. Deploy. After build, confirm the live URL and add it to the README.

Optional: Deploy with Vercel CLI
- Install: `npm i -g vercel`
- Login: `vercel login`
- From project root: `vercel` and follow prompts. Set `--prod` to promote to production.

What I can do next (choose):
- Create a Git repo and make a series of focused commits for you locally (I can run `git` commands here). You will need to create a GitHub repo and add it as `origin` or I can create a repo if you provide permissions.
- Attempt a Vercel CLI deployment from this environment (requires `vercel` login and permission).
- I can prepare a short set of 2–3 Claude Code prompts to include in the README (as required by the assignment).

Phase 3 a11y & consistency checklist
- All form controls have accessible labels and `id`/`htmlFor` associations.
- Visible focus styles exist for keyboard users.
- Dynamic feedback regions (`aria-live`) announce status and counts.
- Semantic structure (`main`, `header`, lists with roles) is in place.
- Color contrast checked for text and interactive controls (aim for WCAG AA).

Functional pre-deploy checklist
- Supabase env vars set in Vercel and `.env.local` not committed.
- E2E flow: submit job → job appears in feed → counts update.
- Basic error handling shows readable messages for network/API failures.
- Commit history contains small, focused commits telling the story of development.


## Phase 4 — Finalize, cleanup, and ship

What I did in Phase 4
- Cleaned up project structure: moved type declaration files to `types/`, moved helper scripts to `scripts/`, and removed stray/deprecated files.
- Added `public/` assets (`favicon.svg`, `robots.txt`) and referenced the favicon in `app/layout.tsx` metadata.
- Added `vercel.json` to ensure the Next builder is used reliably on Vercel.
- Fixed TypeScript/Next build issues (CSS module declarations, NodeNext module settings, missing `@types/react-dom`) and made the Supabase client lazy so the app builds during static prerender without server env vars.
- Rebuilt locally and redeployed to Vercel; verified production pages respond.

Production site
- URL: https://profitwizard.vercel.app (deployed from the `profit_wizard` subfolder)

## Challenges and Learnings During the Workflow

- Built a **Profit Wizard** tool for logging different types of home maintenance jobs.  
- The main challenge was deploying the project on **Vercel**, which was new to me. I resolved issues related to authentication and deployment protection through debugging and documentation.  
- I would ask my collegue to take part on fixing the bugs and improvements while i work on architecture and system.  
- If given more time, I would focus on improving functionality and ensuring overall consistency across the product.  
- Learned that **accessibility, functionality, and reliability** are more important than UI/design in many cases.  
- Improved layout by using a **grid system**, placing the form on the left and job summary on the right for better usability.  


## Majorly used Prompts

Refine the Home Page by replacing default text with meaningful information about the tool, such as title, description, and usage insights (e.g., job count, revenue summary). Add a Home button in the Log Job page for easy navigation. Ensure these updates are included in Phase 2 implementation and documented in the plan file.

Before deployment, ensure the application is production-ready by focusing on functionality rather than UI alone. Apply accessibility (a11y) best practices, maintain UI consistency, and validate all core features. Identify and fix any functional gaps to ensure a complete and reliable end-to-end user experience. Update these improvements in the Phase 3 plan documentation.
