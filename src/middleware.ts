import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getRefreshIdFromCookie,
  getTokenValueFromCookie,
  RefreshUserToken,
} from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getTokenValueFromCookie();
  const refreshId = await getRefreshIdFromCookie();

  if (!token && refreshId?.value) {
    const refreshTokens = await RefreshUserToken(refreshId.value);
    if (refreshTokens.status === 200) {
      const response = NextResponse.next();
      const token = refreshTokens.data.tokens.token;
      const refreshId = refreshTokens.data.data.id;
      response.cookies.set("token", token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: true, // Send only over HTTPS
        path: "/", // Cookie available to the whole app
        sameSite: "strict", // Protect against CSRF
        maxAge: 60 * 15, // 15 min
      });

      response.cookies.set("refreshId", refreshId, {
        httpOnly: true, // Prevent access via JavaScript
        secure: true, // Send only over HTTPS
        path: "/", // Cookie available to the whole app
        sameSite: "strict", // Protect against CSRF
        maxAge: 60 * 60 * 24, // 1 day
      });

      response.cookies.set(
        "userData",
        JSON.stringify(refreshTokens.data.data),
        { path: "/", httpOnly: false }
      );

      response.headers.set("X-Token-Refreshed", "true");

      return response;
    }
  }

  if (!token) {
    // If User does not have any token redirect to login page...
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const adminRoutes = [
    "/dashboard",
    "/dashboard/collections/:path*",
    "/dashboard/products/:path*",
  ];

    const isAdminRoute = adminRoutes.some((route) =>
      new URL(request.url).pathname.startsWith(route)
    );

    const userData = JSON.parse(
      request.cookies.get("userData")?.value || "{}"
    );

    if(isAdminRoute && userData.role !== 'ADMIN'){
      return NextResponse.redirect(new URL("/", request.url));
    }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/shop/:path*",
    "/dashboard/",
    "/dashboard/collections/:path*",
    "/dashboard/products/:path*"
  ],
};
