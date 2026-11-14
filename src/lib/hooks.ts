"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends Element>(threshold = 0.4): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** 0 → 1 as the element scrolls from entering the viewport to leaving it (sticky-aware via `pin`). */
export function useScrollProgress<T extends HTMLElement>(pin = false): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0; const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const v = pin ? -r.top / Math.max(1, r.height - vh) : (vh * 0.7 - r.top) / (r.height + vh * 0.3);
      setP(Math.min(1, Math.max(0, v)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [pin]);
  return [ref, p];
}
