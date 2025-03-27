import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  protectedRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  // Handle OAuth errors
  if (nextUrl.pathname === "/api/auth/signin" && nextUrl.search.includes("error=")) {
    // Extract the error query param
    const errorType = new URLSearchParams(nextUrl.search).get("error");
    // Redirect to our custom error handler page with the error
    return Response.redirect(new URL(`/auth-error?error=${errorType}`, nextUrl));
  }

  if(isApiAuthRoute){
    return;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

// Don't invoke middleware on these paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
