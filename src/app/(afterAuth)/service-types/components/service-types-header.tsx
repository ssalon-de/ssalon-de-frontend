"use client";

import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import CreateServiceTypesDialog from "./create-service-types-dialog";
import PageTitle from "@/components/ui/page-title";

const ServiceTypesHeader = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const afterMutateServiceType = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="서비스 관리" />
      <Button onClick={() => setOpenDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        생성
      </Button>
      <CreateServiceTypesDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        afterCreateServiceType={afterMutateServiceType}
      />
    </div>
  );
};

export default memo(ServiceTypesHeader);
