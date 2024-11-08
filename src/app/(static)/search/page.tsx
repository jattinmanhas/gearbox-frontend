"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApiResponse } from "@/types/contact.type";
import { BlogPostCard, ProductCard } from "@/components/Cards/Card";
import { Spinner } from "flowbite-react";

const fetchBoth = async (url: string) => {
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

const SearchPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useSearchParams();
  const searchQuery = search ? search.get("query") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [both, setBoth] = useState<ApiResponse>({ products: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" "); // Split the text into an array of words
    return words.slice(0, wordLimit).join(" "); // Slice to the word limit and join back into a string
  };

  useEffect(() => {
    if (encodedSearchQuery) {
      setLoading(true);
      setError(null);

      fetchBoth(`http://localhost:8080/searchBoth?query=${encodedSearchQuery}`)
        .then((data) => {
          setBoth(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [encodedSearchQuery]);

  if (loading)
    return (
      <div className="m-auto text-center mt-8">
        <Spinner className="h-8 w-8" />
      </div>
    );
  if (error)
    return (
      <div className="m-auto mt-8 text-center bg-red-800 border border-red-300 text-red-100 p-4 rounded text-xl">
        Error: {error}
      </div>
    );

  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <div className="w-11/12 mx-auto pt-8 pb-16 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Search Products and Blogs</h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-neutral-800 rounded border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl underline underline-offset-4">
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {both.products.length <= 0 ? (
                  <div>Products Not Found</div>
                ) : (
                  both.products.map((product, index) => (
                    <ProductCard
                      key={index}
                      id={product.product_id}
                      name={product.name}
                      category={product.category.name}
                      image={product.images[0].imageName || ""}
                      price={{
                        current: Number(product.price),
                        original: Number(product.price) + 100,
                      }}
                      rating={{ value: Number(product.Ratings), count: 1287 }}
                      tag={product.tag || ""}
                      wholeProduct={product}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl underline underline-offset-4">
                  Blogs
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
                {both.blogs.length <= 0 ? (
                  <div>Blogs Not found...</div>
                ) : (
                  both.blogs.map((post, index) => (
                    <BlogPostCard
                      key={index}
                      id={post.id}
                      title={post.title}
                      category={post.category?.name!}
                      readTime={String(
                        Math.floor(Math.random() * (15 - 5 + 1)) + 5
                      )}
                      image={post.mainImage || ""}
                      excerpt={limitWords(post.description, 20)}
                      author={{ name: post.author.fullname }}
                      publishDate={post.createdAt}
                      featured={true}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
