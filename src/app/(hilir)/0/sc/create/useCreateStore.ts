'use client';
import { Key } from 'react';
import { create } from 'zustand';

export type CompanySelectionType = {
   id: string;
   company_name: string;
   company_fields: string;
   company_email: string;
   company_picture: string;
   city: string;
   address: string;
};

export type CompanyNodeInfoType = {
   id: string;
   step: number;
   requestedMaterial: string;
   suppliedByCompanyId: string;
   outcomeMaterial: string;
   suppliedToCompanyId: string;
   isInvite: boolean;
   information: CompanySelectionType;
};

export type SCInformationFormType = {
   sc_name: string;
   end_product_id: string;
   description: string;
};

export interface CreateStoreState {
   scInformationForm: SCInformationFormType;
   updateScInformationForm: (data: SCInformationFormType | undefined) => void;
   company_list: CompanySelectionType[];
   companyNodeList: CompanyNodeInfoType[];
   addCompanyNodeList: (data: CompanyNodeInfoType) => void;
}

export const useCreateSCStore = create<CreateStoreState>()((set) => ({
   scInformationForm: {
      description: '',
      sc_name: '',
      end_product_id: '',
   },
   updateScInformationForm: (updatedData: SCInformationFormType | undefined) =>
      set((state) => ({
         scInformationForm: {
            ...state.scInformationForm,
            ...updatedData,
         },
      })),
   company_list: [],
   companyNodeList: [
      {
         id: '1',
         information: {
            id: '1',
            company_name: 'Heidenreich LLC',
            company_fields: 'Structural and Misc Steel (Fabrication)',
            company_email: 'jcavee0@chron.com',
            city: 'Newark',
            address: 'Apt 277',
            company_picture: 'https://picsum.photos/100',
         },
         step: -1,
         outcomeMaterial: 'Biocharr',
         requestedMaterial: '',
         suppliedByCompanyId: '',
         suppliedToCompanyId: '',
         isInvite: false,
      },
   ],
   addCompanyNodeList: (data: CompanyNodeInfoType) =>
      set((state) => ({ companyNodeList: [...state.companyNodeList, data] })),
}));
