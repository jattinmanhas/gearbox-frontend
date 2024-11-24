"use client";
import React from "react";
import { CardContent } from "../ui/card";
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
    <>
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

      <CardContent>
        <form action={formAction}>
          <div className="flex flex-col mt-3">
            <InputLabel
              labelName="Email"
              inputId="email"
              placeholder="Enter Email"
              type="text"
            />
          </div>
          <div className="flex flex-col mt-3">
            <InputLabel
              labelName="Subject"
              inputId="subject"
              placeholder="Enter Subject"
              type="text"
            />
          </div>

          <TextareaLabel
            labelName="Message"
            textareaId="message"
            placeholder="Enter Message"
          />
          <GreenButton name="Submit" type="submit" />
        </form>
      </CardContent>
    </>
  );
}
