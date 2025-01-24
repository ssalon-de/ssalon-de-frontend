"use client";

import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

import CreateServiceTypesDialog from "./create-service-types-dialog";

const ServicTypesHeader = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const afterMutateServiceType = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">서비스 관리</CardTitle>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          서비스 생성
        </Button>
        <CreateServiceTypesDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          afterCreateServiceType={afterMutateServiceType}
        />
      </div>
    </CardHeader>
  );
};

export default memo(ServicTypesHeader);
