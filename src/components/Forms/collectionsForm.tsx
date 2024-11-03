"use client";
import React from "react";
import ErrorMessage from "../ErrorMessage";
import InputLabel from "./inputLabel";
import TextareaLabel from "./textareaLabel";
import GreenButton from "../Buttons/GreenButton";
import { useFormState } from "react-dom";
import { InitialState } from "@/constants/constants";
import { createNewCategory } from "@/lib/dashboard";
import SuccessMessage from "../SuccessMessage";

export default function CollectionsForm() {
  const [state, formAction] = useFormState(createNewCategory, InitialState);
  return (
    <div>
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

      <form action={formAction}>
        <InputLabel
          labelName="Category Name"
          inputId="category_name"
          placeholder="Enter Category Name"
          type="text"
        />

        <TextareaLabel
          labelName="Category Description"
          textareaId="category_description"
          placeholder="Enter Category Description"
        />

        <InputLabel
          labelName="Upload Image"
          inputId="file"
          placeholder="Upload Image"
          type="file"
        />

        <GreenButton name="Submit" type="submit" />
      </form>
    </div>
  );
}
