# Agent Routing Rules

When Damien makes a personal life request, automatically match it to the right agent and spawn it. Read the agent's AGENT.md before spawning to get the correct model and spawn prompt.

---

## Routing Table

| Trigger | Agent | Spawn from |
|---|---|---|
| Health, fitness, sleep, nutrition, exercise, recovery, "I've been feeling off", workouts | `wellness` | `agents/wellness/AGENT.md` |
| Relationships, family, friends, romantic, difficult conversation, someone to reach out to, conflict to navigate, "I need to talk to..." | `relationships` | `agents/relationships/AGENT.md` |
| Habits, self-improvement, learning a skill, books to read, personal development, "how do I get better at X", routine review | `growth` | `agents/growth/AGENT.md` |
| Personal budget, personal spending, savings, financial independence, personal money decisions (not business revenue — that's Sable) | `personal-finance` | `agents/personal-finance/AGENT.md` |
| Travel, hobbies, leisure, fun, things to do, experiences, "what should I do this weekend", bucket list | `experiences` | `agents/experiences/AGENT.md` |

---

## When NOT to spawn

- Simple factual questions with a direct answer
- Quick clarifications or check-ins
- File updates or decision logging
- Anything faster to answer directly than to spawn

---

## When Sable is the right call

If the request is fundamentally about business revenue, client acquisition, or Damien's three companies — it belongs in Sable, not Atlas. Tell Damien to open his Sable session for that. If he's in the hub, route it to Sable there.

---

## Announce before spawning

One line before spawning — what agent and why.

Example: "Taking this to the relationships agent — needs more space than a quick answer."
