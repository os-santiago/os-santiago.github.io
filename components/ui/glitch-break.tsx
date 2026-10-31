"use client";

import { useEffect, useRef } from "react";
import { subscribe } from "@/lib/frame-scheduler";
import { cn } from "@/lib/utils";

type GlitchBreakProps = {
  className?: string;
};

const FPS = 20;
const BASE_FRAME_MS = 1000 / 60;
const GRID_INTERVAL_MS = 1000 / 7.5;
const SPAWN_INTERVAL_MS = 1000 / 10;
const ARTIFACT_LIFE_MIN_MS = 200;
const ARTIFACT_LIFE_MAX_MS = (35 / 60) * 1000;
const DITHER_DOTS_BASE = 3;

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function GlitchBreak({ className }: GlitchBreakProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let gridElapsed = 0;
    let spawnElapsed = 0;
    let unsubscribe: (() => void) | null = null;

    const activeArtifacts: {
      text: string;
      x: number;
      y: number;
      alpha: number;
      maxLife: number;
      life: number;
    }[] = [];

    function paintStatic() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(4, 6, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      if (width === 0 || height === 0) return;
      canvas.width = width;
      canvas.height = height;
      if (prefersReduced) paintStatic();
    }

    function draw(_time: number, delta: number) {
      if (!canvas || !ctx) return;
      if (width === 0 || height === 0) {
        resize();
        return;
      }

      // Clear the canvas completely so background transparency is strictly preserved
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Corrupted scan/grid lines
      gridElapsed += delta;
      if (gridElapsed >= GRID_INTERVAL_MS) {
        gridElapsed %= GRID_INTERVAL_MS;
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
      spawnElapsed += delta;
      if (spawnElapsed >= SPAWN_INTERVAL_MS) {
        spawnElapsed %= SPAWN_INTERVAL_MS;
        if (activeArtifacts.length < 10) {
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
          const life = rand(ARTIFACT_LIFE_MIN_MS, ARTIFACT_LIFE_MAX_MS);
          activeArtifacts.push({
            text: symbols[Math.floor(Math.random() * symbols.length)],
            x: rand(10, Math.max(10, canvas.width - 30)),
            y: rand(15, Math.max(15, height - 10)),
            alpha: rand(0.15, 0.4),
            maxLife: life,
            life,
          });
        }
      }

      // Render and age active symbols
      ctx.font = "9px monospace";
      for (let i = activeArtifacts.length - 1; i >= 0; i--) {
        const art = activeArtifacts[i];
        art.life -= delta;
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
      const dotCount = Math.max(
        1,
        Math.round(DITHER_DOTS_BASE * (delta / BASE_FRAME_MS)),
      );
      for (let i = 0; i < dotCount; i++) {
        ctx.fillRect(rand(0, canvas.width), rand(0, height), 1.5, 1.5);
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
