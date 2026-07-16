# Skill: Follow-Up

A systematic process for following up on quotes, leads, and client conversations that haven't moved forward. Damien is naturally prone to letting things fall through the cracks — this skill closes that gap.

## When to use

- A quote has been sent but no response after 3+ days
- A lead in the CRM hasn't been contacted in 7+ days
- A client said "I'll call back" and hasn't
- Weekly Review surfaces stale pipeline items
- Damien asks "should I follow up with anyone?"

---

## Process

### Step 1 — Audit the pipeline

Read:
- `crm/leads.json` — check last_contact date for each lead
- `jobs/index.json` — check for jobs with status "quoted" and the date quoted

Flag:
- Any lead with no contact in 7+ days → needs outreach
- Any quoted job with no response in 3+ days → needs follow-up
- Any lead marked "warm" or "interested" that hasn't moved → priority follow-up

### Step 2 — Prioritize

Rank by:
1. Highest value opportunity first
2. Leads who expressed clear interest (warm > cold)
3. Oldest untouched lead

### Step 3 — Draft follow-up messages

Keep them short. No apologies for following up. No desperation. Just professional and direct.

**Quote follow-up (3–5 days, no response):**
"Hey [name], just checking in on the quote I sent for [service]. Happy to answer any questions or adjust anything if needed. Let me know if you want to move forward."

**Lead follow-up (someone who expressed interest but went quiet):**
"Hey [name], wanted to touch base — you mentioned [service] a little while back. Still looking to get that taken care of? I have some availability coming up."

**Soft lead / "call me later" follow-up:**
"Hey [name], [Damien] from [business] — you mentioned you might need [service] down the road. Just checking in to see if the timing is right."

Adjust tone for context. Texts are casual. Emails are slightly more formal.

### Step 4 — Present to Damien

List who to follow up with, ranked by priority. Include the drafted message for each. Let Damien send them — don't send on his behalf unless explicitly authorized.

### Step 5 — Log the contact

After Damien confirms he's followed up:
- Update `last_contact` date in `crm/leads.json`
- Note the outcome if he shares it (no response, interested, not interested, booked)

---

## Hormozi Outreach Principles (apply to all follow-up)

*Read `references/hormozi.md` for the full Core Four framework.*

- **The Rule of 100:** This skill is one component of the daily outreach commitment. 100 messages per day is the target. Follow-ups count.
- **8–12 touches before declaring a lead dead.** Most operators give up at 2-3. The 5th follow-up often closes the deal the first two missed.
- **Cold outreach response speed matters.** If a lead responds — to a quote, a follow-up, anything — respond within 60 seconds when possible. Speed signals professionalism and seriousness.
- **Warm leads first, always.** Anyone who has already interacted with Damien (called, texted, asked for a quote) is warm. These follow-ups take absolute priority over cold outreach.
- **Lead magnet for stubborn leads:** If a lead hasn't responded to two follow-ups, offer something free first — a free property walkthrough (ATN), a free design sketch (tattoos), a free 30-minute marketing audit (marketing). This lowers the barrier and restarts the conversation.

## Quality standards

- Follow-ups are not optional. Money left on the table from stale quotes is real.
- Never draft a message that sounds needy. Confident and brief.
- If a lead has been followed up 3 times with no response, flag it for Damien to make a call: pursue or drop.
- Document every follow-up attempt in `crm/leads.json` — the pattern of touches matters.
