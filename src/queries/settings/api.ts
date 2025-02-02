import api from "@/shared/lib/axios";
import { Setting } from "./type";

export const getSettings = async (): Promise<Setting[]> => {
  const { data } = await api({
    method: "GET",
    url: "/settings",
  });
  return data as Setting[];
};

export const editSettings = async (dto: Setting[]) => {
  const { data } = await api({
    method: "POST",
    url: "/settings",
    data: dto,
  });
  return data;
};
