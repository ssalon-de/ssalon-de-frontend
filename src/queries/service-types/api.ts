import apiClient from "@/shared/utils/api";
import { CreateServiceType, ServiceType } from "./type";

export const getServiceTypes = async (): Promise<ServiceType[]> => {
  try {
    return apiClient.get<ServiceType[]>("/service-types");
  } catch (error) {
    throw error;
  }
};

export const createServiceType = (dto: CreateServiceType): Promise<unknown> => {
  try {
    return apiClient.post("/service-types", {
      name: dto.name,
    });
  } catch (error) {
    throw error;
  }
};

export const updateServiceType = async (dto: ServiceType): Promise<unknown> => {
  try {
    const body = {
      name: dto.name,
    };
    return apiClient.put(`/service-types/${dto.id}`, body);
  } catch (error) {
    throw error;
  }
};

export const deleteServiceType = async (id: string): Promise<unknown> => {
  try {
    return apiClient.delete(`/service-types/${id}`);
  } catch (error) {
    throw error;
  }
};
