"use client";

import { useEffect, useRef } from "react";
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

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function DataRain({
  className,
  density = 0.5,
  speed = 1,
}: DataRainProps) {
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

    let drops: Drop[] = [];
    let isVisible = true;
    let lastTime = 0;
    const frameInterval = 1000 / 30;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initDrops();
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

    function draw(time: number) {
      animationRef.current = 0;
      if (!canvas || !ctx || !isVisible || document.hidden) return;
      if (time - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.fillStyle = "rgba(4, 6, 10, 0.08)";
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

      animationRef.current = requestAnimationFrame(draw);
    }

    function start() {
      if (
        prefersReduced ||
        !isVisible ||
        document.hidden ||
        animationRef.current
      ) {
        return;
      }
      animationRef.current = requestAnimationFrame(draw);
    }

    function stop() {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const resizeTimeout = window.setTimeout(resize, 50);
    resize();

    if (prefersReduced) {
      ctx.fillStyle = "rgba(4, 6, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      start();
    }

    return () => {
      stop();
      window.clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
