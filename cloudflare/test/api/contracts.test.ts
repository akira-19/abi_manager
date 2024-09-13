import { env, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import { drizzle } from 'drizzle-orm/d1';
import { createContract } from '../factory/contract';
import { contracts } from '../../database/schema';

describe('Contracts', () => {
  it('should GET /contracts', async () => {
    const client = drizzle(env.d1DB);
    await createContract(client);
    const res = await SELF.fetch('http://exapmle.com/contracts');

    const data = await res.json();

    expect(data.length).toBe(1);
  });

  it('should GET /contracts/:id', async () => {
    const client = drizzle(env.d1DB);
    const contract = await createContract(client);
    const res = await SELF.fetch('http://exapmle.com/contracts/' + contract.id);

    const data = await res.json();

    expect(data.id).toBe(contract.id);
    expect(data.name).toBe(contract.name);
  });

  it('should POST /contracts', async () => {
    const postData = {
      name: 'Sample Contract',
      abi: '[{"type": "function", "name": "foo", "inputs": [], "outputs": []}]',
    };
    const res = await SELF.fetch('http://exapmle.com/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const client = drizzle(env.d1DB);
    const data = await client
      .select({ id: contracts.id, name: contracts.name })
      .from(contracts);

    expect(data.length).toBe(1);
  });
});
