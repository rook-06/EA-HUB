# Skill: Invoice & Collections

Tracks invoicing for completed jobs, generates PDFs, monitors payment status, and follows up on overdue accounts. Damien doesn't naturally track this — this skill compensates.

**Standing process (since 2026-09-21, revised 2026-10-16):** see `references/payment-workflow.md`. Damien logs hours daily into `financials/hours/[week-start].json`; current work defaults to KMM unless noted. **He is NOT paid day-of** — that assumption was wrong and was revoked 2026-10-16. Tallied hours post to an owing balance (`accounts.json` → `accounts_receivable`), not to cash accounts, until Damien explicitly confirms a payment. Every Sunday, tally the week and generate the invoice as a billing record — it does not mean payment was received.

## When to use

- Sunday — weekly tally and invoice generation (see standing process above)
- A job is marked "completed" in the job tracker
- Damien asks about unpaid invoices
- Weekly Review flags unpaid completed jobs
- A payment comes in and needs to be logged

---

## Process

### Step 1 — Check for uninvoiced completed jobs

Read `jobs/index.json`. Look for any job with status "completed" but no corresponding income entry in `financials/income/`.

Flag these — they're money that hasn't been collected yet.

For the weekly KMM cycle specifically: read the current week's file in `financials/hours/`, confirm all logged days have matching income entries (logged as owing, not paid, per the 2026-10-16 revision), then proceed to generate the formal invoice for the week's total.

### Step 2 — Generate invoice

Use the invoice generator at `tools/invoice-gen/generate.js`.

Before running, update the job data in the generator:
- Pull all fields from the job's JSON file
- Set invoice number as `INV-YYYY-###` (increment from last invoice)
- Set due date to 14 days from invoice date (standard)
- Confirm daily hours and totals are current

Run: `node tools/invoice-gen/generate.js`

Output: `tools/invoice-gen/output/INV-YYYY-###.pdf`

### Step 3 — Update job status

After generating the invoice:
- Update job status from "completed" to "invoiced"
- Add invoice number and date to job JSON
- Add entry to `financials/income/` with status "pending"

### Step 4 — Send or share the invoice

Present the PDF to Damien via Telegram for him to send to the client.
Note the client's preferred payment method (e-transfer, cash) in the job file.

**KMM specifically:** ~~the moment the invoice goes out, mark it paid~~ — this rule was revoked 2026-10-16, it was wrong (KMM does not reliably pay by the due date). KMM invoices now default to "outstanding" like any other client's, below.

### Step 5 — Track payment (all clients)

Nothing is marked paid, and no split is applied to `accounts.json`, until Damien explicitly confirms a payment. When he does:
- Update job status from "invoiced" to "paid" (or note partial payment)
- Update the relevant `financials/income/` entries — a confirmed payment doesn't need to map 1:1 to a specific invoice or day; apply it against the oldest outstanding amount unless Damien says otherwise, and log what's still owing
- Update `financials/accounts.json`: post the actual amount received (with the 10/16/74 split) to the real accounts, and update `accounts_receivable.kmm_owing` (or the equivalent for other clients) to reflect what's left outstanding
- Update `financials/index.json` running totals and `financials/summaries/[month].json` if applicable

### Step 6 — Collections: overdue follow-up

If a job has been invoiced for 14+ days with no payment logged:
- Flag it in the Weekly Review
- Draft a short, professional follow-up message for Damien to send
- If 30+ days overdue, escalate: recommend a firmer follow-up or phone call

**Follow-up template (14 days):**
"Hi [client], just following up on invoice [INV-###] for [service] dated [date]. Total due: $[amount]. Please let me know if you have any questions or prefer to arrange payment another way."

**Follow-up template (30 days):**
"Hi [client], invoice [INV-###] for $[amount] is now 30 days past due. Please advise on when I can expect payment. I'm available at [phone] if you'd like to discuss."

---

## Invoice numbering

Format: `INV-YYYY-###`
Track the last used number in `financials/invoices.json`.

---

## Quality standards

- No job marked "completed" should stay uninvoiced for more than 24 hours.
- Every payment received must be logged to financials immediately.
- Overdue accounts surface in every Weekly Review until resolved.
