import { createServer } from 'https';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve('./localhost+2-key.pem')),
    cert: fs.readFileSync(path.resolve('./localhost+2.pem')),
  };

  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log('HTTPS Server running on https://localhost:3000');
  });
});