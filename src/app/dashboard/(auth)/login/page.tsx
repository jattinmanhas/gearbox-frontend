import React from 'react'
import { AdminLogin } from '@/lib/adminAuth';
import AdminLoginForm from '@/components/Auth/Admin/AdminLogin/adminLogin';

export default function AdminLoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-2 md:m-10">
        <h3 className="text-xl font-semibold text-neutral-400">GearBox</h3>
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <AdminLoginForm action={AdminLogin} />
      </div>
    </>
  );
}
