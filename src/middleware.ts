import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths and admin paths
    const isPublicPath = path === '/login' || path === '/signup' || path === "/verifyemail" || path === "/";
    const isAdminPath = path.startsWith('/admin'); // Check if the path is an admin route
    const isCustomerPath = path.startsWith('/customer'); // Check if the path is an customer route
    const token = request.cookies.get("token")?.value || ''

    // Redirect users without a token trying to access admin routes to login page
    if (isAdminPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (isCustomerPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If not a public path and no token, redirect to login
    // if (!isPublicPath && !token) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
        "/verifyemail",
        "/admin/:path*", // Add admin routes to the matcher
        "/customer/:path*"
    ],
}
