import { store } from "@/store/store";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { auth } = store.getState();
  const accessToken = auth?.accessToken;
  console.log("accessToken", accessToken);
  if (!accessToken && request.nextUrl.pathname === "/") {
    // If unauthenticated, redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
