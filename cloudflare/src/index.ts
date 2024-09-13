import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createMiddleware } from 'hono/factory';
import contracts from './routes/contracts';

declare module 'hono' {
  interface ContextVariableMap {
    userId: string | null;
  }
}

type Bindings = {
  d1DB: D1Database;
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Custom Not Found Message
app.notFound((c) => {
  return c.text('Custom 404 Not Found', 404);
});

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text('Custom Error Message', 500);
});

app.use(
  '/*',
  cors({
    origin: ['http://localhost:3000', 'https://devstatshub.at-api.workers.dev'],
    allowHeaders: ['*'],
    allowMethods: ['*'],
    // exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    exposeHeaders: ['*'],
    maxAge: 600,
    // credentials: true,
  }),
);

app.route('/contracts', contracts);
// app.route('/functions', functions);

export default {
  fetch: app.fetch,
  app: app,
};
