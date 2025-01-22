import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
// import Link from "next/link";
import { cookies } from "next/headers";
import { User } from "@/queries/auth/type";
import { BASE_URL } from "@/shared/utils/api";

export default async function ProfilePage() {
  const store = await cookies();
  const token = store.get("accessToken")?.value ?? "";
  const userInfo: User = await fetch(`${BASE_URL}/auth/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  }).then((res) => res.json());

  const handleEdit = () => {
    redirect("/profile/edit");
  };

  return (
    <div className="container p-4 mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">개인정보 확인</CardTitle>
          <CardDescription>귀하의 개인정보를 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">이름</h3>
            <p>{userInfo.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">매장</h3>
            <p>{userInfo.company}</p>
          </div>
          <div>
            <h3 className="font-semibold">이메일</h3>
            <p>{userInfo.email}</p>
          </div>
          {/* <div className="space-y-2">
            <h3 className="font-semibold">약관 및 정책</h3>
            <div className="space-x-4">
              <Link href="/terms" className="text-blue-600 hover:underline">
                이용약관
              </Link>
              <Link href="/privacy" className="text-blue-600 hover:underline">
                개인정보처리방침
              </Link>
            </div>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button onClick={handleEdit} className="w-full">
            개인정보 수정
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
