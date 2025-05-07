import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient({ req, res })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession()

    const isAuthPage = ['/auth/sign-in', '/auth/sign-up'].includes(req.nextUrl.pathname)

    if (!session && !isAuthPage) {
        if (req.nextUrl.pathname !== '/auth/sign-in') {
            return NextResponse.redirect(new URL('/auth/sign-in', req.url))
        }
    }

    if (session && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
}

// ignore roots with "api, _next/static, _next/image or favicon.ico"
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|verify-email).*)',
    ]
}