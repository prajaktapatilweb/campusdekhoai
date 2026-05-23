import en from "./en";
import mr from "./mr";

export type Language = "en" | "mr";

// export type TranslationKeys = keyof typeof en;

export type TranslationObject = Record<string, string>;
// export type TranslationObject = Record<TranslationKeys, string>;

export const translations: Record<Language, TranslationObject> = {
  en,
  mr,
};