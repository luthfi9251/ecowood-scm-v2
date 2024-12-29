import { Card, CardBody, CardHeader } from '@nextui-org/card';
import LoginForm from './LoginForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center p-5 w-full md:w-2/3 max-w-[500px] mx-auto">
      <Card className="w-full py-4 px-2">
        <CardHeader>
          <h1 className="font-bold text-xl">Login to Your Account</h1>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
