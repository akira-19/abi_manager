import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { InferSelectModel, sql, relations } from 'drizzle-orm';

export const contracts = sqliteTable('contracts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  address: text('address').notNull(),
  chain: text('chain').notNull(),
  name: text('name').notNull(),
  abi: text('abi').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});
export type ContractSelect = InferSelectModel<typeof contracts>;
export const contractsRelations = relations(contracts, ({ many }) => ({
  functions: many(functions),
}));

export const functions = sqliteTable(
  'functions',
  {
    contractId: integer('contract_id')
      .notNull()
      .references(() => contracts.id),
    selector: text('selector').notNull(),
    comment: text('comment').notNull(),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.contractId, table.selector] }),
    };
  },
);
export type FunctionSelect = InferSelectModel<typeof functions>;

export const functionsRelations = relations(functions, ({ one }) => ({
  contract: one(contracts, {
    fields: [functions.contractId],
    references: [contracts.id],
  }),
}));

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  address: text('address').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});
