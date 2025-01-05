'use client';
import { cn } from '@/lib/utils';
import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import { NodeInformationType } from './useSCFlowStore';

const CompanyInfoSection = ({
   data,
   className,
}: {
   data: NodeInformationType;
   className?: string;
}) => {
   return (
      <div
         className={cn(
            'w-[250px] flex bg-sky-200 border-1 rounded-sm p-2 border-black gap-2 items-center',
            className
         )}
      >
         <Image
            src={data.company_picture}
            alt="Company Logo"
            width={35}
            height={35}
            className="aspect-square object-cover rounded-[50%] self-center"
         />
         <div>
            <p className="font-bold text-sm">{data.company_name}</p>
            <p className="text-xs">{data.outcome_material}</p>
         </div>
      </div>
   );
};

export const CompanyMidNodes = ({ data }: { data: NodeInformationType }) => {
   return (
      <>
         <Handle type="target" position={Position.Top} />
         <CompanyInfoSection className="bg-white" data={data} />
         <Handle type="source" position={Position.Bottom} id="a" />
      </>
   );
};

export const CompanyHilirNodes = ({ data }: { data: NodeInformationType }) => {
   return (
      <>
         <Handle type="target" position={Position.Top} />
         <CompanyInfoSection
            className="bg-ecowood-primary text-white"
            data={data}
         />
      </>
   );
};
export const CompanyHuluNodes = ({ data }: { data: NodeInformationType }) => {
   return (
      <>
         <CompanyInfoSection className="bg-white" data={data} />
         <Handle type="source" position={Position.Bottom} id="a" />
      </>
   );
};
