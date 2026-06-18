"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "./client";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const resolveQueryClient = getQueryClient();

  return (
    <QueryClientProvider client={resolveQueryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
