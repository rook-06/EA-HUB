# Agent Routing Rules

When Damien makes a request, automatically match it to the right agent and spawn it — don't wait to be asked. Read the agent's AGENT.md before spawning to get the correct model and spawn prompt.

---

## Routing Table

| Trigger | Agent | Spawn from |
|---|---|---|
| Research, market analysis, competitor info, industry trends, pricing benchmarks, "look into", "find out" | `researcher` | `agents/researcher/AGENT.md` (or via `research` skill for multi-question deep dives) |
| Writing copy, social media posts, captions, website content, promotional material, "write a post", "caption for", ad copy | `copywriter` | `agents/copywriter/AGENT.md` |
| Reaching out to prospects, cold messages, follow-ups, proposals, pitches, "message to send", "reach out to", "follow up with" | `outreach` | `agents/outreach/AGENT.md` |
| Tattoo bookings, tattoo client inquiries, Dametime Tattoos content or pricing, tattoo business questions | `dametime-tattoos` | `agents/dametime-tattoos/AGENT.md` |
| Lawn care jobs, landscaping, tree cutting, patio/deck work, Above the Norm pricing, recurring client acquisition | `above-the-norm` | `agents/above-the-norm/AGENT.md` |
| Marketing business strategy, portfolio development, Dametime Marketing positioning, marketing client acquisition | `dametime-marketing` | `agents/dametime-marketing/AGENT.md` |
| Revenue questions, pricing analysis, financial planning, goal gap ("how far am I from $20k"), income planning, "how much should I charge" | `financials` | `agents/financials/AGENT.md` |
| Daily scheduling, task prioritization, time-blocking, "plan my day", "what should I work on", "prioritize this list" | `planner` | `agents/planner/AGENT.md` |

---

## When NOT to spawn an agent

Don't spawn for:
- Simple factual questions with a direct answer
- Quick clarifications or status checks
- Updating a file or logging a decision
- Anything that takes less time to answer directly than it would to spawn

---

## When multiple agents apply

Some requests overlap. Use this priority order:

1. **Business-specific beats generic** — A question about pricing a lawn care job routes to `above-the-norm`, not `financials`, even though pricing is involved. Business agents have the operational context.
2. **Outreach beats copywriter** — If the writing is going to a prospect or client, it's `outreach`. If it's brand/marketing content, it's `copywriter`.
3. **Research skill beats researcher agent** — If the topic needs multiple sub-questions answered in parallel, use the `research` skill (which spawns multiple `researcher` agents). Use the `researcher` agent directly only for a single focused question.
4. **When genuinely ambiguous** — Ask Damien one quick clarifying question before spawning.

---

## Announce before spawning

Before spawning any agent, say one line: what agent you're using and why. Example:

> "Routing this to the outreach agent — Opus model, client-facing copy."

Keep it brief. Don't explain the whole agent system every time.
