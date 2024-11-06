import React from "react";
import {
  Search,
  ChevronRight,
  Cpu,
  Smartphone,
  Laptop,
  HeadphonesIcon,
  TabletIcon,
  WatchIcon,
} from "lucide-react";
import { BlogPostCard, ProductCard } from "@/components/Cards/Card";
import Link from "next/link";
import { getAllProducts } from "@/lib/shop";
import { getAllBlogs } from "@/lib/blog";
import TestimonialSection from "@/components/Cards/TestiMonialComponent";

const MainLandingPage = async () => {
  const allProducts = await getAllProducts(0, 3);
  if (allProducts.status !== 200 || allProducts.data == null) {
    allProducts.data = [];
  }

  const blogPosts = await getAllBlogs(0, 4);
  if (blogPosts.status !== 200 || blogPosts.data == null) {
    blogPosts.data = [];
  }

  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" "); // Split the text into an array of words
    return words.slice(0, wordLimit).join(" "); // Slice to the word limit and join back into a string
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-neutral-900  to-green-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Your Ultimate
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Tech{" "}
                </span>
                Destination
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                Discover cutting-edge gadgets and stay informed with expert
                reviews, guides, and the latest tech insights.
              </p>

              {/* Search Bar */}
              <div className="mx-auto mb-12 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products or articles..."
                    className="w-full rounded-full bg-white/10 px-6 py-4 pl-12 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                </div>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Smartphone, label: "Phones" },
                  { icon: Laptop, label: "Laptops" },
                  { icon: HeadphonesIcon, label: "Audio" },
                  { icon: WatchIcon, label: "Wearables" },
                  { icon: TabletIcon, label: "Tablets" },
                  { icon: Cpu, label: "Components" },
                ].map((category, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Trending Products</h2>
            <Link href="shop/product">
              <button className="flex items-center text-green-400 hover:text-green-300">
                View All <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allProducts.data.map((product, index) => (
              <ProductCard
                key={index}
                id={product.product_id}
                name={product.name}
                category={product.category.name}
                image={product.images[0].signedUrl!}
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
        </div>
      </section>
      {/* Latest Blog Posts Section */}
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="container mx-auto px-4">
        <TestimonialSection />
      </div>
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-12 backdrop-blur-sm">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Stay Updated
              </h2>
              <p className="mb-6 text-gray-300">
                Get the latest tech news, exclusive deals, and product launches
                delivered to your inbox.
              </p>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="rounded-full bg-purple-600 px-8 py-3 text-white transition-transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLandingPage;
