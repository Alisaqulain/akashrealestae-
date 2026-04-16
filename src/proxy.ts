import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function proxy(request: NextRequest) {
  const token = request.cookies.get("akasak_token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && ["/dashboard", "/add-property"].some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  if (!JWT_SECRET) {
    return NextResponse.next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: "admin" | "user" };

    if (pathname.startsWith("/dashboard") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/listings", request.url));
    }

    if (pathname.startsWith("/add-property") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/listings", request.url));
    }
  } catch {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/add-property")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/add-property/:path*"],
};
