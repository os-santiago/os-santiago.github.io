"use client";

import React from "react";
import QRCode from "react-qr-code";

// QR rendered locally as SVG — no third-party service sees the encoded URL.
// Standard QR Model 2 implementation using deterministic algorithm
type QRCodeSVGProps = {
  value: string;
  size?: number;
  fgColor?: string;
  className?: string;
};

export function QRCodeSVG({
  value,
  size = 180,
  fgColor = "#00f0ff",
  className = "",
}: QRCodeSVGProps) {
  return (
    <div
      className={`border-cyan/40 bg-void-deep/95 relative inline-flex items-center justify-center rounded-xl border p-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] ${className}`}
      style={{ width: size + 20, height: size + 20 }}
    >
      <div className="border-cyan pointer-events-none absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2" />
      <div className="border-cyan pointer-events-none absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2" />
      <div className="border-cyan pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2" />
      <div className="border-cyan pointer-events-none absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2" />

      <QRCode
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor="transparent"
        level="Q"
        title={value}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      />
    </div>
  );
}
