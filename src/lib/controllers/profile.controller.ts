import { z } from 'zod';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from '../services/auth.service';
import { LoginUseCase } from '../usecase/login.usecase';
import {
   AuthenticationError,
   InputParsedError,
} from '../entities/error/common';
import { Session } from '@/db/schema/session';
import { CompanyRepository } from '../repository/company.repository';
import { ProfileInfoUseCase } from '../usecase/profile-info.usecase';

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();
const profileInfoUseCase = new ProfileInfoUseCase(
   userRepository,
   companyRepository
);

export const getProfileController = async (session: Session) => {
   if (!session) {
      throw new AuthenticationError('Youre not authenticated!');
   }
   let sessionData = await profileInfoUseCase.execute(session.userId);
   return sessionData;
};
