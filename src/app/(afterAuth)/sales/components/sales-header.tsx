"use client";

import { Plus, File } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PageTitle from "@/shared/ui/page-title";

import { TotalSales } from "./total-sales";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants/path";
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";
import Link from "next/link";

const SalesHeader = () => {
  const router = useRouter();
  const client = useQueryClient();
  const handleClick = () => {
    client.invalidateQueries({
      queryKey: [KEYS.filters],
    });
    router.push(PATH.SALES_EDIT);
  };
  return (
    <div className="relative flex flex-col items-baseline justify-between gap-6 md:items-center md:flex-row md:gap-0">
      <PageTitle title="매출 목록" />
      <div className="flex flex-wrap justify-between w-full gap-4 md:w-max md:justify-normal">
        <Link href={PATH.SALES_MULTI}>
          {/* 추후 수정 */}
          <Button size="sm" variant="secondary">
            <File className="w-4 h-4" />
          </Button>
        </Link>
        <TotalSales />
        <Button
          onClick={handleClick}
          className="absolute top-0 right-0 md:relative"
        >
          <Plus className="w-4 h-4" />
          매출 등록
        </Button>
      </div>
    </div>
  );
};

export default SalesHeader;
