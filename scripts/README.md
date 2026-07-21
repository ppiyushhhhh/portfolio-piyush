# Daily Website Health Report

Automated Datadog → PDF → Email pipeline for `piyushprasad.in`.

## What it does

1. Pulls uptime, response time, SSL, RUM sessions, browsers, devices, countries, JS errors, and Core Web Vitals from the Datadog API (last 24h).
2. Renders a corporate PDF (`reports/Daily-Website-Report-YYYY-MM-DD.pdf`) with sectioned tables, a response-time sparkline, an auto-generated executive summary, and page numbering.
3. Emails the PDF to `REPORT_TO` via SMTP.
4. Runs daily at **19:00 IST (13:30 UTC)** via GitHub Actions (`.github/workflows/daily-report.yml`), and can be triggered manually from the Actions tab.

## Required GitHub Secrets

Set these under **Settings → Secrets and variables → Actions**:

| Secret | Example | Purpose |
| --- | --- | --- |
| `DD_API_KEY` | `xxxxxxxxxxxxxxxx` | Datadog API key |
| `DD_APP_KEY` | `xxxxxxxxxxxxxxxx` | Datadog Application key (needs `synthetics_read`, `rum_apps_read`, `metrics_read`) |
| `DD_SITE` | `us5.datadoghq.com` | Datadog site |
| `DD_RUM_APPLICATION_ID` | `69dd9dd6-…` | RUM application ID (enables Traffic + App Health sections) |
| `SITE_DOMAIN` | `piyushprasad.in` | Domain used to filter synthetic tests |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server |
| `SMTP_PORT` | `465` | SMTP port (465 = SSL, 587 = STARTTLS) |
| `SMTP_USER` | `you@gmail.com` | SMTP username / sender |
| `SMTP_PASS` | *(app password)* | Gmail app password or provider secret |
| `REPORT_TO` | `you@example.com` | Recipient |
| `REPORT_FROM` | *(optional)* | Custom From address; defaults to `SMTP_USER` |

> Gmail: create an **App Password** at https://myaccount.google.com/apppasswords and use it as `SMTP_PASS`.

## Run locally

```bash
cd scripts
npm install
DD_API_KEY=... DD_APP_KEY=... DD_SITE=us5.datadoghq.com \
DD_RUM_APPLICATION_ID=... SITE_DOMAIN=piyushprasad.in \
SKIP_EMAIL=1 node generate-report.mjs
```

The PDF is written to `../reports/`. Set `SKIP_EMAIL=1` to skip sending.

## Notes

- Any missing data source (e.g. no SSL synthetic yet) renders as `N/A` — the report never fails hard on a single failed query.
- All Datadog calls run server-side inside GitHub Actions; keys never touch the browser bundle.
- Reports are also uploaded as workflow artifacts (30-day retention) so you can re-download any historical PDF from the Actions run page.
