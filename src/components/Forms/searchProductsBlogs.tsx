import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchProductsBlogs() {
  return (
    <Link href="/search" className="block mx-auto mb-12 max-w-2xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products or articles..."
          name="search_products_blogs"
          className="w-full rounded-full bg-white/10 px-6 py-4 pl-12 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
      </div>
    </Link>
  );
}
