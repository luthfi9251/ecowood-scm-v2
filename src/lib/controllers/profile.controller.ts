import { UserRepository } from '../repository/user.repository';
import { AuthenticationError } from '../entities/error/common';
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
   const sessionData = await profileInfoUseCase.execute(session.userId);
   return sessionData;
};
