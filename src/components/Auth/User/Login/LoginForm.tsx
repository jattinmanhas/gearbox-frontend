"use client";
import Link from "next/link";
import GreenButton from "@/components/Buttons/GreenButton";
import { useState } from "react";
import {
  LoginFormProps,
  UserLoginResponse,
} from "@/types/forms/loginAuthTypes";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import OAuthButton from "@/components/Buttons/OAuthButton";

interface State {
  status: number | null;
  message: string;
  data: UserLoginResponse | null;
}

export default function LoginForm({ action }: LoginFormProps) {
  const [state, setState] = useState<State>({ status: null, message: "", data: null });
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await action(formData);
    setState({ status: response.status, message: response.message, data: response.data });

    if (response.status === 200) {
      setUser(response.data as UserLoginResponse);
      router.push("/");
    }
  };

  return (
    <div className="mt-14 border rounded-md border-neutral-700 bg-neutral-900 px-8 py-8 w-full md:w-1/2 lg:w-2/5">
      {state.message && state.status !== 200 && (
        <ErrorMessage message={state.message} />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col">
            <label className="defaultLabel">Username Or Email Address</label>
            <input
              id="username"
              type="text"
              name="username"
              className="defaultInput mb-4"
              placeholder="Email/Username"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <label className="defaultLabel">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="defaultInput mb-4"
              placeholder="•••••••••••••"
            />
          </div>
          <div>
            <GreenButton type="submit" name="Log In" />
          </div>
        </div>
      </form>
      <div>
        <Link className="flex justify-end" href="/forgot-password">
          Forgot Password?
        </Link>
      </div>
      <OAuthButton />
    </div>
  );
}
