import { ProductRepository } from '@/lib/repository/product.repository';
import { ProductCreate } from '@/lib/entities/models/product';
import { CompanyRepository } from '@/lib/repository/company.repository';
import { OperationalError } from '@/lib/entities/error/common';

export class CreateProductUseCase {
   constructor(
      private productRepository: ProductRepository,
      private companyRepository: CompanyRepository
   ) {}

   async execute(
      productData: ProductCreate,
      userId: string,
      additionalInfo?: Record<string, string>[],
      additionalDocs?: Record<string, string>[]
   ): Promise<void> {
      const [company] = await this.companyRepository.findByUserId(userId);
      if (!company) {
         throw new OperationalError('Company not found');
      }
      productData.additional_info = JSON.stringify(additionalInfo);
      productData.additional_docs = JSON.stringify(additionalDocs);
      console.log({ productData });
      await this.productRepository.create(productData, company.id);
   }
}
