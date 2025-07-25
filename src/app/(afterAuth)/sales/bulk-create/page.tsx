"use client";

import { useCreateBulkSale } from "@/queries/sales";
import { Payment } from "@/queries/sales/type";
import { usePaymentTypes } from "@/queries/settings";
import { ERROR_MESSAGE } from "@/shared/constants/error-message";
import { PATH } from "@/shared/constants/path";
import { KEYS } from "@/shared/constants/query-keys";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import PageTitle from "@/shared/ui/page-title";
import useDateStore from "@/zustand/date";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

type BulkSale = {
  amount: number;
  payments: Pick<Payment, "typeId" | "amount">[];
};

type Form = {
  date: string;
  bulkSales: BulkSale[];
};

const defaultValues: Form = {
  date: "",
  bulkSales: [{ amount: 0, payments: [] }],
};

const BulkPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const client = useQueryClient();
  const date = useDateStore((state) => state.date);
  const { control, handleSubmit, reset, setValue } = useForm<Form>({
    defaultValues: {
      ...defaultValues,
      date: date,
    },
  });

  const { mutate: createBulkSales } = useCreateBulkSale({
    onSuccess: () => {
      reset(defaultValues);
      client.invalidateQueries({
        queryKey: [KEYS.sales.list, date],
      });
      router.push(PATH.SALES);
      toast({
        description: "매출이 성공적으로 등록되었습니다.",
      });
    },
    onError: () => {
      toast({
        description: "매출 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const { data: paymentTypes = [], isFetching, isError } = usePaymentTypes();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bulkSales",
    rules: {
      minLength: {
        value: 1,
        message: ERROR_MESSAGE.NEED_MINIMUM_ONE_SALE.message,
      },
    },
  });

  const bulkSales = useWatch({ control, name: "bulkSales" });

  console.log(bulkSales);

  const appendField = () => {
    append(
      { amount: 0, payments: [] },
      {
        shouldFocus: true,
      }
    );
  };

  const removeField = (index: number) => {
    if (fields.length === 1) {
      return toast({
        description: ERROR_MESSAGE.NEED_MINIMUM_ONE_SALE.message,
        variant: "destructive",
      });
    }

    remove(index);
  };

  const isLastIndex = (index: number) => {
    return index === fields.length - 1;
  };

  const handleClickSave = (formData: Form) => {
    const bulkSales = formData.bulkSales.map((sale) => sale.amount);
    createBulkSales({
      date: formData.date,
      bulkSales,
    });
  };

  // const isChecked = (fieldIndex: number, paymentTypeId: string) => {
  //   return bulkSales[fieldIndex].payments.some(
  //     (payment) => payment.typeId === paymentTypeId
  //   );
  // };

  console.log("bulkSales", bulkSales);

  return (
    <form
      className="container flex flex-col gap-4"
      onSubmit={handleSubmit(handleClickSave)}
    >
      <PageTitle className="flex justify-between">
        매출 다중 입력
        <Button>저장</Button>
      </PageTitle>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field, index) => {
          const bulkSale = bulkSales[index];
          return (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Label className="w-12" htmlFor={`bulkSales.${index}.amount`}>
                    총 매출
                  </Label>
                  <Input
                    key={`bulkSale.${index}.amount`}
                    disabled
                    placeholder="매출 유형을 통해 매출을 입력해주세요."
                    {...control.register(`bulkSales.${index}.amount`)}
                  />
                </div>
                <div className="flex flex-col gap-6 mt-4">
                  {paymentTypes.map((paymentType, paymentTypesIndex) => {
                    console.log(bulkSale);
                    const payments = bulkSale?.payments ?? [];
                    const onChangeCheckbox = (checked: boolean) => {
                      const newPayments = checked
                        ? [...payments, { typeId: paymentType.id, amount: "" }]
                        : payments.filter(
                            ({ typeId }) => typeId !== paymentType.id
                          );
                      setValue(`bulkSales.${index}.payments`, newPayments);
                    };

                    const isChecked = payments.some(
                      ({ typeId }) => typeId === paymentType.id
                    );

                    return (
                      <div
                        key={`${index}-${paymentType.id}`}
                        className="h-6 flex items-center gap-2"
                      >
                        <Checkbox
                          onCheckedChange={onChangeCheckbox}
                          id={`bulkSales.${index}.payments.${paymentTypesIndex}`}
                        />
                        <Label
                          htmlFor={`bulkSales.${index}.payments.${paymentTypesIndex}`}
                        >
                          {paymentType.name}
                        </Label>
                        {isChecked && (
                          <Input
                            type="number"
                            placeholder="금액"
                            className="w-24 ml-2"
                            value={
                              bulkSale.payments.find(
                                (payment) => payment.typeId === paymentType.id
                              )?.amount || ""
                            }
                            onChange={(e) => {
                              const amount = e.target.value;
                              if (!isNaN(+amount)) {
                                setValue(
                                  `bulkSales.${index}.payments`,
                                  bulkSale.payments.map((payment) =>
                                    payment.typeId === paymentType.id
                                      ? { ...payment, amount }
                                      : payment
                                  )
                                );
                              } else {
                                toast({
                                  description: "숫자만 입력해주세요.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-1">
                {isLastIndex(index) ? (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={appendField}
                    className="rounded-icon"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                ) : null}
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    removeField(index);
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </form>
  );
};

export default BulkPage;
