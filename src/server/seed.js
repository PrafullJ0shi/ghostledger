import fs from 'node:fs';
import path from 'node:path';
import { LEDGER, ensureLedger } from './ledger.js';
ensureLedger();
const sample = `id,ts,merchant,amount_paise,category,note,source
gseed1,2026-11-20T10:00:00.000Z,Chai Tapri,3500,food,cutting chai,manual
gseed2,2026-11-22T18:30:00.000Z,IRCTC,84200,travel,DDN to NDLS,manual
gseed3,2026-11-25T12:15:00.000Z,Kirana Store,15675,groceries,weekly veg,receipt-text
`;
fs.writeFileSync(LEDGER, sample);
console.log('seeded', LEDGER);
