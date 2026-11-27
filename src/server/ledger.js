import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const LEDGER = path.join(ROOT, 'data', 'ledger.csv');
const HEADER = 'id,ts,merchant,amount_paise,category,note,source\n';

export function ensureLedger() {
  fs.mkdirSync(path.dirname(LEDGER), { recursive: true });
  if (!fs.existsSync(LEDGER)) fs.writeFileSync(LEDGER, HEADER);
}

export function readRows() {
  ensureLedger();
  const text = fs.readFileSync(LEDGER, 'utf8').trim();
  if (!text) return [];
  const lines = text.split('\n').slice(1);
  return lines.filter(Boolean).map((line) => {
    const [id, ts, merchant, amount_paise, category, note, source] = csvSplit(line);
    return { id, ts, merchant, amount_paise: Number(amount_paise), category, note, source };
  });
}

function csvSplit(line) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { q = !q; continue; }
    if (c === ',' && !q) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function csvEscape(s) {
  s = String(s ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function addRow({ merchant, amount_paise, category = 'other', note = '', source = 'manual' }) {
  if (!Number.isFinite(amount_paise) || amount_paise < 0) throw Object.assign(new Error('invalid amount'), { status: 400 });
  ensureLedger();
  const id = `g${Date.now().toString(36)}`;
  const ts = new Date().toISOString();
  const line = [id, ts, merchant, amount_paise, category, note, source].map(csvEscape).join(',') + '\n';
  fs.appendFileSync(LEDGER, line);
  return { id, ts, merchant, amount_paise, category, note, source };
}

export function sumSince(days) {
  const cut = Date.now() - days * 86400000;
  return readRows().filter((r) => new Date(r.ts).getTime() >= cut).reduce((a, r) => a + r.amount_paise, 0);
}

/** Parse rough Indian UPI / receipt text into {merchant, amount_paise, note}. */
export function parseReceiptText(text) {
  const t = text.replace(/\s+/g, ' ').trim();
  const amt = t.match(/(?:₹|INR|Rs\.?)\s*([0-9]+(?:\.[0-9]{1,2})?)/i) || t.match(/\b([0-9]+(?:\.[0-9]{1,2})?)\s*(?:INR|Rs)\b/i);
  if (!amt) throw Object.assign(new Error('no amount found'), { status: 400 });
  const rupees = Number(amt[1]);
  const amount_paise = Math.round(rupees * 100);
  let merchant = 'unknown';
  const m1 = t.match(/(?:at|to|from)\s+([A-Za-z0-9 &._-]{2,40})/i);
  if (m1) merchant = m1[1].trim();
  return { merchant, amount_paise, note: t.slice(0, 120), source: 'receipt-text' };
}
