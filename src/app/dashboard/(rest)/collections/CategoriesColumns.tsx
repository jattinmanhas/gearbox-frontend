"use client";

import { categoryType } from "@/types/shop/shopTypes";
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
import Image from "next/image";

export const categoryColumns: ColumnDef<categoryType>[] = [
  {
    accessorKey: "signedUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.signedUrl || ""}
        alt={row.original.name}
        width={80} // Adjust the width and height as needed
        height={80}
        className="rounded aspect-auto" // Optional: style the image
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "description",
    header: "Category Description",
  },
  {
    accessorKey: "creator.fullname",
    header: "Created By",
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
      const date = new Date(row.original.createdDatetime!);
      return date.toLocaleString();
    },
  }/* ,
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

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
                navigator.clipboard.writeText(category.category_id)
              }
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Creator</DropdownMenuItem>
            <DropdownMenuItem>View Category details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }, */
];
