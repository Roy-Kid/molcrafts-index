import { homeReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings without a variant container. */
  delay?: number;
  className?: string;
}

/**
 * Fades a block in the first time it reaches the viewport, and never again.
 *
 * The pager used to animate a whole screen on arrival, which only worked because
 * arrival was a discrete event. With continuous scroll the reader can stop
 * anywhere, so re-triggering on every pass would make the page twitch.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={cn("min-w-0", className)}
      variants={homeReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
