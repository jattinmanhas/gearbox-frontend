// app/cart/page.tsx
import { CartButton } from "@/components/Buttons/CartButton";
import { Card, CardContent } from "./CartCard";
import Image from "next/image";
import CartQuantityUpdate from "./CartQuantityUpdate";
import { getUserCartItems } from "@/lib/shop";

export default async function CartPage() {
  const userId = "3c718840-b870-4c61-b0f2-be2f2a09b039";
  const cartItemsResponse = await getUserCartItems(userId);
  let cartItems;
  if(cartItemsResponse.status === 200){
    cartItems = cartItemsResponse.data.data;
  }else{
    cartItems = [];
  }
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total: number, item: any) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="bg-inherit min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6 underline">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-white text-xl ">
            <Card key="-1" className="bg-gray-800 dark:border-gray-700 p-10">
              Your Cart is Empty
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item: any) => (
              <Card
                key={item.cart_items_id}
                className="bg-gray-800 dark:border-gray-700"
              >
                <CardContent className="flex items-center p-4 space-x-4">
                  {/* Product Image */}
                  <Image
                    src={item.product.images[0].signedUrl}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h2 className="md:text-xl sm:text-lg text-white font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="dark:text-gray-300 text-neutral-200">
                      ${item.product.price}
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
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <CartButton
                size="lg"
                className="w-full mt-4 bg-green-900 hover:bg-green-700 text-white font-bold text-lg"
              >
                Proceed to Checkout
              </CartButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
