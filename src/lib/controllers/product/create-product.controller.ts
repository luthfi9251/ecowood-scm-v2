import { Session } from '@/db/schema/session';
import {
   AuthenticationError,
   InputParsedError,
} from '@/lib/entities/error/common';

import { CompanyRepository } from '@/lib/repository/company.repository';
import { ProductRepository } from '@/lib/repository/product.repository';
import {
   ProductCreate,
   productCreateSchema,
} from '@/lib/schema/product.schema';
import { LocalFileUploadService } from '@/lib/services/local-file-storage.service';
import { CreateProductUseCase } from '@/lib/usecase/product/create-product.usecase';

const productRepository = new ProductRepository();
const companyRepository = new CompanyRepository();
const fileUploadService = new LocalFileUploadService();

const createProductUseCase = new CreateProductUseCase(
   productRepository,
   companyRepository,
   fileUploadService
);

export const createProductController = async (
   productData: ProductCreate,
   session: Session,
   additionalProductInfo?: Record<string, string>[],
   additionalProductDocs?: Record<string, File>[]
) => {
   if (!session) {
      throw new AuthenticationError('Youre not authenticated!');
   }

   const productDataParsed = productCreateSchema.safeParse(productData);

   if (productDataParsed.error) {
      const errorField = {
         ...productDataParsed.error?.flatten().fieldErrors,
      };
      throw new InputParsedError('Invalid data', errorField);
   }

   const createProduct = await createProductUseCase.execute(
      productData,
      session.userId,
      additionalProductInfo,
      additionalProductDocs
   );

   return createProduct;
};
