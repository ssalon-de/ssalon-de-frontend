import apiClient from "@/shared/utils/api";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await apiClient.post("/auth/logout");
    const response = NextResponse.json({ status: "200" });

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
