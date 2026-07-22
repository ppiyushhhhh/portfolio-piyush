# AGENTS.md

## Purpose
This repository hosts `piyushprasad.in`, a TanStack Start + React portfolio, plus a Node-based daily website health report generator under `scripts/`.

## Tech Stack
- Runtime/package manager: Bun (root app), npm (report script)
- Frontend: React 19, TanStack Start, Vite, Tailwind CSS
- Quality tools: ESLint, Prettier
- Monitoring script: Node.js + Lighthouse + PDFKit + Nodemailer

## Repository Areas
- `/src` → application routes, UI components, styles, utilities
- `/public` → static assets served by the portfolio
- `/scripts` → daily report generator and related assets/output
- `/.github/workflows` → CI, CodeQL, and scheduled daily report workflow

## Common Commands
From repository root:
- `bun install`
- `bun dev`
- `bun build`
- `bun lint`
- `bun format`

From `/scripts`:
- `npm install`
- `npm run report`

## Environment Notes
- Main site URL: `https://piyushprasad.in`
- Daily report workflow depends on GitHub secrets: `SITE_DOMAIN`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `REPORT_TO` (optional: `REPORT_FROM`, `ALERT_TO`)
- Use `SKIP_EMAIL=1` when running the report locally to generate PDF only.

## Agent Guardrails
- Make focused, minimal changes tied to the request.
- Do not hardcode credentials or secrets.
- Keep generated artifacts and temporary files out of commits unless explicitly requested.
- Validate touched areas with the smallest relevant existing command set (lint/build/report as applicable).

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
