import { singleCategoryType } from '@/types/shop/shopTypes';
import Image from 'next/image';
import React from 'react'

type CategoryListingProps = {
  categoryList: singleCategoryType;
};


export default function CategoryListing({ categoryList }: CategoryListingProps) {
  return (
    <div className="flex flex-col place-items-center">
      <Image src={categoryList.signedUrl} alt={categoryList.name} width={60} height={60} className='min-h-14 rounded' objectFit='cover'/>
      <h5 className='pt-1'>{categoryList.name}</h5>
    </div>
  );
}
