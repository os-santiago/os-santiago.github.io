"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const nextLocale: Locale = current === "es" ? "en" : "es";

  function switchTo(locale: Locale): string {
    const segments = pathname.split("/");
    if (segments.length >= 2 && locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join("/") || `/${locale}`;
  }

  return (
    <Link
      href={switchTo(nextLocale) as never}
      className="group/lang inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 py-1 select-none hover:drop-shadow-[0_0_8px_var(--color-cyan-glow)]"
      title={`Switch to ${nextLocale.toUpperCase()}`}
      aria-label={`Switch to ${nextLocale.toUpperCase()}`}
    >
      <span
        className={cn(
          "transition-colors duration-200",
          current === "es"
            ? "text-cyan font-bold"
            : "text-cyan-dim/40 group-hover/lang:text-cyan-dim"
        )}
      >
        ES
      </span>
      <span className="text-cyan/30 text-[9px] sm:text-[10px] pointer-events-none">/</span>
      <span
        className={cn(
          "transition-colors duration-200",
          current === "en"
            ? "text-cyan font-bold"
            : "text-cyan-dim/40 group-hover/lang:text-cyan-dim"
        )}
      >
        EN
      </span>
    </Link>
  );
}
