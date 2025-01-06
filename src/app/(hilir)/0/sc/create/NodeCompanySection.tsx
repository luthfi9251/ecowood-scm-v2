'use client';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useDisclosure } from '@nextui-org/modal';
import '@xyflow/react/dist/style.css';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CompanySelectionType } from './useCreateStore';
import { useCallback, useContext } from 'react';

import NodeCompanyModal from '../NodeCompanyModal';
import { CompanyNodeType, SCCreateContext } from './CreatePageContextProvider';
import useFindId from '@/hooks/use-find-id';
import BuildingImage from '@/assets/building.png';

const NodeCompanyItem = ({ companyData }: { companyData: CompanyNodeType }) => {
   const { companyList } = useContext(SCCreateContext);
   const findCompanyList = useFindId(companyList);

   const companyNodeData = findCompanyList(companyData.companyId);

   return (
      <div className="flex w-full gap-3 border-y-1 py-3 px-3 cursor-default">
         <p className="self-center font-semibold">1</p>
         <Image
            src={companyNodeData?.company_picture || BuildingImage}
            alt="Company Logo"
            width={40}
            height={40}
            className="aspect-square object-cover rounded-[50%] self-center"
         />
         <div className="grow">
            <h4 className="font-semibold">{companyNodeData?.company_name}</h4>
            <table className="text-xs">
               <tbody>
                  <tr>
                     <td>Input</td>
                     <td>:</td>
                     <td>
                        {companyData.requestedMaterial} {' <- '}
                        <span className="italic font-semibold">
                           {
                              findCompanyList(companyData.suppliedByCompanyId)
                                 ?.company_name
                           }
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td>Output</td>
                     <td>:</td>
                     <td>
                        {companyData.outcomeMaterial} {' -> '}
                        <span className="italic font-semibold">
                           {
                              findCompanyList(companyData.suppliedToCompanyId)
                                 ?.company_name
                           }
                        </span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="self-center justify-self-end flex gap-2">
            <Button
               className="bg-sky-700 text-white"
               size="sm"
               startContent={<Pencil size={17} />}
               isIconOnly
            ></Button>
            <Button
               className="bg-rose-700 text-white"
               size="sm"
               startContent={<Trash2 size={17} />}
               isIconOnly
            ></Button>
         </div>
      </div>
   );
};

export const NodeCompanySection = () => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const { companyNodeList, setCompanyNodeList, companyList, setCompanyList } =
      useContext(SCCreateContext);
   // const addCompanyNodeList = useCreateSCStore(
   //    (state) => state.addCompanyNodeList
   // );

   const handleAddCompanyNode = useCallback(
      (dataNode: CompanyNodeType, dataCompany?: CompanySelectionType) => {
         const isAllreadyAdded = companyNodeList.find(
            (item) => item.companyId === dataNode.companyId
         )
            ? true
            : false;
         if (!isAllreadyAdded) {
            setCompanyNodeList((state) => [...state, dataNode]);
            if (dataNode.isInvite && dataCompany) {
               setCompanyList((state) => [...state, dataCompany]);
            }
         }
      },
      []
   );

   return (
      <>
         <Card radius="sm">
            <CardHeader>Company List</CardHeader>
            <CardBody className="px-0">
               <div className="grid grid-cols-1 overflow-y-auto max-h-[700px]">
                  {companyNodeList.map((item, idx) => (
                     <NodeCompanyItem key={idx} companyData={item} />
                  ))}
               </div>
            </CardBody>
            <CardFooter>
               <Button
                  className="w-full bg-ecowood-secondary text-white"
                  radius="sm"
                  onPress={onOpenChange}
               >
                  Add Company
               </Button>
            </CardFooter>
         </Card>
         <NodeCompanyModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onSubmitHandler={handleAddCompanyNode}
         />
      </>
   );
};
