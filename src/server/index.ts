import http from 'http';

import { getEvents } from '../events';

export function createServer() {
  const server = http.createServer((req, res) => {
    if (req.url?.includes('/health')) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');

      return res.end('OK');
    }

    if (req.url?.includes('/events')) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      return res.end(JSON.stringify(getEvents()));
    }

    res.statusCode = 404;
    res.end('Not found');
  });

  return server;
}
