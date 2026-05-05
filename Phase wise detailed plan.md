# Phase-wise Detailed Plan — Profit Wizard Take‑home

This plan breaks the work into phases for a 2–5 hour implementation targeting the requirements in `REQUIREMENTS.MD`.

## Phase 0 — Setup (15–30 minutes)
- Tasks:
  - Initialize Next.js (App Router) + TypeScript project if not present.
  - Install dependencies: `supabase-js`, `@supabase/supabase-js`, Tailwind (optional), `claude` CLI note.
  - Create `.gitignore` and ensure `.env.local` is excluded.
  - Create Supabase project and a `jobs` table using the provided SQL.
- Deliverables: repo scaffold, dependencies installed, Supabase table ready, `.env.local` ignored.
- Risks: Supabase project creation may take a few minutes; keep anon key ready.

## Phase 1 — Form + Submit (45–90 minutes)
- Tasks:
  - Build a single page under App Router (e.g., `app/log-job/page.tsx`).
  - Add a form with fields: Service type (select with 6 options), Invoiced amount (number), Date completed (date), Customer note (textarea).
  - Add basic client-side validation (required checks for service, amount, date).
  - Implement submit handler: insert into Supabase using `supabase-js`. Use env vars for URL and anon key.
  - Show success / error feedback and clear form on success.
- Deliverables: working form that saves to Supabase.
- Risks: CORS or network errors if Supabase keys or URL misconfigured; validate env vars early.

## Phase 2 — Jobs Feed (30–60 minutes)
- Tasks:
  - Fetch and render the most recent 10 jobs (newest first) below the form.
  - Show fields: service type, amount, date, customer note, created_at.
  - Implement re-fetch after successful submit (optimistic or simple refetch).
  - (Bonus) Compute and display running total of visible jobs.
- Deliverables: feed of 10 most recent jobs, running total if completed.
- Risks: Time zone / date formatting differences; prefer ISO/local formatting.

Additional Phase 2 refinements (requested):
- Enforce that the `date_completed` picker cannot select a future date (max = today) to meet validation rules.
- Add a `Home` button on the `/log-job` page to navigate back to the home page.
- Refine the Home page to show useful information: title, short description, and a usage count (number of jobs recorded). If feasible, fetch the count from Supabase in the home page.

These refinements are included in the Phase 2 implementation and should be testable before moving to Phase 3.

## Phase 3 — Polishing & Deployment (30–60 minutes)
- Tasks:
  - Add small styles (Tailwind or simple CSS) for readability.
  - Add `README.md` describing: what was built, next steps, one teammate question, and 2–3 Claude Code prompts used.
  - Confirm `.env.local` is not committed; set Supabase env vars in Vercel dashboard.
  - Deploy to Vercel and verify the live URL (add URL to README).
- Deliverables: styled UI, README, deployed site URL, public GitHub repo.
- Risks: Vercel env var misconfiguration; ensure anon key and URL are added to project settings.

Accessibility, consistency, and functional-gap checks (Phase 3 refinement)
- Tasks (a11y & consistency):
  - Ensure all form controls have associated labels and `id`/`htmlFor` pairs.
  - Provide visible focus indicators for interactive elements (`:focus` styles).
  - Use semantic elements (`main`, `header`, `role=list` / `role=listitem`) where appropriate.
  - Add `aria-live` regions for form status messages and for dynamic counts.
  - Ensure color contrast meets WCAG AA (background/text and button contrast).
  - Keep spacing, typography, and component styles consistent across pages (buttons, inputs, cards).

- Tasks (functionality / release readiness):
  - Verify Supabase table and environment variables are correctly configured in Vercel.
  - Confirm end-to-end flows: form insert → feed shows inserted record → counts update.
  - Check error handling for network failures and display meaningful messages.
  - Review commit history to ensure meaningful, focused commits for reviewer.
  - Document 2–3 Claude Code prompts used during development in README.

- Deliverables: accessible UI refinements, a short functional-gap checklist, and a deployment-ready README.


## Phase 4 — Final Checks & Shipping (15–30 minutes)
- Tasks:
  - Review commit history; squash only if needed but keep commits meaningful.
  - Run through the feature end-to-end and capture any remaining notes about what you'd do next.
  - Add a short 'What I learned about Claude Code' note and paste 2–3 useful prompts in README.
  - Ensure submission checklist from `REQUIREMENTS.MD` is addressed in repo.
- Deliverables: completed checklist, README with prompts, honest notes on next steps.
- Risks: Running out of time—stop at 5 hours and document outstanding work.

## Timeboxing and Priorities
- Target: 2–5 hours total.
- Must-have scope: Phase 0 + Phase 1 + Phase 2 (core features). Phase 3 and 4 are high priority but may be trimmed for time.
- If time runs short: drop bonus running total, keep plain styles, and document remaining polish.

## Example Schedule (3 hours)
- 0:00–0:20 — Phase 0 (Setup)
- 0:20–1:50 — Phase 1 (Form & Submit)
- 1:50–2:30 — Phase 2 (Jobs Feed)
- 2:30–3:00 — Phase 3 (Polish, README) + Phase 4 (Checks)

## Acceptance Criteria
- Next.js + TypeScript app using App Router.
- Form saves records to Supabase table.
- Feed shows 10 most recent jobs, newest first.
- Deployment URL available on Vercel.
- README contains required notes and 2–3 Claude Code prompts.

## Risks & Mitigations
- Supabase provisioning: create project early and keep keys accessible.
- Env var leakage: explicitly add `.env.local` to `.gitignore` and verify before commit.
- Time overrun: prioritize core features and document unfinished items.

---

If you'd like, I can now create the `app` page scaffold and a basic form implementation, or just commit this plan — which would you prefer I do next?
