import CollectionsForm from "@/components/Forms/collectionsForm";
import { InitialState } from "@/constants/constants";
import { createNewCategory } from "@/lib/dashboard";
import React from "react";

export default function AddNewProductPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="w-full">
        <h4 className="text-2xl">Create Category</h4>
        <hr></hr>
        <CollectionsForm />
      </div>
    </div>
  );
}
