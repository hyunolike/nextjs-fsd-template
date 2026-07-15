"use client";

import type { ReactNode } from "react";

import { useBootstrapSession } from "@/entities/session";

export function SessionBootstrap({ children }: { children: ReactNode }) {
  useBootstrapSession();
  return children;
}
