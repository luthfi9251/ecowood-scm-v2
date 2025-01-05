import { Product } from '@/lib/entities/models/product';
import { Card, CardBody } from '@nextui-org/card';
import { Spacer } from '@nextui-org/spacer';
import Image from 'next/image';
import Link from 'next/link';

const AdditionalField = ({
   title,
   value,
   type = 'text',
}: {
   title: string;
   value: string;
   type: 'text' | 'file';
}) => {
   return (
      <div>
         <p className="font-bold text-sm">{title}</p>
         {type === 'text' && <p className=" text-sm">{value}</p>}
         {type === 'file' && (
            <Link
               className=" text-sm text-blue-600 underline"
               href={value}
               prefetch={false}
               target="_blank"
            >
               View Document
            </Link>
         )}
      </div>
   );
};

export default function ProductDescription({ product }: { product: Product }) {
   return (
      <Card radius="sm">
         <CardBody className="flex items-center lg:flex-row gap-5">
            <Image
               src={product.product_picture}
               alt="Product Picture"
               width={300}
               height={300}
               className="aspect-square object-contain bg-slate-200"
            />
            <div className="grow w-full h-full">
               <h1 className="font-bold text-xl lg:text-2xl border-b-1 block">
                  {product.product_name}
               </h1>
               <p>{product.description}</p>

               <div className="space-y-1 mt-3 lg:mt-5">
                  <h2 className="text-lg font-semibold border-b-1 inline-block">
                     Additional Information
                  </h2>
                  <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
                     {product.additional_info?.map((item, idx) => (
                        <AdditionalField
                           key={idx}
                           title={item.key}
                           value={item.value}
                           type="text"
                        />
                     ))}
                  </div>
               </div>

               <div className="space-y-1 mt-3 lg:mt-5">
                  <h2 className="text-lg font-semibold border-b-1 inline-block">
                     Additional Document
                  </h2>
                  <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
                     {product.additional_docs?.map((item, idx) => (
                        <AdditionalField
                           key={idx}
                           title={item.key}
                           value={item.value}
                           type="file"
                        />
                     ))}
                  </div>
               </div>
            </div>
         </CardBody>
      </Card>
   );
}
