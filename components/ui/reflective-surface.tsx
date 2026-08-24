import { cn } from "@/lib/utils";

type ReflectiveSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  tint?: "cyan" | "magenta" | "mixed";
};

const tintClasses = {
  cyan: "after:bg-gradient-to-t after:from-cyan/5 after:to-transparent",
  magenta: "after:bg-gradient-to-t after:from-magenta/5 after:to-transparent",
  mixed:
    "after:bg-gradient-to-t after:from-cyan/5 after:via-magenta/5 after:to-transparent",
};

export function ReflectiveSurface({
  children,
  className,
  tint = "cyan",
}: ReflectiveSurfaceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:opacity-60",
        tintClasses[tint],
        className,
      )}
    >
      {children}
    </div>
  );
}
