import { productTable } from '@/db/schema/product';
import { Product, ProductTableData } from '../entities/models/product';
import { db } from '@/db';
import { and, eq, sql } from 'drizzle-orm';

export class ProductRepository {
   async create(productData: Product, companyId: string) {
      return db.insert(productTable).values({
         product_name: productData.product_name,
         category: productData.category,
         unit: productData.unit,
         product_picture: productData.product_picture,
         description: productData.description,
         company_id: companyId,
         additional_info: productData.getAdditionalInfoString(),
         additional_docs: productData.getAdditionalDocsString(),
      });
   }

   async getAllProduct(companyId: string): Promise<ProductTableData[]> {
      let row = await db.execute(
         sql`
         SELECT 
           p.id,
           p.product_name, 
           p.product_picture, 
           p.product_name, 
           COUNT(b.id) as total_batch,
           COUNT(s.id) as total_sc
         FROM product p
         LEFT JOIN supply_chain_product s ON s.product_id = p.id
         LEFT JOIN batch_product b ON b.product_id = p.id
         WHERE company_id = ${companyId}
         GROUP BY p.id
       `
      );
      return row[0] as unknown as ProductTableData[];
   }

   async getProductById(
      companyId: string,
      productId: number
   ): Promise<Product[]> {
      let row = await db
         .select()
         .from(productTable)
         .where(
            and(
               eq(productTable.company_id, companyId),
               eq(productTable.id, productId)
            )
         );
      return row.map(
         (item) =>
            new Product(
               item.id!,
               item.product_name!,
               item.unit!,
               item.category!,
               item.description!,
               item.product_picture!,
               item.company_id!,
               JSON.parse(item.additional_info!),
               JSON.parse(item.additional_docs!)
            )
      );
   }
}
