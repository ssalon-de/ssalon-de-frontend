// import apiClient from "@/shared/utils/api";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  console.log(cookieStore, accessToken);
  return <div>dashboard</div>;
}
