import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppMainLayout } from "@/layout/AppMainLayout";
import { AppProviders } from "@/providers/AppProviders";
// @ts-expect-error -- Next.js handles CSS imports at build time
import "@stellar/design-system/build/styles.min.css";
// @ts-expect-error -- Next.js handles CSS imports at build time
import "./globals.css";

export const metadata: Metadata = {
  title: "Scaffold Stellar Starter App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppMainLayout>{children}</AppMainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
