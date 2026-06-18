"use client";

import type { DehydratedState } from "@tanstack/react-query";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "./client";

interface Props {
  children: React.ReactNode;
  state?: DehydratedState | null | undefined;
}

export function ReactQueryHydration({ children, state }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
