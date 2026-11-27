# Kiroween 2026 — GhostLedger

**Category:** Frankenstein (stitch incompatible pieces) + apply for **Best Student Project: Frankenstein ($1,500)**
**Deadline:** Fri 5 Dec 2026, 03:30 IST (Dec 4, 2:00 PM PST)
**Entrant:** Prafull Joshi (student: BITS Pilani B.Sc. DS&AI) — India is allowed (not on the excluded list)
**Team:** solo (up to 3 allowed)

## Idea
GhostLedger is a local-first expense + receipt ghost: you drop a photo of a paper receipt (or paste UPI SMS text), a tiny on-device OCR+rules pipeline extracts merchant/amount/date, and a weird mashup of old tech brings it to life:

- **Spreadsheet core:** every transaction is a row in a plain CSV that doubles as the source of truth (Excel-era simplicity).
- **IRC-style TUI:** a keyboard-first terminal UI (blessed/ink vibe) that feels like a 90s BBS for querying spending ("/week food").
- **Modern web overlay:** a dark "costume" dashboard (Costume Contest flavour inside Frankenstein) that reads the same CSV over a local HTTP API.
- **Kiro Crew:** one agent for OCR/parse, one for categorisation rules, one for weekly insights.

Why Frankenstein: OCR + CSV ledger + TUI + local web API + optional LLM categorisation are usually separate tools; stitching them into one offline app is the chimera.

## Kiro requirements (must ship)
- Public GitHub repo with OSI license (MIT) visible in About
- `/.kiro` at repo root with specs, hooks, steering (do NOT gitignore)
- Built during Submission Period (Oct 30 – Dec 4 2026) — this tree is new
- Demo video ≤ 3 min on YouTube
- Write-up on how Kiro was used (specs, hooks, steering, MCP, Crew if used)
- Working app URL or local run instructions + any test credentials in Devpost form only

## Kiro IDE usage
Official rules require the project to **use Kiro** (IDE, CLI, Web, and/or Kiro Crew). The `/.kiro` folder must be present. Starter code here is scaffolded on the box; the real build/polish must happen inside Kiro so the folder and write-up are honest. Install Kiro from https://kiro.dev and open this folder.

## Student bonus fields (Devpost)
- LinkedIn profile URL
- Student email (BITS)
- Year and degree: 1st year, B.Sc. Data Science and AI
- School: BITS Pilani
- They may ask for proof of enrollment

## Build plan (remaining nights)
1. Finish CSV ledger + REST API (Node, no DB)
2. TUI commands: /add /list /week /cat /export
3. Web dashboard: dark theme, charts from CSV
4. Receipt text paste parser (regex for Indian receipts / UPI SMS); photo OCR optional via Tesseract if time
5. Fill `.kiro/specs`, steering, one hook (e.g. on-save run tests)
6. Record 2–3 min demo; draft Kiro write-up; submit on Devpost before deadline

## Out of scope
- Cloud accounts, paid APIs, crypto wallets
- Publishing the public GitHub repo from this box (parent will do that with his GitHub login when ready)
