import React from "react";
import { ShoppingBag, Star, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/types/shop/shopTypes";


const ShopHero: React.FC<{ featuredProducts: ProductType[] }> = ({ featuredProducts }) => {
  // Add placeholder image
  const placeholderImage = "https://images.unsplash.com/photo-1568386453619-84c3ff4b43c5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
                          src={product.images && product.images[0]?.signedUrl || placeholderImage}
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
                            {product.Ratings}
                          </span>
                          <span className="text-sm text-gray-400">
                            (100 reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-white">
                            {product.price}
                          </span>
                          <Link href={`/shop/product/${product.product_id}`}>
                            <button className="rounded-full bg-green-600 p-2 text-white opacity-0 transition-all group-hover:opacity-100">
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </Link>
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
