"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Scissors className="w-12 h-12 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800 ml-2">
              HairSalon
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            회원가입
          </CardTitle>
          <CardDescription className="text-center">
            새 계정을 만들어 매출을 관리하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>
            회원가입
          </Button>
          <div className="flex gap-1 text-sm text-center">
            이미 계정이 있으신가요?
            <a href="/login" className="text-blue-600 hover:underline">
              로그인
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
