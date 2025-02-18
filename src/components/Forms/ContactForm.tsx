"use client";
import React from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import TextareaLabel from "@/components/Forms/textareaLabel";
import InputLabel from "@/components/Forms/inputLabel";
import { useCookies } from "react-cookie";
import { InitialState } from "@/constants/constants";
import { useFormState } from "react-dom";
import { createContactUs } from "@/lib/contact";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

export default function ContactForm() {
  const [cookies] = useCookies(["userData"]);
  const [state, formAction] = useFormState(createContactUs, InitialState);

  return (
    <div className="rounded-lg shadow-md">
      <div className="mt-2">
        {state.message && state.status !== 200 && (
          <ErrorMessage message={state.message} />
        )}
      </div>
      <div className="mt-2">
        {state.message && state.status === 200 && (
          <SuccessMessage message={state.message} />
        )}
      </div>

      <form action={formAction} className="space-y-6">
        <div className="flex flex-col">
          <InputLabel
            labelName="Email"
            inputId="email"
            placeholder="Enter Email"
            type="text"
            className="text-white"
          />
        </div>
        <div className="flex flex-col">
          <InputLabel
            labelName="Subject"
            inputId="subject"
            placeholder="Enter Subject"
            type="text"
            className="text-white"
          />
        </div>

        <TextareaLabel
          labelName="Message"
          textareaId="message"
          placeholder="Enter Message"
          className="text-white"
        />
        <GreenButton name="Submit" type="submit" className="w-full" />
      </form>
    </div>
  );
}
