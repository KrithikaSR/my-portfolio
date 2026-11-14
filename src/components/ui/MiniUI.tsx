/* Illustrative, grayscale mini-UIs. Pure CSS/JSX. Labels use only terms from the résumé; no numbers, no real screenshots.
   Every project has its own sketch; rows stagger in (.rw), bars fill (.grow / .up) and the "current" step pulses (.blink). */
const K = (k: number) => ({ style: { ["--k" as string]: k } });
const Bar = ({ w = "100%", dark = false }: { w?: string; dark?: boolean }) => <div className={`grow h-2 rounded-full ${dark ? "bg-[var(--ink)]" : "bg-[var(--soft)]"}`} style={{ width: w }} />;
const Win = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl bg-[var(--paper)] shadow-[inset_0_0_0_1px_var(--line),0_20px_50px_rgba(0,0,0,.07)]">
    <div className="flex items-center gap-1.5 border-b border-[var(--line)] bg-white px-3 py-2.5">
      {[0, 1, 2].map((i) => <i key={i} className="h-2 w-2 rounded-full bg-[var(--soft)]" />)}
      <span className="ml-2 font-mono text-[10px] text-[var(--mute)]">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);
const Chip = ({ children, dark = false, k = 0, pulse = false }: { children: React.ReactNode; dark?: boolean; k?: number; pulse?: boolean }) => (
  <span {...K(k)} className={`rw inline-block rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${pulse ? "blink" : ""} ${dark ? "bg-[var(--ink)] text-white" : "bg-white shadow-[inset_0_0_0_1px_var(--line)]"}`}>{children}</span>
);
const Arrow = ({ k = 0, down = false }: { k?: number; down?: boolean }) => <span aria-hidden {...K(k)} className="rw text-[var(--faint)]">{down ? "↓" : "→"}</span>;
const Step = ({ n, label, state, k }: { n: number; label: string; state: "done" | "now" | "todo"; k: number }) => (
  <li {...K(k)} className="rw flex items-center gap-3 rounded-xl bg-white p-3">
    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${state === "done" ? "bg-[var(--ink)] text-white" : state === "now" ? "blink bg-[var(--ink)] text-white" : "shadow-[inset_0_0_0_1px_var(--faint)]"}`}>{state === "done" ? "✓" : n}</span>
    <span className="text-xs font-medium">{label}</span><span className="ml-auto w-1/5"><Bar /></span>
  </li>
);

function Body({ id }: { id: string }) {
  switch (id) {
    case "heal":
      return (
        <Win title="Self-healing run">
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-1.5">{["Execution logs", "Screenshots", "DOM snapshots", "Failure artifacts"].map((c, i) => <Chip key={c} k={i}>{c}</Chip>)}</div>
            <ol className="grid gap-2">
              <Step n={1} label="Locator failure captured" state="done" k={4} />
              <Step n={2} label="AI-assisted locator analysis" state="done" k={5} />
              <Step n={3} label="Human-validated correction" state="now" k={6} />
            </ol>
          </div>
        </Win>
      );
    case "rca":
      return (
        <Win title="Root cause analysis">
          <div className="grid grid-cols-[auto_16px_1fr] items-center gap-2">
            <div className="grid gap-2">{["Execution logs", "DOM evidence", "Screenshots"].map((c, i) => <Chip key={c} k={i}>{c}</Chip>)}</div>
            <Arrow k={3} />
            <div className="grid gap-2">
              <div {...K(4)} className="rw rounded-xl bg-[var(--ink)] p-3 text-center text-xs font-semibold text-white"><span className="blink inline-block">AI agent</span></div>
              <div {...K(5)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Probable root causes</div><div className="grid gap-1.5"><Bar w="85%" /><Bar w="60%" /></div></div>
              <div {...K(6)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Corrective actions</div><Bar w="70%" dark /></div>
            </div>
          </div>
        </Win>
      );
    case "testgen":
      return (
        <Win title="Test case generation">
          <div className="grid grid-cols-[1fr_16px_1fr] items-center gap-2">
            <div className="grid gap-2">
              <div {...K(0)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Jira user story</div><div className="grid gap-1.5"><Bar /><Bar w="70%" /></div></div>
              <div {...K(1)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Acceptance criteria</div><div className="grid gap-1.5"><Bar w="80%" /><Bar w="55%" /></div></div>
            </div>
            <Arrow k={2} />
            <div className="grid gap-2">
              <Chip dark k={3} pulse>LLM</Chip>
              <div {...K(4)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Structured test cases</div><div className="grid gap-2">{[0, 1, 2].map((i) => <div key={i} className="flex items-center gap-2"><span className="text-[10px]">✓</span><Bar w={`${80 - i * 15}%`} /></div>)}</div></div>
              <Chip k={5}>TestRail</Chip>
            </div>
          </div>
        </Win>
      );
    case "tax":
      return (
        <Win title="Return preparation">
          <ol className="grid gap-2">
            <Step n={1} label="Tax calculation" state="done" k={0} /><Step n={2} label="Return preparation" state="done" k={1} />
            <Step n={3} label="Validation" state="now" k={2} /><Step n={4} label="Submission to HMRC" state="todo" k={3} />
          </ol>
        </Win>
      );
    case "accounts":
      return (
        <Win title="Accounts production">
          <div className="grid grid-cols-[1.2fr_1fr] gap-3">
            <div {...K(0)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Trial balance</div><div className="grid gap-2.5">{[80, 55, 70, 40, 62].map((w, i) => <div key={i} {...K(i + 1)} className="rw grid grid-cols-[1fr_28%] gap-2"><Bar w={`${w}%`} /><Bar dark={i === 4} /></div>)}</div></div>
            <div {...K(2)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Statutory accounts</div><div className="grid gap-2">{[100, 85, 92, 60, 78, 50].map((w, i) => <Bar key={i} w={`${w}%`} />)}</div></div>
          </div>
        </Win>
      );
    case "lease":
      return (
        <Win title="Lease accounting · IFRS 16">
          <div className="grid gap-3">
            <div {...K(0)} className="rw rounded-xl bg-white p-3"><div className="mb-2 text-[11px] font-semibold">Lease portfolio</div><div className="grid gap-2.5">{[75, 55, 85].map((w, i) => <div key={i} {...K(i + 1)} className="rw grid grid-cols-[1fr_20%_20%] gap-2"><Bar w={`${w}%`} /><Bar /><Bar dark={i === 0} /></div>)}</div></div>
            <div {...K(2)} className="rw flex h-24 items-end gap-2 rounded-xl bg-white p-3">{[40, 62, 50, 78, 58, 70].map((h, i) => <div key={i} {...K(i + 3)} className={`up flex-1 rounded-t-md ${i === 3 ? "bg-[var(--ink)]" : "bg-[var(--soft)]"}`} style={{ height: `${h}%`, ["--k" as string]: i + 3 }} />)}</div>
          </div>
        </Win>
      );
    case "aim":
      return (
        <Win title="Claims portal">
          <div className="grid gap-2">
            {["Eligibility verification", "Provider authorization", "Claim approval"].map((s, i) => (
              <div key={s}>
                <div {...K(i)} className={`rw flex items-center justify-between rounded-xl p-3 text-xs font-medium ${i === 2 ? "blink bg-[var(--ink)] text-white" : "bg-white"}`}><span>{s}</span><span className="w-1/5"><Bar /></span></div>
                {i < 2 && <div className="grow mx-auto h-3 w-px bg-[var(--faint)]" />}
              </div>
            ))}
          </div>
        </Win>
      );
    case "ism":
      return (
        <Win title="Service Manager">
          <div className="grid grid-cols-[auto_28px_1fr] items-center gap-0">
            <div className="grid gap-2">{["CICS", "IMS", "Siebel", "RDBMS"].map((a, i) => <Chip key={a} k={i}>{a}</Chip>)}</div>
            <div aria-hidden className="relative h-full"><i className="absolute left-0 top-[12%] h-[76%] w-px bg-[var(--faint)]" /><i className="grow absolute left-0 top-1/2 h-px w-full bg-[var(--faint)]" /></div>
            <div {...K(4)} className="rw blink grid h-24 place-items-center rounded-xl bg-[var(--ink)] text-center text-xs font-semibold text-white">iWay<br />Service Manager</div>
          </div>
        </Win>
      );
    default:
      return (
        <Win title="Integration tool">
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-4">
            <Chip k={0}>Data discovery</Chip><Arrow k={1} /><Chip k={2}>Process flow</Chip><Arrow k={3} /><Chip dark k={4} pulse>Deployment</Chip>
            <div className="mt-4 grid w-full gap-2"><Bar w="70%" /><Bar w="45%" /><Bar w="60%" /></div>
          </div>
        </Win>
      );
  }
}

export default function MiniUI({ id }: { id: string }) {
  return (
    <figure className="mock m-0" role="img" aria-label="Illustrative interface sketch, not a real screenshot">
      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes up{from{transform:scaleY(0)}to{transform:scaleY(1)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.55}}
        .mock .rw{animation:rise .6s var(--ease) both;animation-delay:calc(.55s + var(--k,0)*110ms)}
        .mock .grow{transform-origin:left;animation:grow 1s var(--ease) both;animation-delay:calc(.8s + var(--k,0)*110ms)}
        .mock .up{transform-origin:bottom;animation:up .9s var(--ease) both;animation-delay:calc(.8s + var(--k,0)*110ms)}
        .mock .blink{animation:rise .6s var(--ease) both,blink 1.8s ease-in-out 1.8s infinite;animation-delay:calc(.55s + var(--k,0)*110ms),1.8s}
        @media(prefers-reduced-motion:reduce){.mock .rw,.mock .grow,.mock .up,.mock .blink{animation:none!important}}
      `}</style>
      <Body id={id} />
      <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">Illustrative UI</figcaption>
    </figure>
  );
}
