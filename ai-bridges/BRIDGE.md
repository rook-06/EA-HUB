# EA Bridge — Protocol

This directory is the shared communication layer between Sable (business EA) and Atlas (personal life EA).

---

## Principle

The bridge is not a real-time feed. It is a structured handoff mechanism. Each EA reads from it when relevant and writes to it when it has something the other EA genuinely needs.

Do not write to the bridge for every interaction. Write when the information would materially change how the other EA advises Damien.

---

## Files

| File | Purpose | Written by | Read by |
|---|---|---|---|
| `shared-context.md` | Standing facts both EAs need | Either EA updates; Damien can edit directly | Both EAs, before relevant responses |
| `sable-to-atlas.md` | Sable's outbox / Atlas's inbox | Sable | Atlas |
| `atlas-to-sable.md` | Atlas's outbox / Sable's inbox | Atlas | Sable |
| `sync-log.md` | Archived cross-EA history | Both EAs append when archiving | Reference only |

---

## When to Write

**Sable writes to `sable-to-atlas.md` when:**
- Business income changes significantly (revenue milestone, contract closed, income drop)
- Damien's work schedule will conflict with personal life commitments
- A business decision has personal life implications (money available or tight, travel constraints)
- Damien explicitly asks Sable to inform Atlas of something

**Atlas writes to `atlas-to-sable.md` when:**
- A personal situation is affecting Damien's work capacity (health issue, significant personal stress)
- A personal financial decision intersects with business income
- Damien's personal schedule conflicts with business plans
- Damien explicitly asks Atlas to inform Sable of something

**Neither EA writes when:**
- The information is already in `shared-context.md`
- The information is fully contained to one domain
- The message would just be noise with no actionable value for the other EA

---

## Entry Format

Each entry in `sable-to-atlas.md` or `atlas-to-sable.md`:

```
[YYYY-MM-DD] FROM: [Sable|Atlas] | TOPIC: [one-line subject] | MESSAGE: [2-4 sentences of relevant context] | ACTION NEEDED: [Yes/No — if yes, what]
```

Entries are appended to the bottom. Do not delete old entries — they form a history. Archive to `sync-log.md` when a file exceeds ~50 entries.

---

## How Each EA Reads the Bridge

Before responding to any request that might intersect with the other domain:

1. Read `shared-context.md` for standing facts
2. Read the relevant inbox file (`sable-to-atlas.md` for Atlas; `atlas-to-sable.md` for Sable)
3. Entries from the last 30 days are operational. Older entries are historical context only.

Do not read the bridge for purely domain-specific requests that have no cross-domain dimension.

---

## Hub Sessions

When Damien opens the hub (`ai-assistants\hub\`), both EAs are present in one session. The hub reads `shared-context.md` at the start of every session. Sable and Atlas can both write to the bridge from within a hub session when a handoff is warranted.

---

## Maintenance

- Both EAs append to their respective outbox file — never delete entries.
- Damien can edit `shared-context.md` directly at any time.
- Neither EA needs Damien's approval to write to the bridge — use judgment on what's worth sending.
- When an inbox entry has been acted on, no explicit acknowledgment is needed — the sync-log is the record.
