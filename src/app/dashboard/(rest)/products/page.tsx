import React from "react";
import {ProductsColumns} from "./ProductsColumns";
import { ProductsDataTable } from "./ProductsDatatable";
import { getAllProducts } from "@/lib/shop";
import { Card } from "@/components/ui/card";

export default async function ProductsList() {
  const allProducts = await getAllProducts(0, 10000);
  if (allProducts.status !== 200 || allProducts.data == null) {
    allProducts.data = [];
  }

  return (
    <Card className="container w-11/12 m-auto px-4 py-4 mt-10 border">
      <h1 className="text-2xl underline underline-offset-4 mb-4">
        Products List
      </h1>
      <ProductsDataTable columns={ProductsColumns} data={allProducts.data} />
    </Card>
  );
}
