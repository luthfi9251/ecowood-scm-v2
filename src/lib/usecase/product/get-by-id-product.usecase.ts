import { ProductRepository } from '@/lib/repository/product.repository';
import { Product, ProductTableData } from '@/lib/entities/models/product';
import { CompanyRepository } from '@/lib/repository/company.repository';
import { OperationalError } from '@/lib/entities/error/common';

export class GetByIDProductUseCase {
   constructor(
      private productRepository: ProductRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(userId: string, productId: number): Promise<Product> {
      const [company] = await this.companyRepository.findByUserId(userId);
      if (!company) {
         throw new OperationalError('Company not found');
      }

      const [product] = await this.productRepository.getProductById(
         company.id,
         productId
      );
      if (!product) {
         throw new OperationalError('Product not found');
      }

      return product;
   }
}
