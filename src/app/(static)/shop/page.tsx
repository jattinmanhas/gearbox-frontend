import ShopHeader from "@/components/ShopComponents/ShopHeader";
import {
  getAllCategories,
  getAllProducts,
  getUserCartItemsCount,
} from "@/lib/shop";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import ShopHero from "@/components/ShopComponents/ShopHero";
import { ProductCard } from "@/components/Cards/Card";
import CategoryList from "@/components/ShopComponents/CategoryListing";


export async function getCookiesData() {
  "use server";
  const userData = await cookies().get("userData");

  if (userData && userData.value) {
    try {
      const userId = JSON.parse(userData?.value).id;
      return userId;
    } catch (error) {
      console.error("Failed to parse userData cookie:", error);
      return null;
    }
  }

  return null;
}


const ShopPage = async () => {
  const allCategories  = await getAllCategories(0, 3);
  if (allCategories.status !== 200 || allCategories.data == null) {
    allCategories.data = [];
  }
  const allProducts = await getAllProducts(0, 10);
  if(allProducts.status !== 200 || allProducts.data == null){
    allProducts.data = [];
  }
  const userId = await getCookiesData();

  return (
    <div className="w-11/12 m-auto">
      <ShopHeader />
      <ShopHero />
      <Suspense fallback={<p>Loading Categories...</p>}>
        <div className="border mt-6 mb-6 p-2 rounded flex justify-around shadow-md">
          {allCategories.data.length <= 0 ? (
            <h1 className="text-center text-xl">NO CATEGORIES FOUND</h1>
          ) : (
            <CategoryList categories={allCategories.data} />
          )}
        </div>
      </Suspense>

      <Suspense fallback={<p>Loading Products...</p>}>
        {allProducts.data.length <= 0 ? (
          <h1 className="text-center text-2xl">NO PRODUCTS FOUND</h1>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
};

export default ShopPage;
