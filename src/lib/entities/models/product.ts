export class Product {
   constructor(
      id: number | undefined,
      public product_name: string,
      public unit: string,
      public category: string,
      public description: string,
      public product_picture: string,
      public company_id: string,
      public additional_info?: Record<string, string>[],
      public additional_docs?: Record<string, string>[]
   ) {}

   getAdditionalInfoString() {
      return JSON.stringify(this.additional_info);
   }
   getAdditionalDocsString() {
      return JSON.stringify(this.additional_docs);
   }
}

export type ProductTableData = {
   id: number;
   product_name: string;
   product_picture: string;
   total_batch: number;
   total_sc: number;
};
