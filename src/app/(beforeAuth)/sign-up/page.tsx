"use client";

import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useForm, useWatch } from "react-hook-form";
import { RequiredLabel } from "@/shared/ui/required-label";
import { useSignUp } from "@/queries/auth";
import { useToast } from "@/shared/hooks/use-toast";
import { useIsMutating } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";
import Spinner from "@/shared/ui/spinner";
import { SignUpDTO } from "@/queries/auth/type";
import { useCallback } from "react";
import { ApiError } from "@/shared/types/error";
import { ERROR_MESSAGE } from "@/shared/constants/api-error";

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
        description:
          "회원가입을 축하합니다. 입력한 이메일에서 계정을 인증해주세요.",
        variant: "destructive",
      });
      router.push("/login");
    },
    onError: (error) => {
      const apiError = error as ApiError;
      if (apiError.code === ERROR_MESSAGE.EMAIL_DUPLICATED.code) {
        return toast({
          description: ERROR_MESSAGE.EMAIL_DUPLICATED.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: "알 수 없는 애러가 발생했습니다.",
          variant: "destructive",
        });
      }
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
    <Card className="w-full rounded-none md:rounded-lg md:w-[400px]">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-6">
          <Scissors className="w-12 h-12 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-800">
            ssalon de
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
            <p className="text-xs text-red-500">
              이메일을 생성 후 메일함에서 인증 메일을 클릭해주세요.
            </p>
          </div>
          <div className="space-y-2">
            <RequiredLabel
              htmlFor="name"
              required
              errorMessage={formState.errors.name?.message}
            >
              이름
            </RequiredLabel>
            <Input
              {...register("name", {
                required: "이름을 입력해주세요.",
                maxLength: {
                  value: 8,
                  message: "이름은 8글자 이내로 입력해주세요.",
                },
              })}
              maxLength={8}
              id="name"
              required
              placeholder="8 글자 이내로 이름을 입력해주세요."
              isError={!!formState.errors.name}
            />
          </div>
          <div className="space-y-2">
            <RequiredLabel
              htmlFor="company"
              required
              errorMessage={formState.errors.company?.message}
            >
              매장
            </RequiredLabel>
            <Input
              {...register("company", {
                required: "매장명을 입력해주세요.",
                maxLength: {
                  value: 20,
                  message: "매장명은 20글자 이내로 입력해주세요.",
                },
              })}
              maxLength={20}
              placeholder="20 글자 이내로 매장명을 입력해주세요."
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
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                  message:
                    "비밀번호는 반드시 특수문자가 하나 이상 포함되어야 하며 영 대소문자만 입력이 가능합니다.",
                },
                maxLength: {
                  value: 29,
                  message: "비밀번호는 20자 이내로 입력해주세요.",
                },
              })}
              id="password"
              type="password"
              placeholder="••••••••"
              isError={!!formState.errors.password}
              required
            />
            <p className="text-xs text-red-500">
              비밀번호는 영문자와 숫자, 특수문자를 포함한 20자 이내로
              입력해주세요.
            </p>
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
  );
}
