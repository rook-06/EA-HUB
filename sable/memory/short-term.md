# Sable — Short-Term Memory

*Rolling file. Entries expire after 3 days from their date. On session start, drop entries older than 3 days. Promote anything important to long-term.md or the relevant context file before clearing.*

---

## [2026-10-21] — Fixed a stale local git checkout (no data lost)

Mid-session, the local working copy's branch pointer had reverted to an earlier commit (right after the invoice PDF regen, before the retainer work, balance updates, and today's hours logging) — git log showed only old commits and the memory file read back as if everything since were missing. Checked `origin/claude/invoices-display-adfgx6` directly: all the real work was safely pushed there the whole time (confirmed via `git log origin/...`), the local checkout had just gone stale (4 divergent, redundant local-only commits with duplicate messages — an artifact of the environment, not new work). `git reset --hard origin/claude/invoices-display-adfgx6` resynced local to the authoritative, complete history. Nothing was lost; this was a local-view issue only.

---

## [2026-10-21] — Oct 21 hours logged

- 6.5h ($130), week of Oct 19-25 now at 20h / $400
- INC-2026-036 logged as owing (not paid)
- `accounts.json` accounts_receivable: billed_oct5_onward $1,870 → $2,000, kmm_owing $270 → **$400.00** (Oct 19 + 20 + 21, all still on the open, uninvoiced week)
- Damien stated the date explicitly ("the 21st"), matches today — no date-confirmation needed.

---

## [2026-10-21] — Oct 20 hours logged

- 9.5h ($190), week of Oct 19-25 now at 13.5h / $270
- INC-2026-035 logged as owing (not paid), per the standing owing model — no accounts.json cash impact
- `accounts.json` accounts_receivable: billed_oct5_onward $1,680 → $1,870, kmm_owing $80 → **$270.00** (Oct 19 + Oct 20, both still on the open, uninvoiced week; received_oct5_onward unchanged at $1,600)
- Damien stated the date explicitly ("the 20th"), consistent with the standing caution — no need to double-check against the injected date this time.

---

## [2026-10-19] — KMM-2026-009 and 010 now genuinely marked paid in the system

Damien followed up: mark them paid in the system too, not just on the invoice. Confirmed only the Oct 19 hours remain genuinely outstanding, and explicitly chose to mark KMM-2026-010 "completely paid" — closing the $120 gap on it as a bookkeeping call, not a newly reported deposit.

- `accounts_receivable`: `kmm_owing` $200.00 → **$80.00** (just the Oct 19 hours, still on the open, uninvoiced week), `received_oct5_onward` $1,480.00 → $1,600.00
- Updated both invoices' notes to drop the "invoice only" caveat from my last pass — this is real now
- Did NOT add a new lump-payment income entry for the $120, and did NOT flip the individual hour-entries' (INC-2026-016 through 028) `paid`/`payment_method` fields — consistent with how the two earlier real payments were handled (those also never flipped the per-hour entries; the aggregate `accounts_receivable` figure is what's authoritative)
- No accounts.json cash balances touched — that allocation tracking stays retired; Simplii balances only move via Damien's own weekly reports

---

## [2026-10-19] — KMM-2026-009 and 010 marked paid ON INVOICE ONLY

Damien asked to add the website retainer invoices and the two outstanding labour invoices (009, 010) into the zip, and mark all invoices paid — explicitly "on invoice only."

Did exactly that, nothing more:
- `financials/invoices.json`: KMM-2026-009 and KMM-2026-010 status → "paid", date_paid 2026-10-19, with a loud note on each that this is a paperwork/display change only
- **Did NOT touch** `accounts_receivable.kmm_owing` ($200, unchanged) or the underlying income entries (INC-2026-016 through 028 stay `"paid": false` / `"owing"`) — the real cash picture is exactly what it was before this instruction
- Rebuilt the zip to include all 13 KMM invoices (labour 001-010, retainer INV-2026-002 + SITE-2026-001-003) now that all show "paid" on the document itself

If a real payment comes in later, confirm it the normal way (per `references/payment-workflow.md`) — this change doesn't substitute for that.

---

## [2026-10-19] — Correction: website retainer is $200/month, not $175

