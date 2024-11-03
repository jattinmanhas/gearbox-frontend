import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      {children}
    </section>
  );
}
