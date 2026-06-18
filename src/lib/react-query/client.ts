import { isServer, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function getQueryClient() {
  let browserQueryClient: QueryClient | undefined;

  if (isServer) {
    return queryClient;
  } else {
    if (!browserQueryClient) browserQueryClient = queryClient;
    return browserQueryClient;
  }
}
