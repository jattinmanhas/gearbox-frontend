import GreenButton from '@/components/Buttons/GreenButton';
import ProductsForm from '@/components/Forms/productForm';
import React from 'react'

export default function AddNewProductPage() {
  return (
    <div className="m-9">
      <div className="w-full mt-12">
        <h4 className="text-2xl">Create New Product</h4>
        <hr></hr>
        <ProductsForm />
      </div>
    </div>
  );

}
