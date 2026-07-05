import { type ReactNode } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DOWNLOAD_NAME, RESUME_PATH, RESUME_PREVIEW_ROUTE } from "@/lib/resume";

export function ResumePreviewContent() {
  return (
    <>
      <header className="shrink-0 border-b border-white/10 bg-card px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-lg font-semibold">Resume preview</h1>
              <p className="text-sm text-muted-foreground">
                Lanka Durga — review below or download a copy.
              </p>
            </div>
          </div>
          <a href={RESUME_PATH} download={RESUME_DOWNLOAD_NAME} className="inline-flex">
            <Button type="button" className="min-h-11 gap-2">
              <Download className="h-4 w-4" aria-hidden />
              Download PDF
            </Button>
          </a>
        </div>
      </header>

      <div
        className="relative min-h-[60vh] flex-1 bg-[#525659] flex items-center justify-center"
        spellCheck={false}
      >
        <object
          data={RESUME_PATH}
          type="application/pdf"
          className="w-full h-[85vh] max-w-5xl mx-auto shadow-2xl"
          spellCheck={false}
        >
          <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
            <p>Your browser does not support PDFs.</p>
            <a
              href={RESUME_PATH}
              download={RESUME_DOWNLOAD_NAME}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
          </div>
        </object>
      </div>
    </>
  );
}

export function ResumeTrigger({
  children,
  className,
  onActivate,
}: {
  children: ReactNode;
  className?: string;
  onActivate?: () => void;
}) {
  return (
    <a
      href={RESUME_PREVIEW_ROUTE}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onActivate}
      className={className}
    >
      {children}
    </a>
  );
}
