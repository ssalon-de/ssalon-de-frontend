"use client";
import { memo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

import CreateEditSaleDialog from "./create-edit-sale-dialog";

const SalesHeader = () => {
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">매출 목록</CardTitle>
        <Button onClick={() => setIsNewSaleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          매출 추가
        </Button>
      </CardHeader>
      <CreateEditSaleDialog
        open={isNewSaleDialogOpen}
        onOpenChange={setIsNewSaleDialogOpen}
      />
    </>
  );
};

export default memo(SalesHeader);