Damien corrected my assumption from earlier today — confirmed it's $200/month from August onward specifically (not retroactive to July's old one-off $175 bill, which stays as-is on the shared series).

Updated everywhere the $175 assumption landed:
- `financials/invoices.json`: SITE-2026-001/002/003 amount → $200, cut recalculated to $20.00 savings + $32.00 tax = $52.00/month ($148.00 stays spendable)
- `financials/income/2026-08/09/10.json`: INC-2026-032/033/034 amount → $200, `cut_to_savings` updated to match
- Regenerated all three retainer PDFs at the corrected rate and the `tools/invoice-gen/output/` mirror
- `references/payment-workflow.md` updated to state the $200/month rate plainly, no longer flagged as assumed

Aug–Oct retainer total now $600 (was $525), total cut to SS over the three months $156.00 ($60 savings + $96 tax).

---

## [2026-10-19] — Balance update: Capital One Credit, SCU Credit

Damien reported: Capital One Credit -$1.89 (was -$51.45), SCU Credit -$413.57 (was $0). Logged to `accounts.json` and `weekly_log`.

Net worth goes negative: **-$232.99** (was +$131.02).

---

## [2026-10-19] — Balance update: SCU Savings, SCU Loan

Damien reported: SCU Savings $751.91 (was $3,965.44), SCU Loan -$4,744.78 (was -$4,885.83). Logged straight to `accounts.json` and `weekly_log`, no questions asked per his standing instruction.

Net worth drops from +$3,203.50 to **+$131.02** — SCU Savings fell by $3,213.53, the loan only improved by $141.05. Flagging the size of the move since that's what the weekly log is for, not speculating on cause.

---

## [2026-10-19] — Website retainer separated into its own invoice series + monthly cut calculated

Damien: confirmed the savings/tax split in Simplii Savings matches the 10/16 ratio that applied to KMM labour income (closes the open question from earlier today). Then asked to: separate the website retainer invoices the same way KMM labour got its own series, bill monthly upfront (dated the 1st, covering that month) starting August, and tell him the savings+tax cut per month.

**What I did:**
- New series **SITE-2026-XXX** in `financials/invoices.json` (`retainer_invoices`), separate from both the shared `INV-2026-XXX` series and KMM labour's `KMM-2026-XXX`. Old one-off July retainer (INV-2026-002) stays as a grandfathered historical record on the shared series — new monthly cadence starts fresh.
- Created **SITE-2026-001 (Aug 1), -002 (Sept 1), -003 (Oct 1)** — $175 each, assumed rate (only known data point from the July bill), dated/due the 1st of the month, marked paid per the "paid upfront" arrangement (not independently confirmed by a separate deposit record — flagged).
- Generated PDFs for all three, added to `tools/invoice-gen/generate-kmm-all.js`.
- Logged income entries INC-2026-032 (Aug), 033 (Sept), 034 (Oct), each with a `cut_to_savings` field for reference — informational only, NOT posted to `accounts.json`, since that allocation tracking was retired earlier today.
- **Per-month cut: $17.50 savings + $28.00 tax = $45.50 to Simplii Savings, $129.50 stays spendable.** Over Aug+Sept+Oct: $525 billed, **$136.50 total cut to SS** ($52.50 savings + $84.00 tax).
- Documented the new model in `references/payment-workflow.md`. Deliberately did NOT reintroduce accounts.json divisions/reserves — this is a one-time-per-invoice number for Damien to action himself, consistent with the weekly-balance-log mode from earlier today.
- November's retainer (SITE-2026-004) follows the same pattern once Nov 1 arrives.
- Pushed to this branch only — not part of the explicit both-branches KMM hours/invoice consolidation.

---

## [2026-10-19] — Allocation tracking retired; accounts.json is now a weekly balance log

Damien: "Don't worry about how my money is spent, just take a weekly log from me about my account balances."

