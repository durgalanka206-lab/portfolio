import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/projects/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lanka Durga — Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Lanka Durga — a full-stack MERN and AI applications developer building modern web products.",
      },
      { property: "og:title", content: "Lanka Durga — Software Developer" },
      {
        property: "og:description",
        content:
          "Full-stack & AI applications developer. Selected projects, skills, and education.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-clip bg-background pb-[env(safe-area-inset-bottom)] text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
