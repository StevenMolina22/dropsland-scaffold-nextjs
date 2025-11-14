"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { NotificationProvider } from "./NotificationProvider";
import { WalletProvider } from "./WalletProvider";
import { ProfileTypeProvider } from "./ProfileTypeProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <ProfileTypeProvider>
          <WalletProvider>{children}</WalletProvider>
        </ProfileTypeProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
}
