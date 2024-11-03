import SearchProducts from "@/components/ShopComponents/SearchProducts";

export default function SearchProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-11/12 m-auto">
      <div className="w-full text-center my-3">
        <SearchProducts />
      </div>
      <div>{children}</div>
    </section>
  );
}
