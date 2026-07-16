# Jarvis Expansion Plan

*Drafted: 2026-06-19 | Goal: Expand the EA hub from a chat interface into an ambient, voice-first, always-on presence in Damien's home and life.*

---

## The Vision

Sable and Atlas aren't just in a chat window. They're in the room. Voice-in, voice-out, proactive, aware of the environment, running 24/7 without Damien's PC.

---

## Hardware

| Item | Estimated Cost |
|---|---|
| Raspberry Pi 5 (4GB) | ~$80 |
| Official Pi 5 power supply | ~$12 |
| microSD card (64GB) | ~$12 |
| Case | ~$10 |
| ReSpeaker mic array (room-wide pickup) | ~$30–40 |
| Speaker (USB or 3.5mm) | ~$20–40 |
| **Total** | **~$165–200** |

For multi-room: Pi Zero 2W units at ~$15 each, one per room.

---

## Software Stack

| Layer | Tool | Cost |
|---|---|---|
| Wake word detection | Porcupine (offline, free tier) | Free |
| Speech-to-text | Whisper (local, open source) | Free |
| AI processing | Claude API | Pay per use |
| Voice output | ElevenLabs (consistent voice) | ~$5–22/mo |
| Smart home | Home Assistant (open source) | Free |
| Always-on hub | Existing EA system moved to Pi | Free |

---

## Build Phases

### Phase 1 — Voice Layer
*One weekend. Changes how the whole thing feels.*

- Pi 5 + mic + speaker running 24/7
- Wake word: say "Hey Sable" from across the room
- Whisper converts voice to text → Claude processes → ElevenLabs speaks the response
- Result: stop typing, just talk

### Phase 2 — Always-On Hub
*Move everything off Damien's PC.*

- Telegram listener runs on Pi
- TTS watcher runs on Pi
- Memory files hosted on Pi
- Hub is live whether the PC is on or not

### Phase 3 — Proactive System
*Sable and Atlas speak first when something needs attention.*

Scheduled triggers (cron):
- **7:30am daily** — morning brief: financial snapshot, open follow-ups, what's due today
- **Friday evening** — weekly review prompt
- **3 days before invoice due** — payment reminder
- **Outreach follow-up windows** — ping when a lead has gone quiet too long

Stop having to remember. The system remembers and surfaces things at the right time.

### Phase 4 — Smart Home
*The environment responds.*

- Home Assistant runs on the same Pi
- "Sable, I'm leaving" → lights off, phone gets a 30-second briefing
- Coming home triggers a "you're back" event → briefing on what moved while out
- "Sable, start my morning" → routine kicks in (lights, brief, etc.)
- Smart plugs and bulbs optional — even basic routines are valuable without them

### Phase 5 — Multi-Room
*Sable and Atlas follow you through the house.*

- Pi 5 handles the main compute
- Pi Zero 2W units (~$15 each) with small speakers/mics in each room
- Atlas in the bedroom, Sable at the desk — both accessible everywhere

---

## What Daily Life Looks Like (Full Build)

**Wake up** — Atlas ambient brief if anything personal needs attention.
**Walk to desk** — Sable runs the morning business snapshot out loud, unprompted.
**Working** — Hands-free: "Log a note. Follow up on the garden bed lead Friday." Done.
**Heading out** — One phrase. House knows. Phone briefed.
**Coming home** — Told what moved while you were gone.

---

## Running Cost (Full Build)

- Hardware: ~$200 one-time
- ElevenLabs (voice quality): ~$5–22/month
- Everything else: free or covered under existing subscriptions

---

## Build Order

Start with Phase 1. One weekend. Everything else builds on top of it.
