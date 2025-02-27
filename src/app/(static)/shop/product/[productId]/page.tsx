import React from 'react'
import ProductPage from './SingleProduct';
import { getSingleProductFromId } from '@/lib/shop';

export default async function SingleProductPage({ params }: { params: { productId : string } }) {
  const productId = params.productId;
  const getSingleProduct = await getSingleProductFromId(productId);

  // Handle error cases with proper error messages
  if(getSingleProduct.data === null){
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-white">No Product Found</h2>
      </div>
    );
  }

  if(getSingleProduct.status !== 200){
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-white">
          {typeof getSingleProduct.message === 'string' 
            ? getSingleProduct.message 
            : 'An error occurred while fetching the product'}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <ProductPage product={getSingleProduct.data} />
    </div>
  );
}
