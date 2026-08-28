/**
 * Google Analytics 4 for a client-side-routed app.
 *
 * The loader script is injected at build time in `rsbuild.config.ts`, and only when
 * `PUBLIC_GA_ID` is set — so local dev and any build without the variable ship no tracker
 * at all. `gtag('config')` there passes `send_page_view: false`, because this app changes
 * routes without a document load: GA's automatic page_view would fire once and then miss
 * every navigation after it. Views are sent from here instead, including the first.
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export const GA_ID: string | undefined = import.meta.env.PUBLIC_GA_ID;

export const trackPageView = (path: string) => {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
