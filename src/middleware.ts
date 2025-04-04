import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { publicRoutes, apiAuthPrefix } from "@/routes";

const { auth } = NextAuth(authConfig);

// Helper function to create Regex from dynamic routes like /path/[param]
const createRegex = (route: string): RegExp => {
  // Escape special regex characters, except for slashes used in paths
  const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Replace dynamic segments like [param] with a capturing group matching any character except '/'
  const regexPattern = escapedRoute.replace(/\\\[.*?\\\]/g, "([^/]+)");
  return new RegExp(`^${regexPattern}$`); // Match the whole path
};

// Pre-compile regex for dynamic routes for better performance
const publicRoutePatterns = publicRoutes.map((route) => {
  if (route.includes("[")) {
    return createRegex(route);
  }
  return route; // Keep static routes as strings
});

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutePatterns.some(pattern => {
    if (typeof pattern === 'string') {
        return pattern === nextUrl.pathname; // Exact match for static routes
    }
    return pattern.test(nextUrl.pathname); // Regex test for dynamic routes
});

  // Allow all auth API routes
  if (isApiAuthRoute) {
    return;
  }

  // Allow public routes for everyone
  if (isPublicRoute) {
    return;
  }

  // If not logged in and trying to access a protected route, redirect to "/"
  if (!isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // If logged in and accessing a protected route, allow it
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
