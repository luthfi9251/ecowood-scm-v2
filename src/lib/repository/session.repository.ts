import { db } from '@/db';
import { Session, session } from '@/db/schema/session';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';

export class SessionRepository {
   async create(sessionData: Session) {
      return db.insert(session).values(sessionData);
   }

   async findSessionById(sessionId: string) {
      return db
         .select({ user: users, session: session })
         .from(session)
         .innerJoin(users, eq(session.userId, users.id))
         .where(eq(session.id, sessionId));
   }

   async deleteSession(sessionId: string) {
      return db.delete(session).where(eq(session.id, sessionId));
   }

   async updateSession(sessionData: Session) {
      return db
         .update(session)
         .set({
            expiresAt: sessionData.expiresAt,
         })
         .where(eq(session.id, sessionData.id));
   }
}
