"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

export default function Hero() {
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);       // sound is on
  const [blocked, setBlocked] = useState(false);
  const visible = useRef(true);

  const play = async (sound: boolean) => {
    const v = vid.current; if (!v) return false;
    v.muted = !sound;
    try { await v.play(); setOn(sound); return true; } catch { return false; }
  };

  useEffect(() => {
    (async () => {
      if (await play(true)) return;
      setBlocked(true); await play(false);
    })();
    const unlock = async () => {
      if (!visible.current) return;
      if (await play(true)) { setBlocked(false); cleanup(); }
    };
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    const cleanup = () => evs.forEach((e) => removeEventListener(e, unlock));
    evs.forEach((e) => addEventListener(e, unlock, { once: false }));
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.intersectionRatio >= 0.35;
      const v = vid.current; if (!v) return;
      if (visible.current) v.play().catch(() => {}); else v.pause();
    }, { threshold: [0, 0.35, 1] });
    if (sec.current) io.observe(sec.current);
    return () => { cleanup(); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = async () => {
    const v = vid.current; if (!v) return;
    if (on) { v.muted = true; setOn(false); } else { await play(true); setBlocked(false); }
  };

  return (
    <section id="top" ref={sec} className="relative overflow-hidden pt-20" aria-label="Introduction">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[22%] select-none text-center font-bold uppercase leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(13,13,13,.14)] text-[clamp(90px,21vw,360px)]">{PROFILE.first}</div>
      <div className="relative mx-auto flex flex-col items-center">
        <div className="relative h-[62svh] aspect-[768/960] md:h-[min(96svh,1040px)]">
          <video ref={vid} muted loop playsInline preload="auto" poster="/portrait-bust.webp" aria-label={`${PROFILE.name} introducing herself`} className="h-full w-full object-contain mix-blend-multiply">
            <source src="/hero/hero.webm" type="video/webm" /><source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <button onClick={toggle} aria-label={on ? "Pause voice" : "Play voice"} aria-pressed={on}
          className="absolute bottom-[26%] right-[max(var(--gutter),calc(50%-380px))] z-20 grid h-[46px] w-[46px] place-items-center rounded-full bg-[var(--ink)] text-white transition-transform duration-500 hover:scale-110">
          {blocked && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[var(--ink)]/30" />}
          {on ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>}
        </button>
      </div>
      <div className="relative z-10 -mt-[10svh] pb-16 text-center max-md:-mt-[4svh]">
        <h1 className="text-[clamp(40px,7vw,104px)] font-bold leading-none tracking-[-0.045em]">{PROFILE.role}<span className="serif">.</span></h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3 px-[var(--gutter)]">
          <a className="btn btn-primary" href="#work">Explore work</a>
          <a className="btn btn-ghost" href="#contact">Let&apos;s talk</a>
          <a className="btn btn-ghost" href={PROFILE.resume} download>Résumé ↓</a>
        </div>
      </div>
    </section>
  );
}
