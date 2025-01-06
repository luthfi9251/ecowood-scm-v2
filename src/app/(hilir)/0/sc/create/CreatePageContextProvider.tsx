'use client';
import { useSCFlowStore } from '@/components/supply-chain-flow/useSCFlowStore';
import useRandomId from '@/hooks/use-random-id';
import { Position } from '@xyflow/react';
import { createContext, useEffect, useState } from 'react';

export type CompanySelectionType = {
   id: string;
   company_name: string;
   company_fields: string;
   company_email: string;
   company_picture: string;
   city: string;
   address: string;
};

export type ProductSelectionType = {
   id: number;
   product_name: string;
};

export type CompanyNodeType = {
   id: string;
   companyId: string;
   requestedMaterial: string;
   suppliedByCompanyId: string;
   outcomeMaterial: string;
   suppliedToCompanyId: string;
   isInvite: boolean;
};

export type SCInformationFormType = {
   sc_name: string;
   end_product_id: number | undefined;
   description: string;
};

type SetState<T> = (data: T | ((prevState: T) => T)) => void;

export type SCCreateContextType = {
   companyList: CompanySelectionType[];
   setCompanyList: SetState<CompanySelectionType[]>;
   productList: ProductSelectionType[];
   setProductList: SetState<ProductSelectionType[]>;
   companyNodeList: CompanyNodeType[];
   setCompanyNodeList: SetState<CompanyNodeType[]>;
   scInformationForm: SCInformationFormType;
   setScInformationForm: SetState<SCInformationFormType>;
};

/**
 * state that need to store in context
 * 1. CompanyNameList = untuk form tambah company node
 * 2. ProductList = untuk form SC Information nbagian end product
 * 3. CompanyNodeList = untuk daftar company yang ditambahkan ke SC
 *
 */
export const SCCreateContext = createContext({} as SCCreateContextType);

export const SCCreateProvider = ({
   children,
   dataProduct,
   dataCompany,
   productId,
   currentCompany,
}: {
   children: React.ReactNode;
   currentCompany: CompanySelectionType;
   dataProduct?: ProductSelectionType[];
   dataCompany?: CompanySelectionType[];
   productId?: string;
}) => {
   const [scInformationForm, setScInformationForm] =
      useState<SCInformationFormType>({
         description: '',
         sc_name: '',
         end_product_id: productId ? parseInt(productId) : -1,
      });
   const [companyList, setCompanyList] = useState<CompanySelectionType[]>(
      dataCompany ?? []
   );
   const [productList, setProductList] = useState<ProductSelectionType[]>(
      dataProduct ?? []
   );
   const [companyNodeList, setCompanyNodeList] = useState<CompanyNodeType[]>(
      []
   );

   const setNodes = useSCFlowStore((state) => state.setNodes);
   const randomId = useRandomId();

   useEffect(() => {
      setCompanyNodeList((state) => [
         ...state,
         {
            id: 'HILIR',
            companyId: currentCompany.id,
            isInvite: false,
            outcomeMaterial:
               productList.find(
                  (item) => item.id === scInformationForm.end_product_id
               )?.product_name ?? '',
            requestedMaterial: '',
            suppliedByCompanyId: '',
            suppliedToCompanyId: '',
         },
      ]);

      setNodes([
         {
            id: randomId,
            type: 'companyNodeHilir',
            targetPosition: Position.Top,
            position: { x: 0, y: 0 },
            data: {
               company_name: currentCompany.company_name,
               company_picture: currentCompany.company_picture,
               id: currentCompany.id,
               outcome_material:
                  productList.find(
                     (item) => item.id === scInformationForm.end_product_id
                  )?.product_name ?? '',
            },
         },
      ]);
   }, []);

   const sharedContext: SCCreateContextType = {
      companyList,
      setCompanyList,
      productList,
      setProductList,
      companyNodeList,
      setCompanyNodeList,
      scInformationForm,
      setScInformationForm,
   };

   return (
      <SCCreateContext.Provider value={sharedContext}>
         {children}
      </SCCreateContext.Provider>
   );
};
