'use server';

import { HREF_LINK } from '@/constant/href-link';
import { loginController } from '@/lib/controllers/login.controller';
import {
   AuthenticationError,
   InputParsedError,
} from '@/lib/entities/error/common';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginUser = async (formData: FormData) => {
   try {
      const cookieStore = await cookies();
      const data = Object.fromEntries(formData.entries());
      let sessionData = await loginController(
         data.email as string,
         data.password as string
      );

      cookieStore.set('sessionId', sessionData.id, {
         httpOnly: true,
         expires: sessionData.expiresAt,
      });
      redirect(HREF_LINK.HILIR.DASHBOARD);
      return { success: true, error: {} };
   } catch (err: any) {
      if (err instanceof AuthenticationError) {
         return {
            success: false,
            error: {
               name: AuthenticationError.name,
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
      if (err.message === 'NEXT_REDIRECT') throw err;

      console.log(err);
      return {
         error: {
            name: 'Error',
            message: 'An error happened while Logged in',
         },
      };
   }
};
