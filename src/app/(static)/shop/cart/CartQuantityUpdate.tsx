"use client";
import { CartButton } from "@/components/Buttons/CartButton";
import { deleteItemFromUserCart } from "@/lib/shop";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/userCartStore";
import { CartItemsType, ProductType } from "@/types/shop/shopTypes";
import { Trash } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartUpdateItems = {
  item : CartItemsType
}

export default function CartQuantityUpdate({ item }: CartUpdateItems) {
  const { user } = useUserStore();
  const { addItem, decreaseQuantity, removeItem } = useCartStore();

  // const deleteItemFromCart = async (id: number, userid: string) => {
  //   const del = await deleteItemFromUserCart(userid, id);
  //   if (del.status === 200) {
  //     toast.success(del.message);
  //   } else {
  //     toast.error(del.message);
  //   }
  // };

  return (
    <div className="flex items-center space-x-2">
      <CartButton
        variant="outline"
        size="sm"
        onClick={() => decreaseQuantity(item.product_id)}
        className="border-gray-600"
      >
        -
      </CartButton>
      <span className="text-white">{item.quantity}</span>
      <CartButton
        variant="outline"
        size="sm"
        onClick={() => addItem(item)}
        className="border-gray-600 text-white"
      >
        +
      </CartButton>

      <div className="text-white font-bold m-auto">
        ${(Number(item.price) * item.quantity).toFixed(2)}
      </div>

      <CartButton
        asChild
        size="sm"
        className="bg-red-500 text-white p-2 hover:bg-red-700 cursor-pointer"
        onClick={() => removeItem(item.product_id)}
      >
        <Trash className="h-8 w-8" />
      </CartButton>

      <ToastContainer />
    </div>
  );
}
