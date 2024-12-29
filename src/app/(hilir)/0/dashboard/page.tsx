'use client';
import { Button } from '@nextui-org/button';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/table';
import { useCallback } from 'react';
import EmissionBarChart from './EmissionBarChart';
import EmissionPieChart from './EmissionPieChart';
import Image from 'next/image';
import Link from 'next/link';
import { HREF_LINK } from '@/constant/href-link';
import PageBase, { PageProps } from '@/components/page-base';

const DashboardCard = ({
  title,
  value,
  subValue,
  description,
}: {
  title: string;
  value: string;
  subValue: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 cursor-default">
      <p>{title}</p>
      <p className="text-2xl font-bold">
        {value} <span className="text-base font-semibold">{subValue}</span>
      </p>
      <p className="font-light text-sm">{description}</p>
    </div>
  );
};

const TopEmissionItem = ({
  order,
  scName,
  productName,
  emission,
}: {
  order: number;
  scName: string;
  productName: string;
  emission: string;
}) => {
  return (
    <div className="flex gap-3 justify-between items-center">
      <div>
        <p className=" font-semibold text-lg">{scName}</p>
        <p className="text-sm">{productName}</p>
      </div>
      <p className="text-2xl font-bold">
        {emission} <span className="text-sm font-medium">KgCO2e</span>
      </p>
    </div>
  );
};

