import { BASE_URL, getCookie } from "@/shared/utils/api";
import { CreateServiceType, ServiceType } from "./type";

const headers: HeadersInit = {
  "Content-Type": "application/json",
};

export const getServiceTypes = async (): Promise<ServiceType[]> => {
  try {
    const token = getCookie("accessToken");
    const response = await fetch(`${BASE_URL}/service-types`, {
      method: "GET",
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: ServiceType[] = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const createServiceType = (dto: CreateServiceType): Promise<unknown> => {
  try {
    const token = getCookie("accessToken");

    const body = {
      name: dto.name,
      price: dto.price,
    };

    return fetch(`${BASE_URL}/service-types`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw error;
  }
};

export const updateServiceType = (dto: ServiceType): Promise<unknown> => {
  try {
    const token = getCookie("accessToken");

    const body = {
      name: dto.name,
      price: dto.price,
    };

    return fetch(`${BASE_URL}/service-types/${dto.id}`, {
      method: "PUT",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteServiceType = async (id: string): Promise<unknown> => {
  try {
    const token = getCookie("accessToken");
    const res = await fetch(`${BASE_URL}/service-types/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }

    return res;
  } catch (error) {
    throw error;
  }
};
