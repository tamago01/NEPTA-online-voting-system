import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "../lib/auth";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  console.log("Middleware triggered for path:", req.nextUrl.pathname);

  const token = req.cookies.get("auth-token")?.value;

  const publicPaths = ["/", "/login", "/register"];
  if (publicPaths.includes(req.nextUrl.pathname)) {
   
    return NextResponse.next();
  }

  if (!token) {
   
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verifyToken(token);
    console.log("Token is valid.");
    return NextResponse.next();
  } catch (err) {
    console.error("Token validation failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
