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
    <header className="fixed top-0 right-0 left-0 z-40 flex justify-center py-3 sm:py-4 px-4 pointer-events-none">
      <nav
        className={cn(
          "group/nav pointer-events-auto relative flex items-center justify-between px-3 py-2 rounded-full border border-cyan/20 bg-void-surface/90 backdrop-blur-md transition-all duration-500 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.6)]",
          // Minimal static state
          "w-20 sm:w-24 h-12 overflow-hidden",
          // Expanded hover state
          "hover:w-full hover:max-w-4xl hover:h-14 sm:hover:h-16 hover:px-6 sm:hover:px-8 hover:border-cyan/40 hover:shadow-[0_0_25px_-5px_var(--color-cyan-glow)]"
        )}
      >
        {/* Holographic vertical projection beam */}
        <div className="absolute inset-x-0 -bottom-2 h-4 bg-gradient-to-t from-cyan/15 to-transparent pointer-events-none opacity-40 animate-holo-beam" />

        {/* Left Links */}
        <div className="flex items-center opacity-0 -translate-x-3 max-w-0 overflow-hidden transition-all duration-500 ease-out pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:max-w-md group-hover/nav:gap-4 sm:group-hover/nav:gap-6 group-hover/nav:pointer-events-auto">
          {leftLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "relative group/link font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap py-1",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright"
                )}
              >
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity -ml-1.5 mr-0.5 font-mono">
                  [
                </span>
                {active && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan mr-1.5 animate-pulse shadow-[0_0_6px_var(--color-cyan)]" />
                )}
                {msgs[link.key]}
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity ml-0.5 -mr-1.5 font-mono">
                  ]
                </span>
              </Link>
            );
          })}
        </div>

        {/* Center: Holographic Logo Anchor */}
        <div className="flex justify-center items-center flex-shrink-0 transition-transform duration-500 ease-out group-hover/nav:scale-125 mx-auto">
          <Link
            href={`/${locale}` as never}
            className="flex items-center justify-center p-1 rounded-full relative group/logo"
            aria-label="Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden rounded-full flex items-center justify-center animate-hologram transition-all duration-300 group-hover/nav:shadow-[0_0_16px_var(--color-cyan-glow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="OS Santiago"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
          </Link>
        </div>

        {/* Right Links & Switcher */}
        <div className="flex items-center opacity-0 translate-x-3 max-w-0 overflow-hidden transition-all duration-500 ease-out pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:max-w-md group-hover/nav:gap-4 sm:group-hover/nav:gap-6 group-hover/nav:pointer-events-auto">
          {rightLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "relative group/link font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap py-1",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright"
                )}
              >
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity -ml-1.5 mr-0.5 font-mono">
                  [
                </span>
                {active && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan mr-1.5 animate-pulse shadow-[0_0_6px_var(--color-cyan)]" />
                )}
                {msgs[link.key]}
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity ml-0.5 -mr-1.5 font-mono">
                  ]
                </span>
              </Link>
            );
          })}
          <div className="flex-shrink-0 pl-1 border-l border-cyan/15">
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </nav>
    </header>
  );
}
