import { useEffect, useRef, useState, type ReactNode } from "react";
import { renderAsync } from "docx-preview";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DOWNLOAD_NAME, RESUME_PATH, RESUME_PREVIEW_ROUTE } from "@/lib/resume";

export function ResumePreviewContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setLoading(true);
    setError(false);
    container.innerHTML = "";

    fetch(encodeURI(RESUME_PATH))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load resume");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled || !containerRef.current) return;
        return renderAsync(blob, containerRef.current, undefined, {
          className: "docx-preview-wrapper",
          inWrapper: true,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
              Download DOCX
            </Button>
          </a>
        </div>
      </header>

      <div className="relative min-h-[60vh] flex-1 overflow-y-auto bg-[#f4f6f9]">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#f4f6f9]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
            <p className="text-sm text-slate-600">Loading preview…</p>
          </div>
        )}
        {error && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-slate-600">
              Preview couldn&apos;t be loaded. You can still download the resume file.
            </p>
            <a
              href={RESUME_PATH}
              download={RESUME_DOWNLOAD_NAME}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
          </div>
        )}
        <div
          ref={containerRef}
          className="docx-preview-container mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-8"
        />
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
