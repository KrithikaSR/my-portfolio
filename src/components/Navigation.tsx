"use client";
import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/lib/scroll";
import { NAV, PROFILE } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const bar = useRef<HTMLDivElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const on = () => {
      setScrolled(scrollY > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const hero = document.getElementById("top"); if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = links.current[active];
    setInd(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active, scrolled]);

  useEffect(() => {
    lockScroll(open);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <div ref={bar} aria-hidden className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-[var(--ink)]" style={{ transform: "scaleX(0)" }} />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--gutter)] py-4">
        <a href="#top" aria-label={`${PROFILE.name}, back to top`} className="group flex items-center gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold transition-[background,color,transform] duration-700 group-hover:rotate-360 ${scrolled ? "bg-[var(--ink)] text-white" : "text-[var(--ink)] shadow-[inset_0_0_0_1.5px_var(--ink)]"}`}>{PROFILE.initials}</span>
          <span className={`text-[15px] font-semibold tracking-tight transition-opacity duration-500 ${scrolled ? "opacity-0" : ""}`}>{PROFILE.name}</span>
        </a>
        <nav aria-label="Primary" className={`relative hidden rounded-full p-1 md:flex transition-[background,box-shadow,backdrop-filter] duration-500 ${scrolled ? "bg-white/70 shadow-[inset_0_0_0_1px_var(--line),0_10px_30px_rgba(0,0,0,.06)] backdrop-blur-[12px]" : ""}`}>
          {ind && <span aria-hidden className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-[var(--ink)] transition-[left,width] duration-500 [transition-timing-function:var(--ease)]" style={{ left: ind.x, width: ind.w }} />}
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} ref={(el) => { links.current[n.id] = el; }} aria-current={active === n.id ? "true" : undefined}
              className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${active === n.id ? "text-white" : "text-[var(--ink-2)] hover:text-black"}`}>{n.label}</a>
          ))}
        </nav>
        <button className="btn btn-ghost bg-white/70 py-2.5 backdrop-blur md:hidden" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
      </header>
      <div id="menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}
        className="fixed inset-0 z-[70] bg-[var(--paper)] px-[var(--gutter)] pt-6 transition-[clip-path] duration-700 [transition-timing-function:var(--ease)]"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", visibility: open ? "visible" : "hidden", transitionProperty: "clip-path, visibility" }}>
        <div className="flex justify-end"><button className="btn btn-ghost" onClick={() => setOpen(false)}>Close</button></div>
        <ul className="mt-10 grid gap-2">
          {NAV.map((n, i) => (
            <li key={n.id} style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }} className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 text-[clamp(40px,12vw,64px)] font-bold leading-none tracking-[-0.045em]">
                <span className="font-mono text-xs font-normal text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>{n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
