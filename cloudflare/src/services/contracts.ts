import { drizzle } from 'drizzle-orm/d1';
import { contracts } from '../../database/schema';
import * as schema from '../../database/schema';

type ListContractType = {
  id: number;
  name: string;
};

export const listContracts = async (
  db: D1Database,
): Promise<ListContractType[]> => {
  const client = drizzle(db, { schema });
  const data = await client
    .select({ id: contracts.id, name: contracts.name, chain: contracts.chain })
    .from(contracts);

  return data;
};

export const fetchContract = async (db: D1Database, id: number) => {
  const client = drizzle(db, { schema });

  const contracts: any = await client.query.contracts.findMany({
    with: {
      functions: true,
    },
    where: (contracts, { eq }) => eq(contracts.id, id),
  });

  const contract = contracts[0];

  if (!contract) {
    throw new Error('Contract not found');
  }

  return contract;
};

export const addContract = async (
  db: D1Database,
  name: string,
  contractAddress: string,
  chain: string,
  abi: string,
) => {
  const client = drizzle(db, { schema });
  await client.insert(contracts).values({
    name,
    abi,
    address: contractAddress,
    chain,
  });

  return;
};
