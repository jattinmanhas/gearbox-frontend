"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Link from "next/link";
import React from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import InputLabel from "@/components/Forms/inputLabel";
import { Signup } from "@/lib/auth";

export default function SignupForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await Signup(formData);

    if (response.status === 200) {
      router.push("/login");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      <div className="col-span-12 mt-6 lg:mt-0">
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        {/* Name fields in one row */}
        <div className="grid grid-cols-3 gap-4">
          <InputLabel 
            labelName="First Name"
            inputId="firstName"
            placeholder="Enter First Name"
            type="text"
            className="text-white"
          />
          <InputLabel 
            labelName="Middle Name"
            inputId="middleName"
            placeholder="Enter Middle Name"
            type="text"
            className="text-white"
          />
          <InputLabel 
            labelName="Last Name"
            inputId="lastName"
            placeholder="Enter Last Name"
            type="text"
            className="text-white"
          />
        </div>

        {/* Email and Username in one row */}
        <div className="grid  gap-4">
          <InputLabel 
            labelName="Email"
            inputId="email"
            placeholder="Enter Email"
            type="email"
            className="text-white" 
          />
          <InputLabel 
            labelName="Username"
            inputId="username"
            placeholder="Enter Username"
            type="text"
            className="text-white" 
          />
        </div>

        {/* Password field */}
        <div>
          <InputLabel
            labelName="Password"
            inputId="password"
            placeholder="Enter Password"
            type="password"
            className="text-white" 
          />
        </div>

        {/* Terms and conditions */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our
          <a href="#" className="text-gray-700 underline dark:text-gray-200">
            &nbsp;terms and conditions&nbsp;
          </a>
          and
          <a href="#" className="text-gray-700 underline dark:text-gray-200">
            &nbsp;privacy policy&nbsp;
          </a>.
        </div>

        {/* Submit button and login link */}
        <div className="flex items-center justify-between gap-4">
          <GreenButton type="submit" name="Create an Account" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              href="/login"
              className="text-gray-700 underline dark:text-gray-200"
            >
              &nbsp;Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
