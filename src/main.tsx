import { ThemeProvider } from "@/components/theme-provider.tsx";
import { FORCE_FULL_MOTION, FRAMER_REDUCED_MOTION } from "@/lib/animations";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { MotionConfig } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
/* Locally bundled fonts replace the former Google Fonts request. The homepage
   brand curtain uses Geist Variable; established product-page faces remain. */
import "@fontsource-variable/geist/wght.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/400-italic.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./styles/tailwind.css";

/* Pin before first paint so CSS reduced-motion branches never win a frame. */
document.documentElement.classList.toggle("force-full-motion", FORCE_FULL_MOTION);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MotionConfig reducedMotion={FRAMER_REDUCED_MOTION}>
        <ThemeProvider>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </MotionConfig>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
