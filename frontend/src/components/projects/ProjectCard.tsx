import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Globe, CheckCircle2 } from "lucide-react";
import { projectGithubHref, projectLiveHref } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { HireHubMock } from "./HireHubMock";
import { SmsMock } from "./SmsMock";

export type Project = {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  highlights: string[];
  year: string;
  tech: string[];
  mockup: "hirehub" | "sms" | "portfolio";
  thumbnail?: string;
};

function ProjectPreview({ project }: { project: Project }) {
  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail}
        alt={`${project.name} screenshot`}
        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    );
  }

  if (project.mockup === "hirehub") return <HireHubMock />;
  if (project.mockup === "sms") return <SmsMock />;
  return null;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const githubUrl = projectGithubHref(project.slug);
  const liveUrl = projectLiveHref(project.slug);

  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const content = (
    <>
      {/* SHORTER PREVIEW AREA: aspect-[2/1] instead of aspect-[16/10] */}
      <div
        className={`relative aspect-[2/1] sm:aspect-[21/9] overflow-hidden border-b border-white/8 bg-[#050810] ${project.thumbnail ? "" : "p-0"}`}
      >
        <ProjectPreview project={project} />
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-background/80 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground backdrop-blur-md shadow-lg z-20">
          <span className="font-mono text-primary">{project.num}</span>
          <span className="text-white/20">·</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* COMPACT CONTENT AREA: reduced padding and margins */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 relative z-20">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl text-slate-100">
          {project.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{project.tagline}</p>

        <div className="mt-4 flex flex-col gap-1.5">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary opacity-80" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/[0.05] hover:border-white/20"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2.5 border-t border-white/5 pt-4 mt-auto">
          {githubUrl ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 cursor-pointer border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 text-muted-foreground hover:text-foreground transition-all duration-300 h-8 text-[11px]"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                <span>Source Code</span>
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="flex-1 opacity-50 cursor-not-allowed border-white/5 bg-transparent text-muted-foreground/40 h-8 text-[11px]"
            >
              <Github className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              <span>Source Code</span>
            </Button>
          )}

          {liveUrl ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 cursor-pointer border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)] h-8 text-[11px]"
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                <span>Live Demo</span>
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="flex-1 opacity-50 cursor-not-allowed border-white/5 bg-transparent text-muted-foreground/40 h-8 text-[11px]"
            >
              <Globe className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              <span>Live Demo</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0f1c] text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_25px_50px_-20px_rgba(37,99,235,0.2)]";

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={cardClass}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />
      {content}
    </motion.div>
  );
}
