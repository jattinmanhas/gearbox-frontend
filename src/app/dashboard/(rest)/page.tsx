import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {getAllBlogsCount, getAllCategoryCount, getAllProductsCount, getAllUsersCount, getDailyEarnings} from "@/lib/dashboard";


export default async function DashboardPage() {
    const users = await getAllUsersCount();
    const products = await getAllProductsCount();
    const categories = await getAllCategoryCount();
    const blogs = await getAllBlogsCount();
    const earnings = await getDailyEarnings();
    let usersCount = 0;
    let productsCount = 0;
    let categoryCount = 0;
    let blogCount = 0;
    let dailyEarnings = 0.0;

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

    if (earnings.status == 200 && earnings.data != null) {
        dailyEarnings = earnings.data / 100;
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800 p-6 mx-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome to your control center</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 hover:bg-neutral-800/60 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-100">{usersCount}</div>
              <div className="mt-1 text-sm text-gray-500">Registered accounts</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 hover:bg-neutral-800/60 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-100">{productsCount}</div>
              <div className="mt-1 text-sm text-gray-500">Listed items</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 hover:bg-neutral-800/60 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-100">{categoryCount}</div>
              <div className="mt-1 text-sm text-gray-500">Product categories</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 hover:bg-neutral-800/60 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-100">{blogCount}</div>
              <div className="mt-1 text-sm text-gray-500">Published posts</div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 border-none mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-100">Daily Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-white">${dailyEarnings.toFixed(2)}</div>
            <div className="mt-2 text-indigo-200">Total earnings for today</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
