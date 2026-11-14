"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/hooks";
import { PROFILE } from "@/lib/data";

function Barcode() {
  return <div aria-hidden className="h-8 flex-1 rounded-[3px] opacity-80" style={{ background: "repeating-linear-gradient(90deg,#0d0d0d 0 2px,transparent 2px 4px,#0d0d0d 4px 5px,transparent 5px 8px,#0d0d0d 8px 11px,transparent 11px 13px)" }} />;
}

export default function About() {
  const [flip, setFlip] = useState(false);
  const sec = useRef<HTMLElement>(null);
  const lan = useRef<HTMLDivElement>(null);

  // Damped pendulum: pointer velocity kicks the angular velocity, a spring pulls back to rest,
  // and a faint idle sway keeps it alive. Runs only while the section is on screen.
  useEffect(() => {
    if (prefersReducedMotion() || !sec.current) return;
    let a = 0, w = 0, kick = 0, lx = 0, lt = 0, raf = 0, vis = false, last = performance.now();
    const K = 38, C = 2.4;
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (lt && now - lt < 120) kick += ((e.clientX - lx) / Math.max(1, now - lt)) * 45;
      lx = e.clientX; lt = now;
    };
    const loop = (t: number) => {
      raf = 0; if (!vis) return;
      const dt = Math.min(0.032, (t - last) / 1000); last = t;
      w += kick; kick = 0;
      w += (-K * a - C * w) * dt; a += w * dt;
      a = Math.max(-30, Math.min(30, a));
      if (lan.current) lan.current.style.transform = `rotate(${(a + Math.sin(t / 1600) * 1.3).toFixed(3)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } });
    io.observe(sec.current);
    addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  const facts = [
    ["Location", PROFILE.location],
    ["Education", `${PROFILE.degree}, CGPA ${PROFILE.cgpa}`],
    ["Current role", `${PROFILE.role}, ${PROFILE.company}`],
    ["Email", PROFILE.email],
  ];
  return (
    <section id="about" ref={sec} className="section" aria-labelledby="about-h">
      <style>{`
        .lanyard{transform-origin:50% 0;will-change:transform}
        .flipper{transition:transform .9s var(--ease);transform-style:preserve-3d}
        .flipper.on,.flipwrap:focus-visible .flipper{transform:rotateY(180deg)}
        @media(hover:hover){.flipwrap:hover .flipper{transform:rotateY(180deg)}}
        .face{backface-visibility:hidden;-webkit-backface-visibility:hidden}
        .strap span{writing-mode:vertical-rl;animation:strap 9s linear infinite;white-space:nowrap}
        @keyframes strap{from{transform:translateY(8%)}to{transform:translateY(-8%)}}
      `}</style>
      <div className="wrap grid grid-cols-1 items-stretch gap-14 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] [&>*]:min-w-0">
        <div className="rv flex flex-col justify-center">
          <span className="tag">01 — About</span>
          <h2 id="about-h" className="h2 mb-8 text-[clamp(36px,5vw,72px)]">Hi, I&apos;m <em>{PROFILE.first}.</em></h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-[var(--ink-2)]">{PROFILE.resumeSummary}</p>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[var(--ink-2)]">{PROFILE.moreSummary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={PROFILE.resume} download>Résumé</a>
            <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="relative mx-auto flex w-[300px] justify-center max-lg:order-first max-lg:min-h-[500px]">
          <div ref={lan} className="lanyard relative flex flex-col items-center">
            <div className="strap grid h-[72px] w-[30px] place-items-center overflow-hidden bg-[var(--ink)] text-[9px] font-semibold tracking-widest text-white"><span>{PROFILE.name} · {PROFILE.role}</span></div>
            <div aria-hidden className="-mt-1 h-5 w-5 rounded-b-md bg-gradient-to-b from-[#bdbab4] to-[#8d8a84]" />
            <button type="button" aria-pressed={flip} aria-label="ID card. Press to flip." onClick={() => setFlip((f) => !f)} className="flipwrap block [perspective:1200px]">
              <div className={`flipper relative h-[404px] w-[300px] ${flip ? "on" : ""}`}>
                <div className="face card absolute inset-0 flex flex-col overflow-hidden text-left shadow-[0_30px_70px_rgba(0,0,0,.14)]">
                  <div className="bg-[var(--ink)] py-3 text-center font-mono text-[11px] tracking-[.3em] text-white">QA ENGINEER ID</div>
                  <div className="mx-auto mt-5 rounded-full p-1.5 shadow-[0_0_0_6px_rgba(13,13,13,.04)]" style={{ background: "linear-gradient(145deg,#d9d6d0,#8a8780)" }}>
                    <div className="h-[156px] w-[128px] overflow-hidden rounded-[64px_64px_48px_48px] bg-white"><img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={128} height={156} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" /></div>
                  </div>
                  <div className="mt-3 text-center"><div className="text-xl font-bold tracking-tight">{PROFILE.name}</div><div className="text-sm text-[var(--mute)]">{PROFILE.role}</div></div>
                  <dl className="mx-6 mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[11px]">
                    <dt className="text-[var(--faint)]">Experience</dt><dd>{PROFILE.years}</dd>
                    <dt className="text-[var(--faint)]">Company</dt><dd>IRIS KPO</dd>
                    <dt className="text-[var(--faint)]">Graduated</dt><dd>{PROFILE.graduated}</dd>
                  </dl>
                  <div className="mx-6 mt-auto mb-5 flex items-center gap-3"><Barcode /><span aria-hidden className="h-9 w-9 rounded-full" style={{ background: "conic-gradient(#e4e2dd,#9b9890,#f4f2ee,#8d8a84,#e4e2dd)" }} /></div>
                </div>
                <div className="face card absolute inset-0 flex flex-col p-7 text-left [transform:rotateY(180deg)]">
                  <div className="font-mono text-[11px] text-[var(--mute)]">What I am</div>
                  <ul className="mt-4 grid gap-2.5 text-[13.5px] leading-snug">
                    <li>{PROFILE.role}, {PROFILE.years}</li>
                    <li>{PROFILE.degree}, CGPA {PROFILE.cgpa}</li>
                    <li>1,000+ automated test cases</li>
                    <li>Projects: IRIS Elements, Innervision, AIM Health</li>
                    <li>Impact Award, Excellence Performer</li>
                  </ul>
                  <div className="mt-auto"><div className="serif text-3xl text-[var(--ink)]">{PROFILE.name}</div><div className="mt-1 border-t border-[var(--line)] pt-2 font-mono text-[10px] text-[var(--mute)]">If found, say hello · {PROFILE.email}</div></div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="rv flex flex-col justify-center" style={{ ["--i" as string]: 2 }}>
          <span className="tag">Quick facts</span>
          <dl>{facts.map(([k, v]) => <div key={k} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-[var(--line)] py-4"><dt className="font-mono text-xs text-[var(--mute)]">{k}</dt><dd className="min-w-0 text-[15px] font-medium [overflow-wrap:anywhere]">{v}</dd></div>)}</dl>
          <p className="serif mt-6 text-2xl leading-snug">Automation expertise and team leadership, strengthening software quality and delivery efficiency.</p>
        </div>
      </div>
    </section>
  );
}
