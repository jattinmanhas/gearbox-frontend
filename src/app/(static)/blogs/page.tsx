import React from "react";
import { ChevronRight, Cpu, Smartphone, Laptop } from "lucide-react";
import { BlogPostCard } from "@/components/Cards/Card";
import { BlogPostFormData, getAllBlogs } from "@/lib/blog";
import Link from "next/link";
import { FetchWrapperResponse } from "@/types/misc.types";

export default async function BlogPage() {
  const blogPosts: FetchWrapperResponse<BlogPostFormData[]> = await await getAllBlogs(0, 10);
  if (blogPosts.status !== 200 || blogPosts.data == null) {
    blogPosts.data = [];
  }

  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" "); // Split the text into an array of words
    return words.slice(0, wordLimit).join(" "); // Slice to the word limit and join back into a string
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-gray-800 py-16 md:py-14">
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute h-4 w-4 rounded-full bg-white animate-pulse"
            style={{ top: "10%", left: "10%" }}
          />
          <div
            className="absolute h-4 w-4 rounded-full bg-white animate-pulse"
            style={{ top: "40%", left: "25%" }}
          />
          <div
            className="absolute h-4 w-4 rounded-full bg-white animate-pulse"
            style={{ top: "70%", left: "15%" }}
          />
          <div
            className="absolute h-4 w-4 rounded-full bg-white animate-pulse"
            style={{ top: "20%", right: "20%" }}
          />
          <div
            className="absolute h-4 w-4 rounded-full bg-white animate-pulse"
            style={{ top: "60%", right: "25%" }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-sm text-green-200">
                <Cpu className="mr-2 h-4 w-4" />
                Tech & Gadgets Blog
              </div>

              {/* Main heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Exploring Tomorrow's <br />
                <span className="text-green-400">Technology Today</span>
              </h1>

              {/* Subheading */}
              <p className="mb-8 max-w-2xl text-lg text-gray-300">
                Deep dives into the latest gadgets, tech reviews, and industry
                insights. Stay ahead of the curve with our expert analysis and
                hands-on experiences.
              </p>

              {/* CTA Buttons */}
              <Link href="/blogs/articles">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button className="inline-flex items-center rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 transition">
                    Explore All Articles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </Link>

              {/* Feature icons */}
              <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <Smartphone className="h-6 w-6 mr-2" />
                  <span>Mobile</span>
                </div>
                <div className="flex items-center">
                  <Laptop className="h-6 w-6 mr-2" />
                  <span>Computers</span>
                </div>
                <div className="flex items-center">
                  <Cpu className="h-6 w-6 mr-2" />
                  <span>Hardware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">
              Latest Tech Insights
            </h2>
            <Link href="/blogs/articles">
              <button className="flex items-center text-green-400 hover:text-green-300">
                View All Articles <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </Link>
          </div>

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
                publishDate={post.createdAt}
                featured={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
