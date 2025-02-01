import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create();

export async function apiRequest<T>(
  url: string,
  method: "get",
  params?: Record<string, unknown> | null
): Promise<T> {
  const requestConfig: AxiosRequestConfig = {
    url,
    method,
  };

  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
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

  // return axiosInstance(requestConfig).then((response) => response.data);
  return axiosInstance
    .request<T>(requestConfig)
    .then((response) => response.data);
}