Retired the whole internal-allocation layer:
- Dropped per-account `divisions` (tax_reserve, capital_one_hold, gst_reserve, savings/free splits) from `accounts.json`
- Removed the `reserves` (tax_reserve_owed/funded) and `discretionary` (truly_free) blocks entirely — those were "how it's spent" derivations, exactly what he said to stop tracking
- Retired the 10/16/74 income split going forward (`references/payment-workflow.md`, `invoice-collections` SKILL.md updated) — new income entries log the amount only, no split breakdown. Historical entries keep their recorded splits as-is, just no longer treated as live.
- Added `weekly_log` to `accounts.json` — a dated array of full balance snapshots + net worth, seeded with the 2026-09-21 reconciliation and today's report. Going forward: Damien reports balances periodically, I log a new entry, done. No modeling of why a number moved.
- `accounts_receivable` (KMM owing) stays — that's revenue/AR tracking, not personal spending allocation, out of scope for this change.

This is a mode change, not a one-off — made the call based on his instruction rather than asking, since he was direct about it. If he wants the split back for budgeting purposes specifically (separate from account-balance tracking), that's a different ask.

---

## [2026-10-19] — Real account balance update: Chequing, Savings, Eva's TFSA

Damien gave current real balances directly:
- Simplii Chequing: $1,245.00 (was $3,273.12)
- Simplii Savings: $1,528.80 (was $585.50) — Damien confirmed this now holds BOTH his savings and his tax reserve blended together, no breakdown given yet
- Eva's TFSA: $1,347.77 (was $470.63)

Updated `accounts.json` to match. Dropped the old Chequing tax_reserve division (confirmed moved to Savings) and the old Savings capital_one_hold/gst_reserve/savings divisions (stale now that Savings is blended) — flagged both as needing a real breakdown from Damien rather than guessing.

New totals: liquid $8,087.21, net worth **+$3,203.50** (down from +$3,411.18 — net -$207.68, since Chequing dropped more than Savings and the TFSA gained combined). Not speculating on why the money moved, just recording where it landed.

`reserves.tax_reserve_funded` carried forward as a placeholder ($451.20) since I don't know how much of the new $1,528.80 is actually tax vs. savings — asked Damien for that split. `discretionary.truly_free` ($5,709.94) is provisional for the same reason.

Only pushed to this branch — this is routine balance bookkeeping, not part of the KMM hours/invoice consolidation that explicitly went to both branches.

---

## [2026-10-19] — Full KMM hours/invoice consolidation across both branches

Damien: tired of backtracking on this — wanted every week's hours and invoices put together from both this branch and master, with KMM labour given its own ID series so it never collides with other jobs again, weeks with an invoice but unclear daily breakdown just spread evenly, and half-rate hours labeled simply by rate instead of a separate "type" tag.

**What changed:**
- **New numbering:** KMM general-labour invoices moved off the shared `INV-2026-XXX` series onto their own `KMM-2026-XXX` series, starting at 001. This is the actual fix for the branch/master ID collision — Howell and the KMM website retainer stay on the shared series (now just INV-2026-001/002), KMM labour never touches it again.
- **Every completed week Aug 10 – Oct 18 now has exactly one invoice** (KMM-2026-001 through 010) and a matching hours file. Cross-checked: hours and dollar totals tie out exactly across all 10 weeks (298.5h / $5,880 total labour logged to date, not counting the still-open Oct 19-25 week).
- **Recovered from master:** the Aug 31–Sept 6 week (26h, $520) — this branch never had it at all. This is also the real source of the "$520 unitemized partial-September income" that's been an open question in this ledger since the Sept 21 reconciliation. Mystery resolved: it's this week, not a double-count risk for anything else. Added as KMM-2026-004 / INC-2026-031. No new cash posted to accounts.json — that $520 was already baked into net worth as of the Sept 21 reconciliation; this is paperwork catching up to money already counted.
- **Recovered from master:** the KMM website retainer ($175, July work, billed Aug 15-31) — now has a formal invoice (INV-2026-002) on this branch; previously only existed as an income entry (INC-2026-006) with no invoice. Kept clearly separate from the labour-hours series (different business line: Dametime Marketing, flat fee, not hourly).
- **Formalized two previously-provisional weeks:** Sept 7-13 ($140, only Sept 8 ever logged) and Sept 14-20 ($120, only Sept 18 ever logged) now have real invoices (KMM-2026-005, KMM-2026-006). The Sept 8 entry's "provisional" flag is lifted — the $520 overlap question that was holding it back is resolved (see above).
- **Reconstructed 4 weeks with no daily breakdown** (Aug 10-16, Aug 17-23, Aug 24-30, Aug 31-Sep 6) by spreading each week's known total evenly across its days, per Damien's instruction — only the weekly tally matters for the invoice, so exact day-by-day placement for these older weeks is a formality, not a fact.
- **Simplified half-rate labeling:** dropped the `"type": "quoting"` tag on Oct 7 and Oct 18's half-rate entries — now just a plain entry with `rate: 10` instead of `rate: 20`, no separate tagging.
- **Fixed a stray JSON syntax error** in `income/2026-10.json` left over from an earlier edit (duplicate closing brace before INC-2026-030) — the file was actually invalid JSON until this pass.
- Validated every touched file (`hours/*.json`, `invoices.json`, `income/2026-08/09/10.json`) parses cleanly and the hours/dollar math ties out before committing.
- **Pushed to both branches** — this branch (`claude/invoices-display-adfgx6`) and `master`, per Damien's explicit instruction to redo it on both. Did not touch jobs/index.json, CRM, or anything outside hours/income/invoices — out of scope for this pass.
- Did not change any real cash balances in `accounts.json` — this was a paperwork/record-keeping consolidation, not a re-derivation of what's actually been received. Oct 5-onward owing balance ($200) is unaffected.

