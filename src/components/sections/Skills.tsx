"use client";
import { useMemo, useState } from "react";
import { PROJECTS, SKILL_GROUPS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import TechLogo from "@/components/ui/TechLogo";

const sym = (n: string) => { const l = n.replace(/[^A-Za-z]/g, ""); return l[0].toUpperCase() + (l[1] || "").toLowerCase(); };

export default function Skills() {
  const all = useMemo(() => SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ name: s, family: g.family }))).map((s, i) => ({ ...s, n: i + 1 })), []);
  const [fam, setFam] = useState("All");
  const [sel, setSel] = useState(all.find((s) => s.name === "Playwright") ?? all[0]);
  const [ref, seen] = useInView<HTMLDivElement>(0.1);
  const used = PROJECTS.filter((p) => p.tech.includes(sel.name) || p.title.includes(sel.name));
  return (
    <section id="skills" className="section" aria-labelledby="skills-h">
      <style>{`
        .tile{--dd:var(--d8);opacity:0;transform:translateY(14px) scale(.96);transition:opacity .7s var(--ease),transform .7s var(--ease),background .3s,color .3s,box-shadow .3s;transition-delay:calc(var(--dd)*40ms),calc(var(--dd)*40ms),0s,0s,0s}
        @media(max-width:767px){.tile{--dd:var(--d4)}}
        .grid-in .tile{opacity:1;transform:none}
        .grid-in .tile.dim{opacity:.18;transition-delay:0s}
        .tile:hover,.tile:focus-visible,.tile[aria-pressed=true]{background:var(--ink);color:#fff;transform:translateY(-3px)}
        .tile:hover .sub,.tile[aria-pressed=true] .sub{color:#bbb}
        @media(prefers-reduced-motion:reduce){.tile{opacity:1;transform:none}}
      `}</style>
      <div className="wrap">
        <span className="tag rv">02 — Skills</span>
        <h2 id="skills-h" className="h2 rv mb-4">The periodic table of <em>my stack.</em></h2>
        <div role="group" aria-label="Filter by family" className="rv my-8 flex flex-wrap gap-2">
          {["All", ...SKILL_GROUPS.map((g) => g.family)].map((f) => (
            <button key={f} aria-pressed={fam === f} onClick={() => setFam(f)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${fam === f ? "bg-[var(--ink)] text-white" : "shadow-[inset_0_0_0_1px_var(--line)] hover:bg-white"}`}>{f}</button>
          ))}
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div ref={ref} className={`grid grid-cols-4 gap-2 md:grid-cols-8 ${seen ? "grid-in" : ""}`}>
            {all.map((s, i) => (
              <button key={s.name} aria-pressed={sel.name === s.name} onMouseEnter={() => setSel(s)} onFocus={() => setSel(s)} onClick={() => setSel(s)}
                style={{ ["--d8" as string]: (i % 8) + Math.floor(i / 8), ["--d4" as string]: (i % 4) + Math.floor(i / 4) }}
                className={`tile card flex aspect-square min-w-0 flex-col justify-between rounded-2xl p-2 text-left ${fam !== "All" && fam !== s.family ? "dim" : ""}`}>
                <span className="sub font-mono text-[10px] text-[var(--mute)]">{s.n}</span>
                <span className="text-2xl font-bold tracking-tight">{sym(s.name)}</span>
                <span className="sub w-full truncate text-[9px] leading-tight text-[var(--mute)]" title={s.name}>{s.name}</span>
              </button>
            ))}
          </div>
          <aside aria-live="polite" className="card p-7 lg:sticky lg:top-24">
            <div key={sel.name} className="grid h-[190px] place-items-center rounded-2xl bg-[var(--paper)] [animation:pop_.6s_var(--ease)]"><TechLogo name={sel.name} size={150} /></div>
            <style>{`@keyframes pop{from{transform:scale(.7);opacity:0}to{transform:none;opacity:1}}`}</style>
            <div className="mt-5 text-xl font-bold tracking-tight">{sel.name}</div>
            <div className="font-mono text-xs text-[var(--mute)]">{sel.family}</div>
            <div className="mt-4 border-t border-[var(--line)] pt-4 text-sm text-[var(--ink-2)]">
              {used.length ? <><div className="mb-1 font-mono text-xs text-[var(--mute)]">Used in</div>{used.map((p) => <div key={p.id}>{p.title}</div>)}</> : <span className="text-[var(--mute)]">Listed under {sel.family}.</span>}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
