"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GlitchBreakProps = {
  className?: string;
};

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function GlitchBreak({ className }: GlitchBreakProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      if (width === 0 || height === 0) return;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      if (!canvas || !ctx) return;
      if (width === 0 || height === 0) {
        resize();
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      frame++;

      // Very subtle fade trail
      ctx.fillStyle = "rgba(4, 6, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Corrupted grid lines across full card
      if (frame % 7 === 0) {
        ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
        ctx.lineWidth = 1;
        const gridOffset = rand(-4, 4);
        for (let y = 0; y < height; y += 14) {
          const xEnd = rand(0, canvas.width);
          ctx.beginPath();
          ctx.moveTo(gridOffset, y);
          ctx.lineTo(xEnd, y + rand(-3, 3));
          ctx.stroke();
        }
      }

      // Artifact symbols — main visual
      if (frame % 5 === 0) {
        ctx.font = "9px monospace";
        const symbols = [
          "01",
          "##",
          "??",
          "!!",
          "ER",
          "404",
          "FF",
          "0x",
          "{}",
          "</>",
          "null",
          "err",
          "sync",
          "##",
          "0x1A",
          "SIG",
          "ACK",
          "EOF",
        ];
        for (let i = 0; i < 4; i++) {
          const sym = symbols[Math.floor(Math.random() * symbols.length)];
          ctx.fillStyle = `rgba(0, 240, 255, ${rand(0.08, 0.22)})`;
          ctx.fillText(sym, rand(0, canvas.width), rand(0, height));
        }
      }

      // Dithering dots — very subtle
      ctx.fillStyle = "rgba(0, 240, 255, 0.03)";
      for (let i = 0; i < 6; i++) {
        ctx.fillRect(rand(0, canvas.width), rand(0, height), 2, 2);
      }

      if (!prefersReduced) {
        animationRef.current = requestAnimationFrame(draw);
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    setTimeout(resize, 50);
    resize();

    if (prefersReduced) {
      ctx.fillStyle = "rgba(4, 6, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute top-0 left-0 w-full h-full", className)}
    />
  );
}
