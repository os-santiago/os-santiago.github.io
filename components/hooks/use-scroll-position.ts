"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(
    () => (typeof window !== "undefined" ? window.scrollY : 0)
  );
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDirection(
        currentScrollY > lastScrollY.current ? "down" : "up"
      );
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { scrollY, scrollDirection };
}