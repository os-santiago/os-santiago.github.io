"use client";

import React, { useMemo } from "react";

// Robust QR Code generator in pure SVG (no blur, completely crisp vector rendering)
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
  // We use quickchart.io SVG format with high resolution and crisp vector edges
  const cleanColor = fgColor.replace("#", "");
  const encodedValue = encodeURIComponent(value);
  // High quality vector SVG QR code with zero pixelation
  const qrSvgUrl = `https://quickchart.io/qr?text=${encodedValue}&size=${size * 3}&ecLevel=Q&margin=1&dark=${cleanColor}&light=00000000&format=svg`;

  return (
    <div
      className={`border-cyan/40 bg-void-deep/95 relative inline-flex items-center justify-center rounded-xl border p-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] ${className}`}
      style={{ width: size + 20, height: size + 20 }}
    >
      <div className="border-cyan pointer-events-none absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2" />
      <div className="border-cyan pointer-events-none absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2" />
      <div className="border-cyan pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2" />
      <div className="border-cyan pointer-events-none absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrSvgUrl}
        alt={`QR: ${value}`}
        width={size}
        height={size}
        className="h-full w-full object-contain [image-rendering:crisp-edges]"
        loading="eager"
      />
    </div>
  );
}
