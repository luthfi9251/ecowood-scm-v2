'use server';

import { registerUserController } from '@/lib/controllers/register-user.controller';
import {
   InputParsedError,
   RegistrationError,
} from '@/lib/entities/error/common';
import { CompanyRegister } from '@/lib/entities/models/company';
import { UserRegister } from '@/lib/entities/models/user';
import { revalidatePath } from 'next/cache';

export const registerUserCompany = async (formData: FormData) => {
   try {
      const data = Object.fromEntries(formData.entries());

      const userData = {
         email: data.email,
         password: data.password,
         confirm_password: data.confirm_password,
      } as UserRegister;

      const companyData = {
         company_name: data.company_name,
         address: data.address,
         postal_code: data.postal_code,
         city: data.city,
         region: data.region,
         company_email: data.company_email,
         phone: data.phone,
         tax_id: data.tax_id,
         nib: data.nib,
         description: data.description,
         company_fields: data.company_fields,
      } as CompanyRegister;

      let res = await registerUserController(userData, companyData);
      return { success: true, error: {} };
   } catch (err) {
      if (err instanceof RegistrationError) {
         return {
            success: false,
            error: {
               name: err.name,
               message: err.message,
            },
         };
      }

      if (err instanceof InputParsedError) {
         return {
            success: false,
            error: {
               name: err.name,
               message: err.message,
               data: err.fields,
            },
         };
      }
      console.log(err);
      return {
         error: {
            name: 'Error',
            message: 'An error happened while creating a User',
         },
      };
   }
};
