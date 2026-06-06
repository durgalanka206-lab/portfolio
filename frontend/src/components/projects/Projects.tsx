import { SectionHeader } from "../portfolio/SectionHeader";
import { ProjectCard, type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    slug: "hirehub",
    num: "01",
    name: "HireHub",
    tagline: "AI-powered job portal with resume parsing, OCR, and intelligent job matching.",
    highlights: ["AI Resume Parsing", "OCR Processing", "Intelligent Candidate Matching"],
    year: "2025",
    tech: ["React", "Node.js", "MongoDB", "JWT", "AI"],
    mockup: "hirehub",
  },
  {
    slug: "sms",
    num: "02",
    name: "Student Management System",
    tagline: "Enterprise CRUD with MVC, Java Servlets, and SQL Server.",
    highlights: ["Student Analytics", "Attendance Tracking", "Academic Performance Dashboard"],
    year: "2024",
    tech: ["Java", "Servlets", "SQL Server"],
    mockup: "sms",
  },
  {
    slug: "portfolio",
    num: "03",
    name: "Personal Portfolio",
    tagline: "Animated portfolio with modern UI, motion, and responsive layout.",
    highlights: ["Cinematic Animations", "Interactive UI Elements", "Responsive Architecture"],
    year: "2025",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    mockup: "portfolio",
    thumbnail: "/portfolio.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 bg-[#050810]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-[#050810] to-[#050810] opacity-50 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="Explore my recent projects, view source code repositories, and try live demos."
        />

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
