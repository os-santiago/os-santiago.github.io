import { cn } from "@/lib/utils";

type DataPanelProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "none";
  title?: string;
};

const glowClasses = {
  cyan: "border-cyan/30 shadow-[0_0_20px_-5px_var(--color-cyan-glow)]",
  magenta: "border-magenta/30 shadow-[0_0_20px_-5px_var(--color-magenta-glow)]",
  none: "border-cyan/10",
};

export function DataPanel({
  children,
  className,
  glow = "cyan",
  title,
}: DataPanelProps) {
  return (
    <div
      className={cn(
        "bg-void-surface/80 relative rounded-sm border backdrop-blur-sm",
        glowClasses[glow],
        className,
      )}
    >
      {title && (
        <div className="border-cyan/20 text-cyan-dim border-b px-4 py-2 font-mono text-xs tracking-widest uppercase">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
