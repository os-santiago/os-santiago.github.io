import { cn } from "@/lib/utils";

type ScanlineOverlayProps = {
  className?: string;
  opacity?: "subtle" | "normal" | "strong";
};

const opacityClasses = {
  subtle: "opacity-[0.03]",
  normal: "opacity-[0.06]",
  strong: "opacity-[0.10]",
};

export function ScanlineOverlay({
  className,
  opacity = "subtle",
}: ScanlineOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "scanline-overlay pointer-events-none fixed inset-0 z-50",
        opacityClasses[opacity],
        className,
      )}
    />
  );
}
