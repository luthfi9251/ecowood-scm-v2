import { Card, CardBody, CardHeader } from '@nextui-org/card';
import BatchTable from './BatchTable';

export default function BatchSection() {
   return (
      <Card radius="sm">
         <CardHeader>
            <h1 className="text-xl font-bold">Batch Information</h1>
         </CardHeader>
         <CardBody>
            <BatchTable />
         </CardBody>
      </Card>
   );
}
