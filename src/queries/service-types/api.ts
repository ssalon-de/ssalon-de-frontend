import api from "@/shared/lib/axios";
import { CreateServiceType, ServiceType } from "./type";

export const getServiceTypes = async (): Promise<ServiceType[]> => {
  const { data } = await api({
    method: "GET",
    url: "/service-types",
  });

  return data as ServiceType[];
};

export const createServiceType = async (
  dto: CreateServiceType
): Promise<unknown> => {
  const { data } = await api({
    method: "POST",
    url: "/service-types",
    data: dto,
  });
  return data;
};

export const updateServiceType = async (dto: ServiceType): Promise<unknown> => {
  const { data } = await api({
    method: "PUT",
    url: `/service-types/${dto.id}`,
    data: {
      name: dto.name,
    },
  });
  return data;
};

export const deleteServiceType = async (id: string): Promise<unknown> => {
  const { data } = await api({
    method: "DELETE",
    url: `/service-types/${id}`,
  });
  return data;
};
