"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";

type Props = {
  startTime: string;
  endTime: string;
  onChangeDate: (value: string, id: string) => void;
  onClickReset: () => void;
};

const SalesFilter: React.FC<Props> = (props) => {
  const { startTime, endTime, onChangeDate, onClickReset } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 min-w-[200px] flex-wrap">
        <Label htmlFor="startDate" className="mb-2 block">
          시작
        </Label>
        <Input
          id="startDate"
          type="date"
          value={startTime}
          onChange={(e) => onChangeDate(e.currentTarget.value, "startTime")}
          className="w-full"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="endDate" className="mb-2 block">
          종료
        </Label>
        <Input
          id="endDate"
          type="date"
          value={endTime}
          onChange={(e) => onChangeDate(e.currentTarget.value, "endTime")}
          className="w-full"
        />
      </div>
      <div className="flex items-end">
        <Button onClick={onClickReset} className="w-full sm:w-auto">
          초기화
        </Button>
      </div>
    </div>
  );
};

export default memo(SalesFilter);
