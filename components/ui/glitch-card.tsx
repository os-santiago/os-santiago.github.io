"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlitchBreak } from "./glitch-break";

type GlitchCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function GlitchCard({ children, className, href }: GlitchCardProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleEnter = () => setIsGlitching(true);
  const handleLeave = () => setIsGlitching(false);

  const baseClass = cn(
    "depth-card group relative border border-cyan/15 transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)] text-center",
    isGlitching && "glitch-active",
    className,
  );

  if (href) {
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
        <div className="relative z-10">{children}</div>
      </a>
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
      <div className="relative z-10">{children}</div>
    </div>
  );
}
