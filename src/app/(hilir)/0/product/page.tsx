import PageBase from '@/components/page-base';
import ProductTable from './ProductTable';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getAllProduct } from '@/app/_actions/product.action';

const breadcrumbs = [
   {
      label: 'Products',
      isActive: false,
      href: '',
   },
];

export default async function page() {
   let dataProduct = await getAllProduct();

   return (
      <PageBase breadCrumbs={breadcrumbs}>
         <div className="p-4">
            <Card className="p-4">
               <CardHeader className="text-lg lg:text-2xl font-bold">
                  Product
               </CardHeader>
               <CardBody>
                  <ProductTable data={dataProduct.data ?? []} />
               </CardBody>
            </Card>
         </div>
      </PageBase>
   );
}
