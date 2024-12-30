import bcrypt from 'bcryptjs';
import { RegistrationError } from '../entities/error/common';
import { CompanyRegister } from '../entities/models/company';
import { UserRegister } from '../entities/models/user';
import { CompanyRepository } from '../repository/company.repository';
import { UserRepository } from '../repository/user.repository';

export class RegisterUserCompanyUseCase {
   constructor(
      private userRepository: UserRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(userData: UserRegister, companyData: CompanyRegister) {
      const emailDuplicateCheck = await this.userRepository.findByEmail(
         userData.email
      );
      if (emailDuplicateCheck.length > 0) {
         throw new RegistrationError(
            'User with this Email already registered!'
         );
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Ganti password yang diterima dengan password yang sudah di-hash
      const userWithHashedPassword = { ...userData, password: hashedPassword };
      const userId = await this.userRepository.create(userWithHashedPassword);

      //company check

      const nameDuplicateCheck = await this.companyRepository.findByName(
         companyData.company_name
      );
      if (nameDuplicateCheck.length > 0) {
         this.userRepository.deleteById(userId);
         throw new RegistrationError(
            'Company with this Name already registered!'
         );
      }
      const companyId = await this.companyRepository.create(
         companyData,
         userId
      );

      return { user: userId, company: companyId };
   }
}
