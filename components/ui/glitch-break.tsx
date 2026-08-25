"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GlitchBreakProps = {
  className?: string;
};

type Block = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  rotation: number;
  vr: number;
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

    let blocks: Block[] = [];
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
      // Canvas is larger than parent so blocks can overflow left
      canvas.width = width * 3;
      canvas.height = height;
      // Offset canvas to the left so it extends beyond the card
      canvas.style.left = `-${width}px`;
    }

    function spawnBlock(): Block | null {
      if (width === 0 || height === 0) return null;
      const w = rand(4, 22);
      const h = rand(3, 18);
      // Spawn across the full card width
      const startX = rand(width, width * 1.3);
      const startY = rand(0, height);
      const maxLife = Math.floor(rand(50, 140));
      return {
        x: startX,
        y: startY,
        w,
        h,
        vx: -rand(0.5, 3),
        vy: rand(-0.3, 0.3),
        life: 0,
        maxLife,
        rotation: rand(0, Math.PI * 2),
        vr: rand(-0.04, 0.04),
      };
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
      ctx.fillStyle = "rgba(4, 6, 10, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn blocks across the full card
      const spawnCount = Math.floor(rand(3, 6));
      for (let i = 0; i < spawnCount; i++) {
        const block = spawnBlock();
        if (block) blocks.push(block);
      }

      // Update and draw blocks — monochrome cyan, very subtle
      blocks = blocks.filter((b) => b.life < b.maxLife && b.x > -width);

      for (const b of blocks) {
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vr;
        b.life++;

        const lifeRatio = b.life / b.maxLife;
        const alpha = lifeRatio < 0.1 ? lifeRatio * 10 : 1 - lifeRatio;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);

        // Subtle cyan fill
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.08})`;
        ctx.fillRect(0, 0, b.w, b.h);

        // Faint edge
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.15})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, b.w, b.h);

        ctx.restore();
      }

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

      // Artifact symbols — main visual, spread across full card
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
        for (let i = 0; i < 8; i++) {
          const sym = symbols[Math.floor(Math.random() * symbols.length)];
          ctx.fillStyle = `rgba(0, 240, 255, ${rand(0.05, 0.15)})`;
          ctx.fillText(sym, rand(0, canvas.width), rand(0, height));
        }
      }

      // Dithering dots — very subtle, full width
      ctx.fillStyle = "rgba(0, 240, 255, 0.03)";
      for (let i = 0; i < 12; i++) {
        ctx.fillRect(rand(0, canvas.width), rand(0, height), 2, 2);
      }

      // Gradient mask — fade from right (card content) to left (dissolve into bg)
      // The card starts at x=width in canvas coords
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "rgba(4, 6, 10, 1)");
      gradient.addColorStop(0.15, "rgba(4, 6, 10, 0.7)");
      gradient.addColorStop(0.33, "rgba(4, 6, 10, 0.15)");
      gradient.addColorStop(0.5, "rgba(4, 6, 10, 0)");
      gradient.addColorStop(1, "rgba(4, 6, 10, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      className={cn("pointer-events-none absolute top-0 h-full", className)}
    />
  );
}
