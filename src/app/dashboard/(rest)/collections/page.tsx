import React from "react";
import { CategoryDataTable } from "./CategoryDatatable";
import { categoryColumns } from "./CategoriesColumns";
import { getAllCategories } from "@/lib/shop";
import { Card } from "@/components/ui/card";

export default async function Categories() {
    const allCategories = await getAllCategories(0, 10000);
    if (allCategories.status !== 200 || allCategories.data == null) {
      allCategories.data = [];
    }

  return (
    <Card className="container w-11/12 m-auto px-4 py-4 mt-10 border">
      <h1 className="text-2xl underline underline-offset-4 mb-4">
        Categories List
      </h1>
      <CategoryDataTable columns={categoryColumns} data={allCategories.data} />
    </Card>
  );
}
