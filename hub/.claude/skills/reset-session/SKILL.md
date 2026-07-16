# Skill: Reset Session

Compresses the current session state to persistent memory and signals that a fresh context window can be started. Use when the conversation has grown long and token cost is a concern.

## When to use

- Damien asks to reset, compress, or start fresh
- Session has been running long with many exchanges
- Damien mentions spending too many tokens

---

## Process

### Step 1 — Capture new Sable developments

Review the current session for business-related developments not yet in `../sable/memory/short-term.md`:
- New jobs, quotes, or client interactions
- Outreach activity and responses
- Decisions made on business direction
- Open threads that need following up
- System or tool changes

Update `../sable/memory/short-term.md`. Use the existing format (date range headers, job/client refs, bullets). Drop any entries older than 3 days.

### Step 2 — Capture new Atlas developments

Review the current session for personal-life developments not yet in `../atlas/memory/short-term.md`:
- Health, sleep, or personal habits
- Relationship developments
- Personal finance changes
- Emotional context worth carrying forward
- Open threads Atlas should follow up on

Update `../atlas/memory/short-term.md`. Same format. Drop entries older than 3 days.

### Step 3 — Update the bridge if needed

If anything cross-domain changed (financial situation, major life event, cross-EA coordination), update `../ai-bridges/shared-context.md`.

### Step 4 — Confirm and instruct

Tell Damien:
1. What was saved (brief summary — what's new, what was dropped)
2. That he can close this session and open a new one — memory files carry everything forward

---

## Notes

- Don't over-summarize. Entries should be specific and actionable, not transcripts.
- If nothing new happened worth capturing, say so. Don't pad the files.
- Goal is a clean handoff, not a complete log.
