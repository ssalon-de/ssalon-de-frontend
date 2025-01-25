"use client";
import { memo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateEditSaleDialog from "./create-edit-sale-dialog";
import PageTitle from "@/components/ui/page-title";

const SalesHeader = () => {
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="매출 목록" />
        <Button onClick={() => setIsNewSaleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          매출 추가
        </Button>
      </div>

      <CreateEditSaleDialog
        open={isNewSaleDialogOpen}
        onOpenChange={setIsNewSaleDialogOpen}
      />
    </>
  );
};

export default memo(SalesHeader);
