'use client';
import { useEffect } from 'react';
import Flow from './create/Flow';
import {
   CompanyNodeInfoType,
   CompanySelectionType,
   useCreateSCStore,
} from './create/useCreateStore';

export default function FlowSection({
   currentCompany,
}: {
   currentCompany: CompanySelectionType;
}) {
   return (
      <>
         <h2 className="font-semibold text-md mb-4">
            Define your Supply Chain
         </h2>
         <Flow />
      </>
   );
}
