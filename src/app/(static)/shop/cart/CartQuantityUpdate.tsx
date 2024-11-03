"use client";
import { CartButton } from "@/components/Buttons/CartButton";
import { deleteItemFromUserCart } from "@/lib/shop";
import { useUserStore } from "@/store";
import { Trash } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartQuantityUpdate({ item }: any) {
  const { user } = useUserStore();

  const handleQuantityChange = (id: string, change: number) => {
    console.log("update quantity");
  };

  const deleteItemFromCart = async (id: number, userid: string) => {
    const del = await deleteItemFromUserCart(userid, id);
    if (del.status === 200) {
      toast.success(del.message);
    } else {
      toast.error(del.message);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <CartButton
        variant="outline"
        size="sm"
        onClick={() => handleQuantityChange(item.id, -1)}
        className="border-gray-600"
      >
        -
      </CartButton>
      <span className="text-white">{item.quantity}</span>
      <CartButton
        variant="outline"
        size="sm"
        onClick={() => handleQuantityChange(item.id, 1)}
        className="border-gray-600 text-white"
      >
        +
      </CartButton>

      <div className="text-white font-bold m-auto">
        ${item.product.price * item.quantity}
      </div>

      <CartButton
        asChild
        size="sm"
        className="bg-red-500 text-white p-2 hover:bg-red-700 cursor-pointer"
        onClick={() => deleteItemFromCart(item.cart_items_id, user?.id!)}
      >
        <Trash className="h-8 w-8" />
      </CartButton>

      <ToastContainer />
    </div>
  );
}
