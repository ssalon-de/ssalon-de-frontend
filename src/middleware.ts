import { NextRequest, NextResponse } from "next/server";
// import { supabaseService } from "./shared/lib/supabase";
import { getServerSession } from "next-auth";

const BEFORE_AUTH_ROUTES = ["/", "/login", "/sign-up", "/find-password"];

// const logout = async (url: string) => {
//   const response = NextResponse.redirect(new URL("/login", url));

//   await signOut();
//   // await supabaseService.logout();

//   response.cookies.delete("accessToken");
//   response.cookies.delete("refreshToken");
//   return response;
// };

// middleware에서 valid로직 제외
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const session = await getServerSession();
  // const refreshToken = cookies.get("refreshToken")?.value ?? "";

  const isBeforeAuthRoute = BEFORE_AUTH_ROUTES.includes(nextUrl.pathname);

  if (nextUrl.pathname === "/") {
    if (session?.accessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      if (nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      } else {
        return NextResponse.next();
      }
    }
  }

  if (isBeforeAuthRoute) {
    return NextResponse.next();
  }

  // if (!session?.accessToken) {
  //   return logout(req.url);
  // }

  // valid를 사용할지 체크
  // const isValid = await supabaseService.isValidToken(session?.accessToken);

  // if (isValid) {
  //   return NextResponse.next();
  // }

  // if (!refreshToken) {
  //   return logout(req.url);
  // }

  // const { data, error } = await supabaseService.reissueToken(refreshToken);

  // if (data) {
  //   const response = NextResponse.next();
  //   const accessToken = data.session?.access_token ?? "";
  //   const refreshToken = data.session?.refresh_token ?? "";

  //   response.cookies.set("accessToken", accessToken, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     path: "/",
  //     maxAge: 60 * 60 * 1,
  //   });

  //   response.cookies.set("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7,
  //   });

  //   return response;
  // }

  // if (error) {
  //   return logout(req.url);
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
