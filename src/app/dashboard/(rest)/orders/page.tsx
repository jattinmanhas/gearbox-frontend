import React from "react";
import { OrdersColumns } from "./columns";
import { OrdersDataTable } from "./OrdersDatatable";
import { getAllOrdersWithPayments } from "@/lib/shop";
import { Card } from "@/components/ui/card";

export default async function OrdersList() {
  const allOrders = await getAllOrdersWithPayments();
  if (allOrders.status !== 200 || allOrders.data == null) {
    allOrders.data = [];
  }

  return (
    <Card className="container w-11/12 m-auto px-4 py-4 mt-10 border">
      <h1 className="text-2xl underline underline-offset-4 mb-4">
        Orders List
      </h1>
      <OrdersDataTable columns={OrdersColumns} data={allOrders.data} />
    </Card>
  );
}
