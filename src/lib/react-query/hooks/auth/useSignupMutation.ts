import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { publicApi } from "@/lib/axios/public";
import type { RegisterFormData } from "@/types";

export const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterFormData): Promise<void> => {
      const { firstName, lastName, email, phoneNumber, password } = data;

      await publicApi.post("/auth/register", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
    },
    onError: () => {
      toast.error("Failed to create account.");
    },
    onSuccess: () => {
      toast.success("Account created successfully.");
      router.push("/auth/verify-email?signup=true");
    },
  });
};
