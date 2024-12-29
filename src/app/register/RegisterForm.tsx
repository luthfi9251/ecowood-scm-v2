'use client';
import { HREF_LINK } from '@/constant/href-link';
import { userRegisterSchema } from '@/lib/entities/models/user';
import { Button } from '@nextui-org/button';
import { Form } from '@nextui-org/form';
import { Input } from '@nextui-org/input';
import { Spacer } from '@nextui-org/spacer';
import { CircleAlert, CircleCheck, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useActionState, useState } from 'react';
import { registerUserCompany } from '../_actions/register';
import { ValidationError } from 'next/dist/compiled/amphtml-validator';
import { InputParsedError } from '@/lib/entities/error/common';
import { cn } from '@/lib/utils';

const RegisterFormAccountSection = () => {
   const [passVisibility, setPassVisibility] = useState(false);
   const [passConfirmVisibility, setPassConfirmVisibility] = useState(false);

   return (
      <>
         <h2 className=" font-semibold">Account Information</h2>
         <div className="grid lg:grid-cols-2 w-full gap-5">
            <Input
               isRequired
               label="Email"
               labelPlacement="outside"
               name="email"
               placeholder=" "
               type="email"
               variant="bordered"
            />
            <Input
               isRequired
               label="Username"
               labelPlacement="outside"
               name="username"
               placeholder=" "
               type="text"
               variant="bordered"
            />
            <Input
               isRequired
               label="Password"
               labelPlacement="outside"
               name="password"
               type={passVisibility ? 'text' : 'password'}
               endContent={
                  <button
                     aria-label="toggle password visibility"
                     className="focus:outline-none"
                     type="button"
                     onClick={() => setPassVisibility(!passVisibility)}
                  >
                     {passVisibility ? (
                        <EyeOff className="text-2xl w-5 text-default-400 pointer-events-none" />
                     ) : (
                        <Eye className="text-2xl w-5 text-default-400 pointer-events-none" />
                     )}
                  </button>
               }
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Confirm Password"
               labelPlacement="outside"
               name="confirm_password"
               type={passConfirmVisibility ? 'text' : 'password'}
               endContent={
                  <button
                     aria-label="toggle password visibility"
                     className="focus:outline-none"
                     type="button"
                     onClick={() =>
                        setPassConfirmVisibility(!passConfirmVisibility)
                     }
                  >
                     {passConfirmVisibility ? (
                        <EyeOff className="text-xl w-5 text-default-400 pointer-events-none" />
                     ) : (
                        <Eye className="text-xl w-5 text-default-400 pointer-events-none" />
                     )}
                  </button>
               }
               placeholder=" "
               variant="bordered"
            />
         </div>
      </>
   );
};

const RegisterFormCompanySection = () => {
   return (
      <>
         <h2 className=" font-semibold">Company Information</h2>
         <div className="grid lg:grid-cols-2 w-full gap-5">
            <Input
               isRequired
               label="Company Email"
               labelPlacement="outside"
               type="email"
               name="company_email"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Name"
               labelPlacement="outside"
               type="text"
               name="company_name"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="City"
               labelPlacement="outside"
               type="text"
               name="city"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Address"
               labelPlacement="outside"
               type="text"
               name="address"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Phone"
               labelPlacement="outside"
               type="text"
               name="phone"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Region"
               labelPlacement="outside"
               type="text"
               name="region"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Postal code"
               labelPlacement="outside"
               name="postal_code"
               type="text"
               placeholder=" "
               variant="bordered"
            />
            <Input
               isRequired
               label="Company Field"
               labelPlacement="outside"
               name="company_fields"
               type="text"
               placeholder=" "
               variant="bordered"
            />
         </div>
      </>
   );
};

const Message = ({
   text,
   mode,
}: {
   text: string;
   mode: 'error' | 'success';
}) => {
   return (
      <p
         className={cn(
            'w-full p-1 font-semibold text-white text-xs rounded-sm',
            mode === 'error' ? 'bg-red-500' : 'bg-green-700'
         )}
      >
         {mode === 'error' ? (
            <CircleAlert size={18} className="inline-block mr-2" />
         ) : (
            <CircleCheck size={18} className="inline-block mr-2" />
         )}
         {text}
      </p>
   );
};

export default function RegisterForm() {
   const [errors, setErrors] = useState({});
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [isPending, setIsPending] = useState(false);

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage(null);
      setGlobalError(null);
      setIsPending(true);
      const res = await registerUserCompany(new FormData(e.currentTarget));
      if (!res.success) {
         if (res.error.name === InputParsedError.name) {
            setErrors(res.error.data!);
         } else {
            setGlobalError(res.error.message ?? null);
         }
      } else {
         setSuccessMessage(
            'Your Company account created successfully, please continue to login with your account'
         );
      }
      setIsPending(false);
   };

   return (
      <Form
         className="flex flex-col gap-4"
         // validationBehavior="native"
         onSubmit={submitHandler}
         validationErrors={errors}
      >
         <RegisterFormAccountSection />
         <Spacer />
         <RegisterFormCompanySection />
         <Spacer />
         {globalError && <Message mode="error" text={globalError} />}
         {successMessage && <Message mode="success" text={successMessage} />}

         <Button
            className="w-full bg-ecowood-primary text-white"
            type="submit"
            isLoading={isPending}
         >
            Register
         </Button>
         <p className="text-center text-sm">
            Already have an account?{' '}
            <Link
               href={HREF_LINK.LOGIN}
               className="text-primary hover:underline text-blue-500"
            >
               Login here
            </Link>
         </p>
      </Form>
   );
}
