import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {getAllBlogsCount, getAllCategoryCount, getAllProductsCount, getAllUsersCount} from "@/lib/dashboard";


export default async function DashboardPage() {
    const users = await getAllUsersCount();
    const products = await getAllProductsCount();
    const categories = await getAllCategoryCount();
    const blogs = await getAllBlogsCount();
    let usersCount = 0;
    let productsCount = 0;
    let categoryCount = 0;
    let blogCount = 0;

    if(users.status == 200 && users.data != null){
        usersCount = users.data;
    }

    if(products.status == 200 && products.data != null){
        productsCount = products.data;
    }

    if(categories.status == 200 && categories.data != null){
        categoryCount = categories.data;
    }

    if(blogs.status == 200 && blogs.data != null){
        blogCount = blogs.data;
    }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 m-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{productsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{categoryCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{blogCount}</div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
          </CardHeader>
        </Card>
      </div>
  )
}
