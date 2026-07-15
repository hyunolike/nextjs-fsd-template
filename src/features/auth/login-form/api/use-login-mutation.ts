import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/shared/api";
import { QUERY_KEYS } from "@/shared/config";
import { useSessionStore } from "@/entities/session";
import type { User } from "@/entities/user";

import type { LoginFormValues } from "../model/schema";

interface LoginResponse {
  accessToken: string;
  user: User;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const signIn = useSessionStore((state) => state.signIn);

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const { data } = await httpClient.post<LoginResponse>(
        "/auth/login",
        values,
      );
      return data;
    },
    onSuccess: (data) => {
      signIn(data.accessToken);
      queryClient.setQueryData([...QUERY_KEYS.session, "me"], data.user);
    },
  });
}
