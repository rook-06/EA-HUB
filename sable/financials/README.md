# Sterling — Financial Advisor

Sterling tracks all of Damien's income and spending across both personal and business activity.

---

## Directory Structure

```
financials/
  income/       — All income entries (JSON, one file per month)
  expenses/     — All expense/purchase entries (JSON, one file per month)
  summaries/    — Monthly financial summaries
  index.json    — Master index: running totals and recent entries
```

---

## Income Entry Schema

```json
{
  "id": "INC-2026-001",
  "date": "2026-06-16",
  "source": "Above the Norm | Dametime Tattoos | Dametime Marketing | Personal",
  "description": "",
  "amount": 0,
  "payment_method": "cash | e-transfer | cheque | other",
  "linked_job": "JOB-2026-002",
  "notes": ""
}
```

## Expense Entry Schema

```json
{
  "id": "EXP-2026-001",
  "date": "2026-06-16",
  "category": "food | fuel | supplies | equipment | rent | utilities | subscriptions | personal | entertainment | other",
  "description": "",
  "merchant": "",
  "amount": 0,
  "payment_method": "cash | debit | credit | e-transfer",
  "business_expense": false,
  "notes": ""
}
```

---

## Features

- **Income tracking** — Log every payment received, by source and job
- **Expense tracking** — Log every purchase with category and merchant
- **Monthly summaries** — Net income, total in, total out, breakdown by category
- **Search** — Ask Sterling to find by date, merchant, category, source, amount range, or keyword
- **Business vs. personal split** — Flag expenses as business to separate deductible costs
- **Job linking** — Link income entries to job records for full revenue picture

---

## How to Use

Tell Sterling (via Sable) what you want to log or find:

**Logging income:**
"Sterling, log $160 from George Punzalan, e-transfer, June 19"

**Logging an expense:**
"Sterling, log $45 at Superstore, food, debit, today"

**Searching:**
"Sterling, show me all food expenses this month"
"Sterling, what's my net income for June?"
"Sterling, find everything over $100 this month"
"Sterling, show me all business expenses"

---

## ID Format

- Income: `INC-YYYY-###`
- Expenses: `EXP-YYYY-###`
