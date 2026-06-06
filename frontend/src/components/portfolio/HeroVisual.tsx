import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Code2,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Sparkles,
  Terminal,
} from "lucide-react";

const innerOrbit = [
  { label: "React", icon: Layers },
  { label: "Node", icon: Code2 },
  { label: "MongoDB", icon: Database },
] as const;

const outerOrbit = [
  { label: "TypeScript", icon: Terminal },
  { label: "Python", icon: Sparkles },
  { label: "AI Apps", icon: Brain },
  { label: "Java", icon: GitBranch },
] as const;

const activityLines = [
  { cmd: "git commit -m", msg: '"feat: ship portfolio v2"', status: "ok" },
  { cmd: "npm run build", msg: "✓ 2405 modules transformed", status: "ok" },
  { cmd: "deploy --prod", msg: "lankadurga.vercel.app", status: "live" },
  { cmd: "test --run", msg: "all suites passed", status: "ok" },
] as const;

function OrbitRing({
  items,
  radius,
  duration,
  reverse,
}: {
  items: readonly { label: string; icon: typeof Code2 }[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const spin = reverse ? -360 : 360;
  const orbitTransition = { duration, repeat: Infinity, ease: "linear" as const };

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
      animate={reduced ? undefined : { rotate: spin }}
      transition={orbitTransition}
      aria-hidden
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="absolute left-0 top-0"
            style={{
              transform: `rotate(${angle}deg) translateY(-${radius}px)`,
            }}
          >
            <motion.div
              animate={reduced ? undefined : { rotate: -spin }}
              transition={orbitTransition}
              className="-translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-card/90 px-2.5 py-1.5 shadow-[0_8px_32px_-8px_rgba(37,99,235,0.4)] backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary sm:h-7 sm:w-7">
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold text-foreground sm:text-xs">
                  {item.label}
                </span>
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

function ActivityTicker() {
  const [index, setIndex] = useState(0);
  const line = activityLines[index];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % activityLines.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="gradient-border relative overflow-hidden rounded-xl glass px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
          <Terminal className="h-3 w-3" aria-hidden />
        </span>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="min-w-0 flex-1 truncate"
        >
          <span className="text-accent-2">{line.cmd}</span>{" "}
          <span className="text-muted-foreground">{line.msg}</span>
        </motion.div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
            line.status === "live"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-primary/20 text-accent-2"
          }`}
        >
          {line.status}
        </span>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Orbital stage */}
      <div className="relative mx-auto aspect-square w-full max-w-[380px]">
        {/* Guide rings */}
        <svg
          className="absolute inset-[8%] h-[84%] w-[84%] text-primary/20"
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 8"
            opacity="0.6"
          />
          {!reduced && (
            <>
              <motion.circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="url(#hero-orbit-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="40 412"
                animate={{ strokeDashoffset: [0, -452] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="url(#hero-orbit-grad)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="24 554"
                animate={{ strokeDashoffset: [0, 578] }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          <defs>
            <linearGradient id="hero-orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        <OrbitRing items={innerOrbit} radius={88} duration={28} />
        <OrbitRing items={outerOrbit} radius={118} duration={42} reverse />

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative"
            animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-[28px] bg-primary/30 blur-2xl" aria-hidden />
            <div className="gradient-border relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[28px] bg-card/95 shadow-[0_0_80px_-20px_rgba(37,99,235,0.55)] backdrop-blur-xl sm:h-[132px] sm:w-[132px]">
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
                aria-hidden
              >
                <div className="hero-scanline absolute inset-x-0 h-8 bg-gradient-to-b from-primary/25 to-transparent" />
              </div>
              <span className="relative text-3xl font-black tracking-tighter text-gradient sm:text-4xl">
                LD
              </span>
              <span className="relative mt-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                <Rocket className="h-3 w-3 text-primary" aria-hidden />
                build hub
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating metrics */}
        <motion.div
          className="absolute -left-1 top-[12%] z-20 sm:-left-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="rounded-2xl border border-white/10 bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md sm:px-3.5 sm:py-2.5">
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              SGPA
            </p>
            <p className="text-xl font-bold text-gradient-accent sm:text-2xl">9.2</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-1 top-[22%] z-20 sm:-right-2"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                Focus
              </p>
              <p className="text-xs font-semibold text-foreground">AI + Web</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[18%] right-0 z-20 sm:right-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="rounded-2xl border border-primary/25 bg-primary/10 px-3 py-2 backdrop-blur-md">
            <p className="text-[9px] font-medium text-accent-2">📍 Kakinada, AP</p>
            <p className="text-[10px] font-semibold text-foreground">MERN • Open to work</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 -mt-2 sm:-mt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <ActivityTicker />
      </motion.div>

      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent-2/25 blur-3xl sm:h-36 sm:w-36"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-6 h-24 w-24 rounded-full bg-primary/35 blur-3xl sm:h-32 sm:w-32"
        aria-hidden
      />
    </div>
  );
}
