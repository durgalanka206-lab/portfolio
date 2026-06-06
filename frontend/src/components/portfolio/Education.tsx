import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    period: "2023 – 2026",
    title: "Bachelor of Computer Applications",
    school: "Ideal College of Arts and Science",
    score: "SGPA 9.2",
    tag: "Current",
  },
  {
    period: "2021 – 2023",
    title: "Intermediate — MPC",
    school: "MSN Junior College",
    score: "71%",
    tag: "",
  },
  {
    period: "2016 – 2021",
    title: "Secondary School (SSC)",
    school: "AMG (EM) High School",
    score: "71%",
    tag: "",
  },
];

function TimelineItem({
  it,
  index,
  total,
  progress,
  staticMotion,
}: {
  it: (typeof items)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  staticMotion?: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const op = useTransform(
    progress,
    [start - 0.05, start + 0.1, end, end + 0.15],
    [0.35, 1, 1, 0.4],
  );
  const scale = useTransform(progress, [start, start + 0.1], [0.98, 1]);
  const dotScale = useTransform(progress, [start, start + 0.05], [1, 1.4]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={{ opacity: staticMotion ? 1 : op, scale: staticMotion ? 1 : scale }}
      className="relative mb-10 w-full last:mb-0 md:mb-16"
    >
      {/* Connector Line */}
      <div
        className={`absolute top-[40px] h-px bg-white/10 ${
          isEven ? "left-4 md:left-auto md:right-1/2 w-8 md:w-12" : "left-4 md:left-1/2 w-8 md:w-12"
        }`}
      />

      {/* Timeline Node dot */}
      <motion.span
        style={{ scale: dotScale }}
        className="absolute left-4 md:left-1/2 top-[30px] grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-background -translate-x-1/2 z-10"
      >
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(37,99,235,0.5)]" />
      </motion.span>

      {/* Timeline Card */}
      <div
        className={`w-full pl-12 md:pl-0 md:w-[calc(50%-48px)] ${
          isEven ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
        }`}
      >
        <div className="gradient-border relative rounded-2xl glass p-5 sm:rounded-3xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {it.period}
            </span>
            {it.tag && (
              <span className="rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                {it.tag}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            {it.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{it.school}</p>
          <p className="mt-4 text-3xl font-bold text-gradient-accent">{it.score}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Education() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Education"
          title="Academic path"
          description="A consistent academic record from school through current undergraduate studies."
        />

        <div ref={ref} className="relative mt-20">
          {/* Track */}
          <div className="absolute bottom-0 left-4 md:left-1/2 top-0 w-0.5 bg-white/10 -translate-x-1/2" />
          {/* Progress fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent -translate-x-1/2 origin-top"
          />

          {/* Moving Pointer */}
          <motion.div
            style={{ top: lineHeight }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]"></span>
            </span>
          </motion.div>

          <div className="space-y-16">
            {items.map((it, i) => (
              <TimelineItem
                key={it.title}
                it={it}
                index={i}
                total={items.length}
                progress={scrollYProgress}
                staticMotion={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
