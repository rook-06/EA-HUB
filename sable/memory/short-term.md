# Sable — Short-Term Memory

*Rolling file. Entries expire after 3 days from their date. On session start, drop entries older than 3 days. Promote anything important to long-term.md or the relevant context file before clearing.*

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
