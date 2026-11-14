"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion, useInView, useScrollProgress } from "@/lib/hooks";

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.6);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) { setV(to); return; }
    let raf = 0; const t0 = performance.now();
    const f = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - k, 4)))); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref} aria-label={`${to.toLocaleString()}${suffix}`}>{v.toLocaleString()}{suffix}</span>;
}

export default function Achievements() {
  const [ref, p] = useScrollProgress<HTMLElement>(true);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [mid, setMid] = useState(0);
  useEffect(() => {
    const m = () => track.current && setTravel(Math.max(0, track.current.scrollWidth - innerWidth));
    m(); addEventListener("resize", m); return () => removeEventListener("resize", m);
  }, []);
  useEffect(() => {
    const t = track.current; if (!t) return;
    const c = innerWidth / 2 + p * travel; let best = 0, d = 1e9;
    Array.from(t.children).forEach((el, i) => { const e = el as HTMLElement; const dist = Math.abs(e.offsetLeft + e.offsetWidth / 2 - c); if (dist < d) { d = dist; best = i; } });
    setMid(best);
  }, [p, travel]);
  const n = ACHIEVEMENTS.length;
  return (
    <section id="achievements" ref={ref} aria-labelledby="ach-h" style={{ height: `calc(100svh + ${travel}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="wrap mb-10 w-full">
          <span className="tag">06 — Achievements</span>
          <div className="flex items-end justify-between gap-6"><h2 id="ach-h" className="h2">Moments that <em>counted.</em></h2></div>
          <div aria-hidden className="mt-8 h-px w-full bg-[var(--line)]"><div className="h-px origin-left bg-[var(--ink)]" style={{ transform: `scaleX(${p})` }} /></div>
        </div>
        <div ref={track} className="flex w-max gap-6 px-[var(--gutter)] py-6 will-change-transform" style={{ transform: `translateX(${-p * travel}px)` }}>
          {ACHIEVEMENTS.map((a, i) => {
            const on = mid === i;
            return (
              <article key={a.label} className={`card relative flex shrink-0 flex-col justify-between p-7 transition-[transform,box-shadow] duration-700 [transition-timing-function:var(--ease)] ${on ? "-translate-y-3 shadow-[inset_0_0_0_1px_var(--line),0_30px_60px_rgba(0,0,0,.12)]" : ""}`} style={{ width: "clamp(340px,40vw,540px)", height: "clamp(260px,36vh,310px)" }}>
                <div className="flex items-start justify-between">
                  <div aria-hidden className={`grid h-[72px] w-[72px] place-items-center rounded-2xl bg-[var(--paper)] transition-shadow duration-700 ${on ? "shadow-[0_0_40px_rgba(13,13,13,.12)]" : ""}`}>
                    {a.award ? <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4z" /><path d="M8 6H6a2 2 0 0 0 0 4h2.4" /><path d="M16 6h2a2 2 0 0 1 0 4h-2.4" /><path d="M12 13v4" /><path d="M10 17h4v3h-4z" /><path d="M8.5 20h7" /><path d="M12 5.8l.85 1.75 1.9.27-1.38 1.34.33 1.9L12 10.2l-1.7.9.33-1.9L9.25 7.82l1.9-.27z" /></svg> : <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" /></svg>}
                  </div>
                  <span className="font-mono text-xs text-[var(--mute)]">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className={`min-w-0 ${a.value !== undefined ? "max-w-[60%]" : "max-w-full"}`}>
                    <div className="text-xl font-bold tracking-[-0.03em]">{a.label}</div>
                    <div className="mt-1 text-sm text-[var(--ink-2)]">{a.caption}</div>
                    <p className="mt-2 text-xs leading-snug text-[var(--mute)]">{a.detail}</p>
                  </div>
                  {a.value !== undefined && <div className="text-[clamp(48px,6vw,84px)] font-bold leading-none tracking-[-0.06em]"><Count to={a.value} suffix={a.suffix} /></div>}
                </div>
              </article>
            );
          })}
          <div className="flex shrink-0 items-center gap-3 whitespace-nowrap px-10 text-3xl font-bold tracking-[-0.04em]">and counting <span aria-hidden>→</span></div>
        </div>
      </div>
    </section>
  );
}
