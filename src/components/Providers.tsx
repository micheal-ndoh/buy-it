'use client';

import { SessionProvider } from "next-auth/react";
import { TolgeeProvider } from "./TolgeeProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TolgeeProvider>
        {children}
      </TolgeeProvider>
    </SessionProvider>
  );
}
