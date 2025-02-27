"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { ProductCard } from "@/components/Cards/Card";
import { ProductType } from "@/types/shop/shopTypes";

const fetchSearchPrducts = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts...");
  }

  return response.json();
};

export default function ProductsSearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholderImage = "https://images.unsplash.com/photo-1568386453619-84c3ff4b43c5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    if (encodedSearchQuery) {
      setLoading(true);
      setError(null);

      fetchSearchPrducts(
        `https://localhost:8080/api/shop/product?search=${encodedSearchQuery}&skip=0&take=10`
      )
        .then((data) => {
          setProducts(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [encodedSearchQuery]);

  if (loading) return <div className="m-auto text-center"><Spinner className="h-8 w-8" /></div>;
  if (error) return <div className="m-auto text-center bg-red-900 border border-red-800 text-red-100 p-4 rounded text-xl">Error: {error}</div>;

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.product_id}
              name={product.name}
              category={product.category.name}
              image={product.images && product.images[0]?.signedUrl || placeholderImage}
              price={{
                current: Number(product.price),
                original: Number(product.price) + 100,
              }}
              rating={{ value: Number(product.Ratings), count: 1287 }}
              tag={product.tag}
              wholeProduct={product}
            />
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 bg-gray-800 p-8 rounded mt-4">
          No products found
        </div>
      )}
    </div>
  );
}
