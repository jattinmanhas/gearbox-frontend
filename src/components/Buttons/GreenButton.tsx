"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type GreenButton = {
  name: string;
  type: "button" | "submit" | "reset";
};

export default function GreenButton({ name, type }: GreenButton) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        className="block w-full px-4 py-2 my-3 font-semibold transition-all duration-300 ease-out bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75 text-white"
        type={type}
        disabled={pending}
      >
        {pending ? "Submitting..." : name}
      </button>
    </>
  );
}
