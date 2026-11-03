"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";

// Illustrative UI mockups. Names and numbers inside them are sample data, not client data.

function useLoop(steps: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), ms);
    return () => clearInterval(id);
  }, [inView, reduce, steps, ms]);
  return { ref, step: reduce ? steps - 1 : step };
}

export function Frame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto truncate rounded-md bg-white/5 px-3 py-1 text-xs text-neutral-400">{url}</span>
        <span className="w-12" />
      </div>
      {children}
    </div>
  );
}

const Lock = () => (
  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
    <rect x="3" y="7" width="10" height="7" rx="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
);
const Check = ({ className = "size-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
);

/* ---------------- Chordian: RAG chat with hybrid retrieval ---------------- */
export function ChordianMock() {
  const { ref, step } = useLoop(5, 1400);
  const hits = [
    ["Q3 logistics report.pdf", 0.91],
    ["Supplier SLA register", 0.87],
    ["Port delay memo", 0.82],
  ] as const;

  return (
    <div ref={ref}>
      <Frame url="chordian · workspace / northwind">
        <div className="grid min-h-[420px] text-sm md:grid-cols-[150px_1fr] lg:grid-cols-[150px_1fr_230px]">
          <aside className="hidden border-r border-white/10 p-4 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Tenants</p>
            {["Northwind", "Contoso", "Globex"].map((t, i) => (
              <p key={t} className={`mt-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-white/10 text-white" : "text-neutral-500"}`}>{t}</p>
            ))}
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Sources</p>
            <p className="mt-2 text-neutral-400">1,284 docs</p>
            <p className="text-neutral-400">38k graph nodes</p>
          </aside>

          <div className="flex flex-col p-5">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-violet-500/90 px-4 py-2.5 text-white">
              Which suppliers are linked to the delayed Q3 shipments?
            </div>
            <div className="mt-4 min-h-[180px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.p key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-neutral-400">
                    <motion.span className="size-2 rounded-full bg-cyan-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                    Searching vectors + knowledge graph…
                  </motion.p>
                )}
                {step >= 2 && (
                  <motion.div key="a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-[92%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-4 py-3 leading-relaxed text-neutral-200">
                    Three suppliers are linked to the delayed shipments: <b className="text-white">Alpine Freight</b>
                    <sup className="ml-0.5 rounded bg-cyan-400/20 px-1 text-cyan-300">1</sup>, <b className="text-white">Kestrel Parts</b>
                    <sup className="ml-0.5 rounded bg-cyan-400/20 px-1 text-cyan-300">2</sup> and <b className="text-white">Orbit Metals</b>
                    <sup className="ml-0.5 rounded bg-cyan-400/20 px-1 text-cyan-300">3</sup>. Two of them share a port of origin, a link surfaced by the knowledge graph.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-neutral-500">
              Ask anything about your data…
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300">
                <Lock /> Claude connected via MCP
              </span>
            </div>
          </div>

          <aside className="hidden border-l border-white/10 p-4 lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Hybrid retrieval</p>
            <p className="mt-4 text-xs text-neutral-400">Vector · Qdrant</p>
            {hits.map(([name, score], i) => (
              <div key={name} className="mt-2">
                <div className="flex justify-between text-[11px] text-neutral-300"><span className="truncate pr-2">{name}</span><span>{score}</span></div>
                <div className="mt-1 h-1 rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" animate={{ width: step >= 1 ? `${score * 100}%` : "0%" }} transition={{ duration: 0.6, delay: i * 0.1 }} />
                </div>
              </div>
            ))}
            <p className="mt-5 text-xs text-neutral-400">Graph · Neo4j</p>
            <svg viewBox="0 0 200 90" className="mt-2 w-full">
              {[[30, 20, 100, 70], [100, 70, 170, 20]].map(([x1, y1, x2, y2], i) => (
                <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeOpacity={0.6} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }} />
              ))}
              {[[30, 20, "Shipment"], [100, 70, "Supplier"], [170, 20, "Port"]].map(([x, y, l]) => (
                <g key={l as string}>
                  <circle cx={x as number} cy={y as number} r={7} fill="#0c0c0f" stroke="#a78bfa" strokeWidth={2} />
                  <text x={x as number} y={(y as number) + (y === 70 ? 18 : -12)} textAnchor="middle" fontSize={10} fill="#a3a3a3">{l}</text>
                </g>
              ))}
            </svg>
            <p className={`mt-3 inline-block rounded-full px-2 py-0.5 text-[11px] transition-colors ${step >= 2 ? "bg-violet-400/20 text-violet-200" : "bg-white/5 text-neutral-500"}`}>
              Reranked · top 3
            </p>
          </aside>
        </div>
      </Frame>
    </div>
  );
}

