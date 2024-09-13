import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { users } from '../../database/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

type ChangeNameParams = {
  name: string;
  id: string;
};

app.patch('/change_name', async (c) => {
  try {
    const client = drizzle(c.env.d1DB);

    return c.json('ok', 201);
  } catch (err) {
    console.error(err);
    return c.text('Error fetching organizations', 500);
  }
});

export default app;
