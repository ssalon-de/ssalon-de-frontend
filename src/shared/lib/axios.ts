import axios, { AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";

import qs from "qs";

import { reissue } from "@/queries/auth/api";

import { getCookie, setTokenInCookie } from "@/shared/actions/cookie";
import { BASE_URL } from "@/shared/constants/env";
import { TOKEN } from "@/shared/constants/token";
import { PATH } from "@/shared/constants/path";
import { API_TIMEOUT } from "@/shared/constants/app";

// 토큰 재발급 중 중복 요청을 방지하기 위한 변수
let isRefreshing = false;

const api = createApiInstance();

function paramsSerializer(params: unknown): string {
  return qs.stringify(params);
}

function createApiInstance(bearerJwt = "", options: AxiosRequestConfig = {}) {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    paramsSerializer: {
      serialize: paramsSerializer,
    },
    ...options,
  });
  api.defaults.headers.common["Authorization"] = bearerJwt;
  return api;
}

api.interceptors.request.use(async (config) => {
  const accessToken = await getCookie(TOKEN.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    if (error === undefined) throw error;
    if (error.response?.status === 401) {
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          const res = await reissue();

          if (res.status === 200) {
            const { accessToken } = await res.json();

            await setTokenInCookie(TOKEN.ACCESS_TOKEN, accessToken);

            const retryConfig = {
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };
            return api(retryConfig);
          } else {
            throw new Error("Unauthorized: Invalid token");
          }
        }
      } catch {
        await signOut({ callbackUrl: PATH.LOGIN });
      } finally {
        isRefreshing = false;
      }
    } else if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    return Promise.reject(error);
  }
);

export default api;
