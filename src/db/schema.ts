import { boolean, pgTable, timestamp, char, numeric, index, integer } from 'drizzle-orm/pg-core';
import type { InferModel } from 'drizzle-orm'

export const owners = pgTable('owners', {
  id: integer('id').primaryKey(),
  address: char('address', { length: 42 }).notNull(),
  staked: boolean('staked').default(false).notNull(),
  stakedAt: timestamp('staked_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (owners) => {
  return {
    addressIndex: index('address_idx').on(owners.address)
  }
});

export const stakers = pgTable('stakers', {
  id: char('id', { length: 42 }).primaryKey(),
  amount: numeric('amount', { precision: 78, scale: 0 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const mucusFarmed = pgTable('mucus_farmed', {
  id: char('id', { length: 42 }).primaryKey(),
  amount: numeric('amount', { precision: 78, scale: 0 }).notNull().default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Owner = InferModel<typeof owners>
export type NewOwner = InferModel<typeof owners, 'insert'>
export type Staker = InferModel<typeof stakers>
export type NewStaker = InferModel<typeof stakers, 'insert'>
export type MucusFarmed = InferModel<typeof mucusFarmed>
export type NewMucusFarmed = InferModel<typeof mucusFarmed, 'insert'>
