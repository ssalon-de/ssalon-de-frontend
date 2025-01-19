"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewServiceTypeDialog } from "@/components/dialogs/create-service-types-dialog";
import {
  useDeleteServiceType,
  useServiceTypes,
  useUpdateServiceType,
} from "@/queries/service-types";
import { ServiceType } from "@/queries/service-types/type";
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";

export default function ServiceTypesPage() {
  const client = useQueryClient();
  const { data: serviceTypes = [] } = useServiceTypes();
  const { mutate: deleteServiceType } = useDeleteServiceType({
    onSuccess: () => {
      afterMutateServiceType();
    },
  });
  const { mutate: updateServiceType } = useUpdateServiceType({
    onSuccess: () => {
      setEditingId("");
      setEditingName("");
      setEditingPrice(0);
      afterMutateServiceType();
    },
  });
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");
  const [editingPrice, setEditingPrice] = useState(0);

  const [isNewServiceTypeDialogOpen, setIsNewServiceTypeDialogOpen] =
    useState(false);

  const afterMutateServiceType = () => {
    client.invalidateQueries({
      queryKey: [KEYS.serviceTypes.list],
    });
  };

  const handleClickEdit = (serviceType: ServiceType) => {
    setEditingId(serviceType.id);
    setEditingName(serviceType.name);
    setEditingPrice(serviceType.price);
  };

  const handleClickSave = () =>
    updateServiceType({
      id: editingId,
      name: editingName,
      price: editingPrice,
    });

  const handleClickDelete = (id: string) => {
    deleteServiceType(id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">서비스 관리</CardTitle>
          <Button onClick={() => setIsNewServiceTypeDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            서비스 생성
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>서비스</TableHead>
              <TableHead>가격</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceTypes.map(({ id, name, price }) => (
              <TableRow key={id}>
                <TableCell>
                  {editingId === id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                  ) : (
                    name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === id ? (
                    <Input
                      type="number"
                      value={editingPrice}
                      onChange={(e) => setEditingPrice(+e.target.value)}
                    />
                  ) : (
                    `${price.toLocaleString()}원`
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === id ? (
                    <Button size="sm" onClick={handleClickSave}>
                      저장
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleClickEdit({ id, name, price })}
                      size="sm"
                      variant="outline"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      수정
                    </Button>
                  )}
                  <Button
                    onClick={() => handleClickDelete(id)}
                    size="sm"
                    variant="outline"
                    className="ml-2"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <NewServiceTypeDialog
        open={isNewServiceTypeDialogOpen}
        onOpenChange={setIsNewServiceTypeDialogOpen}
        afterCreateServiceType={afterMutateServiceType}
      />
    </Card>
  );
}
