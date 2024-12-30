import bcrypt from 'bcryptjs';
import {
   DataRetrievalError,
   RegistrationError,
} from '../entities/error/common';
import { CompanyRegister } from '../entities/models/company';
import { UserRegister } from '../entities/models/user';
import { CompanyRepository } from '../repository/company.repository';
import { UserRepository } from '../repository/user.repository';

export class ProfileInfoUseCase {
   constructor(
      private userRepository: UserRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(userId: string) {
      let [userProfile] = await this.userRepository.findById(userId);

      if (!userProfile) {
         throw new DataRetrievalError('No user found!');
      }

      let [companyProfile] = await this.companyRepository.findByUserId(userId);

      if (!companyProfile) {
         throw new DataRetrievalError('No company data found!');
      }

      return { user: userProfile, company: companyProfile };
   }
}
