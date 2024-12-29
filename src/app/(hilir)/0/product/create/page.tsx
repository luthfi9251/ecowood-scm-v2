import PageBase from '@/components/page-base';
import { HREF_LINK } from '@/constant/href-link';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import ProductForm from './ProductForm';

const breadcrumbs = [
   {
      label: 'Products',
      isActive: true,
      href: HREF_LINK.HILIR.PRODUCT.HOME,
   },
   {
      label: 'Create',
      isActive: false,
      href: '',
   },
];

export default function page() {
   return (
      <PageBase breadCrumbs={breadcrumbs}>
         <div className="p-4">
            <Card className="p-4">
               <CardHeader className="text-lg lg:text-2xl font-bold">
                  Create Product
               </CardHeader>
               <CardBody>
                  <ProductForm />
               </CardBody>
            </Card>
         </div>
      </PageBase>
   );
}
