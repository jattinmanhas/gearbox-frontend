import React from 'react'
import ProductPage from './SingleProduct';
import { getSingleProductFromId } from '@/lib/shop';
import { ProductType } from '@/types/shop/shopTypes';


export default  async function SingleProductPage({ params }: { params: { productId : string } }) {
  const productId = params.productId;
  const getSingleProduct = await getSingleProductFromId(productId);

  if(getSingleProduct.data === null){
    return <div>No Product Found</div>
  }

  if(getSingleProduct.status !== 200){
    return <div>{getSingleProduct.message}</div>
  }
  

  return (
    <div>
      <ProductPage product={getSingleProduct.data} />
    </div>
  );
}
