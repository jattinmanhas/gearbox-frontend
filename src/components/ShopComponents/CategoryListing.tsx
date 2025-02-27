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
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-start mb-8 text-white">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            href={`shop/category/${category.name}/${category.category_id}`}
            key={category.category_id}
            className="group relative block overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Category Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-800">
              <Image
                src={String(category.signedUrl)}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 40vw, (max-width: 768px) 23vw, (max-width: 1024px) 15vw, 10vw"
              />
            </div>

            {/* Category Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-gray-900/70 to-transparent">
              <h3 className="text-lg font-semibold text-white text-center">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;