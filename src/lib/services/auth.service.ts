import { Session } from '@/db/schema/session';
import {
   encodeBase32LowerCaseNoPadding,
   encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { SessionRepository } from '../repository/session.repository';
import { User } from '../entities/models/user';
import { AuthenticationError } from '../entities/error/common';
import { SessionValidationResult } from '../entities/models/session';

const sessionRepository = new SessionRepository();

export class AuthService {
   generateSessionToken(): string {
      const bytes = new Uint8Array(20);
      crypto.getRandomValues(bytes);
      const token = encodeBase32LowerCaseNoPadding(bytes);
      return token;
   }

   async createSession(token: string, userId: string): Promise<Session> {
      const sessionId = encodeHexLowerCase(
         sha256(new TextEncoder().encode(token))
      );
      const session: Session = {
         id: sessionId,
         userId,
         expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      };
      try {
         await sessionRepository.create(session);
         return session;
      } catch (err) {
         throw new AuthenticationError('Error creating session!');
      }
   }

   async validateSessionToken(token: string): Promise<SessionValidationResult> {
      const sessionId = encodeHexLowerCase(
         sha256(new TextEncoder().encode(token))
      );
      const result = await sessionRepository.findSessionById(sessionId);
      if (result.length < 1) {
         return { session: null, user: null };
      }

      const { user, session } = result[0];
      if (Date.now() >= session.expiresAt.getTime()) {
         await sessionRepository.deleteSession(sessionId);
         return { session: null, user: null };
      }
      if (
         Date.now() >=
         session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
      ) {
         session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
         await sessionRepository.updateSession(session);
      }
      return { session, user };
   }

   async invalidateSession(sessionId: string): Promise<void> {
      await sessionRepository.deleteSession(sessionId);
   }
}
