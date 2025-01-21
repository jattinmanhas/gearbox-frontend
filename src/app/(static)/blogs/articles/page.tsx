import React, { Suspense } from "react";
import { getAllProducts } from "@/lib/shop";
import { BlogPostCard } from "@/components/Cards/Card";
import { Spinner } from "flowbite-react";
import { Card } from "../../shop/cart/CartCard";
import { getAllBlogs } from "@/lib/blog";

export default async function GetAllArticles() {
  const blogPosts = await await getAllBlogs(0, 10);
  if (blogPosts.status !== 200 || blogPosts.data == null) {
    blogPosts.data = [];
  }

  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" "); // Split the text into an array of words
    return words.slice(0, wordLimit).join(" "); // Slice to the word limit and join back into a string
  };

  return (
    <div className="w-11/12 m-auto mb-6">
      <h2 className="my-4 text-2xl font-bold underline">ALL ARTICLES</h2>
      <Suspense
        fallback={
          <div className="m-auto text-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        {blogPosts.data.length <= 0 ? (
          <Card key="-1" className="bg-gray-800 dark:border-gray-700 p-4 mt-8">
            <h1 className="text-center">ARTICLES NOT FOUND</h1>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {blogPosts.data.map((post, index) => (
              <BlogPostCard
                key={index}
                id={post.id}
                title={post.title}
                category={post.category?.name!}
                readTime={String(Math.floor(Math.random() * (15 - 5 + 1)) + 5)}
                image={post.mainImageSignedUrl || ""}
                excerpt={limitWords(post.description, 20)}
                author={{ name: post.author.fullname }}
                publishDate={new Date(String(post.createdAt)).toLocaleDateString()}
                featured={true}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
