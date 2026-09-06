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
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex justify-center px-4 py-3 sm:py-4">
      <nav
        className={cn(
          "group/nav border-cyan/20 bg-void-surface/95 pointer-events-auto relative flex transform-gpu items-center justify-between rounded-full border shadow-[0_4px_24px_rgba(0,0,0,0.7)] backdrop-blur-md",
          // Height and Max-Width are permanent on base to prevent full-screen flashing
          "h-12 max-w-4xl overflow-hidden px-3 sm:h-13",
          // Fluid luxurious transition for width, padding, border and glow
          "transition-[width,padding,border-color,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          // Collapsed circular emblem state
          "w-12 sm:w-13",
          // Expanded hover pill state
          "hover:border-cyan/40 hover:w-full hover:px-6 hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)] sm:hover:px-8",
        )}
      >
        {/* Subtle Matrix / Glitch character background */}
        <GlitchBreak className="pointer-events-none rounded-full opacity-0 transition-opacity duration-700 group-hover/nav:opacity-35" />

        {/* Left Side Links: Anchored rigidly to center logo, zero horizontal translation */}
        <div className="pointer-events-none absolute top-1/2 right-[calc(50%+22px)] z-10 flex -translate-y-1/2 items-center justify-end gap-2.5 opacity-0 blur-[2px] transition-[opacity,filter] duration-150 ease-out group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:delay-150 group-hover/nav:duration-400 sm:right-[calc(50%+26px)] sm:gap-5">
          {leftLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "group/link relative inline-flex flex-shrink-0 items-center py-1 font-mono text-[11px] tracking-widest whitespace-nowrap uppercase transition-colors duration-200 select-none sm:text-xs",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright",
                )}
              >
                <span className="text-cyan mr-0.5 font-mono opacity-0 transition-opacity select-none group-hover/link:opacity-100">
                  [
                </span>
                {active && (
                  <span className="bg-cyan mr-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full shadow-[0_0_6px_var(--color-cyan)]" />
                )}
                <span>{msgs[link.key]}</span>
                <span className="text-cyan ml-0.5 font-mono opacity-0 transition-opacity select-none group-hover/link:opacity-100">
                  ]
                </span>
              </Link>
            );
          })}
        </div>

        {/* Center: Absolute Fixed Logo: Always locked to the exact 50% vertical center axis */}
        <div className="pointer-events-auto absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <Link
            href={`/${locale}` as never}
            className="relative flex items-center justify-center rounded-full p-1"
            aria-label="Home"
          >
            <div className="border-cyan/20 group-hover/nav:border-cyan/50 relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-colors duration-500 sm:h-9 sm:w-9">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="OS Santiago"
                className="h-full w-full scale-[1.05] object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Right Side Links & Language Switcher: Anchored rigidly to center logo, zero horizontal translation */}
        <div className="pointer-events-none absolute top-1/2 left-[calc(50%+22px)] z-10 flex -translate-y-1/2 items-center justify-start gap-2.5 opacity-0 blur-[2px] transition-[opacity,filter] duration-150 ease-out group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:delay-150 group-hover/nav:duration-400 sm:left-[calc(50%+26px)] sm:gap-5">
          {rightLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                className={cn(
                  "group/link relative inline-flex flex-shrink-0 items-center py-1 font-mono text-[11px] tracking-widest whitespace-nowrap uppercase transition-colors duration-200 select-none sm:text-xs",
                  active
                    ? "text-cyan font-bold"
                    : "text-cyan-dim hover:text-cyan-bright",
                )}
              >
                <span className="text-cyan mr-0.5 font-mono opacity-0 transition-opacity select-none group-hover/link:opacity-100">
                  [
                </span>
                {active && (
                  <span className="bg-cyan mr-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full shadow-[0_0_6px_var(--color-cyan)]" />
                )}
                <span>{msgs[link.key]}</span>
                <span className="text-cyan ml-0.5 font-mono opacity-0 transition-opacity select-none group-hover/link:opacity-100">
                  ]
                </span>
              </Link>
            );
          })}
          <div className="border-cyan/20 flex flex-shrink-0 items-center border-l pl-2.5 sm:pl-5">
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </nav>
    </header>
  );
}
