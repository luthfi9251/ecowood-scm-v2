import { z } from 'zod';

export const productSchema = z.object({
   id: z.string(),
   product_name: z.string(),
   unit: z.string(),
   category: z.string(),
   description: z.string(),
   product_picture: z.string(),
   company_id: z.string(),
   additional_info: z.string().optional(),
   additional_docs: z.string().optional(),
});
export type Product = z.infer<typeof productSchema>;

export const productCreateSchema = productSchema
   .pick({
      product_name: true,
      unit: true,
      category: true,
      description: true,
      additional_info: true,
      additional_docs: true,
   })
   .extend({
      product_picture: z.instanceof(File).or(z.string()),
   });
export type ProductCreate = z.infer<typeof productCreateSchema>;
