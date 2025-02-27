// app/cart/page.tsx
"use client";
import { CartButton } from "@/components/Buttons/CartButton";
import { Card, CardContent } from "./CartCard";
import Image from "next/image";
import CartQuantityUpdate from "./CartQuantityUpdate";
import { useCartStore } from "@/store/userCartStore";
import AddressDisplay from "@/components/ShopComponents/UserAddress";
import { loadStripe } from "@stripe/stripe-js";
import { stripePayment } from "@/lib/shop";
import { toast } from "react-toastify";

export default function CartPage() {
  // const userId = await getCookiesData();
  const { items, totalPrice } = useCartStore();


  const makePayment = async () => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    const payments = await stripePayment(items);
    const result = await stripe?.redirectToCheckout({
      sessionId: payments.data as string,
    });

    if (result?.error) {
      toast.error("Failed to make Payment");
    }
  };

  return (
    <div className="bg-inherit min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6 underline">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center text-white text-xl ">
            <Card key="-1" className="bg-gray-800 dark:border-gray-700 p-10">
              Your Cart is Empty
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <Card key={index} className="bg-gray-800 dark:border-gray-700">
                <CardContent className="flex items-center p-4 space-x-4">
                  {/* Product Image */}
                  <Image
                    src={item.images[0].signedUrl!}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h2 className="md:text-xl sm:text-lg text-white font-semibold">
                      {item.name}
                    </h2>
                    <p className="dark:text-gray-300 text-neutral-200">
                      ${item.price}
                    </p>
                  </div>

                  <CartQuantityUpdate item={item} />
                </CardContent>
              </Card>
            ))}

            {/* Cart Summary */}
            <div className="bg-gray-800  rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl text-white font-bold">Total</span>
                <span className="text-2xl text-white font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <CartButton
                size="lg"
                className="w-full mt-4 bg-green-900 hover:bg-green-700 text-white font-bold text-lg"
                onClick={makePayment}
              >
                Proceed to Checkout
              </CartButton>
            </div>
          </div>
        )}

        {/* <AddressDisplay userId={cookies.userData.id} /> */}
      </div>
    </div>
  );
}
