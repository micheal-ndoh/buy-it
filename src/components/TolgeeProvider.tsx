'use client';

import { TolgeeProvider as BaseTolgeeProvider, Tolgee, DevTools } from "@tolgee/react";
import { FormatIcu } from "@tolgee/format-icu";
import { ReactNode } from "react";

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .init({
    language: 'en',
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    availableLanguages: ['en', 'fr', 'es'],
    defaultLanguage: 'en',
  });

export const TolgeeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BaseTolgeeProvider tolgee={tolgee} fallback="Loading...">
      {children}
    </BaseTolgeeProvider>
  );
};
