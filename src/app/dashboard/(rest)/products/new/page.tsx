import GreenButton from '@/components/Buttons/GreenButton';
import ProductsForm from '@/components/Forms/productForm';
import React from 'react'

export default function AddNewProductPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="w-full">
        <h4 className="text-xl md:text-3xl">Create New Product</h4>
        <hr className='mt-2'></hr>
        <ProductsForm />
      </div>
    </div>
  );

}
