import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PageTitle from "@/shared/ui/page-title";

import { TotalSales } from "./total-sales";
import Link from "next/link";

const SalesHeader = () => {
  return (
    <div className="flex md:items-center flex-col justify-between md:flex-row gap-4 md:gap-0 items-baseline relative">
      <PageTitle title="매출 목록" />
      <div className="md:w-max md:justify-normal w-full flex gap-4 justify-between flex-wrap">
        <TotalSales />
        <Link href="/sales/edit" className="absolute right-0 top-0 md:relative">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            매출 등록
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalesHeader;
