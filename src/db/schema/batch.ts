import * as mysqlCore from 'drizzle-orm/mysql-core';
import { timestamps } from './column.helper';
import { productTable } from './product';
import { supplyChainTable } from './supply-chain';

export const batchProduct = mysqlCore.mysqlTable('batch_product', {
   id: mysqlCore.int().autoincrement().primaryKey(),
   product_id: mysqlCore
      .int()
      .notNull()
      .references(() => productTable.id),
   supply_chain_id: mysqlCore
      .int()
      .notNull()
      .references(() => supplyChainTable.id),
   production_date: mysqlCore.datetime(),
   description: mysqlCore.varchar({ length: 255 }),
   volume: mysqlCore.varchar({ length: 255 }),
   manufacture_loc: mysqlCore.varchar({ length: 255 }),
   status: mysqlCore.varchar({ length: 255 }),
   ...timestamps,
});
