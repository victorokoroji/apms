import type { Metadata } from "next";
import { LoginForm } from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in · APMS",
  description: "Sign in to the Admord Performance Management System.",
};

export default function LoginPage() {
  return <LoginForm />;
}
