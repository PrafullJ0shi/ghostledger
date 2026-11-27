# Changelog

All notable changes are listed here. Versions follow semantic versioning.

## 0.1.0 - 2026-11-27

First public version, started as a Kiroween 2026 Frankenstein entry.

- CSV ledger at `data/ledger.csv`, with amounts stored as integer paise.
- Local HTTP API on `127.0.0.1:3847`: health, list, week sum, add, and parse receipt text.
- Keyboard TUI: `/list`, `/week`, `/add`, `/parse`, `/quit`.
- Local static dashboard on `127.0.0.1:3848` that reads the same API.
- Regex parser for Indian UPI and receipt text (`₹`, `INR`, `Rs`).
- Seed data and two `node:test` tests.
- `/.kiro` specs, steering and an on-save test hook, as required by Kiroween.
- MIT license.
- Ledger and web roots now resolve with `fileURLToPath`, so the paths work on Windows as well as macOS and Linux.
- README with Windows and Unix quick start, real command output, limits and a roadmap.
