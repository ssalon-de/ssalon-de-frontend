"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

export default function EditProfilePage() {
  const [username, setUsername] = useState("홍길동");
  const [companyName, setCompanyName] = useState("홍길동 헤어샵");
  const [email, setEmail] = useState("hong@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would typically send a request to your API to update the user's information
    // For this example, we'll simulate an API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Profile update with:", {
      username,
      companyName,
      email,
      password,
    });

    setIsLoading(false);
    // After successful update, redirect to the profile page
    router.push("/profile");
  };

  return (
    <div className="container p-4 mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">개인정보 수정</CardTitle>
          <CardDescription>
            개인 정보와 계정 설정을 업데이트하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">이름</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">회사 이름</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">새 비밀번호 (선택사항)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="변경하려면 입력하세요"
              />
            </div>
            {password && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!!password}
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Spinner className="mr-2" /> : null}
            변경사항 저장
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
