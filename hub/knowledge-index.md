# Hub Knowledge Index

Use this index before loading context files. Check which files are relevant to the current request, then load only those. Do not load files not listed as always-loaded unless the topic matches.

---

## Always Load (every session)

These files load unconditionally — they contain identity, voice, and active memory.

| File | Contents |
|---|---|
| `../sable/personality.md` | Sable's identity, voice, rules |
| `../atlas/personality.md` | Atlas's identity, voice, rules |
| `../ai-bridges/shared-context.md` | Cross-domain context, Damien's current state |
| `../sable/memory/short-term.md` | Sable's rolling recent memory |
| `../atlas/memory/short-term.md` | Atlas's rolling recent memory |
| `../atlas/context/me.md` | Damien's personal identity, psychology, motivational levers, personality flaws |
| `../atlas/context/finances.md` | Personal account balances and savings divisions |
| `../sable/context/me.md` | Damien's basic info and role |
| `../sable/context/work.md` | Three businesses overview |
| `../sable/context/current-priorities.md` | What's urgent in the business right now |

---

## Load on Demand

Read these only when the topic matches. Load the file, don't guess at the contents.

### Business & Revenue
| Topic | File |
|---|---|
| Team, co-owner decisions | `../sable/context/team.md` |
| Revenue goals, scorecard | `../sable/context/goals.md` |
| Ad creative strategy, benchmarks, format/hook performance | `../sable/references/marketing/motion-creative-benchmarks-2026.md` |
| Visual ad formats — definitions, when to use, audience fit, budget | `../sable/references/marketing/motion-visual-formats-guide-2026.md` |
| Job details, status | `../sable/jobs/index.json` |
| Income records | `../sable/financials/income/2026-06.json` |
| Expense records | `../sable/financials/expenses/2026-06.json` |
| Account balances (for calculations) | `../sable/financials/accounts.json` |
| Recurring expenses | `../sable/financials/recurring_expenses.json` |
| Invoice records | `../sable/financials/invoices.json` |
| CRM / leads | `../sable/crm/leads.json` |

### Personal Life
| Topic | File |
|---|---|
| Health, fitness, gym, workout | `../atlas/context/health.md` |
| Relationships, family, friends, romantic | `../atlas/context/relationships.md` |
| Habits, learning, personal growth | `../atlas/context/growth.md` |
| Hobbies, leisure, interests | `../atlas/context/hobbies.md` |
| Personal priorities, what matters most | `../atlas/context/current-priorities.md` |

### Agents & Skills (load AGENT.md or SKILL.md before spawning)
| Agent/Skill | Path |
|---|---|
| Sable — researcher | `../sable/agents/researcher/AGENT.md` |
| Sable — copywriter | `../sable/agents/copywriter/AGENT.md` |
| Sable — outreach | `../sable/agents/outreach/AGENT.md` |
| Sable — financials | `../sable/agents/financials/AGENT.md` |
| Sable — planner | `../sable/agents/planner/AGENT.md` |
| Sable — dametime-tattoos | `../sable/agents/dametime-tattoos/AGENT.md` |
| Sable — above-the-norm | `../sable/agents/above-the-norm/AGENT.md` |
| Sable — dametime-marketing | `../sable/agents/dametime-marketing/AGENT.md` |
| Atlas — wellness | `../atlas/agents/wellness/AGENT.md` |
| Atlas — relationships | `../atlas/agents/relationships/AGENT.md` |
| Atlas — growth | `../atlas/agents/growth/AGENT.md` |
| Atlas — personal-finance | `../atlas/agents/personal-finance/AGENT.md` |
| Atlas — experiences | `../atlas/agents/experiences/AGENT.md` |
| Hub — reset-session | `.claude/skills/reset-session/SKILL.md` |
| Sable — follow-up | `../sable/.claude/skills/follow-up/SKILL.md` |
| Sable — weekly-review | `../sable/.claude/skills/weekly-review/SKILL.md` |
| Sable — quote-estimate | `../sable/.claude/skills/quote-estimate/SKILL.md` |
| Sable — invoice-collections | `../sable/.claude/skills/invoice-collections/SKILL.md` |
| Sable — offer-builder | `../sable/.claude/skills/offer-builder/SKILL.md` |
| Sable — graphic-design | `../sable/.claude/skills/graphic-design/SKILL.md` |

### Bridge
| Use | File |
|---|---|
| Cross-domain coordination | `../ai-bridges/shared-context.md` (already always loaded) |
| Sable → Atlas messages | `../ai-bridges/sable-to-atlas.md` |
| Atlas → Sable messages | `../ai-bridges/atlas-to-sable.md` |
| Full bridge protocol | `../ai-bridges/BRIDGE.md` |
