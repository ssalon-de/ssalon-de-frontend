import apiClient from "@/shared/utils/api";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const res: { user: unknown; accessToken: string; refreshToken: string } =
      await apiClient.post("/auth/login", {
        ...requestBody,
      });

    const response = NextResponse.json({ user: res.user });

    // Access Token 설정 (HttpOnly X -> 클라이언트에서 접근 가능)
    response.cookies.set("accessToken", res.accessToken, {
      httpOnly: false, // 필요하면 true로 설정
      secure: process.env.NODE_ENV === "production", // 배포 시 true
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 1, // 1시간 (초 단위)
    });

    // Refresh Token 설정 (HttpOnly, Secure)
    response.cookies.set("refreshToken", res.refreshToken, {
      httpOnly: true, // 클라이언트에서 접근 불가능
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일 유지
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
