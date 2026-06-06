import { createFileRoute, Link } from "@tanstack/react-router";
import { ResumePreviewContent } from "@/components/portfolio/ResumePreview";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Lanka Durga" },
      { name: "description", content: "Resume preview for Lanka Durga, Software Developer." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <ResumePreviewContent />
      <footer className="shrink-0 border-t border-white/10 px-5 py-4 text-center sm:px-6">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>
      </footer>
    </div>
  );
}
