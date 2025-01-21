"use client";

import { NewServiceTypeDialog } from "@/app/(afterAuth)/service-types/components/create-service-types-dialog";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServicTypesHeader() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const afterMutateServiceType = () => {
    router.refresh();
  };

  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">서비스 관리</CardTitle>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          서비스 생성
        </Button>
        <NewServiceTypeDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          afterCreateServiceType={afterMutateServiceType}
        />
      </div>
    </CardHeader>
  );
}
