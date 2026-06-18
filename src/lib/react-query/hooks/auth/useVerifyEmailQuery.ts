import { useQuery } from "@tanstack/react-query";
import { STORAGE_KEYS } from "@/lib/storage/keys";

export const useVerifyEmailQuery = (token: string) => {
  return useQuery({
    queryKey: [STORAGE_KEYS.VERIFY_EMAIL, token],
    queryFn: async () => {
      const res = await fetch("/api/auth/verify-email");
      return res.json();
    },
    enabled: !!token,
  });
};
