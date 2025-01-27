import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function apiRequest<T>(
  url: string,
  method: "get" | "put" | "post" | "delete",
  data?: Record<string, unknown> | null,
  headers: Record<string, string> = {}
): Promise<T> {
  const requestConfig: AxiosRequestConfig = {
    url,
    method,
    headers,
  };

  if (method.toLowerCase() === "get") {
    const queryParams = new URLSearchParams();

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            queryParams.append(`${key}[${index}]`, item.toString());
          });
        } else if (value !== null && value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    requestConfig.params = queryParams;
  } else if (["post", "put", "delete"].includes(method.toLowerCase())) {
    requestConfig.data = data;
  }

  return axiosInstance(requestConfig).then((response) => response.data);
}
