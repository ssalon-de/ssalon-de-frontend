// 프론트엔드에서 validate 처리하기 (굳이 서버까지 갈 필요가 없음)
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_PAGES = ["/", "/login", "/sign-up", "/find-password"];

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  const accessToken = cookies.get("accessToken")?.value;
  const isBeforeAuthPage = AUTH_PAGES.includes(nextUrl.pathname);

  if (nextUrl.pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      if (nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      } else {
        return NextResponse.next();
      }
    }
  }

  if (isBeforeAuthPage) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // accessToken이 유효한지 확인
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  if (res.ok) {
    return NextResponse.next();
  }

  const refreshToken = cookies.get("refreshToken")?.value;

  // accessToken이 만료되었을 경우 reissue 시도
  const reissueRes = await fetch(`${BASE_URL}/auth/reissue`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (reissueRes.ok) {
    const data = (await reissueRes.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    const response = NextResponse.next();

    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 1,
    });

    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  // reissue 실패 시 로그인 페이지로 이동 & 쿠키 삭제
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
