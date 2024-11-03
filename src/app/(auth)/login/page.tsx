import LoginForm from '@/components/Auth/User/Login/LoginForm';
import Link from 'next/link';
import React from 'react'
import { Login } from '@/lib/auth';

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-2 md:m-10">
        <h3 className="text-xl font-semibold text-neutral-400">GearBox</h3>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <LoginForm action={Login} />
        <Link className="py-3" href="/signup">
          Dont have an account?
        </Link>
      </div>
    </>
  );
}
