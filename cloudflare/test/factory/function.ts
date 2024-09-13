import { DrizzleD1Database } from 'drizzle-orm/d1';
import { functions } from '../../database/schema';

export const createFunction = async (
  db: DrizzleD1Database,
  contractId: number,
  name: string,
  comment: string,
) => {
  const newFunction = {
    contractId,
    name,
    comment,
  };

  await db
    .insert(functions)
    .values(newFunction)
    .onConflictDoNothing()
    .returning();
};
