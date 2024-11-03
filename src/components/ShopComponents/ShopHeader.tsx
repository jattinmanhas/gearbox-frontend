import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import SearchProducts from "./SearchProducts";

interface CartCountProps{
  cartCount: number
}

export default function ShopHeader({ cartCount }: CartCountProps) {
  return (
    <div id="scroll-element" className={` my-4`}>
      <div className="m-2 flex justify-between align-middle place-items-center">
        <h1 className="font-bold sm:text-md lg:text-2xl font-mono">
          GearBox Shop
        </h1>
        <SearchProducts />

        <div className="relative flex justify-between place-content-center align-middle">
          <Link href="/shop/cart">
            <ShoppingCart className="w-8 h-8 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
