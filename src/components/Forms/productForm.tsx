"use client";
import React, { useEffect, useState, useRef } from "react";
import ErrorMessage from "../ErrorMessage";
import InputLabel from "./inputLabel";
import TextareaLabel from "./textareaLabel";
import GreenButton from "../Buttons/GreenButton";
import { useFormState } from "react-dom";
import { InitialState } from "@/constants/constants";
import { createNewProduct } from "@/lib/dashboard";
import SuccessMessage from "../SuccessMessage";
import CategoryDropdown from "../ShopComponents/CaregoryDropdown";

export interface CategorySearch {
  category_id : string,
  name: string;
  description: string;
}

export default function ProductsForm() {
  const [state, formAction] = useFormState(createNewProduct, InitialState);
  const [selected, setSelected] = useState<CategorySearch | null>(null);
  const [category_id, setCategoryId] = useState("");
  const productRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (selected && selected.category_id) {
      setCategoryId(selected.category_id);
    }
  }, [selected]);

  useEffect(() => {
    if(state.message && state.status === 200){
      productRef.current?.reset();
    }
  }, [state])

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

      <form ref={productRef} action={formAction}>
        <InputLabel
          labelName="Product Name"
          inputId="product_name"
          placeholder="Enter Product Name"
          type="text"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            labelName="Product Price"
            inputId="product_price"
            placeholder="Enter Product Price"
            type="text"
          />

          <InputLabel
            labelName="Product Stock"
            inputId="stock"
            placeholder="Enter Product Stock"
            type="number"
          />
        </div>

        <div className="flex flex-col mt-3">
          <label className="m-2" htmlFor="">
            Select Category: <span className="text-red-800">*</span>
          </label>
          <CategoryDropdown selected={selected} setSelected={setSelected} />
        </div>

        <input
          type="hidden"
          id="category_id"
          name="category_id"
          value={category_id}
        />
        <TextareaLabel
          labelName="Product Description"
          textareaId="product_description"
          placeholder="Enter Product Description"
        />
        <div className="flex flex-col mt-3">
          <label className="m-2" htmlFor="file">
            Product Images: <span className="text-red-800">*</span>
          </label>
          <input
            id="file"
            type="file"
            multiple
            name="file"
            className="block p-2 bg-inherit border focus:outline-green-800 rounded-lg mb-4 flex-1"
            placeholder="Upload Product Images"
          />
        </div>
        <GreenButton name="Submit" type="submit" />
      </form>
    </div>
  );
}
