import { Card, CardBody, CardHeader } from '@nextui-org/card';
import SupplyChainTable from './SupplyChainTable';

export default function SupplyChainSection() {
   return (
      <Card radius="sm">
         <CardHeader>
            <h1 className="text-xl font-bold">Supply Chain Information</h1>
         </CardHeader>
         <CardBody>
            <SupplyChainTable />
         </CardBody>
      </Card>
   );
}
