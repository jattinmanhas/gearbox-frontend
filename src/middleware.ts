import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // if (!token) {
  //   // If User does not have any token redirect to login page...
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // const adminRoutes = [
  //   "/dashboard",
  //   "/dashboard/collections/:path*",
  //   "/dashboard/products/:path*",
  //   "/dashboard/blogs/:path*",
  // ];

  //   const isAdminRoute = adminRoutes.some((route) =>
  //     new URL(request.url).pathname.startsWith(route)
  //   );

  //   const userData = JSON.parse(
  //     request.cookies.get("userData")?.value || "{}"
  //   );

  //   if(isAdminRoute && userData.role !== 'ADMIN'){
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/shop/:path*",
    "/dashboard/",
    "/dashboard/collections/:path*",
    "/dashboard/products/:path*",
    "/dashboard/orders/:path*",
    "/dashboard/blogs/:path*",
    "/shop/cart"
  ],
};
