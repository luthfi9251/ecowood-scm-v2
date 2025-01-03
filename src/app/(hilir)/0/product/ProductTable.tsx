'use client';
import { HREF_LINK } from '@/constant/href-link';
import { ProductTableData } from '@/lib/entities/models/product';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

import {
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   getKeyValue,
} from '@nextui-org/table';
import { Info, Pencil, Plus, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const data = [
   {
      id: 1,
      picture: '/biochar.jpg',
      product_name: 'Biochar AgrooBoost',
      id_sc: 1,
      id_batch: 3,
   },
];

const columns = [
   {
      name: 'No',
      uid: 'no',
      render: (row: ProductTableData, index: number) => index + 1,
   },
   {
      name: 'Product Picture',
      uid: 'product_picture',
      render: (row: ProductTableData) => (
         <Image
            src={row.product_picture}
            alt={row.product_name}
            width={150}
            height={150}
            className="aspect-square object-contain bg-slate-200/50 p-1"
         />
      ),
   },
   {
      name: 'Product Name',
      uid: 'product_name',
      render: (row: ProductTableData) => row.product_name,
   },
   {
      name: 'Total SC',
      uid: 'total_sc',
      render: (row: ProductTableData) => row.total_sc,
   },
   {
      name: 'Total Batch',
      uid: 'total_batch',
      render: (row: ProductTableData) => row.total_batch,
   },
   {
      name: 'Action',
      uid: 'action',
      render: (row: ProductTableData) => (
         <>
            <Button
               startContent={<Info size={20} />}
               isIconOnly
               variant="light"
               className="text-ecowood-primary"
            ></Button>
            <Button
               startContent={<Pencil size={17} />}
               isIconOnly
               variant="light"
            ></Button>
         </>
      ),
   },
];

export default function ProductTable({ data }: { data: ProductTableData[] }) {
   return (
      <div className=" grid gap-5">
         <div className="flex justify-between gap-3 items-end">
            <Input
               isClearable
               className="w-full sm:max-w-[44%]"
               placeholder="Search by name..."
               startContent={<SearchIcon size={17} />}
            />
            <Button
               className="bg-ecowood-secondary text-white"
               radius="sm"
               startContent={<Plus size={17} />}
               as={Link}
               href={HREF_LINK.HILIR.PRODUCT.CREATE}
            >
               Add Product
            </Button>
         </div>
         <Table
            aria-label="Product Table"
            shadow="none"
            classNames={{
               th: 'bg-ecowood-primary text-white font-medium text-sm',
               wrapper: 'p-0',
            }}
         >
            <TableHeader>
               {columns.map((column, idx) => (
                  <TableColumn key={idx}>{column.name}</TableColumn>
               ))}
            </TableHeader>
            <TableBody>
               {data.map((row, idx) => (
                  <TableRow key={idx}>
                     {columns.map((column) => (
                        <TableCell key={column.uid}>
                           {column.render(row, idx)}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
