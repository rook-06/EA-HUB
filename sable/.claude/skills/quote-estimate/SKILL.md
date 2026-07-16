# Skill: Quote & Estimate

A structured process for scoping and pricing jobs across Damien's businesses — fast, accurate, and client-ready. Grounded in Hormozi's Value Equation and Grand Slam Offer framework.

*Read `references/hormozi.md` before building any quote intended to compete on value rather than price.*

## When to use

- Damien needs to quote a job for a new or existing client
- He asks "what should I charge for X" in a job context
- He needs to send a written estimate to a client

---

## Process

### Step 1 — Load context

Read:
- `context/work.md` — business services and scope
- `jobs/index.json` — check for similar past jobs to anchor pricing

### Step 2 — Gather job details

Ask Damien for anything missing from:
- Service type (lawn care, landscaping, renovation, tattoo, marketing, etc.)
- Scope of work (what exactly needs doing)
- Property size or project scale
- Location (affects travel time)
- Client name and contact (if new, add to CRM)
- Any materials needed (for landscaping/reno jobs)
- Timeline (urgent jobs can carry a premium)

Don't ask for everything at once. Start with what's needed to produce a number.

### Step 3 — Build the estimate

**For hourly jobs (Above the Norm labor, renovations):**
- Estimate hours based on scope
- Apply hourly rate ($20/h standard unless adjusted)
- Add materials at cost + 15% markup
- Flag if timeline is tight (rush premium applies)

**For piecework jobs (flat-rate lawn care, full landscape projects):**
- Break into line items: labor, materials, disposal, travel if significant
- Price each line item
- Total and apply a 10–15% margin buffer for unknowns

**For tattoo jobs:**
- Hourly rate × estimated session time
- Minimum session charge if applicable
- Note: deposit requirement on booking

**For marketing jobs:**
- Project-based or retainer
- Scope deliverables explicitly — vague scope = scope creep

### Step 4 — Produce the quote

**Output format (for Damien's review before sending):**

```
## Quote — [Service] for [Client]
Date: [date]
Valid for: 14 days

[Line item 1]: $X
[Line item 2]: $X
...
Subtotal: $X
[Tax if applicable]: $X
Total: $X

Notes:
- [Any conditions, exclusions, or assumptions]
- Payment: [terms]
```

### Step 5 — Log it

Once Damien approves the quote:
- Create or update the job entry in `jobs/` with status "quoted" and the price
- If client is new, add them to `crm/contacts.json`
- If it's a lead being converted to a quote, update their status in `crm/leads.json`

---

## Hormozi Pricing Principles (apply to every quote)

- **Don't compete on price — compete on value.** Use the Value Equation: Dream Outcome × Perceived Likelihood of Achievement / Time Delay × Effort & Sacrifice. Reduce the denominator (make it faster, easier) and the price becomes secondary.
- **Virtuous Cycle thinking:** Charging more funds better fulfillment, which produces better results, which justifies a higher price. Don't undercut — build up.
- **Offer a guarantee where possible.** A conditional guarantee (e.g., "visible improvement by week 6 or last service refunded") absorbs risk from the client and dramatically increases conversion. Only include if you're confident in the result.
- **Every quote is a potential Continuity Offer.** After presenting the one-time price, consider whether to present a recurring maintenance option. The one-time job is Stage 1 (Attraction); the recurring plan is Stage 3 (Continuity). The real revenue is in Stage 3.
- **Niche framing increases perceived value.** A quote that speaks specifically to this client's situation ("for a property like yours with heavy tree coverage…") feels more credible than a generic number.
- If the quote is for a new service or a new market, consider running the Offer Builder skill first to construct a Grand Slam version before pricing.

## Quality standards

- Never give a number without knowing the scope. Underbidding is worse than not quoting.
- If Damien doesn't know the scope yet, help him figure it out before pricing.
- Always build in a buffer — surprises on a job cost him, not the client.
- A quote is the floor. The offer is the ceiling. When possible, build the offer first.
