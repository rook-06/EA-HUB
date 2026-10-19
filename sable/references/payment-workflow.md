# Payment Workflow — Standing Process

*Established 2026-09-21. This supersedes ad hoc invoicing — follow this for all ongoing work unless Damien says otherwise.*

---

## Daily

Damien logs hours worked each day into the current week's file in `financials/hours/`.

**Date handling (added 2026-10-18):** the system's injected "today's date" has been wrong twice in a row — both times exactly one day ahead of Damien's actual day (said the 17th when it was the 16th, said the 19th when it was the 18th). Do not log a date-sensitive hours/income entry off that injected date alone, especially near a week boundary (Sunday → Monday), where a wrong date silently moves hours into the wrong week/invoice. If Damien doesn't state the date explicitly in a message like "Xh today," confirm the date before logging rather than trust the system reminder.

## Weekly (every Sunday)

1. Tally the week's hours, Monday through Sunday.
2. Generate an invoice for the week via `tools/invoice-gen/generate.js` — client defaults to **KMM** unless the day's log says otherwise.
3. Invoice is a formality — see Income Timing below.
4. Archive the week's hours file, start a fresh one for the new week.

## Income Timing — REVISED 2026-10-16

~~Damien is paid day of~~ — **this was wrong.** Confirmed 2026-10-16: nothing had actually been paid since Oct 5, and only $1,000 arrived then against $1,300 billed. The "paid day-of" assumption had been driving real account-balance updates since Sept 21, which means balances were materially overstated.

**Current model:** tallied hours post to an **owing** balance (`financials/accounts.json` → `accounts_receivable`), not to cash accounts. Nothing moves to Simplii Chequing/Savings — and the 10/16/74 split doesn't get applied — until Damien explicitly confirms a payment, lump sum or otherwise. He said: *"I'll confirm once I'm paid out for things."* A confirmed payment doesn't need to map 1:1 to a specific invoice or day — apply it against the oldest outstanding amount unless Damien says otherwise, and log the remaining owing balance.

Invoices are still generated on the usual weekly cadence as a billing record — that part didn't change.

## Invoice Status — KMM specifically — REVOKED 2026-10-16

~~Standing rule (2026-09-21): KMM invoices are marked paid automatically the moment they're sent~~ — revoked. It assumed KMM pays by the due date without fail; that assumption was wrong. Invoices now default to **outstanding** until Damien confirms actual payment, same as any other client.

## Income Split — RETIRED 2026-10-19

~~10% → Simplii Savings, 16% → Tax reserve, 74% → Spending~~ — retired. Damien: *"Don't worry about how my money is spent, just take a weekly log from me about my account balances."* No more per-entry allocation modeling — new income entries log the amount only, no `split` breakdown. Historical entries keep their recorded splits as-is (not rewritten), but they're no longer treated as live allocation — see Weekly Balance Log below for how account state is tracked now.

## Weekly Balance Log — established 2026-10-19

Replaces all internal allocation tracking (tax reserve divisions, discretionary/spendable breakdowns) in `financials/accounts.json`. Damien reports his real account balances periodically (weekly, in practice whenever he gives an update); each report gets logged as a dated snapshot in `accounts.json` → `weekly_log`, and `accounts`/`totals` update to match. No attempt is made to track *why* a balance moved or how it's internally divided — just what it is, as of when he reported it.

## Default Client

Unless a day's log says otherwise, current work logged here is under **KMM Property Maintenance**.

## Quoting Time

Established 2026-10-15: time spent quoting bills at **half** Damien's standard hourly rate ($10/h vs $20/h). Flagged separately in the day's hours entry (`"type": "quoting"`) rather than folded into regular labour hours.

---

## File Locations

- Daily hours: `financials/hours/[week-start-date].json`
- Invoices: `financials/invoices.json` (grouped by client) + PDF in `financials/invoices/`
- Income: `financials/income/[month].json`
- Account balances: `financials/accounts.json`
