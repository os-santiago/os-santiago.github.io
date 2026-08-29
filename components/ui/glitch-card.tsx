"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlitchBreak } from "./glitch-break";

type GlitchCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
};

export function GlitchCard({ children, className, href, external }: GlitchCardProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleEnter = () => setIsGlitching(true);
  const handleLeave = () => setIsGlitching(false);

  const baseClass = cn(
    "depth-card group relative border border-cyan/15 transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)] text-center",
    isGlitching && "glitch-active",
    className,
  );

  if (href) {
    const isExternal = external ?? href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <GlitchBreak className="z-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
          {isGlitching && (
            <div className="glitch-slice pointer-events-none absolute inset-0 z-20" />
          )}
          <div className="relative z-10 flex flex-col flex-1 h-full w-full">{children}</div>
        </a>
      );
    }

    return (
      <Link
        href={href as any}
        className={baseClass}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <GlitchBreak className="z-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
        {isGlitching && (
          <div className="glitch-slice pointer-events-none absolute inset-0 z-20" />
        )}
        <div className="relative z-10 flex flex-col flex-1 h-full w-full">{children}</div>
      </Link>
    );
  }

  return (
    <div
      className={baseClass}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <GlitchBreak className="z-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
      {isGlitching && (
        <div className="glitch-slice pointer-events-none absolute inset-0 z-20" />
      )}
      <div className="relative z-10 flex flex-col flex-1 h-full w-full">{children}</div>
    </div>
  );
}
