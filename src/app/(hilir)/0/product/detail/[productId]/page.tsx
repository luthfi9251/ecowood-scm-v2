import PageBase from '@/components/page-base';
import { HREF_LINK } from '@/constant/href-link';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import ProductDescription from './ProductDescription';
import SupplyChainSection from './SupplyChainSection';
import BatchSection from './BatchSection';
import { getByIDProduct } from '@/app/_actions/product.action';

const breadcrumbs = [
   {
      label: 'Products',
      isActive: true,
      href: HREF_LINK.HILIR.PRODUCT.HOME,
   },
   {
      label: 'Detail',
      isActive: false,
      href: '',
   },
];

export default async function Page({
   params,
}: {
   params: Promise<{ productId: string }>;
}) {
   const productId = (await params).productId;
   const detailProduct = await getByIDProduct(parseInt(productId));
   // console.log(detailProduct);
   if (!detailProduct.data) {
      throw detailProduct.error.message;
   }
   return (
      <PageBase breadCrumbs={breadcrumbs}>
         <div className="p-4 space-y-3">
            <ProductDescription product={detailProduct.data} />
            <SupplyChainSection />
            <BatchSection />
         </div>
      </PageBase>
   );
}
