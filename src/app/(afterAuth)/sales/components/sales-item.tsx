"use client";

import { Badge, BadgeProps } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Gender } from "@/queries/sales/type";
import { ServiceType } from "@/queries/settings/type";
import { VisitType } from "@/queries/settings/type";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { memo } from "react";
import { cn } from "@/shared/utils/tailwind";
import useBadgeCustomStore from "@/zustand/badge-custom";
import { BadgeType } from "@/shared/types/badge-type";
import {
  COLOR_MAP,
  HOVER_COLOR_MAP,
  TEXT_COLOR_MAP,
} from "@/shared/constants/palette";
import { ColorKey } from "@/shared/types/palette";

type Props = {
  id: string;
  date: string;
  amount: string;
  services: ServiceType[];
  payments: string[];
  gender: Gender;
  description?: string;
  visitTypes: VisitType[];
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
};

const SalesItem: React.FC<Props> = ({
  id,
  date,
  amount,
  services,
  description,
  payments,
  gender,
  visitTypes,
  onClickEdit,
  onClickDelete,
}) => {
  const badgeCustom = useBadgeCustomStore((state) => state.badgeCustom);

  const setBadgeProps = (key: BadgeType) => {
    const basicVariant: Record<BadgeType, BadgeProps["variant"]> = {
      visitType: "outline",
      serviceType: "secondary",
      paymentType: "default",
      gender: "destructive",
    };
    const props: BadgeProps = {};
    const isCustomized = badgeCustom[key] !== "";

    if (isCustomized) {
      props.className = cn(
        COLOR_MAP[badgeCustom[key] as ColorKey],
        TEXT_COLOR_MAP[badgeCustom[key] as ColorKey],
        HOVER_COLOR_MAP[badgeCustom[key] as ColorKey]
      );
    } else {
      props.variant = basicVariant[key];
    }
    return props;
  };

  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-semibold">
              {dayjs(date).format("YY/MM/DD HH:mm")}
            </p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="text-lg font-bold">
            {Number(amount).toLocaleString()}원
          </p>
        </div>
        <div className="flex gap-1 mb-4 flex-wrap">
          {visitTypes.map((visitType) => (
            <Badge key={`${id}${visitType.id}`} {...setBadgeProps("visitType")}>
              {visitType.name}
            </Badge>
          ))}
          {payments.map((payment) => (
            <Badge key={`${id}${payment}`} {...setBadgeProps("paymentType")}>
              {payment}
            </Badge>
          ))}
          {services.map((service) => (
            <Badge key={`${id}${service.id}`} {...setBadgeProps("serviceType")}>
              {service.name}
            </Badge>
          ))}
          <Badge {...setBadgeProps("gender")}>
            {gender === "M" ? "남성" : "여성"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center"></div>
          <div className="flex space-x-2">
            <Button onClick={() => onClickEdit(id)} size="sm" variant="outline">
              <Edit2 className="w-4 h-4 mr-1" />
            </Button>
            <Button
              onClick={() => onClickDelete(id)}
              size="sm"
              variant="outline"
            >
              <Trash2 className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(SalesItem);
