import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../entities/error/common';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from '../services/auth.service';
import { Session } from '@/db/schema/session';

export class LoginUseCase {
   constructor(
      private userRepository: UserRepository,
      private authService: AuthService
   ) {}

   async execute(
      email: string,
      password: string
   ): Promise<{ session: Session; token: string }> {
      const [user] = await this.userRepository.findByEmail(email);
      if (!user) {
         throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         throw new AuthenticationError('Invalid credentials');
      }

      let token = this.authService.generateSessionToken();
      let session = await this.authService.createSession(token, user.id);
      return { session, token };
   }
}
