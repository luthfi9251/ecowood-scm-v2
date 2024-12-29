import PageBase from '@/components/page-base';
import ProductTable from './ProductTable';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

const breadcrumbs = [
   {
      label: 'Products',
      isActive: false,
      href: '',
   },
];

export default async function page() {
   return (
      <PageBase breadCrumbs={breadcrumbs}>
         <div className="p-4">
            <Card className="p-4">
               <CardHeader className="text-lg lg:text-2xl font-bold">
                  Product
               </CardHeader>
               <CardBody>
                  <ProductTable />
               </CardBody>
            </Card>
         </div>
      </PageBase>
   );
}
