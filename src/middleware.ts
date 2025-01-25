import { NextResponse, NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("refreshToken")?.value; // Check for auth token in cookies
//   console.log("token", token);
//   if (!token && request.nextUrl.pathname === "/") {
//     // If unauthenticated, redirect to /login
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // Allow the request to proceed
// }

// export const config = {
//   matcher: ["/", "/login"], // Apply middleware only to the / route
// };

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
