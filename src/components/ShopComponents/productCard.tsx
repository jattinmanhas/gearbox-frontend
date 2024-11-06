import { ProductType } from '@/types/shop/shopTypes';
import Link from 'next/link';
import React from 'react'
import AddtoCartButton from '../Buttons/AddtoCartButton';

type SingleProductProps = {
  singleProduct: ProductType;
};

export default function ProductCard({singleProduct}: SingleProductProps) {
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-400 bg-zinc-800 shadow-md">
      <Link href={`/shop/product/${singleProduct.product_id}`}>
        <div
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        >
          <img
            className="object-cover w-full"
            src={singleProduct.images[0].signedUrl}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <div>
            <h5 className="text-xl tracking-tight text-white">
              {singleProduct.name}
            </h5>
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-white">
                ${singleProduct.price}
              </span>
            </p>
            <div className="flex items-center">
              <span className=" ml-3 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold">
                {singleProduct.Ratings}
              </span>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
        </div>
      </Link>
      <AddtoCartButton product={singleProduct} />
    </div>
  );
}
