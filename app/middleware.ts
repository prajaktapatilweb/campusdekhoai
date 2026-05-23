import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/college")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      // Admin protection
      if (
        pathname.startsWith("/admin") &&
        decoded.role !== "admin"
      ) {
        return NextResponse.redirect(
          new URL("/unauthorized", req.url)
        );
      }

      // College protection
      if (
        pathname.startsWith("/college") &&
        decoded.role !== "college"
      ) {
        return NextResponse.redirect(
          new URL("/unauthorized", req.url)
        );
      }

    } catch (error) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/college/:path*"],
};