import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Get session from cookie instead of auth() to avoid Edge Runtime issues
  const sessionToken = req.cookies.get("next-auth.session-token")?.value
  const isLoggedIn = !!sessionToken

  const { pathname } = req.nextUrl

  // ── Define protected routes ──
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/profile")

  // ── Define auth routes ──
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup")

  // ── Rule 1 ──
  // logged-in user visits /login or /signup?
  // → redirect to home
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // ── Rule 2 ──
  // not logged in visits protected route?
  // → redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // ── Rule 3 ──
  // everything else → allow through
  return NextResponse.next()
}

// ── Config ──
// tells Next.js WHICH routes to run middleware on
export const config = {
  matcher: [
    // run on all routes EXCEPT:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
