"use client";

import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, useWatch } from "react-hook-form";
import { RequiredLabel } from "@/components/ui/required-label";
import { useSignUp } from "@/queries/auth";
import { useToast } from "@/shared/hooks/use-toast";
import { useIsMutating } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";
import Spinner from "@/components/ui/spinner";
import { SignUpDTO } from "@/queries/auth/type";
import { useCallback } from "react";

type SignUpForm = SignUpDTO & {
  confirmPassword: string;
};

const defaultValues: SignUpForm = {
  email: "",
  name: "",
  company: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: signUp } = useSignUp({
    onSuccess: () => {
      toast({
        description: "회원가입을 축하합니다. 로그인 페이지로 이동합니다.",
      });
      router.push("/login");
    },
    onError: () => {
      toast({
        description: "error",
        variant: "destructive",
      });
    },
  });

  const { register, handleSubmit, formState, control } = useForm({
    defaultValues,
  });

  const password = useWatch({ control, name: "password" });
  const isLoading = useIsMutating({ mutationKey: [KEYS.user.signUp] });

  const onSubmit = useCallback(
    (data: SignUpDTO) => {
      if (formState.isValid) {
        signUp({
          email: data.email,
          name: data.name,
          password: data.password,
          company: data.company,
        });
      }
    },
    [formState, signUp]
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Scissors className="w-12 h-12 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">
              Ssalon de
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <RequiredLabel
                htmlFor="email"
                required
                errorMessage={formState.errors.email?.message}
              >
                이메일
              </RequiredLabel>
              <Input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "유효한 이메일 주소를 입력하세요",
                  },
                })}
                id="email"
                type="email"
                placeholder="name@example.com"
                isError={!!formState.errors.email}
                required
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel
                htmlFor="email"
                required
                errorMessage={formState.errors.name?.message}
              >
                이름
              </RequiredLabel>
              <Input
                {...register("name", { required: "이름을 입력해주세요." })}
                id="name"
                required
                isError={!!formState.errors.name}
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel
                htmlFor="email"
                required
                errorMessage={formState.errors.company?.message}
              >
                매장
              </RequiredLabel>
              <Input
                {...register("company", { required: "매장명을 입력해주세요." })}
                id="company"
                required
                isError={!!formState.errors.company}
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel
                htmlFor="password"
                required
                errorMessage={formState.errors.password?.message}
              >
                비밀번호
              </RequiredLabel>
              <Input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: /^(?=.*[!@#$%^&*])/,
                    message:
                      "비밀번호는 반드시 특수문자가 하나 이상 포함되어야 합니다.",
                  },
                })}
                id="password"
                type="password"
                placeholder="••••••••"
                isError={!!formState.errors.password}
                required
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel
                htmlFor="password"
                required
                errorMessage={formState.errors.confirmPassword?.message}
              >
                비밀번호 확인
              </RequiredLabel>
              <Input
                {...register("confirmPassword", {
                  required: "비밀번호를 확인해주세요.",
                  validate: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다.",
                })}
                id="password"
                type="password"
                placeholder="••••••••"
                isError={!!formState.errors.confirmPassword}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isValid}
          >
            {!!isLoading && <Spinner />}
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
