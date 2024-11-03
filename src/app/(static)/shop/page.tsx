import CategoryListing from "@/components/ShopComponents/CategoryListing";
import ProductCard from "@/components/ShopComponents/productCard";
import ShopHeader from "@/components/ShopComponents/ShopHeader";
import {
  getAllCategories,
  getAllProducts,
  getUserCartItemsCount,
} from "@/lib/shop";
import { ProductType, singleCategoryType } from "@/types/shop/shopTypes";
import Image from "next/image";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import ShopHero from "@/components/ShopComponents/ShopHero";

async function getCookiesData() {
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
  const allCategories = await getAllCategories(0, 3);
  if(allCategories.status !== 200){
    allCategories.data = [];
  }
  const allProducts = await getAllProducts(0, 10);
  if(allProducts.status !== 200){
    allProducts.data = [];
  }
  const userId = await getCookiesData();
  let cartCount;

  if (userId == null) {
    cartCount = 0;
  } else {
    const cartCountData = await getUserCartItemsCount(userId);
    if(cartCountData.status === 200){
      cartCount = cartCountData.data;
    }else{
      cartCount = 0;
    }
  }

  return (
    <div className="w-11/12 m-auto">
      <ShopHeader cartCount={cartCount} />
      <ShopHero />
      {/* <div
        style={{
          width: "100%",
          height: "400px",
          position: "relative",
          margin: "auto",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shopping Header"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div> */}
      <Suspense fallback={<p>Loading Categories...</p>}>
        <div className="border mt-6 mb-6 p-4 rounded flex justify-around bg-neutral-800 shadow-md">
          {allCategories.data.length <= 0 ? (
            <h1>No Categories Found</h1>
          ) : (
            allCategories.data.map((cat: singleCategoryType) => (
              <CategoryListing key={cat.category_id} categoryList={cat} />
            ))
          )}
        </div>
      </Suspense>

      <Suspense fallback={<p>Loading Products...</p>}>
        {allProducts.data.length <= 0 ? (
          <h1 className="text-center text-2xl">NO PRODUCTS FOUND</h1>
        ) : (
          <div className="m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center items-center place-items-center">
            {allProducts.data.map((prod: ProductType) => (
              <ProductCard key={prod.product_id} singleProduct={prod} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ShopPage;
