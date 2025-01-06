'use client';

import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { useCreateSCStore } from './create/useCreateStore';
import { useContext, useMemo } from 'react';
import { SCCreateContext } from './create/CreatePageContextProvider';

export default function InformationSCForm({
   productList,
   productDefaultId,
}: {
   productList: { id: number; product_name: string }[];
   productDefaultId?: string;
}) {
   const { scInformationForm, setScInformationForm } =
      useContext(SCCreateContext);

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
               value={scInformationForm.sc_name}
               onValueChange={(val) =>
                  setScInformationForm({ ...scInformationForm, sc_name: val })
               }
            />
            <Select
               label="End Product"
               labelPlacement="outside"
               variant="bordered"
               selectedKeys={[scInformationForm.end_product_id + '']}
               onSelectionChange={(key) =>
                  setScInformationForm({
                     ...scInformationForm,
                     end_product_id: parseInt(key.currentKey as string),
                  })
               }
               items={productList}
               isDisabled={productDefaultId ? true : false}
               placeholder=" "
            >
               {(item) => (
                  <SelectItem key={item.id + ''}>
                     {item.product_name}
                  </SelectItem>
               )}
            </Select>
            <Textarea
               isRequired
               name="description"
               label="Description"
               labelPlacement="outside"
               type="text"
               variant="bordered"
               placeholder=" "
               value={scInformationForm.description}
               onValueChange={(val) =>
                  setScInformationForm({
                     ...scInformationForm,
                     description: val,
                  })
               }
            />
         </div>
      </>
   );
}
