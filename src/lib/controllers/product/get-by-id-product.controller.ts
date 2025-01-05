import { Session } from '@/db/schema/session';
import { AuthenticationError } from '@/lib/entities/error/common';

import { CompanyRepository } from '@/lib/repository/company.repository';
import { ProductRepository } from '@/lib/repository/product.repository';

import { GetProductUseCase } from '@/lib/usecase/product/get-all-product.usecase';
import { GetByIDProductUseCase } from '@/lib/usecase/product/get-by-id-product.usecase';

const productRepository = new ProductRepository();
const companyRepository = new CompanyRepository();

const getByIDProductUseCase = new GetByIDProductUseCase(
   productRepository,
   companyRepository
);

export const getByIDProductController = async (
   session: Session,
   productId: number
) => {
   if (!session) {
      throw new AuthenticationError('Youre not authenticated!');
   }

   const getProduct = await getByIDProductUseCase.execute(
      session.userId,
      productId
   );

   return getProduct;
};
