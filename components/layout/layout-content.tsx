"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";

type LayoutContentProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function LayoutContent({ locale, children }: LayoutContentProps) {
  const pathname = usePathname();
  const isDisplayPage = pathname?.includes("/display");

  if (isDisplayPage) {
    return <>{children}</>;
  }

  return (
    <>
      <ScanlineOverlay />
      <Navbar locale={locale} />
      <div className="pt-14">{children}</div>
      <Footer locale={locale} />
    </>
  );
}
