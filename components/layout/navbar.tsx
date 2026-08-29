"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { GlitchBreak } from "@/components/ui/glitch-break";
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
    { key: "nav.about", href: `/${locale}/about` },
    { key: "nav.projects", href: `/${locale}/projects` },
    { key: "nav.adev", href: `/${locale}/adev` },
  ];

  const rightLinks: { key: string; href: string }[] = [
    { key: "nav.events", href: `/${locale}/events` },
    { key: "nav.members", href: `/${locale}/members` },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex justify-center py-3 sm:py-4 px-4 pointer-events-none">
      <nav
        className={cn(
          "group/nav pointer-events-auto relative flex items-center justify-between rounded-full border border-cyan/20 bg-void-surface/95 backdrop-blur-md transform-gpu shadow-[0_4px_24px_rgba(0,0,0,0.7)]",
          // Height and Max-Width are permanent on base to prevent full-screen flashing
          "h-12 sm:h-13 max-w-4xl px-3 overflow-hidden",
          // Fluid luxurious transition for width, padding, border and glow
          "transition-[width,padding,border-color,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          // Collapsed circular emblem state
          "w-12 sm:w-13",
          // Expanded hover pill state
          "hover:w-full hover:px-6 sm:hover:px-8 hover:border-cyan/40 hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)]"
        )}
      >
        {/* Subtle Matrix / Glitch character background */}
        <GlitchBreak className="opacity-0 group-hover/nav:opacity-35 transition-opacity duration-700 pointer-events-none rounded-full" />

        {/* Left Side Links: Anchored rigidly to center logo, zero horizontal translation */}
        <div className="absolute right-[calc(50%+22px)] sm:right-[calc(50%+26px)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-end gap-2.5 sm:gap-5 opacity-0 blur-[2px] pointer-events-none transition-[opacity,filter] duration-150 ease-out group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:pointer-events-auto group-hover/nav:duration-400 group-hover/nav:delay-150">
          {leftLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "group/link relative inline-flex items-center font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-colors duration-200 whitespace-nowrap py-1 select-none flex-shrink-0",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright"
                )}
              >
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity font-mono select-none mr-0.5">
                  [
                </span>
                {active && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan mr-1.5 animate-pulse shadow-[0_0_6px_var(--color-cyan)] flex-shrink-0" />
                )}
                <span>{msgs[link.key]}</span>
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity font-mono select-none ml-0.5">
                  ]
                </span>
              </Link>
            );
          })}
        </div>

        {/* Center: Absolute Fixed Logo: Always locked to the exact 50% vertical center axis */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
          <Link
            href={`/${locale}` as never}
            className="flex items-center justify-center p-1 rounded-full relative"
            aria-label="Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden rounded-full flex items-center justify-center border border-cyan/20 transition-colors duration-500 group-hover/nav:border-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="OS Santiago"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
          </Link>
        </div>

        {/* Right Side Links & Language Switcher: Anchored rigidly to center logo, zero horizontal translation */}
        <div className="absolute left-[calc(50%+22px)] sm:left-[calc(50%+26px)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-start gap-2.5 sm:gap-5 opacity-0 blur-[2px] pointer-events-none transition-[opacity,filter] duration-150 ease-out group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:pointer-events-auto group-hover/nav:duration-400 group-hover/nav:delay-150">
          {rightLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "group/link relative inline-flex items-center font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-colors duration-200 whitespace-nowrap py-1 select-none flex-shrink-0",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright"
                )}
              >
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity font-mono select-none mr-0.5">
                  [
                </span>
                {active && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan mr-1.5 animate-pulse shadow-[0_0_6px_var(--color-cyan)] flex-shrink-0" />
                )}
                <span>{msgs[link.key]}</span>
                <span className="opacity-0 group-hover/link:opacity-100 text-cyan transition-opacity font-mono select-none ml-0.5">
                  ]
                </span>
              </Link>
            );
          })}
          <div className="flex-shrink-0 pl-2.5 sm:pl-5 border-l border-cyan/20 flex items-center">
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </nav>
    </header>
  );
}
