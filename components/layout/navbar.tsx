"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconTerminal2 } from "@tabler/icons-react";
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

  function isActive(href: string): boolean {
    const normalized = pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    if (href === `/${locale}`) {
      return normalized === target;
    }
    return normalized.startsWith(target);
  }

  const leftLinks: { key: string; href: string }[] = [
    { key: "nav.projects", href: `/${locale}/projects` },
    { key: "nav.adev", href: `/${locale}/adev` },
    { key: "nav.members", href: `/${locale}/members` },
  ];

  const rightLinks: { key: string; href: string }[] = [
    { key: "nav.about", href: `/${locale}/about` },
    { key: "nav.events", href: `/${locale}/events` },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex justify-center py-4">
      <nav
        className={cn(
          "group/nav flex items-center justify-between px-6 py-2 rounded-full border border-cyan/15 bg-void/90 backdrop-blur-md transition-all duration-500 ease-in-out",
          // Static minimal state
          "w-24 h-12 overflow-hidden",
          // Hover expanded state
          "hover:w-full hover:max-w-4xl hover:h-16 hover:px-8 hover:border-cyan/30"
        )}
      >
        {/* Left Side Links */}
        <div className="flex items-center gap-6 opacity-0 -translate-x-5 transition-all duration-500 ease-in-out pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto">
          {leftLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href as never}
              className={cn(
                "font-mono text-xs tracking-widest uppercase transition-colors whitespace-nowrap",
                isActive(link.href)
                  ? "text-cyan"
                  : "text-cyan-dim hover:text-cyan",
              )}
            >
              {msgs[link.key]}
            </Link>
          ))}
        </div>

        {/* Center: Large Logo */}
        <div className="flex justify-center items-center flex-shrink-0 transition-transform duration-500 ease-in-out group-hover/nav:scale-125">
          <Link
            href={`/${locale}` as never}
            className="flex items-center justify-center"
          >
            <div className="relative w-8 h-8 overflow-hidden rounded-full flex items-center justify-center transition-shadow duration-500 group-hover/nav:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
          </Link>
        </div>

        {/* Right Side Links & Language Switcher */}
        <div className="flex items-center gap-6 opacity-0 translate-x-5 transition-all duration-500 ease-in-out pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto">
          {rightLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href as never}
              className={cn(
                "font-mono text-xs tracking-widest uppercase transition-colors whitespace-nowrap",
                isActive(link.href)
                  ? "text-cyan"
                  : "text-cyan-dim hover:text-cyan",
              )}
            >
              {msgs[link.key]}
            </Link>
          ))}
          <LanguageSwitcher current={locale} />
        </div>
      </nav>
    </header>
  );
}
