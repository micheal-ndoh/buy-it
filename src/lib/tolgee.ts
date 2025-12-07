import { DevTools, Tolgee } from "@tolgee/react";
import { FormatIcu } from "@tolgee/format-icu";

export const TOLGEE_API_KEY = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
export const TOLGEE_API_URL = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export const tolgee = Tolgee()
    .use(DevTools())
    .use(FormatIcu())
    .init({
        language: 'en',
        apiUrl: TOLGEE_API_URL,
        apiKey: TOLGEE_API_KEY,
    });
