'use server';

import { createProductController } from '@/lib/controllers/product/create-product.controller';
import { InputParsedError } from '@/lib/entities/error/common';
import { ProductCreate } from '@/lib/entities/models/product';
import { getCurrentSession } from '@/lib/session';
import { parseAdditionalInputValue } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const createProduct = async (formData: FormData) => {
   try {
      const data = Object.fromEntries(formData.entries());

      const sessionData = await getCurrentSession();
      if (!sessionData.session) {
         redirect('/login');
      }

      const productData: ProductCreate = {
         category: data.category,
         description: data.description,
         product_name: data.product_name,
         product_picture: data.product_picture,
         unit: data.unit,
      } as ProductCreate;

      const additionalInfo = parseAdditionalInputValue('text', data);
      const additionalDocs = parseAdditionalInputValue('document', data);

      await createProductController(
         productData,
         sessionData.session,
         additionalInfo,
         additionalDocs
      );

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