/* ---------------- Milta: dealer checkout through CCV ---------------- */
export function MiltaMock() {
  const { ref, step } = useLoop(4, 1500);
  const items = [["Prepaid SIM bundle", "× 50", "1,250.00"], ["Recharge vouchers", "× 200", "3,000.00"], ["5G home router", "× 4", "570.00"]];

  return (
    <div ref={ref} className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-[#0c0c0f] p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Dealer checkout</p>
          <p className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-400">Order #MT-20418</p>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          {items.map(([n, q, p]) => (
            <div key={n} className="flex justify-between"><span className="text-neutral-300">{n} <span className="text-neutral-500">{q}</span></span><span>{p}</span></div>
          ))}
          <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold"><span>Total</span><span>4,820.00</span></div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-orange-400/60 bg-orange-400/10 px-3 py-2.5">● Card</div>
          <div className="rounded-xl border border-white/10 px-3 py-2.5 text-neutral-500">○ Bank transfer</div>
        </div>

        <motion.div
          layout
          className={`mt-5 flex h-12 items-center justify-center gap-2 rounded-xl font-semibold ${step >= 2 ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"}`}
        >
          {step === 0 && <><Lock /> Pay securely</>}
          {step === 1 && (
            <>
              <motion.span className="size-4 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
              Processing…
            </>
          )}
          {step >= 2 && <><Check className="size-5" /> Payment confirmed</>}
        </motion.div>

        <div className="mt-6 flex items-center text-xs">
          {["Placed", "Paid", "Fulfilment"].map((s, i) => {
            const done = i === 0 || (i === 1 && step >= 2);
            return (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <span className={`flex items-center gap-1.5 ${done ? "text-emerald-300" : "text-neutral-500"}`}>
                  <span className={`grid size-5 place-items-center rounded-full ${done ? "bg-emerald-500/20" : "bg-white/5"}`}>{done ? <Check className="size-3" /> : i + 1}</span>
                  {s}
                </span>
                {i < 2 && <span className={`mx-2 h-px flex-1 ${i === 0 && step >= 2 ? "bg-emerald-400/60" : "bg-white/10"}`} />}
              </div>
            );
          })}
        </div>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500"><Lock /> Secured by the CCV payment gateway</p>
      </div>
    </div>
  );
}

/* ---------------- Envision: proposal approval board ---------------- */
type Card = { id: string; title: string; team: string[]; alloc: number };
const Initials = ({ team }: { team: string[] }) => (
  <span className="flex">
    {team.map((t, i) => (
      <span key={t} className="-ml-1.5 grid size-6 place-items-center rounded-full border-2 border-[#16161a] text-[9px] font-bold text-black first:ml-0" style={{ background: ["#a3e635", "#2dd4bf", "#fde047", "#f9a8d4"][i % 4] }}>{t}</span>
    ))}
  </span>
);

