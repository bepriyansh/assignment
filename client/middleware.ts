import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
    const session = await auth();
    const isLoggedIn = !!session;
    const { pathname, origin } = req.nextUrl;

    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) {
        return NextResponse.next();
    }

    if (!isLoggedIn) {
        const loginURL = new URL("/auth/login", origin);
        return NextResponse.redirect(loginURL);
    }

    return NextResponse.next();
});
