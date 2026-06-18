"use client";

import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryProvider } from "@/lib/react-query/provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
      <ReactQueryProvider>
        {children}
        <ToastContainer />
      </ReactQueryProvider>
  );
}

// Backwards compatibility: some files import { Providers } from '../providers'
export const Providers = AppProviders;
