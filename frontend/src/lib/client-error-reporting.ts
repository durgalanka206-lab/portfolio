export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  if (import.meta.env.DEV) {
    console.error("[portfolio]", error, {
      route: window.location.pathname,
      ...context,
    });
  }
}
