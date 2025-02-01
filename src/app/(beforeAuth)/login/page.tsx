"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/shared/hooks/use-toast";
import { ERROR_MESSAGE } from "@/shared/constants/api-error";
import { ApiError } from "@/shared/types/error";
import useUserStore from "@/zustand/user";
import { Label } from "@radix-ui/react-label";
import { Scissors } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/queries/auth/api";
import Spinner from "@/components/ui/spinner";

export default function Page() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    const data = await login({ email, password });

    if (
      Object.hasOwn(data, "code") ||
      (data as unknown as ApiError).message === "fetch failed"
    ) {
      setIsLoading(false);
      const { code } = data as unknown as ApiError;

      switch (code) {
        case ERROR_MESSAGE.invalid_credentials.code:
        case ERROR_MESSAGE.validation_failed.code:
          return toast({
            variant: "destructive",
            description: ERROR_MESSAGE.validation_failed.message,
          });
      }
    } else {
      setUser({
        email: data.user.email,
        name: data.user.name,
        company: data.user.company,
        createdAt: data.user.createdAt,
      });
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full h-full rounded-none md:rounded-lg md:w-[400px] md:h-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-6">
          <Scissors className="w-12 h-12 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-800">
            HairSalon
          </span>
        </div>
        <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
        <CardDescription className="text-center">
          계정에 로그인하여 매출을 관리하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
        <Button className="w-full" onClick={handleLogin}>
          {isLoading && <Spinner className="mr-2" />}
          로그인
        </Button>
        <div className="space-y-2 text-sm text-center">
          <a href="#" className="text-blue-600 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
          <div className="flex gap-1">
            계정이 없으신가요?
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
