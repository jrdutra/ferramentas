import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

const CANONICAL_HOST = 'utility.tool';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function normalizeHost(host: string | undefined): string {
  return (host ?? '').split(',')[0].trim().split(':')[0].toLowerCase();
}

function normalizeProtocol(protocol: string | string[] | undefined): string {
  const value = Array.isArray(protocol) ? protocol[0] : protocol;
  return (value ?? '').split(',')[0].trim().toLowerCase();
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('trust proxy', true);
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use((req, res, next) => {
    const host = normalizeHost(req.get('x-forwarded-host') ?? req.get('host'));
    if (!host || LOCAL_HOSTS.has(host)) {
      next();
      return;
    }

    const protocol = normalizeProtocol(req.get('x-forwarded-proto') ?? req.protocol);
    if (host !== CANONICAL_HOST || protocol !== 'https') {
      res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
      return;
    }

    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
