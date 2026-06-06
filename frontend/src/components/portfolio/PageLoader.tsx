import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_MS = 2000;
const EXIT_MS = 350;

export function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visibleFor = reducedMotion ? 500 : LOADER_MS;

    const hideTimer = window.setTimeout(() => setShow(false), visibleFor);
    return () => window.clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            <svg
              className="loader-ring absolute inset-0 h-full w-full"
              viewBox="0 0 120 120"
              aria-hidden
            >
              <defs>
                <linearGradient id="loader-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="3"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#loader-ring-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="120 210"
              />
            </svg>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-xl font-black text-white shadow-[0_0_40px_-6px_rgba(37,99,235,0.5)] sm:h-16 sm:w-16 sm:text-2xl"
            >
              LD
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
