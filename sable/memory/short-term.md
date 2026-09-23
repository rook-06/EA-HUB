# Sable — Short-Term Memory

*Rolling file. Entries expire after 3 days from their date. On session start, drop entries older than 3 days. Promote anything important to long-term.md or the relevant context file before clearing.*

---

## [2026-09-23] — First Week Under New Payment Workflow

Damien logged hours for the current week (KMM, per standing workflow):
- Sept 21: 11h ($220), Sept 22: 6h ($120), Sept 23: 6h ($120) — 23h / $460 so far
- Logged to `financials/hours/2026-09-21.json`, income entries INC-2026-007/008/009 in `financials/income/2026-09.json`, split 10/30/60 applied per entry
- `accounts.json` updated: Simplii Chequing $1,011.12 (added `tax_reserve` division: $138 earmarked, $873.12 free), Simplii Savings $349.50, tax reserve owed now $1,048.50 ($138 funded, $910.50 backlog still unfunded), net worth **+$1,051.18** (up from +$591.18 on Sept 8)
- Week isn't over — Sunday 2026-09-27 still needs the formal tally + invoice per the workflow
- Also clarified same session: the KMM website rebuild (`sable/projects/marketing-portfolio/site/`) was never deployed — it's a portfolio spec build, not KMM's real live site. The only live KMM site is their original Jobber one. Session has no outbound web access, so couldn't fetch/audit it directly — flagged to Damien, waiting on his call on how to proceed.

---

## [2026-09-21] — Full Financial Reconciliation ("The September Ledger")

Damien shared an artifact with his full reconciled financial state as of Sept 7-8, 2026. Synced into the system:

- **Net worth: +$591.18** (up from -$975.10 on July 3) — positive for the first time on record
- `financials/accounts.json` fully rewritten to match: added SCU Savings ($3,965.44, 72% of liquid funds), SCU/NCU chequing/savings (all $0), Wealthsimple Chequing ($0.20), Simplii TFSA held for "Eva" ($470.63), SCU Loan (-$4,885.83, new to this system), Capital One Credit (-$51.45), SCU Credit ($0)
- Simplii Chequing now $735.12, Simplii Savings $303.50 (divisions: Capital One hold $51.45, GST reserve $41.25, free $210.80)
- Grandmother loan now shows **balance 0, tagged "settled"** — previously tracked ~$2,000
- Tax reserve: $910.50 owed (30% of KMM income), unfunded — no dedicated account exists
- Logged `financials/income/2026-08.json` (INC-2026-003/004/005 for the KMM backlog, dated to job end dates as proxy since exact payment dates were never given; INC-2026-006 for a previously-unknown "KMM website retainer" $175) and `financials/income/2026-09.json` (empty, $520 partial-month figure noted but not itemized — source unclear)
- Updated `context/current-priorities.md` with the new financial position and three flagged unknowns
- Posted to `ai-bridges/sable-to-atlas.md` — Eva TFSA, grandmother loan resolution, and the new SCU loan all flagged as more Atlas's lane than mine

### New standing rule (2026-09-21): KMM invoices auto-marked paid
- Damien: mark KMM invoices paid by due date as soon as they're sent — no need to chase confirmation, KMM always pays on time
- Applied retroactively: INV-2026-003/004/005 date_paid set to each invoice's due date (Aug 31 / Sep 10 / Sep 14)
- Documented in `references/payment-workflow.md` and `invoice-collections` SKILL.md — KMM only, other clients still need real confirmation

### Resolved same day (2026-09-21)
1. **Eva** is Damien's daughter — the TFSA is money he's holding for her until she's old enough. Not a mystery, not his to spend.
2. **Grandmother loan** — confirmed fully settled/paid off.
3. **SCU Loan ($4,885.83)** — Damien said it doesn't need more detail than what's already on file. Not pursuing further.
4. Invoice records reverted — Damien said leave `invoices.json` as it was; I'd added proxy payment dates that weren't real data. Backed those out, `date_paid` back to null.
5. **Set aside for now, per Damien:** the KMM website retainer ($175, one-time vs. recurring) and September's unitemized $520 partial income. Not chasing either right now.

---

## [2026-09-21] — New Standing Payment Workflow

