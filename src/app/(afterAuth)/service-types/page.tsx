"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
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
      setIsEdit(false);
      setEditingId("");
      setEditingName("");
      setEditingPrice(0);
      afterMutateServiceType();
    },
  });
  const [isEdit, setIsEdit] = useState(false);
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
    setIsEdit(true);
    setEditingId(serviceType.id);
    setEditingName(serviceType.name);
    setEditingPrice(serviceType.price);
  };

  const handleClickSave = () => {
    updateServiceType({
      id: editingId,
      name: editingName,
      price: editingPrice,
    });
  };

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
                <TableCell className="text-right flex gap-1 justify-end">
                  {isEdit && editingId === id ? (
                    <Button
                      size="sm"
                      onClick={handleClickSave}
                      variant="outline"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleClickEdit({ id, name, price })}
                        size="sm"
                        variant="outline"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleClickDelete(id)}
                        size="sm"
                        variant="outline"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
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
