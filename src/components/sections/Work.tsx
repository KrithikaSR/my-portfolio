"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import MiniUI from "@/components/ui/MiniUI";
import TechLogo, { isBrand } from "@/components/ui/TechLogo";

export default function Work() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const [open, setOpen] = useState(-1); // nothing opens until the section is on screen, so the entrance animation is actually seen
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { if (seen) setOpen(0); }, [seen]);
  const hoverOpen = (i: number) => { if (t.current) clearTimeout(t.current); t.current = setTimeout(() => setOpen(i), 110); };

  return (
    <section id="work" data-layout="work-v3" className="section" aria-labelledby="work-h">
      <style>{`
        .wk{display:flex;flex-direction:column;gap:8px}
        .pn{position:relative;overflow:hidden;border-radius:24px}
        .pn:not([data-open=true]){height:76px}
        .pn .body{opacity:0;animation:bfade .6s var(--ease) .45s both}
        @keyframes bfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .mockwrap{animation:wipe 1.1s var(--ease) .5s both}
        @keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
        .plus{transition:transform .6s var(--ease)} .pn:hover .plus{transform:rotate(90deg)}
        @media(min-width:1280px){
          .wk{flex-direction:row;align-items:stretch;min-height:clamp(560px,78svh,660px)}
          .pn,.pn:not([data-open=true]){height:auto;flex:0 0 52px;transition:flex .9s var(--ease)}
          .pn[data-open=true]{flex:1 1 0;min-width:0}
        }
        @media(prefers-reduced-motion:reduce){.pn .body,.mockwrap{animation:none}}
      `}</style>
      <div className="wrap">
        <span className="tag rv">03 — Selected work</span>
        <h2 id="work-h" className="h2 rv mb-12">Things I&apos;ve <em>built.</em></h2>
        <div ref={ref} className="wk">
          {PROJECTS.map((p, i) => {
            const o = open === i;
            return (
              <article key={p.id} data-open={o} className="pn card" onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen(i)} onPointerLeave={() => t.current && clearTimeout(t.current)}>
                {!o && (
                  <button className="absolute inset-0 z-10 flex w-full items-center justify-between gap-3 px-5 text-left xl:flex-col xl:px-0 xl:py-5" aria-expanded={false} aria-label={`${p.title}, open`} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}>
                    <span className="font-mono text-xs text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold xl:max-h-[calc(100%-110px)] xl:flex-none xl:rotate-180 xl:overflow-hidden xl:text-ellipsis xl:whitespace-nowrap xl:[writing-mode:vertical-rl]">{p.title}</span>
                    <span aria-hidden className="plus grid h-8 w-8 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]">+</span>
                  </button>
                )}
                {o && (
                  <div className="body grid gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(250px,310px)] xl:items-center xl:gap-8 xl:p-9">
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] uppercase tracking-[.14em] text-[var(--mute)]">{String(i + 1).padStart(2, "0")} — {p.company} · {p.period}</div>
                      <h3 className="mt-3 text-balance text-[clamp(22px,2.1vw,34px)] font-bold leading-[1.08] tracking-[-0.035em]">{p.title}</h3>
                      <p className="mt-3 text-[13.5px] leading-[1.55] text-[var(--ink-2)] xl:text-[14px]">{p.description}</p>
                      <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-[13.5px] text-[var(--ink-2)] sm:grid-cols-2">
                        {p.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden className="text-[var(--faint)]">•</span>{f}</li>)}
                      </ul>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.tech.map((x) => <li key={x} className="flex items-center gap-2 rounded-full bg-[var(--paper)] py-1.5 pl-2.5 pr-3 font-mono text-xs">{isBrand(x) && <TechLogo name={x} size={16} />}{x}</li>)}
                      </ul>
                    </div>
                    <div className="mockwrap w-full max-w-[420px] rounded-[22px] bg-[var(--soft)]/60 p-4 xl:max-w-none"><MiniUI id={p.id} /></div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
