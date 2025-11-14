"use client";

import ConnectAccount from "@/components/ConnectAccount";
import Link from "next/link";
import React from "react";
import BottomNav from "@/components/BottomNav";
import HeaderLogo from "@/components/HeaderLogo";
import ProfileTypeSelector from "@/components/ProfileTypeSelector";
import { Code2 } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";

export const AppMainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <HeaderLogo />
            <div className="hidden h-6 w-px bg-border/40 lg:block" />
            <ProfileTypeSelector />
          </div>
          <div className="flex items-center gap-3">
            <ConnectAccount />
            <Link
              href="/debug"
              className="inline-flex"
              style={{ textDecoration: "none" }}
            >
              <Button type="button" size="sm" className="gap-2">
                <Code2 className="size-4" />
                Debugger
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-24">{children}</main>
      <footer className="border-t border-border/40 bg-background/80">
        <div className="container mx-auto flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dropsland. All rights reserved.</p>
          <p className="text-muted-foreground/80">
            Built with Stellar + Tailwind.
          </p>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
};

export default AppMainLayout;
