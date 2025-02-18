import type { Metadata } from "next";
import "./globals.css";
import HydrationZustand from "@/store/hydrationZustand";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "GearBox",
  description: "Tech Destination for the Latest Gadgets and Gear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HydrationZustand>{children}</HydrationZustand>
        <ToastContainer />
      </body>
    </html>
  );
}
