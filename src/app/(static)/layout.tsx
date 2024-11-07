import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/navbar";
import { navLinks } from "@/constants/navLinks";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      {/* <UseSyncUserDataFromCookie/> */}
      <Navbar navItems={navLinks} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </section>
  );
}
