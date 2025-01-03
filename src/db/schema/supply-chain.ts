import * as mysqlCore from 'drizzle-orm/mysql-core';
import { company } from './company';
import { productTable } from './product';
import { timestamps } from './column.helper';

export const supplyChainTable = mysqlCore.mysqlTable('supply_chain', {
   id: mysqlCore.int().autoincrement().primaryKey(),
   sc_name: mysqlCore.varchar({ length: 255 }),
   description: mysqlCore.text(),
   status: mysqlCore.mysqlEnum(['VERIFIED', 'UNVERIFIED']),
   owned_by_company_id: mysqlCore
      .varchar('company_id', { length: 255 })
      .notNull()
      .references(() => company.id),
   ...timestamps,
});

export const supplyChainStepTable = mysqlCore.mysqlTable('supply_chain_step', {
   id: mysqlCore.int().autoincrement().primaryKey(),
   supply_chain_id: mysqlCore
      .int()
      .notNull()
      .references(() => supplyChainTable.id),
   order: mysqlCore.int(),
   supply_request: mysqlCore.varchar({ length: 255 }),
   description: mysqlCore.text(),
   status: mysqlCore.mysqlEnum(['ACCEPTED', 'REJECTED']),
   ...timestamps,
});

export const supplyChainProductTable = mysqlCore.mysqlTable(
   'supply_chain_product',
   {
      id: mysqlCore.int().autoincrement().primaryKey(),
      supply_chain_id: mysqlCore
         .int()
         .notNull()
         .references(() => supplyChainTable.id),
      product_id: mysqlCore
         .int()
         .notNull()
         .references(() => productTable.id),
      ...timestamps,
   }
);
