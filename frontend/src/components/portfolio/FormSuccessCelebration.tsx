import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  angle: (i / 14) * 360 + i * 4,
  distance: 56 + (i % 3) * 18,
  size: 4 + (i % 2) * 2,
  delay: 0.35 + i * 0.04,
}));

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.55 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FormSuccessCelebration() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden py-10 text-center"
    >
      {/* Ambient glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-44 w-44 rounded-full bg-primary/35 blur-3xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-36 w-36 rounded-full bg-accent-2/25 blur-3xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1.1, 0.85, 1.1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Orbiting rings */}
      <motion.div
        aria-hidden
        className="absolute h-[7.5rem] w-[7.5rem] rounded-full border border-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{
          scale: { duration: 0.5 },
          opacity: { duration: 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        aria-hidden
        className="absolute h-[6.25rem] w-[6.25rem] rounded-full border-2 border-transparent border-t-primary border-r-primary/50"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -360 }}
        transition={{
          scale: { duration: 0.55, delay: 0.05 },
          opacity: { duration: 0.55, delay: 0.05 },
          rotate: { duration: 2.4, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Burst particles */}
      {PARTICLES.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.distance;
        const y = Math.sin(rad) * p.distance;
        return (
          <motion.span
            key={p.id}
            aria-hidden
            className="absolute rounded-full bg-primary"
            style={{ width: p.size, height: p.size }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ x, y, scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 0.85,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}

      {/* Animated checkmark */}
      <motion.div
        className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-primary shadow-[0_0_50px_-8px_rgba(37,99,235,0.5)]"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
      >
        <svg viewBox="0 0 52 52" className="h-11 w-11" fill="none" aria-hidden>
          <motion.circle
            cx="26"
            cy="26"
            r="22"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
          <motion.path
            d="M14 27l8 8 16-18"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-white/40"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.65, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
        />
      </motion.div>

      {/* Copy */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mt-10 max-w-sm px-2"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent-2"
        >
          Signal delivered
        </motion.p>
        <motion.h5 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-gradient">Message transmitted</span>
        </motion.h5>
        <motion.p variants={fadeUp} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. Your message has been sent successfully and I will get back to you soon.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-blue-500"
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-muted-foreground">
            Awaiting your reply channel
          </span>
        </motion.div>
      </motion.div>

      {/* Scan line */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-2/60 to-transparent"
        initial={{ top: "20%", opacity: 0 }}
        animate={{ top: ["18%", "82%", "18%"], opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </motion.div>
  );
}
