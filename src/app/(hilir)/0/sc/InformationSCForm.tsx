'use client';

import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';

export default function InformationSCForm() {
   return (
      <>
         <h2 className="font-semibold text-md mb-4">
            Supply Chain Information
         </h2>
         <div className="grid lg:grid-cols-2 gap-5">
            <Input
               isRequired
               name="sc_name"
               label="Supply Chain Name"
               labelPlacement="outside"
               type="text"
               variant="bordered"
               placeholder=" "
            />
            <Select
               label="End Product"
               labelPlacement="outside"
               variant="bordered"
               defaultSelectedKeys={'1'}
               isDisabled
               placeholder=" "
            >
               <SelectItem key="1">Biocharr</SelectItem>
            </Select>
            <Textarea
               isRequired
               name="description"
               label="Description"
               labelPlacement="outside"
               type="text"
               variant="bordered"
               placeholder=" "
            />
         </div>
      </>
   );
}
