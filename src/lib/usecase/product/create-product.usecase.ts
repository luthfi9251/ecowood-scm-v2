import { ProductRepository } from '@/lib/repository/product.repository';
import { Product } from '@/lib/entities/models/product';
import { CompanyRepository } from '@/lib/repository/company.repository';
import { OperationalError } from '@/lib/entities/error/common';
import { ProductCreate } from '@/lib/schema/product.schema';
import { FileUploadService } from '@/lib/services/file-upload.service';

export class CreateProductUseCase {
   constructor(
      private productRepository: ProductRepository,
      private companyRepository: CompanyRepository,
      private fileUploadService: FileUploadService
   ) {}

   async execute(
      productData: ProductCreate,
      userId: string,
      additional_info?: Record<string, string>[],
      additional_docs?: Record<string, File>[]
   ): Promise<void> {
      const [company] = await this.companyRepository.findByUserId(userId);
      if (!company) {
         throw new OperationalError('Company not found');
      }

      const productPictureUrl = await this.fileUploadService.saveFile(
         productData.product_picture,
         'product/picture'
      );

      const productAdditionalDocsUpload: Promise<Record<string, string>[]> =
         additional_docs?.length
            ? Promise.all(
                 additional_docs.map(async (item: Record<string, File>) => {
                    try {
                       const urlAPI = await this.fileUploadService.saveFile(
                          item.value,
                          'product/docs'
                       );
                       return {
                          key: item.key as unknown as string,
                          value: urlAPI,
                       };
                    } catch (error) {
                       throw new Error('Failed to upload file');
                    }
                 })
              )
            : Promise.resolve([]);

      const product = new Product(
         undefined,
         productData.product_name,
         productData.unit,
         productData.category,
         productData.description,
         productPictureUrl,
         company.id,
         additional_info,
         await productAdditionalDocsUpload
      );

      await this.productRepository.create(product, company.id);
   }
}
