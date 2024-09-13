import { drizzle } from 'drizzle-orm/d1';
import { contracts, functions } from '../../database/schema';
import * as schema from '../../database/schema';
import { eq } from 'drizzle-orm';

export const upsertFunction = async (
  db: D1Database,
  contractId: number,
  selector: string,
  comment: string,
) => {
  const client = drizzle(db, { schema });
  const data = await client
    .select({ id: contracts.id })
    .from(contracts)
    .where(eq(contracts.id, contractId));

  if (data.length === 0) {
    throw new Error('Contract not found');
  }

  await client
    .insert(functions)
    .values({ contractId, selector, comment })
    .onConflictDoUpdate({
      target: [functions.contractId, functions.selector],
      set: { comment },
    });

  return data;
};
