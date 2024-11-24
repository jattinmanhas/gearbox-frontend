"use client";

import { ProductType } from "@/types/shop/shopTypes";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { BlogPostFormData } from "@/lib/blog";

export const BlogsColumn: ColumnDef<BlogPostFormData>[] = [
  {
    accessorKey: "title",
    header: "blog Title",
  },
  {
    accessorKey: "category.name",
    header: "Category Name",
  },
  {
    accessorKey: "author.fullname",
    header: "Author",
  },
  {
    accessorKey: "createdDatetime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created Datetime
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true, // Enable sorting on createdDatetime
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt!);
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id)
              }
            >
              Copy Blog ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Creator</DropdownMenuItem>
            <DropdownMenuItem>View Blog details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
