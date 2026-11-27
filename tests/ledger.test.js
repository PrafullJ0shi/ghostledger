import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { addRow, parseReceiptText, readRows, LEDGER, ensureLedger } from '../src/server/ledger.js';

test('parse UPI-like text', () => {
  const p = parseReceiptText('Paid Rs.156.75 to Kirana Store via UPI');
  assert.equal(p.amount_paise, 15675);
  assert.match(p.merchant, /Kirana/i);
});

test('add and read', () => {
  ensureLedger();
  const before = readRows().length;
  addRow({ merchant: 'Test', amount_paise: 100, category: 'test' });
  assert.equal(readRows().length, before + 1);
});
