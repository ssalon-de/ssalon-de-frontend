"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreateSaleDto,
  Gender,
  Payment,
  Sale,
  UpdateSaleDto,
} from "@/queries/sales/type";
import { useForm, useWatch } from "react-hook-form";
import { useToast } from "@/shared/hooks/use-toast";
import { useCreateSale, useSale, useUpdateSale } from "@/queries/sales";
import { useServiceTypes } from "@/queries/service-types";
import dayjs from "dayjs";
import { usePaymentTypes } from "@/queries/payment-types";
import { RequiredLabel } from "@/components/ui/required-label";

type SaleForm = Omit<Sale, "services" | "payments" | "id"> & {
  time: string;
  services: string[];
  payments: Payment[];
  id?: string;
};

const defaultValues: SaleForm = {
  date: dayjs().format("YYYY-MM-DD"),
  amount: "",
  services: [],
  description: "",
  id: "",
  payments: [],
  gender: "M",
  time: "",
};

const SaleEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("saleId") ?? "";
  const isEdit = !!id;
  const { toast } = useToast();
  const { register, handleSubmit, formState, reset, setValue, control } =
    useForm<SaleForm>({
      defaultValues,
      mode: "onChange",
    });

  const gender = useWatch({ control, name: "gender" });
  const selectedServices = useWatch({ control, name: "services" });
  const selectedPayments = useWatch({ control, name: "payments" });
  const selectedTime = useWatch({ control, name: "time" });

  const { data: sale } = useSale(id, {
    enabled: isEdit,
  });

  const { data: serviceTypes = [] } = useServiceTypes();
  const { data: paymentTypes = [] } = usePaymentTypes();

  const onSuccessCallback = useCallback(() => {
    reset(defaultValues);
    router.push("/sales");
  }, [reset, router]);

  const { mutate: createSale } = useCreateSale({
    onSuccess: onSuccessCallback,
  });
  const { mutate: updateSale } = useUpdateSale({
    onSuccess: onSuccessCallback,
  });

  const validateForm = useCallback((data: SaleForm) => {
    const validate = {
      message: "",
      flag: true,
    };
    if (+data.amount === 0) {
      validate.message = "결제 유형을 통해 금액을 입력해주세요.";
      validate.flag = false;
      return validate;
    } else if (data.payments.length === 0) {
      validate.message = "결제 유형을 선택해주세요.";
      validate.flag = false;
      return validate;
    } else if (!!data.time || !!data.date) {
      if (!data.time) {
        validate.message = "날짜를 입력한 경우 시간을 필수로 선택해주세요.";
        validate.flag = false;
        return validate;
      } else if (!data.date) {
        validate.message = "시간을 선택한 경우 날짜를 필수로 입력해주세요.";
        validate.flag = false;
      }
    }
    return validate;
  }, []);

  const onSubmit = useCallback(
    (sale: SaleForm) => {
      const inputData = {
        date: sale.date,
        time: sale.time,
        amount: sale.amount,
        services: sale.services,
        description: sale.description,
        gender: sale.gender,
        payments: sale.payments,
      };

      const { message, flag } = validateForm(inputData);

      if (flag) {
        const services = sale.services.reduce((prev, cur) => {
          const service = serviceTypes.find((service) => service.id === cur);
          if (service) {
            prev.push(service.id);
          }
          return prev;
        }, [] as string[]);

        const dto: CreateSaleDto | UpdateSaleDto = {
          date: dayjs(`${inputData.date}T${inputData.time}`).format(
            "YYYY-MM-DDTHH:mm"
          ),
          amount: inputData.amount,
          services,
          description: inputData.description,
          gender: inputData.gender,
          payments: inputData.payments.filter((payment) => !!payment),
        };

        if (isEdit) {
          updateSale({
            id,
            ...dto,
          });
        } else {
          createSale(dto);
        }
      } else {
        toast({
          variant: "destructive",
          description: message,
        });
      }
    },
    [createSale, id, isEdit, serviceTypes, toast, updateSale, validateForm]
  );

  const handleServiceChange = useCallback(
    (serviceId: string) => {
      const newServices = selectedServices.includes(serviceId)
        ? selectedServices.filter((id) => id !== serviceId)
        : [...selectedServices, serviceId];
      setValue("services", newServices);
    },
    [selectedServices, setValue]
  );

  const isFormDisabled = useMemo(() => {
    const hasError = Object.keys(formState.errors).length > 0;
    return formState.isSubmitting || hasError;
  }, [formState]);

  const timeSlots = useMemo(
    () =>
      Array.from({ length: 27 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minute = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minute}`;
      }),
    []
  );

  const title = isEdit ? "매출 수정" : "매출 등록";

  useEffect(() => {
    if (isEdit && sale) {
      reset({
        time: dayjs(sale.date).format("HH:mm"),
        date: dayjs(sale.date).format("YYYY-MM-DD"),
        amount: sale.amount,
        services: sale.services.map((service) => service.id),
        gender: sale.gender,
        payments: sale.payments,
        description: sale.description ?? "",
        id: sale.id,
      });
    }
  }, [isEdit, reset, sale]);

  useEffect(() => {
    if (selectedPayments.length === 0) {
      setValue("amount", "");
    } else {
      const totalAmount = selectedPayments.reduce(
        (prev, { amount }) => prev + +amount,
        0
      );
      setValue("amount", `${totalAmount}`);
    }
  }, [selectedPayments, setValue]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>매출 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <RequiredLabel htmlFor="amount" required>
                  총 금액
                </RequiredLabel>
                <Input {...register("amount")} id="amount" disabled required />
              </div>
              <div className="space-y-2">
                <RequiredLabel htmlFor="date" required>
                  날짜
                </RequiredLabel>
                <Input
                  {...register("date")}
                  id="date"
                  type="date"
                  placeholder="결제 유형을 클릭해 매출을 입력해주세요."
                />
              </div>
            </div>
            <div className="space-y-4">
              <RequiredLabel required>결제 유형</RequiredLabel>
              {paymentTypes.map(({ id, name }, idx) => {
                return (
                  <div
                    key={id}
                    className="flex items-center space-x-4 min-h-[36px]"
                  >
                    <Checkbox
                      id={`payment${id}`}
                      checked={selectedPayments.some(
                        ({ typeId }) => typeId === id
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setValue(`payments.${idx}`, {
                            typeId: id,
                            amount: "",
                            name,
                          });
                        } else {
                          setValue(
                            "payments",
                            selectedPayments.filter(
                              ({ typeId }) => typeId !== id
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`payment-${name}`} className="w-24">
                      {name}
                    </Label>
                    {selectedPayments.some(({ typeId }) => typeId === id) && (
                      <Input
                        {...register(`payments.${idx}.amount` as const)}
                        placeholder="금액"
                        className="w-32"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="space-y-2">
              <RequiredLabel required>성별</RequiredLabel>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setValue("gender", value as Gender)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="gender-male" />
                  <Label htmlFor="gender-male">남성</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="gender-female" />
                  <Label htmlFor="gender-female">여성</Label>
                </div>
              </RadioGroup>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="time">
                <AccordionTrigger>
                  <RequiredLabel required>시간 선택</RequiredLabel>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => {
                          if (selectedTime === time) {
                            setValue("time", "");
                          } else {
                            setValue("time", time);
                          }
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="serviceTypes">
                <AccordionTrigger>서비스 유형</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => {
                            handleServiceChange(service.id);
                          }}
                        />
                        <Label htmlFor={`service-${service.id}`}>
                          {service.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-y-2">
              <Label htmlFor="customerInfo">설명</Label>
              <Input
                {...register("description")}
                id="customerInfo"
                type="text"
                placeholder="예: 30대 여성, 단골 고객"
                className="col-span-3"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isFormDisabled}>
              매출 등록
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SaleEditPage;
