export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type Error = {
  status: number;
  message: string;
};

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private globalErrorHandler?: (error: Error) => void;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // 🔹 글로벌 에러 핸들러 설정
  setGlobalErrorHandler(handler: (error: Error) => void) {
    this.globalErrorHandler = handler;
  }

  // Client에서만 사용해야함
  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // if (isServer()) {
    //   const serverCookies = await cookies();
    //   this.accessToken = serverCookies.get("accessToken")?.value || "";
    // } else {
    // }
    this.accessToken = getCookie("accessToken");

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        throw {
          status: res.status,
          message: res.statusText,
        };
      }

      return res.json();
    } catch (error) {
      console.log(error);
      const customError = error as Error;

      if (this.globalErrorHandler) {
        this.globalErrorHandler(customError);
      }

      // temp
      return customError as T;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>("GET", endpoint);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", endpoint, body);
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>("PUT", endpoint, body);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>("DELETE", endpoint);
  }
}

const apiClient = new ApiClient(BASE_URL);

apiClient.setGlobalErrorHandler((error) => {
  if (error.status === 401) {
    // reissue
  } else {
    console.log(error);
  }
});

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; "); // 쿠키를 개별 키-값 쌍으로 분리
  for (const cookie of cookies) {
    const [key, value] = cookie.split("="); // 키와 값 분리
    if (key === name) {
      return decodeURIComponent(value); // URI 인코딩된 값 디코딩
    }
  }
  return null;
}

export default apiClient; // 기본 서버 URL 설정
