import apiClient from "@/shared/utils/api";
import { Setting } from "./type";

export const getSettings = async (): Promise<Setting[]> => {
  try {
    return apiClient.get<Setting[]>("/settings");
  } catch (error) {
    throw error;
  }
};

export const editSettings = async (dto: Setting[]) => {
  try {
    return apiClient.post("/settings", dto);
  } catch (error) {
    throw error;
  }
};
