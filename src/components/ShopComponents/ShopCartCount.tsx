"use client";
import { useCartStore } from '@/store/userCartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function ShopCartCount() {
   const { totalItems } = useCartStore();
  return (
    <div className="relative flex justify-between place-content-center align-middle">
      <Link href="/shop/cart">
        <ShoppingCart className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      </Link>
    </div>
  );
}
