import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/", "/login", "/sign-up"];

// api에서 받아서 accessToken을 셋팅해준다.
export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  console.log(pathname);
  const accessToken = cookies.get("accessToken");

  if (AUTH_PAGES.includes(pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.next();
      }
    }
  } else {
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
