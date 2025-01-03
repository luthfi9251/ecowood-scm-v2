import { ProductRepository } from '@/lib/repository/product.repository';
import { ProductTableData } from '@/lib/entities/models/product';
import { CompanyRepository } from '@/lib/repository/company.repository';
import { OperationalError } from '@/lib/entities/error/common';

export class GetProductUseCase {
   constructor(
      private productRepository: ProductRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(userId: string): Promise<ProductTableData[]> {
      const [company] = await this.companyRepository.findByUserId(userId);
      if (!company) {
         throw new OperationalError('Company not found');
      }

      let productList = await this.productRepository.getAllProduct(company.id);
      return productList;
   }
}
