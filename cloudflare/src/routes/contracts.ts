import { Hono } from 'hono';
import {
  listContracts,
  fetchContract,
  addContract,
} from '../services/contracts';

const app = new Hono();

app.get('/', async (c) => {
  try {
    const data = await listContracts(c.env.d1DB);
    return c.json(data, 200);
  } catch (err) {
    console.error(err);
    return c.text('Error fetching contracts', 500);
  }
});

app.get('/:id', async (c) => {
  try {
    const data = await fetchContract(c.env.d1DB, parseInt(c.req.param('id')));
    return c.json(data, 200);
  } catch (err) {
    console.error(err);
    return c.text('Error fetching contract', 500);
  }
});

app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    await addContract(c.env.d1DB, body.name, body.abi);
    return c.json('ok', 201);
  } catch (err) {
    console.error(err);
    return c.text('Error add contract', 500);
  }
});

export default app;