---

## [2026-10-19] — Oct 19 hours logged, new week opened

- 4h ($80), first entry of the new week (Oct 19-25) following the close of INV-2026-009 (Oct 12-18)
- New file `financials/hours/2026-10-19.json` created, status "open"
- INC-2026-030 logged in `financials/income/2026-10.json` as owing (not paid), per the standing owing model — no accounts.json cash impact
- `accounts.json` accounts_receivable: billed_oct5_onward $1,600 → $1,680, kmm_owing $120 → **$200.00** (received_oct5_onward unchanged at $1,480)
- Confirmed the date directly with Damien before logging ("October 19") rather than trusting the injected system date, consistent with the standing caution in `references/payment-workflow.md`

---

## [2026-10-19] — Confirmed: the $120 owing is specifically Oct 18

Damien: all that's owed now is the hours for Oct 18. Checked the math — it lines up exactly: $120 owing = Oct 18's two entries (INC-2026-027 $60 labour + INC-2026-028 $60 quoting). Everything Oct 5-16 ($1,480) is paid in full between the two payments already logged. No numbers changed, just added a clarifying note to `accounts.json` accounts_receivable tying the $120 explicitly to Oct 18.

---

## [2026-10-19] — Correction: second payment was $480, not $495

Damien caught his own typo right after. INC-2026-029 corrected from $495 to **$480** (split and all downstream numbers recomputed):
- `accounts.json`: Simplii Chequing $3,273.12, Simplii Savings $585.50, net worth **+$3,411.18**
- `accounts_receivable`: received $1,480 total ($1,000 + $480), billed $1,600, **KMM owing $120.00**

---

## [2026-10-19] — Second real payment ($495, later corrected to $480) + date correction on the first

Damien: a second, separate payment of $495 landed on the 16th — and the earlier $1,000 (previously logged dated the 16th) actually landed on the **14th**, not the 16th. Confirmed by asking rather than assuming, since the two could have been read as the same payment restated.

- INC-2026-025 date corrected: 2026-10-16 → **2026-10-14** (amount unchanged, $1,000)
- INC-2026-029 added: **$495**, received 2026-10-16, split 10/16/74 ($49.50 / $79.20 / $366.30), posted to real accounts
- `accounts.json`: Simplii Chequing **$3,286.62**, Simplii Savings **$587.00**, net worth **+$3,426.18**
- `accounts_receivable`: received_oct5_onward now $1,495 (two payments: $1,000 + $495), billed $1,600, **KMM owing down to $105.00**

---

## [2026-10-18] — Week closed (INV-2026-009), system date confirmed unreliable

