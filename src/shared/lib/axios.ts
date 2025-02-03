import { logout } from "@/queries/auth/api";
import axios, { AxiosRequestConfig } from "axios";

import qs from "qs";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const api = createApiInstance();

function paramsSerializer(params: unknown): string {
  return qs.stringify(params);
}

function createApiInstance(bearerJwt = "", options: AxiosRequestConfig = {}) {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    paramsSerializer: {
      serialize: paramsSerializer,
    },
    ...options,
  });
  api.defaults.headers.common["Authorization"] = bearerJwt;
  return api;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; "); // 쿠키를 개별 키-값 쌍으로 분리
  for (const cookie of cookies) {
    const [key, value] = cookie.split("="); // 키와 값 분리
    if (key === name) {
      return decodeURIComponent(value); // URI 인코딩된 값 디코딩
    }
  }
  return null;
}

api.interceptors.request.use(
  (config) => {
    try {
      const accessToken = getCookie("accessToken"); // accessToken 읽기

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Error getting accessToken:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    if (error === undefined) throw error;
    if (error.response?.status === 401) {
      try {
        // const token = await useRefresh();
        // const refreshToken = await
        // const retryConfig = {
        //   ...error.config,
        //   headers: {
        //     ...error.config.headers,
        //     // Authorization: `Bearer ${token}`,
        //   },
        // };
        // return api(retryConfig);
        // logout();
        alert("로그인이 필요합니다.");
      } catch {
        return logout();
      }
    } else if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    throw error;
  }
);

export default api;
