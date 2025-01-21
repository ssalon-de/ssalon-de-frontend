"use client";

import { useState, useCallback } from "react";
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
import { useCreateSale, useUpdateSale } from "@/queries/sales";
import { useServiceTypes } from "@/queries/service-types";
import { MutateType } from "@/shared/types/query";
import { CreateSaleDto, UpdateSaleDto } from "@/queries/sales/type";
import { useToast } from "@/shared/hooks/use-toast";

type NewSaleDialogProps = {
  id?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAfterMutate?: (type: MutateType) => void;
};

export function CreateEditSaleDialog({
  id,
  open,
  onOpenChange,
  onAfterMutate,
}: NewSaleDialogProps) {
  const isEdit = !!id;
  const [dateTime, setDateTime] = useState("");
  const [amount, setAmount] = useState(0);

  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const { data: serviceTypes = [] } = useServiceTypes();

  const onSuccessCallback = () => {
    onOpenChange(false);
    resetForm();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputData = {
      date: dateTime,
      amount,
      services: selectedServices,
      description,
    };

    const { message, flag } = validateForm(inputData);

    if (flag) {
      const services = selectedServices.reduce((prev, cur) => {
        const service = serviceTypes.find((service) => service.id === cur);
        if (service) {
          prev.push(service.id);
        }
        return prev;
      }, [] as string[]);

      const dto = {
        date: new Date(dateTime).toISOString(),
        amount: amount,
        services,
        description: description,
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
  };

  const resetForm = () => {
    setDateTime("");
    setAmount(0);
    setSelectedServices([]);
    setDescription("");
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleClose = (open: boolean) => {
    resetForm();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>매출 입력</DialogTitle>
          <DialogDescription>매출 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateTime" className="text-right">
                날짜 및 시간
              </Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
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
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceChange(service.id)}
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
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerInfo" className="text-right">
                고객 정보
              </Label>
              <Input
                id="customerInfo"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="예: 30대 여성, 단골 고객"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">매출 등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
