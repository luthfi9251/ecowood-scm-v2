'use server';

import { HREF_LINK } from '@/constant/href-link';
import { createProductController } from '@/lib/controllers/product/create-product.controller';
import { getProductController } from '@/lib/controllers/product/get-all-product.controller';
import { getByIDProductController } from '@/lib/controllers/product/get-by-id-product.controller';
import {
   InputParsedError,
   OperationalError,
} from '@/lib/entities/error/common';
import { ProductCreate } from '@/lib/schema/product.schema';

import { getCurrentSession } from '@/lib/session';
import { parseAdditionalInputValue } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
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
         additionalDocs as unknown as Record<string, File>[]
      );
      revalidatePath(HREF_LINK.HILIR.PRODUCT.HOME);
      return { success: true, error: {} };
   } catch (err: any) {
      if (err.message === 'NEXT_REDIRECT') throw err;
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

export const getAllProduct = async () => {
   try {
      const sessionData = await getCurrentSession();
      if (!sessionData.session) {
         redirect('/login');
      }

      const product = await getProductController(sessionData.session);
      return { success: true, error: {}, data: product };
   } catch (err: any) {
      if (err.message === 'NEXT_REDIRECT') throw err;
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
         success: false,
         error: {
            name: 'Error',
            message: 'An error happened when get All product',
         },
      };
   }
};

export const getByIDProduct = async (productId: number) => {
   try {
      const sessionData = await getCurrentSession();
      if (!sessionData.session) {
         redirect('/login');
      }

      const product = await getByIDProductController(
         sessionData.session,
         productId
      );
      return { success: true, error: {}, data: product };
   } catch (err: any) {
      if (err.message === 'NEXT_REDIRECT') throw err;
      if (err instanceof OperationalError) {
         return {
            success: false,
            error: {
               name: err.name,
               message: err.message,
            },
         };
      }
      console.log(err);
      return {
         success: false,
         error: {
            name: 'Error',
            message: 'An error happened when get product detail',
         },
      };
   }
};
