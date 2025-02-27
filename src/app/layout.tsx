import type { Metadata } from "next";
import "./globals.css";
import HydrationZustand from "@/store/hydrationZustand";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "@/components/ErrorBoundary"; // Import the ErrorBoundary component

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
        <HydrationZustand>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </HydrationZustand>
        <ToastContainer />
      </body>
    </html>
  );
}
