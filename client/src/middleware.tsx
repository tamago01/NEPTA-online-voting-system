import { NextResponse, NextRequest } from "next/server";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next|api|favicon.ico).*)", "/dashboard"],
};

export async function middleware(req: NextRequest) {
 
  return NextResponse.next();

  // const token = req.cookies.get("auth-token")?.value;
  // const publicPaths = ["/", "/login", "/register"];

  // if (publicPaths.includes(req.nextUrl.pathname)) {
  // }

  // if (!token) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // try {
  //   const decoded = await verifyToken(token);
  //   console.log("Token is valid.");

  //   const response = NextResponse.next();

  //   if (decoded.email) {
  //     response.headers.set("x-user-email", decoded.email);
  //   }

  //   return response;
  // } catch (err) {
  //   console.error("Token validation failed:", err);
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}
