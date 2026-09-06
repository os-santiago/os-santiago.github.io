import type { Metadata } from "next";
import { Display3D } from "@/components/ui/display-3d";
import { isValidLocale, defaultLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Open Source Santiago | 3D Display Mode",
  description: "Modo Display 3D para presentaciones, conferencias y eventos comunitarios.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DisplayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  return <Display3D locale={validLocale} />;
}
