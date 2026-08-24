import Link from "next/link";
import { cn } from "@/lib/utils";

type NeonButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "cyan" | "magenta";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
};

const variantClasses = {
  cyan: "border-cyan/50 text-cyan hover:bg-cyan/10 hover:border-cyan hover:shadow-[0_0_20px_var(--color-cyan-glow)]",
  magenta:
    "border-magenta/50 text-magenta hover:bg-magenta/10 hover:border-magenta hover:shadow-[0_0_20px_var(--color-magenta-glow)]",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export function NeonButton({
  children,
  href,
  variant = "cyan",
  size = "md",
  external = false,
  className,
}: NeonButtonProps) {
  const baseClass = cn(
    "inline-flex items-center justify-center rounded-sm border font-mono uppercase tracking-widest transition-all duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as never} className={baseClass}>
      {children}
    </Link>
  );
}
