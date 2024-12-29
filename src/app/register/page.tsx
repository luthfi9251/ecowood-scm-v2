import { Card, CardBody, CardHeader } from '@nextui-org/card';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center p-5 w-full md:w-2/3 max-w-[600px] mx-auto">
      <Card className="w-full py-4 px-2">
        <CardHeader>
          <h1 className="font-bold text-xl">Register Company Account</h1>
        </CardHeader>
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}