- Logged Oct 18: 3h labour ($60) + 6h quoting at half rate ($60) = $120, both owing
- This closed the Oct 12-18 week on time (Sunday): **38.5h / $710 total**, formalized as **INV-2026-009**, status outstanding per the owing model
- `accounts.json` accounts_receivable: billed_oct5_onward $1,600, received $1,000, **kmm_owing now $600.00**
- **Caught the system's injected date being wrong for the second time in a row** — said the 19th, Damien confirmed it was actually the 18th (same pattern as the 17th/16th mix-up two days prior: system consistently one day ahead). Asked before logging this time instead of assuming. Documented the workaround in `references/payment-workflow.md`: don't trust the injected date for billing-sensitive entries, especially near a week boundary — confirm with Damien if he doesn't state the date explicitly.
- Can't actually fix the underlying system clock (it's injected by the harness, not part of this repo) — the fix is behavioral: verify before logging.

---

## [2026-10-16] — Oct 16 hours logged, first entry under the owing model

- 9h ($180), week of Oct 12-18 now at 29.5h / $590
- INC-2026-026 logged as owing (not paid), per the 2026-10-16 revision — no accounts.json cash impact
- `accounts.json` accounts_receivable: kmm_owing now **$480.00** (was $300, +$180)
- Net worth unchanged at +$2,931.18 (owing isn't counted as an asset)
- **Date correction:** originally logged this as Oct 17 (session's date reminder said so at the time); Damien corrected it — today is actually the 16th. Fixed the date on the hours entry and INC-2026-026.

---

## [2026-10-16] — Major correction: KMM "paid day-of" assumption was wrong + found a second bug

Damien: he's only actually been paid $1,000 of what he's owed, and nothing from Oct 5 onward before that. The entire "KMM pays day-of, auto-mark invoices paid" model I'd been running since Sept 21 was wrong.

**His instruction:** treat everything billed Oct 5 onward as a lump owing sum, subtract the $1,000 already paid, and going forward tallied hours go into an owing balance — only move to real accounts once he explicitly confirms payment (payment doesn't need to map 1:1 to a specific invoice/day).

**What I did:**
- Oct 5-15 billed total: $1,300. Received: $1,000 (INC-2026-025, posted with the normal 10/16/74 split). **Net owing: $300.**
- Marked INC-2026-016 through 024 (the Oct 5-15 entries) as `"paid": false` / `"payment_method": "owing"` — their split fields show what *would* apply once paid, but nothing from them is actually in `accounts.json` anymore.
- Reverted INV-2026-008 (Oct 5-11, $890) from "paid" to "outstanding".
- Added `accounts_receivable` tracking to `accounts.json`: `kmm_owing: 300`, billed/received/last-payment-date.
- **Revoked** the "KMM invoices auto-marked paid" standing rule in `references/payment-workflow.md` and the `invoice-collections` skill — both rewritten so invoices default to outstanding until Damien confirms, for KMM same as any other client.
- Scope: only touched Oct 5 onward, per Damien's instruction — did NOT revisit Aug/Sept records, even though the same bad assumption presumably applied there too. Left as-is; he didn't ask for that to be reopened.
- Flagged in `context/current-priorities.md`: KMM's payment unreliability is now a top priority, not just a tracking footnote — recommended he have a direct conversation with KMM about terms.

**Second, unrelated bug found and fixed while doing this:** `accounts.json`'s top-level `totals` block (liquid/net_worth) stopped actually being written after the 2026-10-15 Oct-backfill commit — I kept computing net worth by hand each turn and reporting it in chat, but the edit that was supposed to persist those numbers never included the `liquid`/`net_worth` fields themselves, so the file silently stayed stuck at an old value (+$1,491.18) for four commits while I verbally reported $3,081 → $3,051 → $3,231 in chat. The per-account balances (Chequing, Savings) WERE updating correctly the whole time, and my hand-calculations were internally consistent with each other, so the chat figures were likely accurate relative to what had actually been logged — just never match the stale file. Recomputed from the actual account list and confirmed $3,231.18 was correct as of end of Oct 15, before applying today's owing-balance correction on top of that.

**Final state after both fixes:** Simplii Chequing $2,841.12, Simplii Savings $537.50, net worth **+$2,931.18**, KMM owing $300.

---

## [2026-10-15] — Oct 15 hours logged

- 9h ($180), week of Oct 12-18 now at 20.5h / $410 (no hours Oct 14)
- INC-2026-024 logged, split 10/16/74: $18 savings / $28.80 tax / $133.20 spending
- `accounts.json`: Simplii Chequing $3,111.12 (tax_reserve $422.40, free $2,688.72), Simplii Savings $567.50, net worth **+$3,231.18**

---

## [2026-10-15] — This branch's records set as main, master's as alt

Damien: this branch's records (what I've been tracking all along) are the main ones; the other, parallel KMM record set is the alt. Stripped the `-ALT` suffix from every ID on this branch (`jobs/index.json`, `crm/contacts.json`, `financials/invoices.json`, the hours files, `accounts.json`, the income files) — back to clean `INV-2026-00X` / `INC-2026-00X` / `JOB-2026-00X` / `CON-2026-004` numbering. All JSON validated after the strip.

**Important:** I checked what's actually on `origin/master` before doing this, and it's not just an ID-numbering difference — master's data genuinely diverges in places:
- It has **INV-2026-002** ($175 website retainer, Aug 15-31) — no equivalent number on this branch (I'd logged the same $175 retainer as INC-2026-006 with no invoice).
- Its **INV-2026-006** is $520 for a week of **Aug 31 - Sept 6** — a week this branch never logged at all. This is almost certainly the real source of the mysterious "$520 unitemized partial-September income" from the Sept 8 ledger reconciliation I've been carrying as an open question.
- This branch's own INV-2026-006 (Sept 21-27, $780) has no match on master at all.

So "set as main/alt" settles which copy wins on a naming conflict, but it does NOT mean the two datasets now agree — master may be tracking real income (that Aug 31-Sept 6 week) that never made it into this branch's numbers. Flagged to Damien; not reconciling the actual dollar figures without his say-so.

I have NOT touched master itself (pushing to a different branch needs explicit permission per my instructions) — this only changes what's on `claude/invoices-display-adfgx6`.

---

## [2026-10-15] — Quoting-time rate applied to Oct 7

Damien: 3 of Oct 7's hours were quoting time, billed at half the standard rate ($10/h vs $20/h). Oct 7 split into labour (6h @ $20 = $120) + quoting (3h @ $10 = $30), down from the original flat 9h @ $20 = $180.
- `financials/hours/2026-10-05.json`: Oct 7 now two line entries, week total down to 46h / $890 (was $920)
- `financials/income/2026-10.json` INC-2026-018 corrected to $150
- `financials/invoices.json` INV-2026-008-ALT corrected to $890
- `accounts.json`: Simplii Chequing $2,949.12, Simplii Savings $549.50, net worth **+$3,051.18**
- New pattern established: quoting time bills at half Damien's standard hourly rate. Not yet written into `references/payment-workflow.md` — worth adding if this recurs.

---

## [2026-10-15] — ID collision discovered: this branch now uses -ALT suffixes

While pushing the Oct backfill, found a commit Damien made directly on this branch Oct 10: he renamed all of this branch's KMM records (CON-2026-004, JOB-2026-006/007/008, INC-2026-003 through 007, INV-2026-003 through 006) to `-ALT` suffixes, because they collided with a **separate parallel KMM record set on master** — a different session/branch independently built its own KMM tracking with the same ID numbers. Merged that commit in. Renamed my new records to match the convention: **INV-2026-007 → INV-2026-007-ALT, INV-2026-008 → INV-2026-008-ALT**, `last_invoice_number` → `INV-2026-008-ALT`. Going forward, every new ID on this branch should get the `-ALT` suffix until this branch and master are reconciled.

---

## [2026-10-15] — Backfilled Oct 5-13 after a 15-day logging gap

No session between Sept 30 and Oct 15. Damien provided a full Oct hours spread to catch up:
- Oct 5 (8h), 6 (7h), 7 (9h), 8 (8h), 9 (6h), 10 (8h), 11 (n/a), 12 (4h), 13 (7.5h)
- Closed out the stale **Sept 28 - Oct 4** week (15h/$300, already partially logged) as **INV-2026-007**
- New week **Oct 5-11** (46h/$920) fully logged and closed as **INV-2026-008**
- New week **Oct 12-18** opened (11.5h/$230 so far, still in progress)
- `financials/income/2026-10.json` created — INC-2026-016 through 023, split 10/16/74 throughout
- `accounts.json`: Simplii Chequing $2,976.12 (tax_reserve $398.40, free $2,577.72), Simplii Savings $552.50, net worth **+$3,081.18**
- Flagged the gap directly to Damien before he sent the backfill — two weeks of unlogged work is real money not showing up anywhere until caught up

---

## [2026-09-30] — Sept 8 $140 posted, PROVISIONAL

Damien: "disregard the ledger for now, just calculate with that included." Posted the long-held Sept 8 entry:
- INC-2026-015 added to `financials/income/2026-09.json`, split 10/16/74: $14 / $22.40 / $103.60
- `accounts.json` updated: Simplii Chequing $1,941.12 (tax_reserve $214.40, free $1,726.72), Simplii Savings $437.50, net worth **+$1,931.18**
- **Flagged as provisional everywhere it's recorded** (hours file, income entry, accounts.json note) — this was never actually resolved, just deferred. If it turns out this $140 really was already inside the Sept 8 reconciliation's $520 partial-income figure, all of this needs to be backed out.

---

## [2026-09-30] — Sept 30 hours logged

- 8h ($160), week of Sept 28 - Oct 4 now at 15h / $300 (no hours Sept 29)
- INC-2026-014 logged, split 10/16/74: $16 savings / $25.60 tax / $118.40 spending
- `accounts.json`: Simplii Chequing $1,815.12 (tax_reserve $192, free $1,623.12), Simplii Savings $423.50, net worth **+$1,791.18**
- Still open: Sept 8 $140 double-count question (unresolved)

---

## [2026-09-29] — Sept 28 hours logged (first of new week)

- 7h ($140), first entry in `financials/hours/2026-09-28.json` (week of Sept 28 - Oct 4)
- INC-2026-013 logged, split at current 10/16/74 ratio: $14 savings / $22.40 tax / $103.60 spending
- `accounts.json`: Simplii Chequing $1,671.12 (tax_reserve $166.40, free $1,504.72), Simplii Savings $407.50, net worth **+$1,631.18**
- Still open: the Sept 8 $140 double-count question (unresolved)

---

## [2026-09-28] — Income split revised: 10/16/74 (was 10/30/60)

Damien: resplit all KMM income as 10% savings / 16% tax / 74% spending. Applied retroactively:
- Savings % unchanged, so Simplii Savings balance ($393.50) untouched
- Re-split all 6 logged income entries (INC-2026-007 through 012, total $900) in `financials/income/2026-09.json` — new split fields recorded on each
- Simplii Chequing total balance unchanged ($1,545.12) — only the internal tax_reserve/free division shifted: tax_reserve $270→$144, free $1,275.12→$1,401.12
- Pre-Sept-21 backlog recomputed too: 16% of the $3,035 KMM income in the Sept 8 reconciliation = **$485.60** (was $910.50 at 30%)
- `accounts.json` reserves updated: tax_reserve_owed $629.60 ($485.60 backlog + $144 funded), truly_free discretionary figure up to $5,235.53
- Updated `references/payment-workflow.md` and `context/current-priorities.md` to match. Net worth itself unaffected (this only moves money between labeled buckets, doesn't change total assets).

---

## [2026-09-28] — Two backfilled historical entries: Sept 8 and Sept 18

Damien logged two dates that predate the payment-workflow system (started Sept 21) and predate most of this month's tracked weeks:
- **Sept 8: 7h ($140)** — week of Sept 7-13, new file `financials/hours/2026-09-07.json`. **NOT posted to income/accounts** — Sept 8 is the exact date of Damien's "September Ledger" reconciliation, which already showed $520 in unitemized partial-September income as of that day. This $140 may already be inside that $520. Held pending Damien's confirmation to avoid double-counting real money.
- **Sept 18: 6h ($120)** — week of Sept 14-20, new file `financials/hours/2026-09-14.json`. Postdates the Sept 8 snapshot, so no double-count risk — logged as INC-2026-012, split applied, accounts.json updated. Net worth now **+$1,491.18**.

**Open question for Damien:** was the Sept 8 $140 already counted in the $520 partial-September figure from the ledger reconciliation, or is it separate? Answer determines whether it gets added on top.

---

## [2026-09-28] — First week under new workflow closed out: INV-2026-006-ALT

- Damien logged Sept 26: 7h ($140). No hours Sept 24 or Sept 27.
- Since Sunday (Sept 27) passed without a session, tallied and invoiced retroactively on the 28th: **39h / $780 total** for the week of Sept 21-27
- Created **INV-2026-006-ALT** in `financials/invoices.json` — $780, no GST, issued 2026-09-27, due 2026-10-12, marked paid per the standing KMM auto-paid rule (date_paid = due date). PDF not generated — JSON record only, offered to build the PDF if Damien wants one.
  - *(Renamed 2026-10-10: this invoice number collided with a different INV-2026-006 created on master in a separate session — both renamed to `-ALT` on this branch pending reconciliation.)*
- Closed `financials/hours/2026-09-21.json` (status: closed, linked to INV-2026-006-ALT), opened new week file `financials/hours/2026-09-28.json` (week of Sept 28 - Oct 4)
- Final `accounts.json` for this week: Simplii Chequing $1,437.12 (tax_reserve $234, free $1,203.12), Simplii Savings $381.50, tax reserve funded $234 of $1,144.50 owed, **net worth +$1,371.18**

---

## [2026-09-25] — Sept 25 hours logged + caught a bookkeeping error

- Damien logged 9h today (Sept 25). No hours logged for Sept 24. Week total now 32h / $640.
- **Caught and fixed an error from the Sept 23 entry:** I'd carved the 30% tax reserve ($138) out of the 60% chequing share instead of adding it on top, which silently shorted Simplii Chequing's balance by $138. Fixed before it compounded — corrected balance is $1,311.12 as of this entry (was wrongly $1,011.12 → should have been $1,149.12 before today's addition).
- Updated `accounts.json`: Simplii Chequing $1,311.12 (tax_reserve division $192, free $1,119.12), Simplii Savings $367.50, tax reserve owed $1,102.50 ($192 funded), net worth **+$1,231.18**
- `financials/hours/2026-09-21.json` and `financials/income/2026-09.json` (INC-2026-010) updated to match

---

## [2026-09-23] — First Week Under New Payment Workflow

Damien logged hours for the current week (KMM, per standing workflow):
- Sept 21: 11h ($220), Sept 22: 6h ($120), Sept 23: 6h ($120) — 23h / $460 so far
- Logged to `financials/hours/2026-09-21.json`, income entries INC-2026-007-ALT/008/009 in `financials/income/2026-09.json`, split 10/30/60 applied per entry
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
- Logged `financials/income/2026-08.json` (INC-2026-003-ALT/004-ALT/005-ALT for the KMM backlog, dated to job end dates as proxy since exact payment dates were never given; INC-2026-006-ALT for a previously-unknown "KMM website retainer" $175) and `financials/income/2026-09.json` (empty, $520 partial-month figure noted but not itemized — source unclear)
- Updated `context/current-priorities.md` with the new financial position and three flagged unknowns
- Posted to `ai-bridges/sable-to-atlas.md` — Eva TFSA, grandmother loan resolution, and the new SCU loan all flagged as more Atlas's lane than mine

### New standing rule (2026-09-21): KMM invoices auto-marked paid
- Damien: mark KMM invoices paid by due date as soon as they're sent — no need to chase confirmation, KMM always pays on time
- Applied retroactively: INV-2026-003-ALT/004-ALT/005-ALT date_paid set to each invoice's due date (Aug 31 / Sep 10 / Sep 14)
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
  - INV-2026-003-ALT: $700 (35h @ $20/h), Aug 10-16, due Aug 31 — **overdue**
  - INV-2026-004-ALT: $720 (36h @ $20/h), Aug 17-23, due Sep 10 — **overdue**
  - INV-2026-005-ALT: $920 (46h @ $20/h), Aug 24-30, due Sep 14 — **overdue**
  - **Total outstanding: $2,340** — none of these PDFs indicate payment status
- Added: JOB-2026-006-ALT/007-ALT/008-ALT (jobs/index.json, status "invoiced"), CON-2026-004-ALT KMM contact (crm/contacts.json), all three invoices under KMM in financials/invoices.json (restructured invoices.json to group by client per Damien's request)
- Invoice files saved to `financials/invoices/INV-2026-003-ALT.pdf`, `-004-ALT.pdf`, `-005-ALT.pdf`
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
