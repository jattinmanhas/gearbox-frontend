/* "use client";
import Link from 'next/link';
import React from 'react'
import Navlink from '../Navbar/navlink';
import { NavItems } from '@/constants/navLinks';
import { usePathname } from 'next/navigation';

interface NavProps {
  navItems: NavItems[];
}

export default function Sidebar({ navItems }: NavProps) {
  const pathname = usePathname();

  return (
    <div className="h-screen w-56 left-0 top-0 sticky p-8 flex flex-col gap-16 bg-neutral-700 shadow-xl max-lg:hidden">
      <Link href="/" aria-label="home">
        GEARBOX
      </Link>

      <div className="flex flex-col gap-12">
        {navItems.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            className={`flex gap-4 text-body-medium hover:bg-neutral-500 p-2 rounded-md ${
              pathname === link.link ? "text-lime-500" : "text-white"
            }`}
          >
            <h4>Icon</h4><p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <button>User Profile</button>
      </div>
    </div>
  );
}
 */

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
    title: "Collections List",
    url: "/dashboard/products",
    icon: Calendar,
  },
  {
    title: "Create New Blog",
    url: "/dashboard/blogs/new",
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
