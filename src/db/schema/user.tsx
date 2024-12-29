import * as mysqlCore from 'drizzle-orm/mysql-core';
import { timestamps } from './column.helper';

export const users = mysqlCore.mysqlTable('users', {
   id: mysqlCore.varchar('id', { length: 256 }).primaryKey(),
   email: mysqlCore.varchar({ length: 256 }).unique().notNull(),
   password: mysqlCore.varchar({ length: 256 }).notNull(),
   is_verified: mysqlCore.boolean().default(false),
   ...timestamps,
});
