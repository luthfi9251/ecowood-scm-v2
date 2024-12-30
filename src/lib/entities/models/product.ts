import { z } from 'zod';

export const productSchema = z.object({
   id: z.string(),
   product_name: z.string(),
   unit: z.string(),
   category: z.string(),
   description: z.string(),
   product_picture: z.string(),
   company_id: z.string(),
});
export type Product = z.infer<typeof productSchema>;

export const productCreateSchema = productSchema.pick({
   product_name: true,
   unit: true,
   category: true,
   description: true,
   product_picture: true,
});
export type ProductCreate = z.infer<typeof productCreateSchema>;
