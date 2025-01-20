import apiClient from "@/shared/utils/api";
import { CreateServiceType, ServiceType } from "./type";

export const getServiceTypes = async (): Promise<ServiceType[]> => {
  try {
    // const token = getCookie("accessToken");
    // const response = await fetch(`${BASE_URL}/service-types`, {
    //   method: "GET",
    //   headers: { ...headers, Authorization: `Bearer ${token}` },
    // });

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }

    // const data: ServiceType[] = await response.json();

    // return data;

    return apiClient.get<ServiceType[]>("/service-types");
  } catch (error) {
    throw error;
  }
};

export const createServiceType = (dto: CreateServiceType): Promise<unknown> => {
  try {
    return apiClient.post("/service-types", {
      name: dto.name,
      price: dto.price,
    });
  } catch (error) {
    throw error;
  }
};

export const updateServiceType = async (dto: ServiceType): Promise<unknown> => {
  try {
    const body = {
      name: dto.name,
      price: dto.price,
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