export function EnvisionMock() {
  const { ref, step } = useLoop(4, 1600);
  const moving: Card = { id: "m", title: "Data platform migration", team: ["AK", "RN", "JS"], alloc: 3 };
  const cols: { name: string; cards: Card[] }[] = [
    { name: "Draft", cards: [{ id: "d", title: "Mobile app refresh", team: ["PV", "LM"], alloc: 1 }] },
    { name: "In review", cards: [...(step >= 1 ? [] : [moving]), { id: "v", title: "Vendor portal", team: ["TS"], alloc: 2 }] },
    { name: "Approved", cards: [...(step >= 1 ? [moving] : []), { id: "c", title: "CRM rollout", team: ["DG", "MK"], alloc: 4 }] },
  ];

  return (
    <div ref={ref}>
      <Frame url="envision · proposals / Q4">
        <div className="p-5">
          <LayoutGroup>
            <div className="grid gap-3 sm:grid-cols-3">
              {cols.map((c) => (
                <div key={c.name} className="rounded-xl bg-white/[0.03] p-3">
                  <p className="mb-3 flex items-center justify-between text-xs font-semibold text-neutral-400">
                    {c.name} <span className="rounded-full bg-white/5 px-2">{c.cards.length}</span>
                  </p>
                  <div className="space-y-2.5">
                    {c.cards.map((card) => (
                      <motion.div
                        layoutId={card.id}
                        key={card.id}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                        className={`rounded-lg border bg-[#16161a] p-3 ${card.id === "m" && step >= 1 ? "border-lime-400/60" : "border-white/10"}`}
                      >
                        <p className="text-sm font-medium">{card.title}</p>
                        <div className="mt-3"><Initials team={card.team} /></div>
                        <div className="mt-3 flex justify-between text-[11px] text-neutral-500">
                          <span>Resources</span><span>{card.alloc}/4</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-lime-400 to-teal-400" style={{ width: `${card.alloc * 25}%` }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </LayoutGroup>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500">Approval chain</span>
            {["Requester", "Manager", "Finance"].map((s, i) => {
              const done = i < 2 || step >= 1;
              return (
                <span key={s} className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${done ? "bg-lime-400/15 text-lime-300" : "bg-white/5 text-neutral-500"}`}>
                    {done && <Check className="size-3" />}{s}
                  </span>
                  {i < 2 && <span className="text-neutral-600">→</span>}
                </span>
              );
            })}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ---------------- Speech4all: practitioner dashboard ---------------- */
export function Speech4allMock() {
  const sessions = [
    ["09:30", "A.K.", "Initial assessment", "Done"],
    ["11:00", "R.M.", "Follow-up session", "Next"],
    ["14:15", "S.P.", "Progress review", "Upcoming"],
  ];
  const bars = [35, 48, 44, 62, 70, 84];

  return (
    <Frame url="speech4all · practitioner">
      <div className="grid text-sm md:grid-cols-[170px_1fr]">
        <aside className="hidden border-r border-white/10 p-4 md:block">
          {["Dashboard", "Clients", "Sessions", "Messages", "Admin"].map((n, i) => (
            <p key={n} className={`mb-1 rounded-md px-2 py-1.5 ${i === 0 ? "bg-sky-400/15 text-sky-200" : "text-neutral-500"}`}>{n}</p>
          ))}
        </aside>
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-semibold">Today</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-2.5 py-1 text-[11px] text-sky-200"><Lock /> Signed in · AWS Cognito</span>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-2">
              {sessions.map(([t, who, what, status]) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-400 text-xs font-bold text-black">{who}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{what}</p>
                    <p className="text-xs text-neutral-500">{t}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${status === "Done" ? "bg-emerald-400/15 text-emerald-300" : status === "Next" ? "bg-sky-400/15 text-sky-200" : "bg-white/5 text-neutral-500"}`}>{status}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-neutral-400">Client progress · 6 weeks</p>
              <div className="mt-4 flex h-32 items-end gap-2">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-sky-400"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-emerald-300">+49 pts since week 1</p>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
