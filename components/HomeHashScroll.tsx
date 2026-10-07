"use client";

import { useEffect } from "react";

export function HomeHashScroll() {
  useEffect(() => {
    function scroll() {
      const hash = window.location.hash;
      if (hash !== "#features" && hash !== "#models") return;
      const node = document.querySelector(hash);
      const target = node?.querySelector("h2") ?? node;
      if (!target) return;
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previous;
    }

    scroll();
    const frame = window.requestAnimationFrame(scroll);
    const later = window.setTimeout(scroll, 120);
    window.addEventListener("hashchange", scroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.removeEventListener("hashchange", scroll);
    };
  }, []);

  return null;
}
