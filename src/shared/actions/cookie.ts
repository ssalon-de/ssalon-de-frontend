"use server";

import { cookies } from "next/headers";

export async function setCookie(token: string) {
  "use server";
  const cookieStore = await cookies();

  cookieStore.set("accessToken", token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1시간
  });
}
