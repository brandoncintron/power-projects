import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { publicRoutes, apiAuthPrefix } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

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
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
