import { ProductCard } from "@/components/Cards/Card";
import { getAllProductsInSingleCategory } from "@/lib/shop";
import { Spinner } from "flowbite-react";
import React, { Suspense } from "react";
import { Card } from "../../cart/CartCard";
import { ProductResponse, ProductType } from "@/types/shop/shopTypes";

export default async function CategoriesProductsList({
  params,
}: {
  params: { categoryId: string[] };
}) {
    const products  = await getAllProductsInSingleCategory(params.categoryId[1]);
    if(products.status !== 200 || products.data === null){
        products.data = [];
    }

    const placeholderImage = "https://images.unsplash.com/photo-1568386453619-84c3ff4b43c5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const category_name = decodeURIComponent(params.categoryId[0]);
  return (
    <div className="w-11/12 m-auto">
      <h1 className="text-xl my-4">
        Showing Products For Category:{" "}
        <span className="font-bold">({category_name})</span>
      </h1>
      <Suspense
        fallback={
          <div className="m-auto text-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        {products.data.length <= 0 ? (
          <Card key="-1" className="bg-gray-800 dark:border-gray-700 p-4 mt-6">
            <h1 className="text-center">PRODUCTS NOT FOUND</h1>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.data.map((product, index) => (
              <ProductCard
                key={index}
                id={product.product_id}
                name={product.name}
                category={product.category.name}
                image={product.images && product.images[0]?.signedUrl || placeholderImage}
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
