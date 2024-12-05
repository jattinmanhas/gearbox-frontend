"use client";

import { OrderWithPaymentType, ProductType } from "@/types/shop/shopTypes";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
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

const productNameFilter: FilterFn<OrderWithPaymentType> = (row, columnId, value) => {
  const productName = row.original.orderItems[0]?.product.name || "";
  return productName.toLowerCase().includes((value as string).toLowerCase());
};

export const OrdersColumns: ColumnDef<OrderWithPaymentType>[] = [
  {
    accessorKey: "orderItems",
    header: "Product Name",
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return orderItems[0]?.product.name || "N/A";
    },
    filterFn: productNameFilter
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.totalAmount.toString());
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency,
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: "status",
    header: "Order Status",
  },
  {
    accessorKey: "payment.status", 
    header: "Payment Status",
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
                navigator.clipboard.writeText(order.id)
              }
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Customer Details</DropdownMenuItem>
            <DropdownMenuItem>View Order Details</DropdownMenuItem>
            <DropdownMenuItem>View Payment Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
