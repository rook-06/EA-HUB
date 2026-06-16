# Skill: Research

Deep research via a dedicated Claude sub-agent, tailored to Damien's businesses and current situation.

## When to use

Invoke this skill when Damien asks to research a topic, explore a market, investigate a competitor, find pricing benchmarks, understand a trend, or gather any information that would take more than a simple web search to answer well.

This is NOT a quick lookup — it's a full research session. Use it when depth matters.

---

## How to run this skill

### Step 1 — Load context

Before forming any queries, read these files:

- `context/me.md`
- `context/work.md`
- `context/current-priorities.md`
- `context/goals.md`

Also check `projects/` for any active project READMEs relevant to the topic.

### Step 2 — Clarify the research goal (if needed)

If the request is vague or has multiple angles, ask one focused question to narrow scope. Examples:
- "Is this for Above the Norm, Dametime Marketing, or general knowledge?"
- "Is this about pricing, competition, client acquisition, or something else?"

If intent is clear, skip to Step 3.

### Step 3 — Design the research plan

Break the topic into 2–4 independent sub-questions. Good sub-questions:
- Are narrow enough to get a focused answer
- Cover different dimensions (market size, pricing, competition, tactics, real examples)
- Are directly actionable for someone in Damien's position

Embed Damien's context into each sub-question to get relevant results. Examples:
- Not "lawn care pricing midwest" → "recurring lawn care client pricing in the Chicago suburbs for a small 2-person operation, 2024-2025"
- Not "marketing portfolio tips" → "how to build a marketing agency portfolio from scratch with no prior agency clients to showcase"

### Step 4 — Spawn research sub-agents

Spawn one sub-agent per sub-question. If the sub-questions are independent, **launch them all in parallel in a single message** (multiple Agent tool calls at once).

Each sub-agent should receive this prompt template — fill in the bracketed sections:

---

**Sub-agent prompt template:**

```
You are a research agent. Conduct thorough research on the question below and return a detailed, well-sourced report.

## About the person you're researching for

Damien is an entrepreneur in the Chicago area who runs three businesses:
- **Dametime Tattoos** — custom tattoo work
- **Above the Norm** — lawn care, landscaping, tree cutting, patio/deck demo & build, garbage removal (co-owned, 2-person operation)
- **Dametime Marketing** — marketing services, client acquisition

**Current priorities (as of 2026):**
1. Building revenue fast — he is in a financial rut and needs to move
2. Acquiring recurring lawn care clients
3. Landing first marketing contracts
4. Staying organized

**Goals:**
- $20,000 total revenue by end of 2026
- 12+ recurring lawn care clients
- Build a standout marketing portfolio
- Land first marketing contracts

## Research question

[INSERT SUB-QUESTION HERE]

## Instructions

- Perform 8–12 searches minimum. Don't stop after surface-level results.
- Use WebFetch to read relevant pages in full — search snippets alone are not enough.
- Look for specific numbers, named examples, case studies, and direct quotes.
- If you find conflicting information, note it.
- Think about what someone in Damien's exact situation would most need to know.

## Output format

Return your findings in this structure:

### Question: [restate the sub-question]

**Key findings:**
- [Most important finding — specific, with numbers or examples]
- [Second finding]
- [Continue as needed]

**Detail:**
[2–4 paragraphs of synthesis. Specific facts, figures, examples. No vague generalities.]

**Direct relevance to Damien:**
[1–2 sentences on exactly how this applies to his situation.]

**Sources:**
[List every URL or source consulted]
```

---

### Step 5 — Synthesize and present

Once all sub-agents return, synthesize their reports into one unified output. Do NOT concatenate raw agent output — synthesize it.

**Final output format:**

```
## Research: [Topic]

### Key Findings
- [Most actionable insight across all research]
- [Second most actionable]
- [Continue as needed]

### [Section per major theme or sub-question]
[2–4 sentences of synthesis. Specific facts, numbers, examples.]

### What This Means for Damien
[Direct, honest take on how this applies to his specific situation and current priorities. This section is mandatory.]

### Next Steps
[1–3 concrete things he could do based on this research]

### Sources
[Consolidated list of all sources from all sub-agents]
```

---

## Quality standards

- Every finding must be specific. Numbers, names, examples, or quotes — no vague takeaways.
- "What This Means for Damien" is mandatory. It's what separates this from a Google search.
- If findings conflict, note it explicitly.
- If something turns up that's directly relevant to a current project or priority, flag it prominently.
