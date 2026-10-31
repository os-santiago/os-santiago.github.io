"use client";

import { useEffect, useRef } from "react";
import { subscribe } from "@/lib/frame-scheduler";
import { cn } from "@/lib/utils";

type DataRainProps = {
  className?: string;
  density?: number;
  speed?: number;
};

type Drop = {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
};

const CHARSET = "01<>/[]{}=+-*$#@!?abcdef0123456789";
const BASE_FADE = 0.08;
const BASE_FRAME_MS = 1000 / 60;
const FPS = 30;

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function DataRain({
  className,
  density = 0.5,
  speed = 1,
}: DataRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let drops: Drop[] = [];
    let unsubscribe: (() => void) | null = null;

    function paintStatic() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(4, 6, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initDrops();
      if (prefersReduced) paintStatic();
    }

    function initDrops() {
      if (!canvas) return;
      const colWidth = 20;
      const cols = Math.floor(canvas.width / colWidth);
      const count = Math.floor(cols * density);
      drops = [];
      for (let i = 0; i < count; i++) {
        const col = Math.floor(Math.random() * cols);
        const len = Math.floor(Math.random() * 15) + 5;
        drops.push({
          x: col * colWidth,
          y: Math.random() * canvas.height - canvas.height,
          speed: (Math.random() * 0.5 + 0.5) * speed,
          chars: Array.from({ length: len }, randomChar),
          length: len,
        });
      }
    }

    function draw(_time: number, delta: number) {
      if (!canvas || !ctx) return;

      const fade = 1 - Math.pow(1 - BASE_FADE, delta / BASE_FRAME_MS);
      ctx.fillStyle = `rgba(4, 6, 10, ${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";

      for (const drop of drops) {
        drop.y += drop.speed * delta * 0.1;

        for (let i = 0; i < drop.length; i++) {
          const y = drop.y - i * 16;
          if (y < 0 || y > canvas.height) continue;

          const alpha = 1 - i / drop.length;

          if (i === 0) {
            ctx.fillStyle = "#ffffff";
          } else {
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
          }

          if (Math.random() > 0.97) {
            drop.chars[i] = randomChar();
          }

          ctx.fillText(drop.chars[i], drop.x, y);
        }

        if (drop.y - drop.length * 16 > canvas.height) {
          drop.y = -drop.length * 16;
          drop.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        }
      }
    }

    function setActive(active: boolean) {
      if (active && !prefersReduced) {
        if (!unsubscribe) unsubscribe = subscribe(draw, { fps: FPS });
        return;
      }

      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const resizeTimeout = window.setTimeout(resize, 50);
    resize();

    let visibilityObserver: IntersectionObserver | null = null;

    if (!prefersReduced) {
      if (typeof IntersectionObserver === "undefined") {
        setActive(true);
      } else {
        visibilityObserver = new IntersectionObserver(
          ([entry]) => setActive(entry.isIntersecting),
          { threshold: 0 },
        );
        visibilityObserver.observe(canvas);
      }
    } else {
      paintStatic();
    }

    return () => {
      setActive(false);
      window.clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
