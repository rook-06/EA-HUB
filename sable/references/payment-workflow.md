# Payment Workflow — Standing Process

*Established 2026-09-21. This supersedes ad hoc invoicing — follow this for all ongoing work unless Damien says otherwise.*

---

## Daily

Damien logs hours worked each day into the current week's file in `financials/hours/`.

## Weekly (every Sunday)

1. Tally the week's hours, Monday through Sunday.
2. Generate an invoice for the week via `tools/invoice-gen/generate.js` — client defaults to **KMM** unless the day's log says otherwise.
3. Invoice is a formality — see Income Timing below.
4. Archive the week's hours file, start a fresh one for the new week.

## Income Timing

Damien is paid **day of** — the day he logs the hours, he's been paid for them. Income is counted (logged to `financials/income/`) as soon as hours are logged, not when the Sunday invoice goes out. The invoice is paperwork, not a payment trigger.

## Income Split — every payment, on receipt

- **10%** → Simplii Savings
- **30%** → Tax reserve
- **70%** → Simplii Chequing

**⚠️ Open issue:** 10 + 30 + 70 = 110%, not 100%. Flagged to Damien 2026-09-21, unresolved as of this writing — do not apply this split until corrected. Likely candidates: chequing is 60% (10+30+60=100), or tax reserve is meant to come out of the chequing 70% rather than stacking on top. Confirm before running any split.

## Default Client

Unless a day's log says otherwise, current work logged here is under **KMM Property Maintenance**.

---

## File Locations

- Daily hours: `financials/hours/[week-start-date].json`
- Invoices: `financials/invoices.json` (grouped by client) + PDF in `financials/invoices/`
- Income: `financials/income/[month].json`
- Account balances: `financials/accounts.json`
