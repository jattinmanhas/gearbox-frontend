"use client";
import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import InputLabel from "./inputLabel";
import TextareaLabel from "./textareaLabel";
import GreenButton from "../Buttons/GreenButton";
import SuccessMessage from "../SuccessMessage";
import CategoryDropdown from "../ShopComponents/CategoryDropdown";
import { CategorySearch } from "@/types/shop/shopTypes";


export default function ProductsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selected, setSelected] = useState<CategorySearch | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData(event.currentTarget);
      
      // Add category_id to formData if selected
      if (selected?.category_id) {
        formData.append('category_id', selected.category_id);
      }

      console.log(formData);

      // const response = await fetch('https://localhost:8080/api/shop/createProduct', {
      //   method: 'POST',
      //   body: formData,
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to create product');
      // }

      // setSuccess(data.message || 'Product created successfully');
      // event.currentTarget.reset();
      // setSelected(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-2">
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <TextareaLabel
          labelName="Product Description"
          textareaId="product_description"
          placeholder="Enter Product Description"
        />
        
        <div className="flex flex-col mt-3">
          <InputLabel
            labelName="Product Images"
            inputId="file"
            placeholder="Upload Product Images"
            type="file"
          />
        </div>

        <GreenButton 
          name={loading ? "Creating..." : "Submit"} 
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
