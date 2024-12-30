import { Session } from '@/db/schema/session';
import { User } from './user';

export type SessionValidationResult =
   | { session: Session; user: User }
   | { session: null; user: null };
