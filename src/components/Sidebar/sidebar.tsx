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
import {SquareChartGantt, ChevronUp, ShoppingBasket, Logs, Search, Library, User2, Newspaper, ListCollapse, Users} from "lucide-react";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Logout} from "@/lib/auth";
import {useRouter} from "next/navigation";

const items = [
  {
    title: "Create New Category",
    url: "/dashboard/collections/new",
    icon: Library,
  },
  {
    title: "Create New Product",
    url: "/dashboard/products/new",
    icon: ShoppingBasket,
  },
  {
    title: "Categories List",
    url: "/dashboard/collections",
    icon: Logs,
  },
  {
    title: "Products List",
    url: "/dashboard/products",
    icon: SquareChartGantt,
  },
  {
    title: "Create New Blog",
    url: "/dashboard/blogs/new",
    icon: Newspaper,
  },
  {
    title: "Blogs List",
    url: "/dashboard/blogs",
    icon: ListCollapse,
  },
  {
    title: "Users List",
    url: "/dashboard/users",
    icon: Users,
  },
];

export function AppSidebar() {
 const { user, clearUser } = useUserStore();
 const router = useRouter();

  const handleLogout = async () => {
    const userLogout = await Logout();

    if (userLogout.status === 200) {
      clearUser();
      router.push("/dashboard/login");
    }else{
      alert("Failed to Logout")
    }
  };

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
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href="/profile">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span className="text-red-600">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
