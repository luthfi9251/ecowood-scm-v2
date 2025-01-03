import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = [
   'image/jpeg',
   'image/jpg',
   'image/png',
   'image/webp',
];

export const productSchema = z.object({
   product_name: z.string(),
   unit: z.string(),
   category: z.string(),
   description: z.string(),
   product_picture: z.string(),
   company_id: z.string(),
   additional_info: z.string().optional(),
   additional_docs: z.string().optional(),
});
export type ProductInputNoFile = z.infer<typeof productCreateSchema>;

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
      product_picture: z
         .instanceof(File)
         .refine((file) => file.size > 0, {
            message: `Please provide Product Image!`,
         })
         .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
         }),
   });
export type ProductCreate = z.infer<typeof productCreateSchema>;
