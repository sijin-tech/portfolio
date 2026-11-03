import { Glow, Reveal } from "@/components/Motion";
import { education, job, profile, projects, skills } from "@/content/profile";

export const gradients: Record<string, string> = {
  chordian: "linear-gradient(90deg, #a78bfa, #22d3ee)",
  milta: "linear-gradient(90deg, #fb923c, #f472b6)",
  envision: "linear-gradient(90deg, #a3e635, #2dd4bf)",
  speech4all: "linear-gradient(90deg, #38bdf8, #818cf8)",
};
export const heroGradient = "linear-gradient(90deg, #a78bfa, #22d3ee 40%, #f472b6 80%)";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="#top" className="font-semibold tracking-tight">{profile.name}</a>
        <nav className="hidden gap-7 text-sm text-neutral-400 md:flex">
          {projects.map((p) => <a key={p.slug} href={`#${p.slug}`} className="hover:text-white">{p.name}</a>)}
          <a href="#specs" className="hover:text-white">Specs</a>
        </nav>
        <a href="#contact" className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-neutral-200">Get in touch</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <Glow />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_70%)]" />
      <Reveal>
        <h1 className="font-display font-bold leading-[0.95] tracking-[-0.01em]">
          <span className="block text-[clamp(2.75rem,8vw,6.5rem)]">Hi, I&apos;m</span>
          <span className="block text-[clamp(3rem,9vw,7.5rem)] tracking-[0.02em]">SIJIN.</span>
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="grad-text mt-6 text-[clamp(1.8rem,5vw,3.75rem)] font-bold tracking-tight" style={{ ["--g" as string]: heroGradient }}>
          Full stack. Fully shipped.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          {profile.years} years building React and Next.js apps, serverless AWS backends, auth, payments and RAG-powered AI.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#chordian" className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200">See the work</a>
          <a href={profile.resume} target="_blank" rel="noopener" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">Résumé ↗</a>
        </div>
      </Reveal>
    </section>
  );
}

export function Stats() {
  return (
    <section className="mx-4 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 max-md:grid-cols-2 sm:mx-8 md:grid-cols-4 xl:mx-auto xl:max-w-6xl">
      {[
        [profile.years, "Years in production"],
        [String(projects.length), "Platforms shipped"],
        ["3", "Industries served"],
        ["2", "Payment gateways"],
      ].map(([n, l]) => (
        <div key={l} className="bg-[#050505] p-8 text-center">
          <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">{n}</p>
          <p className="mt-2 text-sm text-neutral-400">{l}</p>
        </div>
      ))}
    </section>
  );
}

export function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-32 sm:px-8">
      <Reveal>
        <p className="text-lg font-medium text-neutral-400">Built at</p>
        <h2 className="mt-2 text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          {job.company.replace(" Pvt. Ltd.", "")}.
        </h2>
        <p className="mt-4 text-2xl text-neutral-400">{job.title} · {job.start} – present · {job.industries.join(", ")}</p>
      </Reveal>
      <div className="mt-14 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {job.highlights.map((h, i) => (
          <Reveal key={h} delay={(i % 2) * 0.08}>
            <p className="flex gap-4 border-t border-white/10 pt-6 text-lg text-neutral-200">
              <span className="grad-text font-bold" style={{ ["--g" as string]: heroGradient }}>✓</span>{h}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Specs() {
  return (
    <section id="specs" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-8">
      <Reveal><h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Tech Specs</h2></Reveal>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {[...skills, { group: "Education", items: [education.degree, education.school, education.years] }].map((s) => (
          <Reveal key={s.group}>
            <div className="grid gap-3 py-8 md:grid-cols-[260px_1fr]">
              <h3 className="text-xl font-semibold">{s.group}</h3>
              <p className="text-lg leading-relaxed text-neutral-400">{s.items.join("  ·  ")}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden px-4 py-40 text-center">
      <Glow />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,#050505_65%)]" />
      <Reveal>
        <h2 className="grad-text mx-auto max-w-4xl text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]" style={{ ["--g" as string]: heroGradient }}>
          Let&apos;s ship what&apos;s next.
        </h2>
        <p className="mt-6 text-xl text-neutral-400">Open to full-stack, serverless and AI engineering work.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200">Email me</a>
          <a href={profile.linkedin} target="_blank" rel="noopener" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noopener" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">GitHub ↗</a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-4 py-8 text-sm text-neutral-500 sm:px-8">
      <span>© {profile.name}</span>
      <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
    </footer>
  );
}
