import { cn } from "@/lib/utils";

type ReflectiveSurfaceProps = {
  children: React.ReactNode;
  className?: string;
};

export function ReflectiveSurface({
  children,
  className,
}: ReflectiveSurfaceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "after:from-cyan/5 after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:to-transparent after:opacity-60",
        className,
      )}
    >
      {children}
    </div>
  );
}
