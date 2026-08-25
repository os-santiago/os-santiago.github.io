import { cn } from "@/lib/utils";

type GlitchTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
};

export function GlitchText({
  children,
  className,
  as: Tag = "span",
}: GlitchTextProps) {
  return (
    <Tag className={cn("glitch-text relative inline-block", className)}>
      {children}
    </Tag>
  );
}
