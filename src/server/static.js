import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../web');
const PORT = Number(process.env.WEB_PORT || 3848);
http.createServer((req, res) => {
  const file = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.replace(/^\//,''));
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end('no'); }
  const ext = path.extname(file);
  const type = ext === '.css' ? 'text/css' : ext === '.js' ? 'text/javascript' : 'text/html';
  res.writeHead(200, { 'content-type': type });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`web http://127.0.0.1:${PORT}`));
