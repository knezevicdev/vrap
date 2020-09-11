// DELTA-157
// NextJS allows for a custom server:
// https://nextjs.org/docs/advanced-features/custom-server
// We use one here to enable comprehensive server-side
// logging with datadog's dd-trace package.
// This prevents some nice NextJS features like static pre-optimization.
// So, we should move away from a custom server
// if we are able to move to a fully client side rendered app.
// TODO: Incorporate dd-trace into NextJS without using a custom server.

const { name, version } = require('./package.json');
require('dd-trace').init({
  analytics: true,
  logInjection: true,
  service: name,
  version,
});

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const portFlagIndex = process.argv.indexOf('--port');
const port = portFlagIndex !== -1 ? process.argv[portFlagIndex + 1] : 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
