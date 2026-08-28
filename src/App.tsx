import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SEOSchema } from "./components/SEOSchema";
import { HomePage } from "./components/home/HomePage";
import { trackPageView } from "./lib/analytics";
import { packageGithubHref } from "./lib/packages";
import { pathProductSlug } from "./lib/routes";
import { PAGE_ATMOSPHERE } from "./lib/styleTokens";
import { cn } from "./lib/utils";
import { NotFound } from "./pages";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  /* Client-side routing means GA's automatic page_view fires once and misses every
     navigation after it, so each route change reports its own view. */
  useEffect(() => {
    trackPageView(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.href?.startsWith(window.location.origin) && !anchor.target) {
        const url = new URL(anchor.href);

        if (url.pathname === window.location.pathname && url.hash) {
          return;
        }

        e.preventDefault();
        const newPath = url.pathname + url.search;

        if (newPath !== currentPath + window.location.search) {
          window.history.pushState({}, "", newPath);
          setTimeout(() => {
            setCurrentPath(url.pathname);
            window.scrollTo(0, 0);
            setIsLoading(false);
          }, 350);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [currentPath]);

  const isHome = currentPath === "/" || currentPath === "";
  const retiredSlug = pathProductSlug(currentPath);

  useEffect(() => {
    if (!retiredSlug) return;
    window.location.replace(packageGithubHref(retiredSlug));
  }, [retiredSlug]);

  const renderContent = () => {
    if (isHome) {
      return <HomePage />;
    }

    if (retiredSlug) {
      return null;
    }

    return <NotFound />;
  };

  return (
    <>
      <SEOSchema path={currentPath} />
      {/* The homepage owns its own chrome: `HomeAtmosphere` replaces this background,
          `HomeFooter` replaces the shared footer, and `/` is dark regardless of theme. */}
      {!isHome && <div className={PAGE_ATMOSPHERE} aria-hidden="true" />}

      <AnimatePresence mode="wait">
        {!isLoading && (
          // The homepage enters on opacity alone. A translate would put a CSS
          // transform on this element, which makes it the containing block for the
          // `position: fixed` layers `HomeAtmosphere` mounts inside it — placing and
          // sizing the page's whole background against the document instead of the
          // viewport for the length of the entrance.
          <motion.div
            key={currentPath}
            initial={isHome ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isHome ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={isHome ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-1 flex flex-col",
              isHome ? "dark min-h-screen min-w-0 bg-background text-foreground" : "min-h-screen",
            )}
          >
            <Navbar />
            <main className={isHome ? "min-w-0 flex-1" : "flex-grow"}>{renderContent()}</main>
            {!isHome && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
