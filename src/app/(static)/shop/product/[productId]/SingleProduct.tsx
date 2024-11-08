"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import AddtoCartButton from "@/components/Buttons/AddtoCartButton";
import { ProductType } from "@/types/shop/shopTypes";

// Product data interface
const ProductPage: React.FC<{ product: ProductType }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to format price
  const formatPrice = (amount: number, currency = "$") =>
    `${currency}${amount.toFixed(2)}`;

  // Handle image carousel navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-6 rounded-2xl overflow-hidden">
              <img
                src={product.images[currentImageIndex].signedUrl}
                alt={product.name}
                className="w-full h-[480px] object-cover"
              />
              <button
                className="absolute top-1/2 -translate-y-1/2 left-4 rounded-full bg-gray-800/50 p-2 text-white hover:bg-gray-800 transition"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-gray-800/50 p-2 text-white hover:bg-gray-800 transition"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-center space-x-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition ${
                    index === currentImageIndex
                      ? "border-2 border-purple-600"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image.signedUrl}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-green-400 text-sm">
                {product.category.name}
              </span>
              <h1 className="text-3xl font-bold text-white mt-2">
                {product.name}
              </h1>
            </div>

            <div className="mb-6 flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 text-white">{product.Ratings}</span>
              </div>
              <span className="text-gray-400">
                (100 reviews)
              </span>
            </div>

            <p className="text-gray-300 mb-8">{product.description}</p>

            <div className="mb-8">
              <span className="text-2xl font-bold text-white">
                {formatPrice(Number(product.price))}
              </span>
              {product.price && (
                <span className="text-gray-400 line-through ml-2">
                  {formatPrice(Number(product.price) + 100)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-8">
              {/* <button className="flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button> */}
              <AddtoCartButton classname="flex items-center justify-between px-6 py-3" product={product} buttonName="Add to Cart" addMargin={true} />
              <button className="rounded-full bg-gray-800/50 p-3 text-white hover:bg-gray-800 transition">
                <Heart className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-gray-800/50 p-3 text-white hover:bg-gray-800 transition">
                <Share className="h-5 w-5" />
              </button>
            </div>

            {/* <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                You may also like
              </h3>
              Recommended products go here
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
