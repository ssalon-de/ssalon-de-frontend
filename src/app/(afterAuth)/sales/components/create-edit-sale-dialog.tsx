"use client";

import { useCallback, memo, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateSale, useSale, useUpdateSale } from "@/queries/sales";
import { useServiceTypes } from "@/queries/service-types";
import { MutateType } from "@/shared/types/query";
import { CreateSaleDto, Sale, UpdateSaleDto } from "@/queries/sales/type";
import { useToast } from "@/shared/hooks/use-toast";
import { useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";

type Props = {
  id?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAfterMutate?: (type: MutateType) => void;
};

type SaleForm = Omit<Sale, "services"> & {
  services: string[];
};

const defaultValues = {
  date: "",
  amount: 0,
  services: [],
  description: "",
  id: "",
};

const CreateEditSaleDialog: React.FC<Props> = ({
  id,
  open,
  onOpenChange,
  onAfterMutate,
}) => {
  const isEdit = !!id;

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm<SaleForm>({
    defaultValues,
    mode: "onChange",
  });

  const amount = useWatch({ control, name: "amount" });
  const services = useWatch({ control, name: "services" });

  const { data: sale } = useSale(id ?? "", {
    enabled: isEdit && open,
  });

  const { data: serviceTypes = [] } = useServiceTypes();

  const onSuccessCallback = () => {
    onOpenChange(false);
    reset(defaultValues);

    if (onAfterMutate) {
      onAfterMutate(isEdit ? "UPDATE" : "CREATE");
    }
  };

  const { mutate: createSale } = useCreateSale({
    onSuccess: onSuccessCallback,
  });
  const { mutate: updateSale } = useUpdateSale({
    onSuccess: onSuccessCallback,
  });

  const validateForm = useCallback((data: CreateSaleDto | UpdateSaleDto) => {
    const validate = {
      message: "",
      flag: true,
    };
    if (data.amount === 0) {
      validate.message = "총 금액을 입력해주세요.";
      validate.flag = false;
      return validate;
    } else if (data.services.length === 0) {
      validate.message = "서비스 유형을 선택해주세요.";
      validate.flag = false;
      return validate;
    } else if (!data.date) {
      validate.message = "날짜 및 시간을 선택해주세요.";
      validate.flag = false;
      return validate;
    }
    return validate;
  }, []);

  const onSubmit = useCallback(
    (sale: SaleForm) => {
      const inputData = {
        date: dayjs(sale.date).format("YYYY-MM-DDTHH:mm"),
        amount: sale.amount,
        services: sale.services,
        description: sale.description,
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

        const dto = {
          date: inputData.date,
          amount: inputData.amount,
          services,
          description: inputData.description,
        };

        if (isEdit) {
          updateSale({
            id: id,
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
      const newServices = services.includes(serviceId)
        ? services.filter((id) => id !== serviceId)
        : [...services, serviceId];
      setValue("services", newServices);
    },
    [services, setValue]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    reset(defaultValues);
  }, [onOpenChange, reset]);

  const isFormDisabled = useMemo(() => {
    const hasError = Object.keys(formState.errors).length > 0;
    return formState.isSubmitting || hasError;
  }, [formState]);

  useEffect(() => {
    if (isEdit && sale) {
      reset({
        date: dayjs(sale.date).format("YYYY-MM-DDTHH:mm"),
        amount: sale.amount,
        services: sale.services.map((service) => service.id),
        description: sale.description ?? "",
        id: sale.id,
      });
    }
  }, [isEdit, reset, sale, open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>매출 입력</DialogTitle>
          <DialogDescription>매출 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateTime" className="text-right">
                시간
              </Label>
              <Input
                {...register("date")}
                id="dateTime"
                type="datetime-local"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">서비스 유형</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {serviceTypes.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={services.includes(service.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const price =
                            serviceTypes.find((s) => s.id === service.id)
                              ?.price ?? 0;
                          setValue("amount", +price + +amount);
                        }
                        handleServiceChange(service.id);
                      }}
                    />
                    <Label htmlFor={`service-${service.id}`}>
                      {service.name} ({service.price.toLocaleString()}원)
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                총 금액
              </Label>
              <Input
                {...register("amount")}
                id="amount"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== "" && !/^\d+$/.test(value)) {
                    const message = "총 금액은 숫자만 입력 가능합니다.";
                    setError("amount", {
                      message,
                    });
                    return toast({
                      variant: "destructive",
                      description: message,
                    });
                  } else {
                    clearErrors("amount");
                    setValue("amount", +e.target.value);
                  }
                }}
                isError={!!formState.errors.amount}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerInfo" className="text-right">
                고객 정보
              </Label>
              <Input
                {...register("description")}
                id="customerInfo"
                type="text"
                placeholder="예: 30대 여성, 단골 고객"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isFormDisabled}>
              매출 등록
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateEditSaleDialog);
