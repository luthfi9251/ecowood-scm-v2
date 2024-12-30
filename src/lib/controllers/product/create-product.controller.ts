import { Session } from '@/db/schema/session';
import {
   AuthenticationError,
   InputParsedError,
} from '@/lib/entities/error/common';
import {
   ProductCreate,
   productCreateSchema,
} from '@/lib/entities/models/product';
import { CompanyRepository } from '@/lib/repository/company.repository';
import { ProductRepository } from '@/lib/repository/product.repository';
import { CreateProductUseCase } from '@/lib/usecase/product/create-product.usecase';

const productRepository = new ProductRepository();
const companyRepository = new CompanyRepository();
const createProductUseCase = new CreateProductUseCase(
   productRepository,
   companyRepository
);

export const createProductController = async (
   productData: ProductCreate,
   session: Session,
   additionalProductInfo?: Record<string, string>[],
   additionalProductDocs?: Record<string, string>[]
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
   productData.product_picture = '-';
   const createProduct = await createProductUseCase.execute(
      productData,
      session.userId,
      additionalProductInfo,
      additionalProductDocs
   );

   return createProduct;
};
