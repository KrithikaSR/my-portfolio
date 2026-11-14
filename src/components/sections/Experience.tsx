"use client";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

const STOPS = [...EDUCATION.map((e) => ({ ...e, kind: "Education" })), ...EXPERIENCE.map((e) => ({ ...e, kind: "Experience" }))];
const startYear = (y: string) => y.match(/\d{4}/)?.[0] ?? y;

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  return (
    <section id="experience" className="section overflow-hidden" aria-labelledby="exp-h">
      <div className="wrap">
        <span className="tag rv">05 — Experience</span>
        <h2 id="exp-h" className="h2 rv mb-20 md:mb-28">Where I&apos;ve <em>been.</em></h2>
        <div ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-0 left-[10px] top-0 w-px bg-[var(--line)] md:left-1/2" />
          <div aria-hidden className="absolute left-[10px] top-0 h-full w-px origin-top bg-[var(--ink)] md:left-1/2" style={{ transform: `scaleY(${p})` }} />
          <ol className="grid gap-16 pl-10 md:gap-28 md:pl-0">
            {STOPS.map((s, i) => {
              const lit = p >= (i + 0.35) / (STOPS.length + 1);
              const yearLeft = i % 2 === 0;
              return (
                <li key={s.title + s.year} className="relative grid items-center gap-5 md:grid-cols-[1fr_72px_1fr] md:gap-0">
                  <span aria-hidden className={`absolute -left-[36px] top-4 h-[13px] w-[13px] rounded-full border-2 transition-all duration-500 md:left-1/2 md:top-1/2 md:-ml-[6.5px] md:-mt-[6.5px] ${lit ? "scale-150 border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--faint)] bg-[var(--paper)]"}`} />
                  <div className={`md:row-start-1 ${yearLeft ? "md:col-start-1 md:pr-6 md:text-right" : "md:col-start-3 md:pl-6"}`}>
                    <div aria-hidden className={`text-[clamp(60px,9.5vw,148px)] font-bold leading-[.9] tracking-[-0.065em] transition-all duration-700 [transition-timing-function:var(--ease)] ${lit ? "translate-y-0 opacity-100" : "translate-y-4 opacity-20"}`}>{startYear(s.year)}</div>
                  </div>
                  <div className={`md:row-start-1 ${yearLeft ? "md:col-start-3 md:pl-6" : "md:col-start-1 md:pr-6"}`}>
                    <article className={`card p-7 transition-all duration-700 [transition-timing-function:var(--ease)] ${lit ? "translate-x-0 opacity-100 shadow-[inset_0_0_0_1px_var(--line),0_24px_60px_rgba(0,0,0,.08)]" : `opacity-40 ${yearLeft ? "md:translate-x-8" : "md:-translate-x-8"}`}`}>
                      <span className="inline-block rounded-md bg-[var(--paper)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--mute)]">{s.kind}</span>
                      <h3 className="mt-4 text-[clamp(22px,2.2vw,30px)] font-bold leading-tight tracking-[-0.035em]">{s.title}</h3>
                      <div className="mt-1 text-[15px] text-[var(--mute)]">{s.place}</div>
                      {s.detail && <p className="mt-4 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{s.detail}</p>}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[var(--paper)] px-3 py-1.5 font-mono text-xs">{s.chip}</span>
                        {s.badge && <span className="rounded-full bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold text-white">{s.badge}</span>}
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
            <li className="rounded-[24px] border border-dashed border-[var(--faint)] p-8 md:mx-auto md:w-full md:max-w-[420px] md:text-center">
              <div className="font-mono text-xs text-[var(--mute)]">Next</div>
              <div className="mt-1 text-3xl font-bold tracking-[-0.04em]">Your team<span className="serif">?</span></div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
