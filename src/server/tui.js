import readline from 'node:readline';
import { addRow, parseReceiptText, readRows, sumSince } from './ledger.js';

console.log('GhostLedger TUI — commands: /list /week /add <merchant> <rupees> [category] /parse <text> /quit');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'ghost> ' });
rl.prompt();
rl.on('line', (line) => {
  const s = line.trim();
  try {
    if (s === '/quit' || s === '/exit') { rl.close(); return; }
    if (s === '/list') { for (const r of readRows()) console.log(`${r.ts.slice(0,10)}  ₹${(r.amount_paise/100).toFixed(2)}  ${r.merchant}  [${r.category}]`); }
    else if (s === '/week') console.log(`Last 7 days: ₹${(sumSince(7)/100).toFixed(2)}`);
    else if (s.startsWith('/add ')) {
      const parts = s.slice(5).split(/\s+/);
      const merchant = parts[0]; const rupees = Number(parts[1]); const category = parts[2] || 'other';
      console.log(addRow({ merchant, amount_paise: Math.round(rupees*100), category }));
    } else if (s.startsWith('/parse ')) {
      const parsed = parseReceiptText(s.slice(7));
      console.log(addRow({ ...parsed, category: 'other' }));
    } else console.log('unknown command');
  } catch (e) { console.error('!', e.message); }
  rl.prompt();
});