const DetailLogo = () => (
  <svg
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.50045 2.88215C9.09066 2.88215 10.3798 4.1713 10.3798 5.7615C10.3798 7.35177 9.09066 8.64086 7.50045 8.64086C5.9102 8.64086 4.62107 7.35177 4.62107 5.7615C4.62107 4.1713 5.9102 2.88215 7.50045 2.88215ZM7.50045 3.96189C6.50657 3.96189 5.70083 4.76761 5.70083 5.7615C5.70083 6.75538 6.50657 7.5611 7.50045 7.5611C8.49434 7.5611 9.30006 6.75538 9.30006 5.7615C9.30006 4.76761 8.49434 3.96189 7.50045 3.96189ZM7.50045 0.359375C10.8214 0.359375 13.6883 2.62688 14.4837 5.80454C14.5561 6.09378 14.3803 6.38697 14.0911 6.45938C13.8018 6.53173 13.5087 6.35601 13.4363 6.06671C12.7604 3.36684 10.3232 1.43914 7.50045 1.43914C4.67645 1.43914 2.23846 3.3685 1.5638 6.07002C1.49156 6.35925 1.19848 6.53518 0.909197 6.46298C0.619914 6.39071 0.443971 6.09766 0.516214 5.80836C1.31026 2.62883 4.178 0.359375 7.50045 0.359375Z"
      fill="#2C2C2C"
    />
  </svg>
);
const ActiveBatchTable = ({ columns, rows }: { columns: any[]; rows: any }) => {
  const renderCell = useCallback(
    (user: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'action':
          return (
            <Button
              as={Link}
              href={HREF_LINK.HILIR.DASHBOARD}
              startContent={<DetailLogo />}
              isIconOnly
              variant="light"
            ></Button>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <Table
      aria-label="Example table with dynamic content"
      shadow="none"
      radius="sm"
      classNames={{
        th: 'bg-ecowood-primary text-white',
        wrapper: ' p-0',
      }}
    >
      <TableHeader columns={columns}>
        {(column: { key: any; label: any }) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item: { key: any }) => (
          <TableRow key={item.key}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const ProductBatchTable = ({
  columns,
  rows,
}: {
  columns: any[];
  rows: any;
}) => {
  const renderCell = useCallback(
    (user: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'action':
          return (
            <Button
              as={Link}
              href={HREF_LINK.HILIR.DASHBOARD}
              startContent={<DetailLogo />}
              isIconOnly
              variant="light"
            ></Button>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <Table
      aria-label="Example table with dynamic content"
      shadow="none"
      radius="sm"
      classNames={{
        th: 'bg-ecowood-primary text-white',
        wrapper: ' p-0',
      }}
    >
      <TableHeader columns={columns}>
        {(column: { key: any; label: any }) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item: { key: any }) => (
          <TableRow key={item.key}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const cardList = [
  {
    title: 'Total Emissions',
    value: '157',
    subValue: 'KgCO2e',
    description: '+12% from last month',
  },
  {
    title: 'Total Products',
    value: '1',
    subValue: 'Products',
    description: 'Detail',
  },
  {
    title: 'Batch Active',
    value: '3',
    subValue: 'Batch',
    description: 'Detail of information',
  },
  {
    title: 'Total Supply Chain',
    value: '1',
    subValue: 'Supply Chain',
    description: 'Detail of information',
  },
];

const top3Emission = [
  {
    scName: 'AgroTrace Network',
    productName: 'Biochar AgroBoost',
    emission: '157',
  },
];

const columns = [
  {
    key: 'no',
    label: 'No',
  },
  {
    key: 'batch_code',
    label: 'Batch Code',
  },
  {
    key: 'product_name',
    label: 'Product Name',
  },
  {
    key: 'action',
    label: 'Action',
  },
];

const rowsTable = [
  {
    key: '1',
    no: '1',
    batch_code: 'B003',
    product_name: 'Biochar AgroBoost',
    action: 'DETAIL',
  },
];
const columnsBatch = [
  {
    key: 'no',
    label: 'No',
  },
  {
    key: 'batch_code',
    label: 'Batch Code',
  },
  {
    key: 'supply_chain',
    label: 'Supply Chain',
  },
  {
    key: 'capacity',
    label: 'Production Capacity',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'action',
    label: 'Action',
  },
];

const rowsTableBatch = [
  {
    key: '1',
    no: '1',
    batch_code: 'B001',
    supply_chain: 'AgroTrace Network',
    capacity: '100 Ton',
    status: 'Completed',
    action: 'DETAIL',
  },
  {
    key: '2',
    no: '1',
    batch_code: 'B002',
    supply_chain: 'AgroTrace Network',
    capacity: '100 Ton',
    status: 'Completed',
    action: 'DETAIL',
  },
  {
    key: '3',
    no: '1',
    batch_code: 'B003',
    supply_chain: 'AgroTrace Network',
    capacity: '100 Ton',
    status: 'Active',
    action: 'DETAIL',
  },
];

const breadcrumbs = [
  {
    label: 'Dashboard',
    isActive: false,
    href: '',
  },
];

export default function Page() {
  return (
    <PageBase breadCrumbs={breadcrumbs}>
      <div className="grid grid-col-1 gap-5 p-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardList.map((item, i) => (
            <DashboardCard
              key={i}
              description={item.description}
              value={item.value}
              subValue={item.subValue}
              title={item.title}
            />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <EmissionBarChart />
          <EmissionPieChart />
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-2xl font-semibold">Top Emission</h2>
            <div className="bg-gray-600 h-[1px] w-full my-3"></div>
            <div className="flex flex-col gap-5">
              {top3Emission.map((item, i) => (
                <TopEmissionItem
                  order={i + 1}
                  emission={item.emission}
                  productName={item.productName}
                  scName={item.scName}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-2xl font-semibold">Active Batch</h2>
              <div className="bg-gray-600 h-[1px] w-full my-3"></div>
              <ActiveBatchTable columns={columns} rows={rowsTable} />
            </div>
            <div className="bg-white flex rounded-xl p-5 cursor-default items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src="/icon-download-pdf.png"
                  width={50}
                  height={50}
                  alt="Icon Download"
                  className=""
                />
                <div>
                  <p className="font-semibold text-2xl">Export</p>
                  <p className="text-sm">Export to PDF</p>
                </div>
              </div>
              <Button
                className="bg-ecowood-secondary text-white"
                as={Link}
                href="/report_scm_dashboard.pdf"
                target="_blank"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl">
          <h2 className="text-2xl font-semibold">Product Batch Information</h2>
          <div className="bg-gray-600 h-[1px] w-full my-3"></div>
          <ProductBatchTable columns={columnsBatch} rows={rowsTableBatch} />
        </div>
      </div>
    </PageBase>
  );
}
