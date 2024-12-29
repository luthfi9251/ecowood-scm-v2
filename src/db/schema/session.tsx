import * as mysqlCore from 'drizzle-orm/mysql-core';
import { timestamps } from './column.helper';
import { users } from './user';
import { InferSelectModel } from 'drizzle-orm';

export const session = mysqlCore.mysqlTable('session', {
   id: mysqlCore
      .varchar('id', {
         length: 255,
      })
      .primaryKey(),
   userId: mysqlCore
      .varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
   expiresAt: mysqlCore.datetime('expires_at').notNull(),
});

export type Session = InferSelectModel<typeof session>;
