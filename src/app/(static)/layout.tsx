import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/navbar";
import { navLinks } from "@/constants/navLinks";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      {/* <UseSyncUserDataFromCookie/> */}
      <Navbar navItems={navLinks} />
      <div>{children}</div>
      <Footer />
    </section>
  );
}