Damien established a permanent process (session context had been lost, so he re-specified it directly):
- Log hours daily into `financials/hours/[week-start].json` (current week file created: `2026-09-21.json`)
- Every Sunday: tally Mon-Sun hours, generate the formal invoice — default client is KMM unless a day says otherwise
- He's paid day-of — income counts as soon as hours are logged, invoice is formality only, not the payment trigger
- Split on every payment: 10% Simplii Savings, 30% tax reserve, 60% Simplii Chequing (confirmed 2026-09-21 — original 70% was a typo)
- Documented in full at `references/payment-workflow.md`; `invoice-collections` skill and `accounts.json` (added `tax_reserve` division) updated to match
- Still waiting on payment date/method for the $2,340 KMM backlog before the split can actually be posted to income/accounts

---

## [2026-09-21] — KMM Piecework Invoices Logged (Previously Untracked)

- Damien uploaded 4 invoice PDFs. INV-2026-001 (Howell, paid) matched the existing record exactly.
- Three were **new to the system** — general labour piecework for KMM Property Maintenance in August 2026, separate from the earlier KMM website build project:
  - INV-2026-003: $700 (35h @ $20/h), Aug 10-16, due Aug 31 — **overdue**
  - INV-2026-004: $720 (36h @ $20/h), Aug 17-23, due Sep 10 — **overdue**
  - INV-2026-005: $920 (46h @ $20/h), Aug 24-30, due Sep 14 — **overdue**
  - **Total outstanding: $2,340** — none of these PDFs indicate payment status
