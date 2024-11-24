import React from "react";
import { Card } from "@/components/ui/card";
import { getAllBlogs } from "@/lib/blog";
import { BlogsDataTable } from "./BlogsDatatable";
import { BlogsColumn } from "./BlogsColumns";

export default async function ProductsList() {
  const allBlogs = await getAllBlogs(0, 10000);
  if (allBlogs.status !== 200 || allBlogs.data == null) {
    allBlogs.data = [];
  }

  return (
    <Card className="container w-11/12 m-auto px-4 py-4 mt-10 border">
      <h1 className="text-2xl underline underline-offset-4 mb-4">
        Blogs List
      </h1>
      <BlogsDataTable columns={BlogsColumn} data={allBlogs.data} />
    </Card>
  );
}
