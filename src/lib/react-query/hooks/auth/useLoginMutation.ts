import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { publicApi } from "@/lib/axios/public";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import type { LoginFormData } from "@/types";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData): Promise<void> => {
      const { email, password } = data;

      await publicApi.post("/auth/login", {
        email,
        password,
      });
    },

    onSuccess: (data: unknown) => {
      toast.success("Login successful");
      const token = (data as { data: { data: { tokens: { access: string } } } })
        .data.data.tokens.access;

      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

      router.push("/dashboard");
    },
  });
};
