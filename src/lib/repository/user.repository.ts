import { db } from '@/db';
import { UserRegister } from '../entities/models/user';
import { users } from '@/db/schema/user';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

export class UserRepository {
   async create(userData: UserRegister) {
      const userId = uuidv4();
      await db.insert(users).values({
         id: userId,
         email: userData.email,
         password: userData.password,
      });
      return userId;
   }

   async deleteById(userId: string) {
      return db.delete(users).where(eq(users.id, userId));
   }

   async findByEmail(email: string) {
      return db.select().from(users).where(eq(users.email, email));
   }
   async findById(userId: string) {
      return db
         .select({
            id: users.id,
            email: users.email,
            is_verified: users.is_verified,
         })
         .from(users)
         .where(eq(users.id, userId));
   }
}
