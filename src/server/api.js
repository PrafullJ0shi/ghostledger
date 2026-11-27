import http from 'node:http';
import { addRow, parseReceiptText, readRows, sumSince } from './ledger.js';

const PORT = Number(process.env.PORT || 3847);

function send(res, code, body) {
  const data = JSON.stringify(body);
  res.writeHead(code, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type' }); return res.end(); }
  try {
    if (req.method === 'GET' && req.url === '/health') return send(res, 200, { ok: true });
    if (req.method === 'GET' && req.url === '/expenses') return send(res, 200, { rows: readRows() });
    if (req.method === 'GET' && req.url === '/week') return send(res, 200, { amount_paise: sumSince(7) });
    if (req.method === 'POST' && req.url === '/expenses') {
      const buf = await readBody(req); const j = JSON.parse(buf || '{}');
      return send(res, 201, addRow(j));
    }
    if (req.method === 'POST' && req.url === '/parse') {
      const buf = await readBody(req); const j = JSON.parse(buf || '{}');
      const parsed = parseReceiptText(j.text || '');
      return send(res, 201, addRow({ ...parsed, category: j.category || 'other' }));
    }
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, e.status || 500, { error: e.message || String(e) });
  }
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

server.listen(PORT, '127.0.0.1', () => console.log(`GhostLedger API on http://127.0.0.1:${PORT}`));
