# REQUIREMENTS — Profit Wizard take‑home

Purpose

Build a small feature that could plausibly live inside Profit Wizard: a page where a trade business owner can log a completed job. Timebox work to 2–5 hours (stop at 5 and ship notes about next steps).

Feature (scope)

- A form to log one completed job with these fields:
  - Service type (dropdown — pick 5–6 sensible options)
    - Example options: HVAC Install, Plumbing Repair, Electrical, Carpentry, Roofing, General Maintenance
  - Invoiced amount (number)
  - Date completed (date picker)
  - Customer note (optional text area)
- Submissions save to Supabase (Postgres) table.
- Below the form show a feed of the most recent 10 jobs (newest first).
- Bonus (optional): running total of invoiced amount across the visible jobs.

Hard requirements (must)

- Next.js (App Router) + TypeScript.
- Use Supabase for the database and the official Supabase JS client.
- Deploy to Vercel (send the live URL).
- Github Repo (send the URL)
- Use Claude Code (terminal) as your primary AI collaborator. Track 2–3 key Claude Code prompts in the README.
- Include a README with: what you built, what you'd do next with more time, one thing you’d ask a teammate, one thing you learned about Claude Code.
- No authentication required (assume one user).
- Basic required validation only (e.g., required checks).

What NOT to add

- No authentication, no multi-tenancy/RLS.
- No fancy validation or tests.
- No extra infra (Kafka, Redis, ChromaDB, Docker Compose, etc.). Keep it simple.
- Polished UI is not required — Tailwind defaults or simple styles are fine.

Deliverables

- Public GitHub repository containing the Next.js + TypeScript app.
- A working Vercel deployment URL.
- README describing: what was built, tradeoffs, next steps (one line), one teammate question, and 2–3 Claude Code prompts used.
- .env.local must NOT be committed. Use env vars for Supabase URL and anon key. Add them to Vercel deployment settings.

Evaluation criteria (what reviewer will look for)

- Commit history tells a story (small, focused commits rather than one giant commit).
- Clear Next.js App Router project structure.
- Supabase connection handled via environment variables (no keys in repo).
- Evidence of using Claude Code as primary assistant (prompts in README and/or commit messages). Bonus: paste 2–3 key prompts.
- Clean deployment to Vercel + Supabase.
- Honest notes about what got stuck and what you'd do next.

Setup hints

- Supabase: free tier is fine. Create a project, note PROJECT_URL and ANON_KEY, set them in .env.local and in Vercel dashboard.
- Example table SQL (adapt in Supabase SQL editor):

  -- Enable uuid extension if needed (Supabase may already provide gen_random_uuid)
  CREATE TABLE jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    service_type text NOT NULL,
    invoiced_amount numeric NOT NULL,
    date_completed date NOT NULL,
    customer_note text,
    created_at timestamptz DEFAULT now()
  );

- Use Supabase JS client (supabase-js) in Next.js server and/or client components as appropriate.
- Keep anon key in env; use server actions or edge functions if you want server-side inserts, or client-side with anon key (fine for this task since no auth requirement).

Claude Code quick start

- Install: `npm install -g @anthropic-ai/claude-code`
- Run in project dir: `claude`
- Use it as a terminal pairing assistant: ask it to explain decisions, run commands, and paste prompts into README to show workflow.

Time & submission

- Timebox: do 2–5 hours of hands-on work. If you exceed 5 hours, stop and ship with notes on what you'd do next.
- Deadline: 48–72 hours (from assignment). If you need more time, ask.


Submission checklist

- [ ] Repo public or reviewer invited
- [ ] Vercel deployment URL included
- [ ] README contains the required notes and 2–3 Claude Code prompts
- [ ] .env.local not committed
- [ ] Supabase env vars configured in Vercel
- [ ] Commit history shows a sequence of meaningful commits

Notes on right-sizing

- Keep architecture minimal: a single Next.js page (App Router) + Supabase table + client/server code to insert/list jobs is sufficient. Resist adding queues, vector DBs, or other components unless they directly serve this 4-field form.

