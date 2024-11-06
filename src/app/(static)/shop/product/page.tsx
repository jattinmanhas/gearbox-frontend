import React, { Suspense } from "react";
import { getAllProducts } from "@/lib/shop";
import { ProductCard } from "@/components/Cards/Card";
import { Spinner } from "flowbite-react";
import { Card } from "../cart/CartCard";

export default async function GetAllProducts() {
  const allProducts = await getAllProducts(0, 10);
  if (allProducts.status !== 200 || allProducts.data == null) {
    allProducts.data = [];
  }

  return (
    <div className="w-11/12 m-auto mb-6">
      <h2 className="my-4 text-2xl font-bold underline">ALL PRODUCTS</h2>
      <Suspense
        fallback={
          <div className="m-auto text-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        {allProducts.data.length <= 0 ? (
          <Card key="-1" className="bg-gray-800 dark:border-gray-700 p-4 mt-6">
            <h1 className="text-center">PRODUCTS NOT FOUND</h1>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {allProducts.data.map((product, index) => (
              <ProductCard
                key={index}
                id={product.product_id}
                name={product.name}
                category={product.category.name}
                image={product.images[0].signedUrl || ""}
                price={{
                  current: Number(product.price),
                  original: Number(product.price) + 100,
                }}
                rating={{ value: Number(product.Ratings), count: 1287 }}
                tag={product.tag}
                wholeProduct={product}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
