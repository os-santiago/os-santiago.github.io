import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  isValidLocale,
  type Locale,
} from "@/i18n/config";
import { getMessages } from "@/i18n";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
    const validLocale = isValidLocale(locale) ? locale : defaultLocale;
    const msgs = getMessages(validLocale);
    return {
      title: msgs["home.title"],
      description: msgs["home.tagline"],
      alternates: {
        languages: {
          es: "/es",
          en: "/en",
        },
      },
    };
  });
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
        <ScanlineOverlay />
        <Navbar locale={locale as Locale} />
        <div className="pt-14">{children}</div>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
