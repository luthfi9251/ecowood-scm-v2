import { Card, CardBody, CardHeader } from '@nextui-org/card';
import InformationSCForm from '../InformationSCForm';
import Flow from './Flow';
import PageBase from '@/components/page-base';
import { HREF_LINK } from '@/constant/href-link';
import FlowSection from '../FlowSection';
import { Spacer } from '@nextui-org/spacer';
import { ReactFlowProvider } from '@xyflow/react';
import { companyList, currentCompanyData, dataProduct } from './dummy.data';
import { SCCreateProvider } from './CreatePageContextProvider';

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

const getAllProducts = () => dataProduct;
const getCompanyProfile = () => currentCompanyData;
const getAllCompanyList = () => companyList;

export default async function page({
   searchParams,
}: {
   searchParams: Promise<{ productId: string }>;
}) {
   let productId = (await searchParams).productId;

   const dataProduct = getAllProducts();
   const profileCompany = getCompanyProfile();
   const companyList = getAllCompanyList();

   return (
      <PageBase
         breadCrumbs={
            productId
               ? breadcrumbsProductSCCreate(productId)
               : breadcrumbsDefault
         }
      >
         <SCCreateProvider
            currentCompany={profileCompany}
            dataProduct={dataProduct}
            dataCompany={companyList}
            productId={productId}
         >
            <div className="p-4">
               <Card className="p-4">
                  <CardHeader className="text-lg lg:text-2xl font-bold">
                     Create Supply Chain
                  </CardHeader>
                  <CardBody>
                     <ReactFlowProvider>
                        <InformationSCForm
                           productList={dataProduct}
                           productDefaultId={productId}
                        />
                        <Spacer y={10} />
                        <FlowSection currentCompany={profileCompany} />
                     </ReactFlowProvider>
                  </CardBody>
               </Card>
            </div>
         </SCCreateProvider>
      </PageBase>
   );
}
