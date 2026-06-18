import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/lib/axios/public";
import type { ContactUsFormData } from "@/types";
import { errorHandler } from "../errorHandler";

export const useContactUsMutation = () => {
  return useMutation({
    mutationFn: async (data: ContactUsFormData): Promise<void> => {
      const { firstName, lastName, email, phone, message } = data;

      await publicApi.post("/contact", {
        firstName,
        lastName,
        email,
        phone,
        message,
      });
    },

    onError: errorHandler,
  });
};
