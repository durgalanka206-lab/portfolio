import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ResumeTrigger } from "./ResumePreview";

function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Projects Built", value: 3, suffix: "+" },
  { label: "Technical Skills", value: 20, suffix: "+" },
  { label: "Certifications", value: 6, suffix: "" },
  { label: "SGPA", value: 9.2, suffix: "", decimals: 1 },
];

const highlights = [
  "BCA Final Year Student",
  "Software Developer",
  "Building Full-Stack Applications",
  "AI Integrated Systems",
];

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="Engineer in the making"
          description="A focused, curious developer combining web fundamentals with modern AI tooling to ship real products."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="gradient-border relative rounded-2xl glass p-5 sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <h3 className="text-2xl font-semibold tracking-tight">
              Hi, I'm <span className="text-gradient-accent">Durga</span>.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I'm a Bachelor of Computer Applications final-year student passionate about building
              thoughtful, production-grade web applications. My work blends a MERN-stack foundation
              with AI integrations — from resume parsing to OCR-based skill extraction — to solve
              real problems end-to-end.
            </p>
            <div className="mt-6 flex">
              <ResumeTrigger className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition-all touch-manipulation active:border-primary/40 active:bg-primary/10 sm:w-auto sm:justify-start sm:hover:border-primary/40 sm:hover:bg-primary/10">
                View Resume
              </ResumeTrigger>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="gradient-border group relative overflow-hidden rounded-2xl glass p-5 transition-all sm:rounded-3xl sm:p-6 sm:hover:-translate-y-1"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <p className="relative text-4xl font-bold text-gradient-accent sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="relative mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
