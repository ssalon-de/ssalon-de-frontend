"use client";

import { memo, useCallback, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateEditSaleDialog from "./create-edit-sale-dialog";
import PageTitle from "@/components/ui/page-title";
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";

const SalesHeader = () => {
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);

  const client = useQueryClient();

  const handleAfterMutate = useCallback(() => {
    client.invalidateQueries({
      queryKey: [KEYS.sales.list],
    });
  }, [client]);

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
        onAfterMutate={handleAfterMutate}
      />
    </>
  );
};

export default memo(SalesHeader);
