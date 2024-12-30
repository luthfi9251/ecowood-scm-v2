'use server';

import { createProductController } from '@/lib/controllers/product/create-product.controller';
import { InputParsedError } from '@/lib/entities/error/common';
import { ProductCreate } from '@/lib/entities/models/product';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export const createProduct = async (formData: FormData) => {
   try {
      const data = Object.fromEntries(formData.entries());
      console.log({ data });
      const productData: ProductCreate = {
         category: data.category,
         description: data.description,
         product_name: data.product_name,
         product_picture: '/',
         unit: data.unit,
      } as ProductCreate;

      const sessionData = await getCurrentSession();
      if (!sessionData.session) {
         redirect('/login');
      }

      await createProductController(productData, sessionData.session);
      return { success: true, error: {} };
   } catch (err) {
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
            message: 'An error happened when creating product',
         },
      };
   }
};
