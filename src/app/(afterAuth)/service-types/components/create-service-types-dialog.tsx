"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateServiceType } from "@/queries/service-types";

type NewServiceTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  afterCreateServiceType: () => void;
};

export function NewServiceTypeDialog({
  open,
  onOpenChange,
  afterCreateServiceType,
}: NewServiceTypeDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const { mutate: createServiceType } = useCreateServiceType({
    onSuccess: () => {
      resetForm();
      onOpenChange(false);
      afterCreateServiceType();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createServiceType({ name, price });
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 서비스 타입 추가</DialogTitle>
          <DialogDescription>
            새로운 서비스 타입의 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                서비스
              </Label>
              <Input
                id="name"
                placeholder="서비스"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                가격
              </Label>
              <Input
                id="price"
                placeholder="가격"
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                required
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
