"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type GlitchCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "none";
  href?: string;
};

const glowClasses = {
  cyan: "hover:border-cyan/50 hover:shadow-[0_0_30px_-5px_var(--color-cyan-glow)]",
  magenta:
    "hover:border-magenta/50 hover:shadow-[0_0_30px_-5px_var(--color-magenta-glow)]",
  none: "hover:border-cyan/20",
};

export function GlitchCard({
  children,
  className,
  glow = "cyan",
  href,
}: GlitchCardProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleEnter = () => setIsGlitching(true);
  const handleLeave = () => setIsGlitching(false);

  const baseClass = cn(
    "group relative overflow-hidden rounded-sm border border-cyan/15 bg-void-surface/60 backdrop-blur-sm transition-all duration-300",
    glowClasses[glow],
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
        {isGlitching && (
          <div className="glitch-slice pointer-events-none absolute inset-0 z-10" />
        )}
        {children}
      </a>
    );
  }

  return (
    <div
      className={baseClass}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {isGlitching && (
        <div className="glitch-slice pointer-events-none absolute inset-0 z-10" />
      )}
      {children}
    </div>
  );
}
