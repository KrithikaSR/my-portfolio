"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

/** Smooth-scroll to a CSS selector, element or pixel offset. Falls back to native scrolling. */
export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) { lenis.scrollTo(target, { duration: 1.3, force: true, easing: (t) => 1 - Math.pow(1 - t, 4) }); return; }
  if (typeof target === "number") return window.scrollTo({ top: target });
  (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}
export function lockScroll(lock: boolean) {
  if (lenis) lock ? lenis.stop() : lenis.start();
  else document.documentElement.style.overflow = lock ? "hidden" : "";
}

/** Starts Lenis (skipped for prefers-reduced-motion) and routes in-page #links through it. */
export function useLenis() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const h = a.getAttribute("href")!;
      if (h.length < 2 || !document.querySelector(h === "#top" ? "#top" : h)) return;
      e.preventDefault(); scrollToTarget(h === "#top" ? 0 : h);
    };
    document.addEventListener("click", click);
    let raf = 0;
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    return () => { document.removeEventListener("click", click); cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);
}
