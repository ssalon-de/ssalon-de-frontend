"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewSaleDialog } from "@/app/(afterAuth)/sales/components/create-sale-dialog";

type Sale = {
  id: number;
  date: string;
  amount: number;
  serviceTypes: string[];
  customerInfo: string;
};

export default function SalesListPage() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      date: "2023-06-01T10:00",
      amount: 50000,
      serviceTypes: ["커트"],
      customerInfo: "20대 남성",
    },
    {
      id: 2,
      date: "2023-06-01T14:30",
      amount: 100000,
      serviceTypes: ["염색", "커트"],
      customerInfo: "30대 여성, 단골",
    },
    {
      id: 3,
      date: "2023-06-02T11:00",
      amount: 80000,
      serviceTypes: ["펌"],
      customerInfo: "40대 여성",
    },
    {
      id: 4,
      date: "2023-06-03T16:00",
      amount: 90000,
      serviceTypes: ["커트", "스타일링"],
      customerInfo: "50대 남성, 새 고객",
    },
  ]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [editedSale, setEditedSale] = useState<Sale | null>(null);

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale);
    setEditedSale({ ...sale });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSale) {
      setSales(sales.filter((s) => s.id !== selectedSale.id));
    }
    setIsDeleteDialogOpen(false);
  };

  const confirmEdit = () => {
    if (editedSale) {
      setSales(sales.map((s) => (s.id === editedSale.id ? editedSale : s)));
    }
    setIsEditDialogOpen(false);
  };

  const handleNewSale = (newSale: Omit<Sale, "id">) => {
    const id = Math.max(...sales.map((s) => s.id)) + 1;
    setSales([...sales, { ...newSale, id }]);
    setIsNewSaleDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">매출 목록</CardTitle>
        <Button onClick={() => setIsNewSaleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 새 매출 추가
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sales.map((sale) => (
            <Card key={sale.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">
                      {new Date(sale.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{sale.customerInfo}</p>
                  </div>
                  <p className="font-bold text-lg">
                    {sale.amount.toLocaleString()}원
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium">서비스:</p>
                  <p>{sale.serviceTypes.join(", ")}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(sale)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit2 className="w-4 h-4 mr-1" /> 수정
                  </Button>
                  <Button
                    onClick={() => handleDelete(sale)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> 삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>매출 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 매출 기록을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>매출 수정</DialogTitle>
            <DialogDescription>매출 정보를 수정하세요.</DialogDescription>
          </DialogHeader>
          {editedSale && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmEdit();
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    날짜 및 시간
                  </Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={editedSale.date}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, date: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    금액
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={editedSale.amount}
                    onChange={(e) =>
                      setEditedSale({
                        ...editedSale,
                        amount: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="serviceTypes" className="text-right">
                    서비스 유형
                  </Label>
                  <Input
                    id="serviceTypes"
                    value={editedSale.serviceTypes.join(", ")}
                    onChange={(e) =>
                      setEditedSale({
                        ...editedSale,
                        serviceTypes: e.target.value.split(", "),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerInfo" className="text-right">
                    고객 정보
                  </Label>
                  <Input
                    id="customerInfo"
                    value={editedSale.customerInfo}
                    onChange={(e) =>
                      setEditedSale({
                        ...editedSale,
                        customerInfo: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">저장</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <NewSaleDialog
        open={isNewSaleDialogOpen}
        onOpenChange={setIsNewSaleDialogOpen}
        onSubmit={handleNewSale}
      />
    </Card>
  );
}
