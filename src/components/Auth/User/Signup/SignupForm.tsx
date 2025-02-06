"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { InitialState } from "@/constants/constants";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import { LoginFormProps } from "@/types/forms/loginAuthTypes";

export default function SignupForm({ action }: LoginFormProps) {
  const [state, formAction] = useFormState(action, InitialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === 200) {
      router.push("/login");
    }
  }, [state]);

  return (
    <>
      <div className="col-span-12 mt-6 lg:mt-0">
        {state.message && state.status !== 200 && (
          <ErrorMessage message={state.message} />
        )}
      </div>
      <form action={formAction} className="mt-2 grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <label htmlFor="fullname" className="defaultLabel">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            id="fullname"
            name="fullname"
            className="mt-1 w-full defaultInput"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="Email" className="defaultLabel">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full defaultInput"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="username" className="defaultLabel">
            Username <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 w-full defaultInput"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="Password" className="defaultLabel">
            Password <span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full defaultInput"
          />
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our
            <a href="#" className="text-gray-700 underline dark:text-gray-200">
              &nbsp;terms and conditions&nbsp;
            </a>
            and
            <a href="#" className="text-gray-700 underline dark:text-gray-200">
              &nbsp;privacy policy&nbsp;
            </a>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <GreenButton type="submit" name="Create an Account" />
          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400 text-center">
            Already have an account?
            <Link
              href="/login"
              className="text-gray-700 underline dark:text-gray-200"
            >
              &nbsp;Log in
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}
