import { navLinks } from "@/constants/navLinks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
