'use client';
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

export interface CreateStoreState {
   company_list: CompanySelectionType[];
   companyNodeList: CompanyNodeInfoType[];
   addCompanyNodeList: (data: CompanyNodeInfoType) => void;
}

export const useCreateSCStore = create<CreateStoreState>()((set) => ({
   company_list: [
      {
         id: '1',
         company_name: 'Heidenreich LLC',
         company_fields: 'Structural and Misc Steel (Fabrication)',
         company_email: 'jcavee0@chron.com',
         city: 'Newark',
         address: 'Apt 277',
         company_picture: 'https://picsum.photos/100',
      },
      {
         id: '2',
         company_name: 'McGlynn-Lang',
         company_fields: 'Drywall & Acoustical (MOB)',
         company_email: 'fquigg1@hp.com',
         city: 'Ono',
         address: 'Apt 545',
         company_picture: 'https://picsum.photos/100',
      },
      {
         id: '3',
         company_name: 'Hodkiewicz, Hauck and Grimes',
         company_fields: 'Framing (Wood)',
         company_email: 'pcorragan2@creativecommons.org',
         city: 'Renhe',
         address: 'PO Box 17298',
         company_picture: 'https://picsum.photos/100',
      },
      {
         id: '4',
         company_name: 'Homenick-Mayer',
         company_fields: 'Granite Surfaces',
         company_email: 'tgover3@linkedin.com',
         city: 'Narvacan',
         address: 'Room 548',
         company_picture: 'https://picsum.photos/100',
      },
      {
         id: '5',
         company_name: 'Koelpin LLC',
         company_fields: 'Epoxy Flooring',
         company_email: 'vyukhov4@paypal.com',
         city: 'Shancheng',
         address: 'Room 924',
         company_picture: 'https://picsum.photos/100',
      },
   ],

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
         outcomeMaterial: '',
         requestedMaterial: '',
         suppliedByCompanyId: '',
         suppliedToCompanyId: '',
         isInvite: false,
      },
   ],
   addCompanyNodeList: (data: CompanyNodeInfoType) =>
      set((state) => ({ companyNodeList: [...state.companyNodeList, data] })),
}));
