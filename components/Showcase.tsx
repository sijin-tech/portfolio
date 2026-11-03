"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/Motion";
import type { Project } from "@/content/profile";
import { ChordianMock, EnvisionMock, MiltaMock, Speech4allMock } from "./Mockups";

type Layout = "center" | "text-left" | "text-right" | "tilt";

const MOCKS: Record<string, { Mock: () => React.ReactNode; layout: Layout }> = {
  chordian: { Mock: ChordianMock, layout: "center" },
  milta: { Mock: MiltaMock, layout: "text-left" },
  envision: { Mock: EnvisionMock, layout: "text-right" },
  speech4all: { Mock: Speech4allMock, layout: "tilt" },
};

const Caption = () => <p className="mt-4 text-center text-xs text-neutral-600">Illustrative mockup with sample data</p>;

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-sm text-neutral-300">{s}</li>)}
    </ul>
  );
}

function Title({ project, index, align = "center" }: { project: Project; index: number; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-lg font-medium text-neutral-400">Introducing · {String(index + 1).padStart(2, "0")} · {project.domain}</p>
      <h2 className={`grad-text mt-2 font-extrabold leading-[0.9] tracking-[-0.05em] ${align === "center" ? "text-[clamp(4rem,14vw,11rem)]" : "text-[clamp(3.5rem,8vw,6.5rem)]"}`}>
        {project.name}
      </h2>
      <p className="mt-4 text-[clamp(1.3rem,2.6vw,2rem)] font-semibold tracking-tight">{project.tagline}.</p>
    </div>
  );
}

function Points({ project, columns = false }: { project: Project; columns?: boolean }) {
  return (
    <div className={columns ? "grid gap-4 md:grid-cols-[2fr_1fr]" : "space-y-6"}>
      <div className={columns ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        {project.points.map((pt) => (
          <p key={pt} className={`text-lg leading-relaxed text-neutral-300 ${columns ? "rounded-3xl border border-white/10 bg-neutral-900/60 p-6" : "border-l-2 border-white/15 pl-4"}`}>{pt}</p>
        ))}
      </div>
      <div className={columns ? "rounded-3xl border border-white/10 bg-neutral-900/60 p-6" : ""}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">Under the hood</p>
        <Stack items={project.stack} />
      </div>
    </div>
  );
}

export function Showcase({ project, index, gradient }: { project: Project; index: number; gradient: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const tilt = useTransform(scrollYProgress, [0.2, 1], [28, 0]);
  const { Mock, layout } = MOCKS[project.slug];

  const glow = (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[100px]" style={{ background: gradient }} />
  );

  return (
    <section ref={ref} id={project.slug} className="relative isolate mx-auto max-w-6xl scroll-mt-16 px-4 py-32 sm:px-8" style={{ ["--g" as string]: gradient }}>
      {(layout === "center" || layout === "tilt") && (
        <>
          <motion.div style={{ scale, opacity }}><Title project={project} index={index} /></motion.div>
          <div className="relative mt-16" style={{ perspective: layout === "tilt" ? 1400 : undefined }}>
            {glow}
            {layout === "tilt" ? (
              <motion.div style={{ rotateX: tilt, transformOrigin: "50% 100%" }}><Mock /></motion.div>
            ) : (
              <Reveal><Mock /></Reveal>
            )}
            <Caption />
          </div>
          <div className="mt-14"><Reveal><Points project={project} columns /></Reveal></div>
        </>
      )}

      {(layout === "text-left" || layout === "text-right") && (
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className={layout === "text-right" ? "lg:order-2" : ""}>
            <Title project={project} index={index} align="left" />
            <div className="mt-10"><Points project={project} /></div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            {glow}
            <Mock />
            <Caption />
          </Reveal>
        </div>
      )}
    </section>
  );
}
