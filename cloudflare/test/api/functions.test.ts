import { env, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import { drizzle } from 'drizzle-orm/d1';
import { createContract } from '../factory/contract';
import { contracts } from '../../database/schema';

describe('Functions', () => {
  it('should create function in PUT /function', async () => {
    const client = drizzle(env.d1DB);
    const contract = await createContract(client);

    const bodyData = {
      contractId: contract.id,
      selector: '0x6459bc84',
      comment: 'This is for a test function',
    };

    const res = await SELF.fetch('http://exapmle.com/function', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();

    expect(data.selector).toBe(bodyData['selector']);
  });

  it('should update function in PUT /function', async () => {
    const client = drizzle(env.d1DB);
    const contract = await createContract(client);

    const bodyData = {
      contractId: contract.id,
      selector: '0x6459bc84',
      comment: 'This is for a test function',
    };

    const res = await SELF.fetch('http://exapmle.com/function', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();

    expect(data.selector).toBe(bodyData['comment']);
  });
});
