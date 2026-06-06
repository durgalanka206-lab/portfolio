import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ResumeTrigger } from "./ResumePreview";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      />
      <header
        className={`fixed left-1/2 top-3 z-50 w-[min(calc(100%-1rem),900px)] -translate-x-1/2 transition-all duration-500 sm:top-4 ${
          scrolled ? "sm:w-[min(96%,900px)]" : "sm:w-[min(96%,1100px)]"
        }`}
      >
        <nav
          className={`relative flex items-center justify-between gap-2 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
            scrolled ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="relative z-10 flex min-h-11 items-center gap-2 touch-manipulation"
            aria-label="Lanka Durga — home"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-[11px] font-black text-white sm:h-7 sm:w-7">
              LD
            </span>
            <span className="hidden truncate text-base font-bold tracking-tight text-gradient md:inline">
              Lanka Durga
            </span>
          </a>

          <a
            href="#top"
            className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold tracking-tight text-gradient touch-manipulation md:hidden"
          >
            Lanka Durga
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <ResumeTrigger className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
                Resume
              </ResumeTrigger>
            </li>
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-11 items-center rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.4)] touch-manipulation active:scale-[0.98] sm:inline-flex"
            >
              Let's talk
            </a>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground touch-manipulation active:scale-95 md:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[min(100vw-1rem,20rem)] flex-col border-white/10 bg-background/95 backdrop-blur-xl pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              >
                <SheetTitle className="text-left text-lg font-semibold">Menu</SheetTitle>
                <ul className="mt-6 flex flex-col gap-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={closeMenu}
                        className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-muted-foreground transition-colors active:bg-white/10 active:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <ResumeTrigger
                      onActivate={closeMenu}
                      className="flex min-h-12 w-full items-center rounded-xl px-4 text-left text-base font-medium text-muted-foreground transition-colors active:bg-white/10 active:text-foreground"
                    >
                      Resume
                    </ResumeTrigger>
                  </li>
                </ul>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-auto flex min-h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white touch-manipulation active:scale-[0.98]"
                >
                  Let's talk
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
