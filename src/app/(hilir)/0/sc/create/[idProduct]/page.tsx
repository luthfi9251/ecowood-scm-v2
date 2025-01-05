import { Card, CardBody, CardHeader } from '@nextui-org/card';
import InformationSCForm from '../../InformationSCForm';
import Flow from './Flow';
import PageBase from '@/components/page-base';
import { HREF_LINK } from '@/constant/href-link';
import FlowSection from '../../FlowSection';
import { Spacer } from '@nextui-org/spacer';
import { ReactFlowProvider } from '@xyflow/react';

const breadcrumbsProductSCCreate = (idProduct: string) => [
   {
      label: 'Products',
      isActive: true,
      href: HREF_LINK.HILIR.PRODUCT.HOME,
   },
   {
      label: 'Detail',
      isActive: true,
      href: HREF_LINK.HILIR.PRODUCT.DETAIL(idProduct),
   },
   {
      label: 'Create Supply Chain',
      isActive: false,
      href: '',
   },
];

const breadcrumbsDefault = [
   {
      label: 'Supply Chain',
      isActive: true,
      href: HREF_LINK.HILIR.PRODUCT.HOME,
   },
   {
      label: 'Create',
      isActive: false,
      href: '',
   },
];

export default async function page({
   params,
}: {
   params: Promise<{ idProduct: string }>;
}) {
   let idProduct = (await params).idProduct;

   return (
      <PageBase
         breadCrumbs={
            idProduct
               ? breadcrumbsProductSCCreate(idProduct)
               : breadcrumbsDefault
         }
      >
         <div className="p-4">
            <Card className="p-4">
               <CardHeader className="text-lg lg:text-2xl font-bold">
                  Create Supply Chain
               </CardHeader>
               <CardBody>
                  <ReactFlowProvider>
                     <InformationSCForm />
                     <Spacer y={10} />
                     <FlowSection />
                  </ReactFlowProvider>
               </CardBody>
            </Card>
         </div>
      </PageBase>
   );
}
