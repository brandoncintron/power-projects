import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/submit-project"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    // Instead of redirecting, add a custom header that will be used
    // to trigger a toast on the client side
    const response = NextResponse.rewrite(new URL("/", request.url));
    response.headers.set("x-auth-required", "true");
    return response;
  }

  return NextResponse.next();
}