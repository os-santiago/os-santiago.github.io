"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const msgs = getMessages(locale);
  const pathname = usePathname();

  const links: { key: string; href: string }[] = [
    { key: "nav.home", href: `/${locale}` },
    { key: "nav.about", href: `/${locale}/about` },
    { key: "nav.adev", href: `/${locale}/adev` },
    { key: "nav.projects", href: `/${locale}/projects` },
    { key: "nav.events", href: `/${locale}/events` },
    { key: "nav.members", href: `/${locale}/members` },
  ];

  function isActive(href: string): boolean {
    const normalized = pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    if (href === `/${locale}`) {
      return normalized === target;
    }
    return normalized.startsWith(target);
  }

  return (
    <header className="border-cyan/10 bg-void/90 fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href={`/${locale}` as never}
          className="font-display text-cyan text-sm font-bold tracking-widest uppercase"
        >
          OS Santiago
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href as never}
              className={cn(
                "font-mono text-xs tracking-widest uppercase transition-colors",
                isActive(link.href)
                  ? "text-cyan"
                  : "text-cyan-dim hover:text-cyan",
              )}
            >
              {msgs[link.key]}
            </Link>
          ))}
        </div>

        <LanguageSwitcher current={locale} />
      </nav>
    </header>
  );
}
