import { InputParsedError, RegistrationError } from '../entities/error/common';
import {
   CompanyRegister,
   companyRegisterSchema,
} from '../entities/models/company';
import { UserRegister, userRegisterSchema } from '../entities/models/user';
import { CompanyRepository } from '../repository/company.repository';
import { UserRepository } from '../repository/user.repository';
import { RegisterUserCompanyUseCase } from '../usecase/register-user-company.use-case';

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();

const registerUserAndCompanyUseCase = new RegisterUserCompanyUseCase(
   userRepository,
   companyRepository
);

export const registerUserController = async (
   userData: UserRegister,
   companyData: CompanyRegister
) => {
   let userDataParsed = userRegisterSchema.safeParse(userData);
   let companyDataParsed = companyRegisterSchema.safeParse(companyData);
   if (userDataParsed.error || companyDataParsed.error) {
      const errorField = {
         ...userDataParsed.error?.flatten().fieldErrors,
         ...companyDataParsed.error?.flatten().fieldErrors,
      };
      throw new InputParsedError('Invalid data', errorField);
   }
   let create = await registerUserAndCompanyUseCase.execute(
      userDataParsed.data,
      companyDataParsed.data
   );
   return {
      ...create,
   };
};
