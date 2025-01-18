import { BASE_URL } from "@/shared/utils/api";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
    });

    const response = NextResponse.json({ status: "200" });

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
