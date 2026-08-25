import Link from "next/link";
import { cn } from "@/lib/utils";

type NeonButtonProps = {
  children: React.ReactNode;
  href: string;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export function NeonButton({
  children,
  href,
  size = "md",
  external = false,
  className,
  icon,
}: NeonButtonProps) {
  const baseClass = cn(
    "neon-btn-3d inline-flex items-center justify-center gap-2 rounded-sm border border-cyan/50 font-mono uppercase tracking-widest text-cyan transition-all duration-300 hover:border-cyan",
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href as never} className={baseClass}>
      {content}
    </Link>
  );
}
