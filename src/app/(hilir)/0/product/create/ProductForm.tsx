'use client';

import { Button } from '@nextui-org/button';
import { Form } from '@nextui-org/form';
import { Input, Textarea } from '@nextui-org/input';
import { Spacer } from '@nextui-org/spacer';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';

const ProductCoreInformation = () => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
         <Input
            isRequired
            name="product_name"
            label="Product Name"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            placeholder=" "
         />
         <Input
            isRequired
            name="unit"
            label="Unit"
            type="text"
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
         />
         <Input
            isRequired
            name="category"
            label="Category"
            type="text"
            variant="bordered"
            labelPlacement="outside"
            placeholder=" "
         />
         <Input
            name="picture"
            label="Product Picture"
            labelPlacement="outside"
            variant="bordered"
            type="file"
            accept="image"
         />
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
   );
};

type AdditionalInformation = {
   name: string;
   value: string;
};

const ProductAdditionalInformation = ({
   title,
   mode = 'text',
}: {
   title: string;
   mode?: 'document' | 'text';
}) => {
   const [additionalFields, setAdditionalFields] = useState<
      AdditionalInformation[]
   >([]);
   const handleAddField = () => {
      setAdditionalFields((prevFields: AdditionalInformation[]) => [
         ...prevFields,
         { name: '', value: '' },
      ]);
   };
   const handleRemoveField = (index: number) => {
      setAdditionalFields((prevFields) =>
         prevFields.filter((_, i) => i !== index)
      );
   };
   return (
      <div className="w-full">
         <p className="mt-5 mb-2 font-semibold">{title}</p>
         <div className="flex flex-col gap-3 w-full">
            {additionalFields.map((field, index) => (
               <div className="grid lg:flex gap-3 w-full" key={index}>
                  <div className="grow ">
                     <Input
                        isRequired
                        label="Name"
                        labelPlacement="outside"
                        name="value"
                        placeholder=" "
                        type="text"
                        variant="bordered"
                     />
                  </div>
                  <div className="grow ">
                     <Input
                        isRequired
                        label={mode == 'text' ? 'Value' : 'Document'}
                        labelPlacement="outside"
                        name="value"
                        type={mode == 'text' ? 'text' : 'file'}
                        placeholder=" "
                        variant="bordered"
                     />
                  </div>
                  <div className=" flex items-end">
                     <Button
                        color="danger"
                        onClick={() => handleRemoveField(index)}
                        startContent={<Trash size={17} />}
                        isIconOnly
                     ></Button>
                  </div>
               </div>
            ))}
         </div>
         <div className="flex items-center py-3">
            <Button onClick={handleAddField} startContent={<Plus size={17} />}>
               Add Document
            </Button>
         </div>
      </div>
   );
};

export default function ProductForm() {
   return (
      <Form className="grid gap-2">
         <ProductCoreInformation />
         <ProductAdditionalInformation title="Additional Information" />
         <ProductAdditionalInformation
            title="Additional Document"
            mode="document"
         />
         <Spacer />
         <Button className="bg-ecowood-secondary w-[200px] mx-auto text-white">
            Create
         </Button>
      </Form>
   );
}
