'use client';
import { HREF_LINK } from '@/constant/href-link';
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
import { Plus, SearchIcon } from 'lucide-react';
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
      key: 'no',
      label: 'No.',
   },
   {
      key: 'product_name',
      label: 'Product Name',
   },
   {
      key: 'product_pict',
      label: 'Product Picture',
   },
   {
      key: 'total_batch',
      label: 'Batch Total',
   },
   {
      key: 'total_scm',
      label: 'Total SCM',
   },
   {
      key: 'action',
      label: 'Action',
   },
];

export default function ProductTable() {
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
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
               )}
            </TableHeader>
            <TableBody items={data}>
               {(item) => (
                  <TableRow key={item.id}>
                     {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                     )}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
