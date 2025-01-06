'use client';
import Flow from '@/components/supply-chain-flow/Flow';
import { NodeCompanySection } from './NodeCompanySection';

export default function FlowWrapper() {
   return (
      <div
         style={{ width: '100%' }}
         className="grid grid-cols-1 xl:grid-cols-3 gap-3"
      >
         <Flow className="xl:col-span-2 min-h-[500px]" />
         <NodeCompanySection />
      </div>
   );
}
