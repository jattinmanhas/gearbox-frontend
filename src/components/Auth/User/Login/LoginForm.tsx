"use client";
import Link from "next/link";
import GreenButton from "@/components/Buttons/GreenButton";
import { useFormState } from "react-dom";
import { InitialState } from "@/constants/constants";
import {
  LoginFormProps,
  UserLoginResponse,
} from "@/types/forms/loginAuthTypes";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import OAuthButton from "@/components/Buttons/OAuthButton";

export default function LoginForm({ action }: LoginFormProps) {
  const [state, formAction] = useFormState(action, InitialState);
  const router = useRouter();
  const {setUser} = useUserStore();

  useEffect(() => {
    if (state.status === 200) {
      console.log(state.data);
      setUser(state.data as UserLoginResponse);
      router.push("/");
    }
  }, [state]);

  return (
    <div className="mt-14 border rounded-md border-neutral-700 bg-neutral-900 px-8 py-8 w-full md:w-1/2 lg:w-2/5">
      {state.message && state.status !== 200 && (
        <ErrorMessage message={state.message} />
      )}
      <form action={formAction}>
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
      <OAuthButton/>
    </div>
  );
}
