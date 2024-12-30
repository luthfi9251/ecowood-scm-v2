'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { SessionValidationResult } from './entities/models/session';
import { AuthService } from './services/auth.service';

export const getCurrentSession = cache(
   async (): Promise<SessionValidationResult> => {
      const cookieStore = await cookies();
      const authService = new AuthService();
      const token = cookieStore.get('sessionId')?.value ?? null;
      if (token === null) {
         return { session: null, user: null };
      }
      const result = await authService.validateSessionToken(token);
      return result;
   }
);
