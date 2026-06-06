import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ResumeTrigger } from "./ResumePreview";
import { HeroVisual } from "./HeroVisual";

const roles = ["Full-Stack Developer", "MERN Developer", "AI-Powered Applications"];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient-accent">
      {text}
      <span
        className="ml-0.5 inline-block w-[2px] -translate-y-0.5 animate-pulse bg-accent-2"
        style={{ height: "0.9em" }}
      />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-[max(6.5rem,env(safe-area-inset-top))] pb-12"
    >
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-20%] top-[10%] h-[240px] w-[240px] rounded-full bg-primary/25 blur-[80px] sm:left-[-10%] sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        <div className="absolute right-[-15%] top-[25%] h-[280px] w-[280px] rounded-full bg-accent-2/15 blur-[90px] sm:right-[-5%] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[10%] h-[220px] w-[220px] rounded-full bg-primary/15 blur-[80px] sm:left-[30%] sm:h-[380px] sm:w-[380px] sm:blur-[120px]" />
        <div className="absolute inset-0 bg-grid bg-radial-fade opacity-30 sm:opacity-40" />
      </div>

      <div className="container mx-auto grid max-w-7xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Available for opportunities
          </div>

          <h1 className="font-bold leading-[1.08] tracking-tight">
            <span className="hidden text-5xl text-gradient sm:text-6xl lg:block lg:text-7xl">
              Lanka Durga
            </span>
            <span className="block text-[2.35rem] text-gradient sm:text-6xl lg:mt-2 lg:text-3xl">
              Software Developer
            </span>
          </h1>

          <p className="mt-5 text-lg font-medium sm:mt-6 sm:text-2xl">
            I build <Typewriter />
          </p>

          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:mx-0">
            BCA final-year student crafting full-stack web applications and AI-integrated systems.
            Focused on clean code, thoughtful UX, and shipping real products with the MERN stack.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center lg:items-start">
            <a
              href="#projects"
              className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_50px_-15px_rgba(37,99,235,0.45)] touch-manipulation active:scale-[0.98] sm:w-auto sm:justify-start sm:hover:bg-primary/90"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <ResumeTrigger className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold backdrop-blur touch-manipulation active:scale-[0.98] sm:w-auto sm:hover:border-white/30 sm:hover:bg-white/10">
              View Resume
            </ResumeTrigger>
            <a
              href="#contact"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-muted-foreground touch-manipulation active:text-foreground sm:w-auto"
            >
              Contact Me →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-sm:mt-2"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
