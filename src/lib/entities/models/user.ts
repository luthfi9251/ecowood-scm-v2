import { z } from 'zod';

export const userRegisterSchema = z
   .object({
      email: z.string().email(),
      password: z.string().min(8, 'Minimum password length is 8 characters'),
      confirm_password: z.string(),
   })
   .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'],
      message: 'Konfirmasi password tidak sesuai',
   });

export const userSchema = z.object({
   id: z.string(),
   email: z.string().email(),
   password: z.string().min(8, 'Minimum password length is 8 characters'),
});

export type User = z.infer<typeof userSchema>;
export type UserRegister = z.infer<typeof userRegisterSchema>;
