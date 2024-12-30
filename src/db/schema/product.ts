import * as mysqlCore from 'drizzle-orm/mysql-core';
import { timestamps } from './column.helper';
import { company } from './company';

export const productTable = mysqlCore.mysqlTable('product', {
   id: mysqlCore.int().autoincrement().primaryKey(),
   product_name: mysqlCore.varchar({ length: 255 }),
   unit: mysqlCore.varchar({ length: 255 }),
   category: mysqlCore.varchar({ length: 255 }),
   description: mysqlCore.text(),
   product_picture: mysqlCore.varchar({ length: 255 }),
   company_id: mysqlCore
      .varchar('company_id', { length: 255 })
      .notNull()
      .references(() => company.id),

   ...timestamps,
});
