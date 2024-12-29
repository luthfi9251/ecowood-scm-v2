import { z } from 'zod';

export const companyRegisterSchema = z.object({
   company_name: z.string().max(255),
   address: z.string(),
   postal_code: z.string().max(255),
   city: z.string().max(255),
   region: z.string().max(255),
   company_email: z.string().email().max(255),
   phone: z.string().max(255),
   tax_id: z.string().max(255).optional(),
   nib: z.string().max(255).optional(),
   description: z.string().optional(),
   company_fields: z.string(),
});

export const companySchema = z.object({
   id: z.string(),
   company_name: z.string().max(255),
   address: z.string(),
   postal_code: z.string().max(255),
   city: z.string().max(255),
   region: z.string().max(255),
   company_email: z.string().email().max(255),
   phone: z.string().max(255),
   tax_id: z.string().max(255).optional(),
   nib: z.string().max(255).optional(),
   description: z.string().optional(),
   company_fields: z.string(),
   user_id: z.string(),
});

export type Company = z.infer<typeof companySchema>;
export type CompanyRegister = z.infer<typeof companyRegisterSchema>;
