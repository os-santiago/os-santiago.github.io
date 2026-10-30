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
    let isVisible = true;
    let lastTime = 0;
    const frameInterval = 1000 / 20;

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

    const activeArtifacts: {
      text: string;
      x: number;
      y: number;
      alpha: number;
      maxLife: number;
      life: number;
    }[] = [];

    function draw(time: number) {
      animationRef.current = 0;
      if (!canvas || !ctx || !isVisible || document.hidden) return;
      if (time - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      if (width === 0 || height === 0) {
        resize();
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      frame++;

      // Clear the canvas completely so background transparency is strictly preserved
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Corrupted scan/grid lines
      if (frame % 8 === 0) {
        ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
        ctx.lineWidth = 1;
        const gridOffset = rand(-4, 4);
        for (let y = 0; y < height; y += 16) {
          const xEnd = rand(0, canvas.width);
          ctx.beginPath();
          ctx.moveTo(gridOffset, y);
          ctx.lineTo(xEnd, y + rand(-2, 2));
          ctx.stroke();
        }
      }

      // Spawn artifact symbols periodically
      if (frame % 6 === 0 && activeArtifacts.length < 10) {
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
          "0x1A",
          "SIG",
          "ACK",
          "EOF",
        ];
        const life = Math.floor(rand(12, 35));
        activeArtifacts.push({
          text: symbols[Math.floor(Math.random() * symbols.length)],
          x: rand(10, Math.max(10, canvas.width - 30)),
          y: rand(15, Math.max(15, height - 10)),
          alpha: rand(0.15, 0.4),
          maxLife: life,
          life,
        });
      }

      // Render and age active symbols
      ctx.font = "9px monospace";
      for (let i = activeArtifacts.length - 1; i >= 0; i--) {
        const art = activeArtifacts[i];
        art.life--;
        if (art.life <= 0) {
          activeArtifacts.splice(i, 1);
          continue;
        }
        const currentAlpha = art.alpha * (art.life / art.maxLife);
        ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha})`;
        ctx.fillText(art.text, art.x, art.y);
      }

      // Faint dithering dots
      ctx.fillStyle = "rgba(0, 240, 255, 0.04)";
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(rand(0, canvas.width), rand(0, height), 1.5, 1.5);
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 h-full w-full",
        className,
      )}
    />
  );
}
