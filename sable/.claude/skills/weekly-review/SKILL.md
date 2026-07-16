# Skill: Weekly Review

A structured end-of-week debrief covering jobs, revenue, pipeline, financials, and priorities. Built to compensate for Damien's disorganization and keep the bigger picture in view.

## When to use

- Damien asks for a weekly review or "how did this week go"
- End of week (Friday or whenever he wraps)
- Proactively, if a week has passed without a check-in

---

## Process

### Step 1 — Pull data

Read these files:
- `jobs/index.json` — all jobs (completed, in progress, pipeline)
- `financials/index.json` — income and expenses
- `financials/accounts.json` — current account balances
- `financials/income/[current month].json` — income this month
- `financials/expenses/[current month].json` — expenses this month
- `crm/leads.json` — leads in pipeline
- `memory/short-term.md` — anything flagged from recent sessions

### Step 2 — Calculate

- Revenue this week: sum of income entries dated this week
- Hours logged: sum of daily_hours across in-progress and completed jobs this week
- Jobs completed this week
- New jobs started this week
- Pipeline value: sum of quoted/pending jobs
- Net this week: income minus expenses for the week

### Step 3 — Compose the review

**Output format:**

```
## Weekly Review — Week of [date]

**Revenue this week:** $X
**Hours logged:** Xh across X jobs
**Expenses this week:** $X
**Net:** $X

**Jobs completed:**
- [Job ID] — [client] — [amount]

**In progress:**
- [Job ID] — [client] — [status]

**Pipeline:**
- [Lead/Job ID] — [description] — [value or TBD]

**Financials:**
Chequing: $X | Savings: $X | Cash: $X

**Flags:**
- [Anything overdue, unpaid, or requiring follow-up]

**Next week — focus:**
1. [Top priority]
2. [Second priority]
3. [Third priority]
```

### Step 4 — Flag anything that needs action

- Unpaid completed jobs → trigger Invoice & Collections skill
- Quotes with no response → trigger Follow-Up skill
- Leads gone cold → flag for CRM agent
- Anything that looks off in the financial picture → surface it plainly

---

## Quality standards

- Numbers only where they exist. Don't estimate or fill in gaps — note what's missing.
- Priorities for next week should be specific and revenue-oriented first.
- Keep it tight. This is a debrief, not a report.
