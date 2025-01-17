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

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

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

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const apiClient = new ApiClient(baseUrl);

apiClient.setGlobalErrorHandler((error) => {
  if (error.status === 401) {
    alert(error.message);
  } else if (error.status === 500) {
    alert(error.message);
  } else {
    alert(error.message);
  }
});

export default apiClient; // 기본 서버 URL 설정
