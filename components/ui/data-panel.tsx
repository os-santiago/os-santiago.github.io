import { cn } from "@/lib/utils";

type DataPanelProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export function DataPanel({ children, className, title }: DataPanelProps) {
  return (
    <div
      className={cn(
        "depth-panel border-cyan/20 relative rounded-sm border backdrop-blur-sm text-center",
        className,
      )}
    >
      {title && (
        <div className="border-cyan/20 text-cyan-dim relative z-10 border-b px-4 py-2 font-mono text-xs tracking-widest uppercase text-center">
          {title}
        </div>
      )}
      <div className="relative z-10 p-4">{children}</div>
    </div>
  );
}
