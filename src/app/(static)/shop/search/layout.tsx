"use client";
import SearchProducts from "@/components/ShopComponents/SearchProducts";
import { useSearchParams } from "next/navigation";

export default function SearchProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  return (
    <section className="w-11/12 m-auto">
      <div className="w-full text-center my-3">
        <SearchProducts initialSearchQuery={searchQuery || ""} />
      </div>
      <div>{children}</div>
    </section>
  );
}
