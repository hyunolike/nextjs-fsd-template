import { httpClient } from "@/shared/api";

import type { User } from "../model/types";

export const userApi = {
  async fetchCurrentUser(): Promise<User> {
    const { data } = await httpClient.get<User>("/auth/me");
    return data;
  },
};
