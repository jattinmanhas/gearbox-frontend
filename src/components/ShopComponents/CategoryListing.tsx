// import { singleCategoryType } from '@/types/shop/shopTypes';
// import Image from 'next/image';
// import React from 'react'

// type CategoryListingProps = {
//   categoryList: singleCategoryType;
// };


// export default function CategoryListing({ categoryList }: CategoryListingProps) {
//   return (
//     <div className="flex flex-col place-items-center">
//       <Image src={categoryList.signedUrl} alt={categoryList.name} width={60} height={60} className='min-h-14 rounded' objectFit='cover'/>
//       <h5 className='pt-1'>{categoryList.name}</h5>
//     </div>
//   );
// }

// app/components/CategoryList.tsx
import { categoryType } from '@/types/shop/shopTypes';
import Image from 'next/image'
import Link from 'next/link'


interface CategoryListProps {
  categories: categoryType[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            href={`shop/category/${category.name}/${category.category_id}`}
            key={category.category_id}
            className="group hover:opacity-80"
          >
            <div className="bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-24">
                <Image
                  src={String(category.signedUrl)}
                  alt={category.name}
                  fill
                  className="object-cover overflow-hidden transition-transform"
                  sizes="(max-width: 640px) 40vw, (max-width: 768px) 23vw, (max-width: 1024px) 15vw, 10vw"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-medium text-white">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;