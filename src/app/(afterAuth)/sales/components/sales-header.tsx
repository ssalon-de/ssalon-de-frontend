import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PageTitle from "@/shared/ui/page-title";

import { TotalSales } from "./total-sales";
import Link from "next/link";

const SalesHeader = () => {
  return (
    <div className="relative flex flex-col items-baseline justify-between gap-6 md:items-center md:flex-row md:gap-0">
      <PageTitle title="매출 목록" />
      <div className="flex flex-wrap justify-between w-full gap-4 md:w-max md:justify-normal">
        <TotalSales />
        <Link href="/sales/edit" className="absolute top-0 right-0 md:relative">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            매출 등록
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalesHeader;
