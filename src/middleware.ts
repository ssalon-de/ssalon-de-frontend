import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_PAGES = ["/", "/login", "/sign-up", "/find-password"];

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  console.log(nextUrl.pathname);
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

  // ✅ accessToken이 유효한지 확인
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
    }
  );

  console.log("isValidate", res.ok);

  if (res.ok) {
    return NextResponse.next();
  }

  const refreshToken = cookies.get("refreshToken")?.value;

  // ✅ accessToken이 만료되었을 경우 reissue 시도
  const reissueRes = await fetch(
    `${BASE_URL}/auth/reissue?token=${refreshToken}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  console.log("isReissueOk", reissueRes.ok);
  if (reissueRes.ok) {
    const newAccessToken = await reissueRes
      .json()
      .then((data) => data.accessToken);
    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken);
    return response;
  }

  // ✅ reissue 실패 시 로그인 페이지로 이동 & 쿠키 삭제
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}

// 적용할 경로
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
