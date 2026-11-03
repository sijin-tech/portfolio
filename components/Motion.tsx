"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Glow() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
      style={{ background: "conic-gradient(from 0deg, #a78bfa, #22d3ee, #f472b6, #a3e635, #a78bfa)" }}
      animate={{ rotate: 360, scale: [1, 1.08, 1] }}
      transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity } }}
    />
  );
}
