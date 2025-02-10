import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PageTitle from "@/shared/ui/page-title";

import { TotalSales } from "./total-sales";
import Link from "next/link";

const SalesHeader = () => {
  return (
    <>
      <div className="flex md:items-center flex-col justify-between md:flex-row gap-2 md:gap-0 items-baseline">
        <PageTitle title="매출 목록" />
        <div className="md:w-max md:justify-normal w-full flex gap-4 justify-between">
          <TotalSales />
          <Link href="/sales/edit">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              매출 추가
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SalesHeader;
