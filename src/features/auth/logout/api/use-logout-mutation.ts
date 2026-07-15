"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { httpClient } from "@/shared/api";
import { useSessionStore } from "@/entities/session";

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useSessionStore((state) => state.signOut);

  return useMutation({
    mutationFn: () => httpClient.post("/auth/logout"),
    onSettled: () => {
      signOut();
      queryClient.clear();
      router.push("/login");
    },
  });
}
