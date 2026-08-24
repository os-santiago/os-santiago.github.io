export const locales = ["es", "en"] as const;
export const defaultLocale = "es" as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
