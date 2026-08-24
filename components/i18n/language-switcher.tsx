"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeFlags, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function switchTo(locale: Locale): string {
    const segments = pathname.split("/");
    if (segments.length >= 2 && locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join("/") || `/${locale}`;
  }

  function handleNavigate() {
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-dim hover:text-cyan font-mono text-xs tracking-widest uppercase transition-colors"
        aria-label="Language switcher"
        aria-expanded={open}
      >
        {localeFlags[current]}
      </button>
      {open && (
        <div className="border-cyan/20 bg-void-surface absolute top-full right-0 mt-2 border py-1">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={switchTo(locale) as never}
              onClick={handleNavigate}
              className={cn(
                "hover:bg-cyan/10 block px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors",
                locale === current ? "text-cyan" : "text-cyan-dim",
              )}
            >
              {localeFlags[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
