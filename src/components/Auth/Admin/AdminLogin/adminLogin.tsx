"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import ErrorMessage from "@/components/ErrorMessage";
import { InitialState } from "@/constants/constants";
import { useUserStore } from "@/store";
import {
  LoginFormProps,
  UserLoginResponse,
} from "@/types/forms/loginAuthTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function AdminLoginForm({ action }: LoginFormProps) {
  const [state, formAction] = useFormState(action, InitialState);
  const router = useRouter();

  const { setUser } = useUserStore();

  useEffect(() => {
    if (state.status === 200) {
      setUser(state.data as UserLoginResponse);
      router.push("/dashboard");
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
            <label className="defaultLabel">
              Admin Username Or Email Address
            </label>
            <input
              id="adminUsername"
              type="text"
              name="adminUsername"
              className="defaultInput mb-4"
              placeholder="Admin Email/Username"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <label className="defaultLabel">Password</label>
            <input
              id="adminPassword"
              type="password"
              name="adminPassword"
              className="defaultInput mb-4"
              placeholder="•••••••••••••"
            />
          </div>
          <div>
            <GreenButton type="submit" name="Admin Log In" />
          </div>
        </div>
      </form>
    </div>
  );
}
