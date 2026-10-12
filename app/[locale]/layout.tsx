import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import {
  locales,
  defaultLocale,
  isValidLocale,
  type Locale,
} from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LayoutContent } from "@/components/layout/layout-content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-cyan-dim min-h-screen antialiased">
        <LayoutContent locale={locale as Locale}>{children}</LayoutContent>
      </body>
    </html>
  );
}
