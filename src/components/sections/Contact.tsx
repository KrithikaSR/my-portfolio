"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";

const Hop = ({ text }: { text: string }) => <>{text.split("").map((c, i) => <span key={i} aria-hidden className="hop inline-block">{c === " " ? "\u00a0" : c}</span>)}</>;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };
  return (
    <section id="contact" className="section pb-10" aria-labelledby="contact-h">
      <style>{`
        .hop{transition:color .3s}.hop:hover{animation:hop .6s var(--ease)}
        @keyframes hop{0%{transform:none}35%{transform:translateY(-.14em)}100%{transform:none}}
        .badge{animation:spin 18s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
      <div className="wrap">
        <span className="tag rv">07 — Contact</span>
        <h2 id="contact-h" aria-label="Let's build something together." className="h2 rv text-[clamp(44px,9vw,148px)]">
          <Hop text="Let's build" /><br /><em><Hop text="something together." /></em>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a href={`mailto:${PROFILE.email}`} className="break-all text-[clamp(20px,3.4vw,44px)] font-semibold tracking-[-0.03em] underline decoration-1 underline-offset-8">{PROFILE.email}</a>
          <button onClick={copy} className="btn btn-ghost py-2 text-sm"><span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span></button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px]">
          <a href={PROFILE.phoneHref} className="underline underline-offset-4">{PROFILE.phone}</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
          <svg aria-hidden className="badge ml-auto h-28 w-28 max-sm:hidden" viewBox="0 0 120 120"><defs><path id="c" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs><text fontSize="11" fontFamily="var(--f-mono)" letterSpacing="3" fill="#0d0d0d"><textPath href="#c">SAY HELLO · SAY HELLO · SAY HELLO ·</textPath></text><circle cx="60" cy="60" r="4" fill="#0d0d0d" /></svg>
        </div>
        <footer className="mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-sm text-[var(--mute)]">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top" className="hover:text-black">Back to top</a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
