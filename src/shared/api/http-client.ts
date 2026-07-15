import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/shared/config";
import { tokenStorage } from "@/shared/lib";

import { ApiError, type ApiErrorBody } from "./api-error";

/** Marks a request as already retried once, to prevent infinite refresh loops. */
interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

/**
 * Deduplicates concurrent 401s into a single in-flight refresh call so a burst
 * of parallel requests doesn't trigger a refresh storm.
 */
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  refreshPromise ??= axios
    .post<{ accessToken: string }>(
      `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    )
    .then((res) => res.data.accessToken)
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true;
      const nextToken = await refreshAccessToken();

      if (nextToken) {
        tokenStorage.set(nextToken);
        config.headers.set("Authorization", `Bearer ${nextToken}`);
        return httpClient(config);
      }

      tokenStorage.clear();
    }

    const body = error.response?.data ?? { message: error.message };
    return Promise.reject(new ApiError(error.response?.status ?? 0, body));
  },
);
