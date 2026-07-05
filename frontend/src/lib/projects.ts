/**
 * GitHub repository URLs — replace `#` with your exact repo links when ready.
 * Keys match each project's `slug` in Projects.tsx.
 */
export const PROJECT_GITHUB_URLS: Record<string, string> = {
  hirehub: "https://github.com/durgalanka206-lab/HireHub",
  sms: "https://github.com/durgalanka206-lab/Student-Management-System",
  portfolio: "https://github.com/durgalanka206-lab/portfolio",
};

export function projectGithubHref(slug: string): string | null {
  const url = PROJECT_GITHUB_URLS[slug];
  if (!url || url === "#") return null;
  return url;
}

/**
 * Live website URLs.
 * Keys match each project's `slug` in Projects.tsx.
 */
export const PROJECT_LIVE_URLS: Record<string, string> = {
  hirehub: "https://hirehubx.vercel.app",
  sms: "https://student-management-system-2026.vercel.app",
  portfolio: "https://lankadurga.vercel.app",
};

export function projectLiveHref(slug: string): string | null {
  const url = PROJECT_LIVE_URLS[slug];
  if (!url || url === "#") return null;
  return url;
}
