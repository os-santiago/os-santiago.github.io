import { notFound } from "next/navigation";
import {
  locales,
  defaultLocale,
  isValidLocale,
  type Locale,
} from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LayoutContent } from "@/components/layout/layout-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-void text-cyan-dim min-h-screen antialiased">
        <LayoutContent locale={locale as Locale}>{children}</LayoutContent>
      </body>
    </html>
  );
}
