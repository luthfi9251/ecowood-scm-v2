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
} from '@nextui-org/table';
import { Info, Pencil, Plus, SearchIcon } from 'lucide-react';
import Link from 'next/link';

const columns = [
   {
      name: 'No',
      uid: 'no',
      render: (row: any, index: number) => index + 1,
   },
   {
      name: 'Batch Code',
      uid: 'batch_code',
      render: (row: any) => row.sc_name,
   },
   {
      name: 'Supply Chain',
      uid: 'sc_name',
      render: (row: any) => row.total_company,
   },
   {
      name: 'Production Capacity',
      uid: 'production_capacity',
      render: (row: any) => row.status,
   },
   {
      name: 'Status',
      uid: 'status',
      render: (row: any) => row.status,
   },
   {
      name: 'Action',
      uid: 'action',
      render: (row: any) => (
         <div className="flex items-center gap-1 ">
            <Button
               startContent={<Info size={20} />}
               isIconOnly
               variant="light"
               as={Link}
               href={HREF_LINK.HILIR.PRODUCT.DETAIL(row.id)}
               className="text-jet"
            ></Button>
            <Button
               startContent={<Pencil size={17} />}
               isIconOnly
               variant="light"
               as={Link}
               href={HREF_LINK.HILIR.PRODUCT.DETAIL(row.id)}
               className="text-jet"
            ></Button>
         </div>
      ),
   },
];

const data = [
   {
      id: 1,
      sc_name: '/biochar.jpg',
      total_company: 'Biochar AgrooBoost',
      status: 1,
   },
];

export default function BatchTable({}) {
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
               Add Batch
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
