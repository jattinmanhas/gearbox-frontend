import ShopHeader from "@/components/ShopComponents/ShopHeader";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/shop";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import ShopHero from "@/components/ShopComponents/ShopHero";
import { ProductCard } from "@/components/Cards/Card";
import CategoryList from "@/components/ShopComponents/CategoryListing";
import { Card } from "./cart/CartCard";

const ShopPage = async () => {
  const allCategories  = await getAllCategories(6, 5);
  console.log(allCategories);
  if (allCategories.status !== 200 || allCategories.data == null) {
    allCategories.data = [];
  }
  const allProducts = await getAllProducts(0, 10);
  
  // Default placeholder image - you can use the same one from SingleProduct component
  const placeholderImage = "https://images.unsplash.com/photo-1568386453619-84c3ff4b43c5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  if (allProducts.status !== 200 || allProducts.data == null) {
    allProducts.data = [];
  }
  // const userId = await getCookiesData();

  return (
    <div className="w-11/12 m-auto">
      <ShopHeader />
      <ShopHero featuredProducts={allProducts.data.slice(0,3)} />
      <Suspense fallback={<p>Loading Categories...</p>}>
        <div className="border mt-6 mb-6 p-2 rounded flex justify-around shadow-md">
          {allCategories.data.length <= 0 ? (
            <div className="text-center text-xl p-4 rounded-lg shadow-inner">
              <h1 className="text-gray-300">NO CATEGORIES FOUND</h1>
              <p className="text-gray-500 text-sm md:text-md">Please check back later or explore our blogs.</p>
            </div>
          ) : (
            <CategoryList categories={allCategories.data} />
          )}
        </div>
      </Suspense>

      <Suspense fallback={<p>Loading Products...</p>}>
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
};

export default ShopPage;
