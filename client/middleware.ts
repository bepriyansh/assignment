import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const session = await auth();
  const isLoggedIn = !!session;
  const { pathname, origin } = req.nextUrl;
  console.log("IsLoggedIn : ", isLoggedIn)

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const loginURL = new URL("/auth/login", origin);

    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
