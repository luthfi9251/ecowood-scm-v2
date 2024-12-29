import { z } from 'zod';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from '../services/auth.service';
import { LoginUseCase } from '../usecase/login.usecase';
import { InputParsedError } from '../entities/error/common';

const userRepository = new UserRepository();
const authService = new AuthService();
const loginUseCase = new LoginUseCase(userRepository, authService);

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8, 'Minimum password length is 8 characters'),
});

export const loginController = async (email: string, password: string) => {
   let credentialParsed = loginSchema.safeParse({ email, password });

   if (credentialParsed.error) {
      throw new InputParsedError(
         'Invalid data',
         credentialParsed.error?.flatten().fieldErrors
      );
   }

   let validate = await loginUseCase.execute(
      credentialParsed.data.email,
      credentialParsed.data.password
   );

   return validate;
};
