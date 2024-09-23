import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode")
  const url = new URL(request.nextUrl.href);
  const token = request.cookies.get("token")
  
  const protectedRoutes = ["/profile"]
  if ((!mode || mode !== "anonymous") && protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }
 
  if (token) {
    url.searchParams.set("mode", "authenticated");
    return NextResponse.next()
  }
  
  if (!url.searchParams.has("mode")) {
    url.searchParams.set("mode", "anonymous");
    return NextResponse.redirect(url);
  }
  return NextResponse.next()
}