"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { GlitchBreak } from "@/components/ui/glitch-break";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/components/hooks/use-scroll-position";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const msgs = getMessages(locale);
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasCollapsed = useRef(false);
  const { scrollY, scrollDirection } = useScrollPosition();

  useEffect(() => {
    if (scrollY > 0 && !hasCollapsed.current) {
      hasCollapsed.current = true;
      setIsExpanded(false);
    } else if (scrollY === 0 && hasCollapsed.current) {
      hasCollapsed.current = false;
      setIsExpanded(true);
    }
  }, [scrollY, scrollDirection]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

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

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsExpanded(false);
    setIsMobileMenuOpen(false);
    hasCollapsed.current = true;
  };

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex justify-center px-4 py-3 sm:py-4">
      <nav
        className={cn(
          "group/nav border-cyan/30 bg-void-surface pointer-events-auto relative flex transform-gpu items-center justify-between rounded-full border shadow-[0_4px_24px_rgba(0,0,0,0.85)]",
          "h-12 max-w-4xl overflow-hidden px-3 sm:h-13",
          "transition-[width,padding,border-color,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          "w-28 sm:w-13",
          isExpanded
            ? "sm:border-cyan/40 sm:w-full sm:px-8 sm:shadow-[0_0_30px_-5px_var(--color-cyan-glow)]"
            : "sm:hover:border-cyan/40 sm:hover:w-full sm:hover:px-8 sm:hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)]",
        )}
      >
        {/* Subtle Matrix / Glitch character background */}
        <GlitchBreak
          className={cn(
            "pointer-events-none rounded-full opacity-0 transition-opacity duration-700",
            isExpanded || isMobileMenuOpen
              ? "opacity-35"
              : "group-hover/nav:opacity-35",
          )}
        />

        {/* Left Side Links: Anchored rigidly to center logo, zero horizontal translation */}
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 right-[calc(50%+22px)] z-10 hidden -translate-y-1/2 items-center justify-end gap-2.5 opacity-0 blur-[2px] transition-[opacity,filter] duration-150 ease-out sm:right-[calc(50%+26px)] sm:flex sm:gap-5",
            isExpanded
              ? "pointer-events-auto opacity-100 blur-none"
              : "group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:delay-150 group-hover/nav:duration-400",
          )}
        >
          {leftLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
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
        <div className="pointer-events-auto absolute top-1/2 left-3 z-20 flex -translate-y-1/2 items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
          <Link
            href={`/${locale}` as never}
            className="relative flex items-center justify-center rounded-full p-1"
            aria-label={msgs["nav.home"]}
          >
            <div
              className={cn(
                "border-cyan/20 relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-colors duration-500 sm:h-9 sm:w-9",
                isExpanded || isMobileMenuOpen
                  ? "border-cyan/50"
                  : "group-hover/nav:border-cyan/50",
              )}
            >
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
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 right-6 left-[calc(50%+22px)] z-10 hidden -translate-y-1/2 items-center justify-start gap-2.5 opacity-0 blur-[2px] transition-[opacity,filter] duration-150 ease-out sm:right-8 sm:left-[calc(50%+26px)] sm:flex sm:gap-5",
            isExpanded
              ? "pointer-events-auto opacity-100 blur-none"
              : "group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:blur-none group-hover/nav:delay-150 group-hover/nav:duration-400",
          )}
        >
          {rightLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href as never}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
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

        {/* Mobile hamburger menu button */}
        <button
          type="button"
          className="text-cyan hover:text-cyan-bright pointer-events-auto absolute top-1/2 right-3 z-30 flex -translate-y-1/2 items-center justify-center p-2 transition-colors sm:hidden"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={
            isMobileMenuOpen ? msgs["nav.closeMenu"] : msgs["nav.openMenu"]
          }
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-cyan/20 bg-void-surface pointer-events-auto absolute top-full right-4 left-4 mt-2 rounded-2xl border p-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {[...leftLinks, ...rightLinks].map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href as never}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-xs tracking-widest uppercase transition-colors",
                      active
                        ? "bg-cyan/10 text-cyan font-bold"
                        : "text-cyan-dim hover:bg-cyan/5 hover:text-cyan-bright",
                    )}
                  >
                    <span>{msgs[link.key]}</span>
                    {active && (
                      <span className="bg-cyan h-1.5 w-1.5 rounded-full shadow-[0_0_6px_var(--color-cyan)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-cyan/15 mt-2 flex items-center justify-between border-t px-3 pt-3">
            <span className="text-cyan-dim/60 font-mono text-[10px] tracking-widest uppercase">
              {msgs["common.langSwitch"]}
            </span>
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
