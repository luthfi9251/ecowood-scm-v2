import { productTable } from '@/db/schema/product';
import { ProductCreate } from '../entities/models/product';
import { db } from '@/db';

export class ProductRepository {
   async create(productData: ProductCreate, companyId: string) {
      return db.insert(productTable).values({
         product_name: productData.product_name,
         category: productData.category,
         unit: productData.unit,
         product_picture: productData.product_picture,
         description: productData.description,
         company_id: companyId,
         additional_info: productData.additional_info,
         additional_docs: productData.additional_docs,
      });
   }
}
