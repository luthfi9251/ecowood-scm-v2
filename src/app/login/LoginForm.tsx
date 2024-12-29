'use client';
import { HREF_LINK } from '@/constant/href-link';
import { Button } from '@nextui-org/button';
import { Form } from '@nextui-org/form';
import { Input } from '@nextui-org/input';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { loginUser } from '../_actions/login';
import { InputParsedError } from '@/lib/entities/error/common';

function LoginForm() {
   const [errors, setErrors] = useState({});
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [passVisibility, setPassVisibility] = useState(false);
   const [isPending, setIsPending] = useState(false);

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage(null);
      setGlobalError(null);
      setIsPending(true);
      const res = await loginUser(new FormData(e.currentTarget));
      if (!res.success) {
         if (res.error.name === InputParsedError.name) {
            setErrors(res.error.data!);
         } else {
            setGlobalError(res.error.message ?? null);
         }
      } else {
         setSuccessMessage('Log In success, please wait');
      }
      setIsPending(false);
   };

   return (
      <Form
         onSubmit={submitHandler}
         validationErrors={errors}
         className="flex flex-col gap-4"
         validationBehavior="native"
      >
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
         <Button
            className="w-full bg-ecowood-primary text-white"
            type="submit"
            isLoading={isPending}
         >
            Log In
         </Button>
         <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link
               href={HREF_LINK.REGISTER}
               className="text-primary hover:underline"
            >
               Register here
            </Link>
         </p>
      </Form>
   );
}

export default LoginForm;
