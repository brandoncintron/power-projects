import { auth } from '@/auth'

export default auth((req) => {
  const { pathname, origin } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Public route
  if (pathname === '/') {
    return // allow access
  }

  // Protected routes
  const protectedRoutes = ['/submit-project', '/dashboard']

  if (protectedRoutes.includes(pathname)) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to home
      return Response.redirect(new URL('/', origin))
    }
    return // allow access to authenticated users
  }

  // Deny all other routes to unauthenticated users
  if (!isAuthenticated) {
    return Response.redirect(new URL('/', origin))
  }

  // Authenticated users can access anything else
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
