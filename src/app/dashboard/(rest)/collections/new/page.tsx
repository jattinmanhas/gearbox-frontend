import CollectionsForm from "@/components/Forms/collectionsForm";
import { InitialState } from "@/constants/constants";
import { createNewCategory } from "@/lib/dashboard";
import React from "react";

export default function AddNewProductPage() {
  return (
    <div className="m-9">
      <div className="w-full mt-12">
        <h4 className="text-2xl">Create Collection</h4>
        <hr></hr>
        <CollectionsForm />
      </div>
    </div>
  );
}
