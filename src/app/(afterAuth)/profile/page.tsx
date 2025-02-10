import { redirect } from "next/navigation";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/shared/ui/card";
import { User } from "@/queries/auth/type";
import PageTitle from "@/shared/ui/page-title";
import { serverFetch } from "@/shared/utils/serverFetch";

export default async function ProfilePage() {
  const userInfo = await serverFetch<User>("/auth/info");

  return (
    <div className="container">
      <PageTitle title="개인정보 확인" className="mb-4" />
      <Card>
        <CardHeader>
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
          <Button
            onClick={async () => {
              "use server";
              redirect("/profile/edit");
            }}
            className="w-full"
          >
            개인정보 수정
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
