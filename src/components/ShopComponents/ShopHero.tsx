// import React from "react";

// export default function ShopHero() {
//   return (
//     <section className="bg-inherit border border-neutral-600 rounded">
//       <div className="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
//         <div className="mr-auto place-self-center lg:col-span-7">
//           <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
//             Payments tool for software companies
//           </h1>
//           <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
//             From checkout to global sales tax compliance, companies around the
//             world use Flowbite to simplify their payment stack.
//           </p>
//           <button
//             className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-900 hover:bg-green-700 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-900"
//           >
//             Get started
//             <svg
//               className="w-5 h-5 ml-2 -mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//           </button>
//         </div>
//         <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
//           <img
//             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
//             alt="mockup"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { ShoppingBag, Star, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const ShopHero = () => {
  const featuredProducts = [
    {
      name: "Premium Wireless Headphones",
      price: "$299",
      rating: 4.9,
      reviews: 1287,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "SmartWatch Pro Series",
      price: "$199",
      rating: 4.8,
      reviews: 956,
      image: "/api/placeholder/300/300",
    },
    {
      name: "Ultra Phone 15",
      price: "$899",
      rating: 4.9,
      reviews: 2341,
      image: "/api/placeholder/300/300",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 rounded">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-green-500/20 blur-xl" />
        <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-blue-500/20 blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 h-36 w-36 rounded-full bg-indigo-500/20 blur-xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-purple-400">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Free Shipping over $50
              </span>
              <span className="flex items-center text-purple-400">
                <Star className="mr-2 h-5 w-5" />
                Trusted by 1M+ customers
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Next-Gen
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Gadgets
                </span>
                <br />
                For Future Living
              </h1>

              <p className="mb-8 text-lg text-gray-300">
                Discover cutting-edge technology that transforms your daily
                life. Premium gadgets with exclusive deals and instant rewards.
              </p>

              <Link href="/shop/product">
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-all hover:scale-105">
                    Shop Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </Link>
            </div>

            {/* Right Column - Featured Products */}
            <div className="relative">
              <div className="grid gap-6">
                {featuredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-gray-900/50 p-4 backdrop-blur-sm transition-all hover:bg-gray-900/70"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 overflow-hidden rounded-xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white">
                          {product.name}
                        </h3>
                        <div className="mb-2 flex items-center space-x-2">
                          <span className="flex items-center text-yellow-400">
                            <Star className="mr-1 h-4 w-4 fill-current" />
                            {product.rating}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-white">
                            {product.price}
                          </span>
                          <button className="rounded-full bg-purple-600 p-2 text-white opacity-0 transition-all group-hover:opacity-100">
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
