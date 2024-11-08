"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store";
import { Calendar, Home, Inbox, Search, Settings, User2 } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Create New Collection",
    url: "/dashboard/collections/new",
    icon: Home,
  },
  {
    title: "Create New Product",
    url: "/dashboard/products/new",
    icon: Inbox,
  },
  {
    title: "Categories List",
    url: "/dashboard/collections",
    icon: Calendar,
  },
  {
    title: "Products List",
    url: "/dashboard/products",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
 const { user } = useUserStore();

  return (
    <Sidebar>
      <SidebarHeader className="m-auto">
        <Link href="/dashboard">
          <SidebarGroupLabel className="text-2xl">GearBox</SidebarGroupLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton>
            <User2 />
            {user?.username}
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
