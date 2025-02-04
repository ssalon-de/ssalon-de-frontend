import { cookies } from "next/headers";
import { BASE_URL } from "./axios";

export async function serverFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const headers = new Headers({
    ...options.headers,
    "Content-Type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Invalid token");
  }

  return response.json();
}
