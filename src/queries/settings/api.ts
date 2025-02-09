import api from "@/shared/lib/axios";
import { Setting, UpdateVisitTypeDto, VisitType } from "./type";

export const getSettings = async (): Promise<Setting[]> => {
  const { data } = await api({
    method: "GET",
    url: "/settings",
  });
  return data as Setting[];
};

export const getVisitTypes = async (): Promise<VisitType[]> => {
  const { data } = await api({
    method: "GET",
    url: "/settings/visit-types",
  });
  return data as VisitType[];
};

export const createVisitType = async (name: string): Promise<VisitType> => {
  const { data } = await api({
    method: "POST",
    url: "/settings/visit-types",
    data: {
      name,
    },
  });
  return data;
};

export const editSettings = async (dto: Setting[]) => {
  const { data } = await api({
    method: "POST",
    url: "/settings",
    data: dto,
  });
  return data;
};

export const updateVisitType = async (
  dto: UpdateVisitTypeDto
): Promise<VisitType> => {
  const { data } = await api({
    method: "PUT",
    url: `/settings/visit-types/${dto.id}`,
    data: {
      name: dto.name,
    },
  });
  return data;
};

export const deleteVisitType = async (id: string): Promise<VisitType> => {
  const { data } = await api({
    method: "DELETE",
    url: `/settings/visit-types/${id}`,
  });
  return data;
};
