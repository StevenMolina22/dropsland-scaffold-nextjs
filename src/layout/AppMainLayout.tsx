"use client";

import { Button, Icon, Layout } from "@stellar/design-system";
import ConnectAccount from "@/components/ConnectAccount";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AppMainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isDebugActive = pathname?.startsWith("/debug");

  return (
    <main>
      <Layout.Header
        projectId="My App"
        projectTitle="My App"
        contentRight={
          <>
            <nav>
              <Link href="/debug" style={{ textDecoration: "none" }}>
                <Button variant="tertiary" size="md" disabled={isDebugActive}>
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              </Link>
            </nav>
            <ConnectAccount />
          </>
        }
      />
      {children}
      <Layout.Footer>
        <span>
          © {new Date().getFullYear()} My App. Licensed under the{" "}
          <a
            href="http://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache License, Version 2.0
          </a>
          .
        </span>
      </Layout.Footer>
    </main>
  );
};

export default AppMainLayout;
