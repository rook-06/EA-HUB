# Skill: Invoice & Collections

Tracks invoicing for completed jobs, generates PDFs, monitors payment status, and follows up on overdue accounts. Damien doesn't naturally track this — this skill compensates.

## When to use

- A job is marked "completed" in the job tracker
- Damien asks about unpaid invoices
- Weekly Review flags unpaid completed jobs
- A payment comes in and needs to be logged

---

## Process

### Step 1 — Check for uninvoiced completed jobs

Read `jobs/index.json`. Look for any job with status "completed" but no corresponding income entry in `financials/income/`.

Flag these — they're money that hasn't been collected yet.

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

### Step 5 — Track payment

When Damien confirms payment received:
- Update job status from "invoiced" to "paid"
- Update `financials/income/` entry status from "pending" to "received"
- Update `financials/index.json` running totals
- Update `financials/summaries/[month].json`
- Update `financials/accounts.json` balance (if reported)

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
