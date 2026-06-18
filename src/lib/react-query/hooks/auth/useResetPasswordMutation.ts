import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { publicApi } from "@/lib/axios/public";
import type { ResetPasswordFormData } from "@/types";

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ResetPasswordFormData): Promise<void> => {
      const { password, token } = data;

      await publicApi.post("/auth/reset-password", {
        password,
        token,
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push("/auth/login?reset=success");
      }, 3000);
    },
  });
};
