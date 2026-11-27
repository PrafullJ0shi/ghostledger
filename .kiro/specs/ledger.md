# Spec: CSV ledger
## Goal
Persist expenses in `data/ledger.csv` with columns: id,ts,merchant,amount_paise,category,note,source.
## Acceptance
- Adding a row via API appends exactly one line.
- `/week` sums amount_paise for the last 7 local days.
- Invalid amount is rejected with 400.
