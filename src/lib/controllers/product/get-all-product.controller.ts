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
import { GetProductUseCase } from '@/lib/usecase/product/get-all-product.usecase';

const productRepository = new ProductRepository();
const companyRepository = new CompanyRepository();

const getProductUseCase = new GetProductUseCase(
   productRepository,
   companyRepository
);

export const getProductController = async (session: Session) => {
   if (!session) {
      throw new AuthenticationError('Youre not authenticated!');
   }

   const getProduct = await getProductUseCase.execute(session.userId);

   return getProduct;
};
