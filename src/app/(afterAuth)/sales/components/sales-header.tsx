import { File, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PageTitle from "@/shared/ui/page-title";

import { TotalSales } from "./total-sales";
import Link from "next/link";
import { PATH } from "@/shared/constants/path";

const SalesHeader = () => {
  return (
    <div className="relative flex flex-col items-baseline justify-between gap-6 md:items-center md:flex-row md:gap-0">
      <PageTitle title="매출 목록" />
      <div className="flex flex-wrap justify-between w-full gap-4 md:w-max md:justify-normal">
        <TotalSales />
        <div className="flex items-center gap-2">
          <Link href={PATH.SALES_MULTI}>
            {/* 추후 수정 */}
            <Button size="sm" variant="secondary">
              <File className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href={PATH.SALES_EDIT}
            className="absolute top-0 right-0 md:relative"
          >
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesHeader;
