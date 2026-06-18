import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/lib/axios/public";
import type { ForgotPasswordFormData } from "@/types";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData): Promise<void> => {
      const { email } = data;

      await publicApi.post("/auth/forgot-password", {
        email,
      });
    },
  });
};
