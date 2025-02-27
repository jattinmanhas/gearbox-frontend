"use client";
import { addItemToCart } from "@/lib/shop";
import { Spinner } from "flowbite-react";
import { ShoppingBag } from "lucide-react";
import React, { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/userCartStore";
import { ProductType } from "@/types/shop/shopTypes";

type ProductIdProps = {
  classname?: string;
  product: ProductType;
  buttonName?: string;
  addMargin?: boolean;
  onClick?: (event: any) => void;
};

export default function AddtoCartButton({
  classname,
  product,
  buttonName = "",
  addMargin = false,
  onClick,
}: ProductIdProps) {
  // const [cookies] = useCookies(["userData"]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = async (userId: string, productProp: ProductType) => {
    setLoading(true);
    try {
      if (!userId) {
        toast.error("Please LogIn to add Item to the Cart.");
        return;
      }
      await addItem(product);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <button
        className={`rounded-full bg-green-600 p-3 text-white transition-transform hover:scale-110 ${classname}`}
        // onClick={() => handleAddToCart(cookies.userData?.id, product)}
        disabled={loading}
      >
        <ShoppingBag className={`h-5 w-5 ${addMargin && "mr-1"}`} />
        {buttonName}
      </button>
    </>
  );
}
