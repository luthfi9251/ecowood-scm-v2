import * as mysqlCore from 'drizzle-orm/mysql-core';
import { users } from './user';
import { timestamps } from './column.helper';

export const company = mysqlCore.mysqlTable('companies', {
   id: mysqlCore.varchar('id', { length: 255 }).primaryKey(),
   company_name: mysqlCore.varchar({ length: 255 }).notNull().unique(),
   address: mysqlCore.text().notNull(),
   postal_code: mysqlCore.varchar({ length: 255 }).notNull(),
   city: mysqlCore.varchar({ length: 255 }).notNull(),
   region: mysqlCore.varchar({ length: 255 }).notNull(),
   company_email: mysqlCore.varchar({ length: 255 }).notNull(),
   phone: mysqlCore.varchar({ length: 255 }).notNull(),
   tax_id: mysqlCore.varchar({ length: 255 }),
   nib: mysqlCore.varchar({ length: 255 }),
   description: mysqlCore.text('description'),
   company_fields: mysqlCore.text('company_fields').notNull(),
   user_id: mysqlCore
      .varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
   ...timestamps,
});
