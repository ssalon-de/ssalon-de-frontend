"use client";

import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import PageTitle from "@/shared/ui/page-title";
import { RequiredLabel } from "@/shared/ui/required-label";
import { useEditSettings, useSettings } from "@/queries/settings";
import { Setting } from "@/queries/settings/type";
import { useToast } from "@/shared/hooks/use-toast";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldPath, RegisterOptions, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type FormData = Record<string, string>;
type Form = {
  label: string;
  placeholder: string;
  options: RegisterOptions;
} & Omit<Setting, "value">;

const settings: Form[] = [
  {
    name: "goal",
    label: "목표 매출",
    placeholder: "목표 금액을 입력해주세요.",
    options: {
      required: true,
      pattern: {
        value: /^\d*$/,
        message: "숫자만 입력할 수 있습니다.",
      },
    },
  },
];

const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "gray",
];

const Settings = () => {
  const [open, setOpen] = useState("");
  const { toast } = useToast();
  const { data = [] } = useSettings();
  const { register, formState, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { goal: "" },
    mode: "onChange",
  });
  const { mutate: editSettings } = useEditSettings({
    onSuccess: () => {
      toast({ description: "저장 완료!" });
      setOpen("");
    },
    onError: () => {
      toast({
        description: "저장 실패! 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleSave = (data: FormData) => {
    if (formState.isValid) {
      const dto: Setting[] = Object.entries(data).map(([name, value]) => ({
        name,
        value,
      }));
      editSettings(dto);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const resetValues = data.reduce((prev, cur) => {
        const findItem = prev[cur.name];
        if (!findItem) {
          prev[cur.name] = "";
        }
        prev[cur.name] = cur.value;
        return { ...prev };
      }, {} as FormData);
      reset({ ...resetValues });
    }
  }, [data, reset]);

  return (
    <form
      className="container flex flex-col gap-2"
      onSubmit={handleSubmit(handleSave)}
    >
      <div className="flex justify-between">
        <PageTitle title="설정" />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          disabled={!formState.isValid}
        >
          <Save className="w-4 h-4" />
        </Button>
      </div>
      {settings.map(({ name, label, placeholder, options }) => {
        return (
          <Accordion
            key={name}
            type="single"
            collapsible
            className="w-[100%]"
            value={open}
            onValueChange={setOpen}
          >
            <AccordionItem value={name}>
              <AccordionTrigger>
                <RequiredLabel
                  required
                  errorMessage={
                    formState.errors[name as FieldPath<FormData>]?.message
                  }
                >
                  {label}
                </RequiredLabel>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-1">
                  <Input
                    {...register(name, options)}
                    id={name}
                    placeholder={placeholder}
                    isError={!!formState.errors[name as FieldPath<FormData>]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      <Accordion
        type="single"
        collapsible
        className="w-[100%]"
        value={open}
        onValueChange={setOpen}
      >
        <AccordionItem value="badge-color">
          <AccordionTrigger>
            <RequiredLabel>뱃지 색상 커스텀</RequiredLabel>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-1 flex flex-col gap-2">
              <div className="flex gap-2">
                <RequiredLabel className="text-gray-400">
                  결제 유형
                </RequiredLabel>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="결제 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={`payment${color}`} value={color}>
                        <div
                          className="w-3 h-3 rounded-full inline-block mr-2"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                        <span>{color}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <RequiredLabel className="text-gray-400">
                  방문 유형
                </RequiredLabel>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="방문 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={`visitType${color}`} value={color}>
                        <div
                          className="w-3 h-3 rounded-full inline-block mr-2"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                        <span>{color}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <RequiredLabel className="text-gray-400">
                  서비스 유형
                </RequiredLabel>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="서비스 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={`serviceType${color}`} value={color}>
                        <div
                          className="w-3 h-3 rounded-full inline-block mr-2"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                        <span>{color}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <RequiredLabel className="text-gray-400">
                  성별 유형
                </RequiredLabel>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="성별 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={`genderType${color}`} value={color}>
                        <div
                          className="w-3 h-3 rounded-full inline-block mr-2"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                        <span>{color}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};

export default Settings;