- Added: JOB-2026-006/007/008 (jobs/index.json, status "invoiced"), CON-2026-004 KMM contact (crm/contacts.json), all three invoices under KMM in financials/invoices.json (restructured invoices.json to group by client per Damien's request)
- Invoice files saved to `financials/invoices/INV-2026-003.pdf`, `-004.pdf`, `-005.pdf`
- **Not yet done:** logging income, updating account balances — payment status unconfirmed. Waiting on Damien to confirm which of these three are actually paid.
- **Flag:** $2,340 sitting unconfirmed and past due while net worth is negative and he's chasing a 9-5 — worth a direct nudge to follow up with KMM if unpaid.

---

## [2026-07-13] — KMM Property Maintenance Website Build

### New client website project — v1 built
- Damien requested a replacement for KMM Property Maintenance's Jobber site
  (kmmpropertymaintenance.jobbersites.com) — Jobber blocks custom code, which was blocking
  their marketing team from installing tracking/analytics scripts
- Built as plain HTML/CSS/JS (Damien's tech stack choice — no build tooling, easy for a
  non-technical team to hand-edit), Tailwind via CDN for styling
- File: `sable/projects/kmm-property-maintenance-website/` — full details and open items in
  that project's `CLAUDE.md`
- 5 pages: home (with lead capture form + reviews teaser), services, portfolio (before/after,
  new feature not on original site), reviews (new feature — public submission form + admin-approved
  display), contact. No accounts/login, per Damien's instruction.
- Real business info (phone, services, service areas) pulled from the live Jobber site and
  verified — not fabricated. Email address (Dylanklassen2005@gmail.com) was pulled from the
  public site source, not confirmed directly with Damien yet.
- Tracking/analytics scripts have ONE edit point: `js/tracking.js`, loaded on every page —
  solves the original problem directly
- Reviews and portfolio ship empty/placeholder (clearly labeled `[Sample]`) since no real
  reviews or project photos exist yet — did not fabricate fake testimonials or claim completed
  jobs that didn't happen
- Form submission (lead form + review form) is UI-only for now — Damien chose to see the
  design first before deciding between Netlify Forms / Formspree / serverless function
- Hosting (Netlify vs Vercel) also deferred until design is approved

### Open follow-ups
- Confirm contact email with KMM
- Get real before/after photos for portfolio
- Wire up form backend once Damien picks an option
- Decide hosting and deploy

---

## [2026-06-16 to 2026-06-19] — Gimli Job / System Build Session

### JOB-2026-002 — PAID
- Client: George Howell (431-999-1489), Rachel (204-218-3586) — address: 79 Geoffrey Bay, Arnes, MB
- Location: Gimli, MB — cottage renovation
- Independent contracted labour (not under any of Damien's businesses)
- 33 hours @ $25/h = $825 subtotal
- Invoice INV-2026-001: $866.25 (incl. 5% GST) — **PAID June 22, 2026** (13 days early)
- INC-2026-001 logged. Chequing updated: $872.98
- File: `sable/financials/invoices/INV-2026-001.pdf`

### JOB-2026-003 — PAID
- Garden cleanout — weed and unwanted plant removal, 180 Waverly St, Winnipeg
- Above the Norm job, 2 days (June 22-23)
- Paid $140 — INC-2026-002 logged
- Client name still unknown — needs to be logged

### JOB-2026-001 — Still open
- Garden bed cleanup quote — original lead, client still unknown
- May or may not be the same client as JOB-2026-003 — clarify when possible

### Sterling / Financials system — LIVE
- Account snapshot (as of June 18): Chequing $6.73 (after Amazon Prime pull), savings $0, cash $10, Wealthsimple $53.57
- EXP-2026-001: Amazon Prime $11.19, June 18, subscriptions
- No income logged yet (Howell payment pending)
- Files: `sable/financials/`

### System builds (completed)
- Job tracker: `sable/jobs/`
- Sterling financial advisor: `sable/financials/`
- CRM: `sable/crm/` (Howell logged as client, two open leads)
- Invoice generator: `tools/invoice-gen/`
- Skills added: weekly-review, quote-estimate, invoice-collections, follow-up, offer-builder
- Agents added: social-media, quote-builder, crm
- Hormozi frameworks integrated: `sable/references/hormozi.md`
- Autonomous skill/agent creation authority granted by Damien

### Outreach — First steps taken
- Damien did warm outreach for lawn care (small batch, June 18)
- Sent follow-ups to 9 past tattoo inquiry chats (June 18)
- No responses logged yet
- Key constraint: small existing network; church community and co-owner network identified as untapped

### Key business context
- Damien is scared of selling — fear of doing things wrong and losing potential clients
- First outreach done despite the fear — positive step
- Decision: ATN is the primary revenue vehicle; tattooing runs in background; Dametime Marketing waits for case studies
- Tattoo rate: ~$100/h for premade/simple work; wants to build toward custom pieces
- Target tattoo volume: 2-3 clients/week

---

## [2026-06-29] — Rook (Silent Build)

### Alias confirmed: Rook
- Damien is building a private artist identity under the alias "Rook"
- Tattooing, gym, and personal development all build privately under Rook
- Above the Norm stays public and separate — it funds the build
- No crossover between Rook and Damien's public identity until Rook earns it
- Full plan: `hub/plans/rook-build.md`

### Next actions
- Lock Instagram handle: @rook.ink (or closest available)
- Acquire domain: rook.ink or rooktattoo.com
- Document every session under Rook from here on
- Equipment upgrade at $1,000 liquid checkpoint

---

## [2026-06-20 to 2026-06-21] — Tattoos / Jarvis / Bot

### Facebook Marketplace tattoo ad — LIVE
- Posted June 20
- Offer: free small-to-medium portfolio tattoos, with custom pieces as a bonus for the right client
- No responses as of June 21 morning
- Copy saved in session; ad posted by Damien directly
- **Check in:** ask about responses after 24-48 hours

### Half-sleeve inquiry — DEFERRED
- Client: logged as LEAD-2026-003 (name unknown)
- Decision (June 22): pushing out half-sleeve for later, exploring other ideas first
- Both Damien and client will share ideas and reconnect — keep warm
- Not a dead lead — a deferred one

### Jarvis expansion plan
- Full plan saved: `hub/plans/jarvis-expansion.md`
- Damien wants to build a Jarvis-like ambient voice assistant using a Raspberry Pi
- Hardware: Pi 5 4GB, ReSpeaker mic array, speaker — ~$215-252 CAD total depending on path
- Software roadmap discussed — build order before hardware arrives:
  1. ElevenLabs voice setup (pick Sable's voice)
  2. Standalone bot (Claude API, Telegram, always-on — the foundation)
  3. Proactive scheduler (morning brief, invoice alerts, follow-up triggers)
  4. Whisper voice pipeline
  5. Porcupine wake word
- Damien was interested in starting the standalone bot — session ended before confirming

### AI website hustle
- Damien asked about it; advised: viable as a service but doesn't solve his client acquisition problem. Not a priority while three businesses are already open.

### Open threads
- Confirm garden bed cleanup client (overdue)
- Follow up on warm outreach responses
- Follow up on 9 tattoo inquiry responses (sent June 18)
- Log Howell payment when received (due July 5)
- Confirm Damien's decision on the half-sleeve inquiry
- Start standalone bot build when Damien is ready
