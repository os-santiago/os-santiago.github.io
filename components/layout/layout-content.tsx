"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { getMessages } from "@/i18n";
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
  const msgs = getMessages(locale);
  const isDisplayPage = pathname?.includes("/display");

  if (isDisplayPage) {
    return <>{children}</>;
  }

  return (
    <>
      <ScanlineOverlay />
      <a
        href="#main-content"
        className="focus:bg-void focus:text-cyan focus:border-cyan/50 sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:border focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase"
      >
        {msgs["a11y.skipToContent"]}
      </a>
      <Navbar locale={locale} />
      <main id="main-content" className="pt-14">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
