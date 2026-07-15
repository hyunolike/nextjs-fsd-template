import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { userApi } from "./user-api";

export function useCurrentUserQuery(enabled: boolean) {
  return useQuery({
    queryKey: [...QUERY_KEYS.session, "me"],
    queryFn: userApi.fetchCurrentUser,
    enabled,
  });
}
