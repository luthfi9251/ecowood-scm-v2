import { DataRetrievalError } from '../entities/error/common';
import { CompanyRepository } from '../repository/company.repository';
import { UserRepository } from '../repository/user.repository';

export class ProfileInfoUseCase {
   constructor(
      private userRepository: UserRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(userId: string) {
      const [userProfile] = await this.userRepository.findById(userId);

      if (!userProfile) {
         throw new DataRetrievalError('No user found!');
      }

      const [companyProfile] =
         await this.companyRepository.findByUserId(userId);

      if (!companyProfile) {
         throw new DataRetrievalError('No company data found!');
      }

      return { user: userProfile, company: companyProfile };
   }
}
