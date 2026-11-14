import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="cert-h" className="section border-y border-[var(--line)] bg-white">
      <style>{`
        .row{position:relative;overflow:hidden;transition:color .5s var(--ease)}
        .row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--ease);z-index:0}
        .row>*{position:relative;z-index:1}
        .row:hover,.row:focus-visible{color:#fff}.row:hover::before,.row:focus-visible::before{transform:scaleX(1)}
        .row .when{opacity:0;transform:translateX(-12px);transition:all .6s var(--ease)}
        .row:hover .when,.row:focus-visible .when{opacity:1;transform:none}
        .row:hover .iss,.row:focus-visible .iss{color:#c9c7c1}
      `}</style>
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="tag">04 — Certifications</span>
          <h2 id="cert-h" className="h2 rv">Always <em>learning.</em></h2>
          <p className="mt-6 font-mono text-sm text-[var(--mute)]">{CERTIFICATIONS.length} certifications</p>
        </div>
        <ol>
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} tabIndex={0} className="row rv grid grid-cols-[40px_1fr] items-center gap-4 border-b border-[var(--line)] px-4 py-7 first:border-t sm:grid-cols-[48px_1fr_auto]" style={{ ["--i" as string]: i }}>
              <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <div><div className="text-xl font-semibold tracking-tight">{c.title}</div><div className="iss mt-1 text-sm text-[var(--mute)]">{c.issuer}</div></div>
              <span className="when font-mono text-xs max-sm:col-start-2">{c.date}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
