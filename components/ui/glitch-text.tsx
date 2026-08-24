import { cn } from "@/lib/utils";

type GlitchTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  intensity?: "subtle" | "normal" | "aggressive";
};

const intensityClasses: Record<
  NonNullable<GlitchTextProps["intensity"]>,
  string
> = {
  subtle: "glitch-subtle",
  normal: "glitch-normal",
  aggressive: "glitch-aggressive",
};

export function GlitchText({
  children,
  className,
  as: Tag = "span",
  intensity = "normal",
}: GlitchTextProps) {
  return (
    <Tag
      className={cn(
        "glitch-text relative inline-block",
        intensityClasses[intensity],
        className,
      )}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </Tag>
  );
}
