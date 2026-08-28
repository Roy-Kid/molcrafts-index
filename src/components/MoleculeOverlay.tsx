import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import aspirinMolecule from "@/assets/molecules/aspirin.webp";
import caffeineMolecule from "@/assets/molecules/caffeine.webp";
import dopamineMolecule from "@/assets/molecules/dopamine.webp";
import ibuprofenMolecule from "@/assets/molecules/ibuprofen.webp";
import nicotineMolecule from "@/assets/molecules/nicotine.webp";
import quinineMolecule from "@/assets/molecules/quinine.webp";
import { MOLECULE_IMAGE_GLOW } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";

const MOLECULES = [
  aspirinMolecule,
  caffeineMolecule,
  dopamineMolecule,
  ibuprofenMolecule,
  nicotineMolecule,
  quinineMolecule,
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface SlotState {
  visible: boolean;
  uid: number;
  imgIdx: number;
  top: string;
  left: string;
}

function useSlot(
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  showMs: number,
  periodMs: number,
  initialDelayMs: number,
  excludeImgIdxRef?: { current: number },
): SlotState {
  const [state, setState] = useState<SlotState>({
    visible: false,
    uid: 0,
    imgIdx: 0,
    top: "50%",
    left: "10%",
  });

  // Track the hide-timer so it can be cleared on unmount
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    const top = `${rand(yMin, yMax).toFixed(1)}%`;
    const left = `${rand(xMin, xMax).toFixed(1)}%`;
    const exclude = excludeImgIdxRef?.current ?? -1;
    let imgIdx: number;
    if (exclude >= 0 && MOLECULES.length > 1) {
      imgIdx = Math.floor(Math.random() * (MOLECULES.length - 1));
      if (imgIdx >= exclude) imgIdx += 1;
    } else {
      imgIdx = Math.floor(Math.random() * MOLECULES.length);
    }
    setState((s) => ({ visible: true, uid: s.uid + 1, imgIdx, top, left }));
    if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setState((s) => ({ ...s, visible: false })), showMs);
  }, [xMin, xMax, yMin, yMax, showMs, excludeImgIdxRef]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const initTimer = setTimeout(() => {
      show();
      intervalId = setInterval(show, periodMs);
    }, initialDelayMs);

    return () => {
      clearTimeout(initTimer);
      if (intervalId !== null) clearInterval(intervalId);
      if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
    };
  }, [show, periodMs, initialDelayMs]);

  return state;
}

type Placement = "edges" | "spotlight";

interface PlacementPreset {
  range: [number, number, number, number];
  sizeClass: string;
  showMs: number;
  periodMs: number;
  initialDelayMs: number;
}

const PLACEMENTS: Record<Placement, { left: PlacementPreset; right: PlacementPreset }> = {
  edges: {
    left: {
      range: [3, 16, 15, 78],
      sizeClass: "w-36 h-36 md:w-44 md:h-44",
      showMs: 4500,
      periodMs: 7500,
      initialDelayMs: 700,
    },
    right: {
      range: [81, 93, 15, 78],
      sizeClass: "w-40 h-40 md:w-52 md:h-52",
      showMs: 4500,
      periodMs: 8500,
      initialDelayMs: 2800,
    },
  },
  spotlight: {
    left: {
      range: [10, 22, 18, 80],
      sizeClass: "w-48 h-48 md:w-60 md:h-60",
      showMs: 5500,
      periodMs: 7000,
      initialDelayMs: 500,
    },
    right: {
      range: [78, 90, 18, 80],
      sizeClass: "w-52 h-52 md:w-64 md:h-64",
      showMs: 5500,
      periodMs: 7500,
      initialDelayMs: 2500,
    },
  },
};

const LEFT_MOTION = {
  initial: { opacity: 0, scale: 0.82, y: 0, rotate: -8 },
  animate: {
    opacity: 0.82,
    scale: 1,
    y: [0, -22, 0, 22, 0],
    rotate: [-8, 8],
  },
  transition: {
    opacity: { duration: 1, ease: "easeOut" as const },
    scale: { duration: 1, ease: "easeOut" as const },
    y: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const },
    rotate: {
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    transition: { duration: 1, ease: "easeIn" as const },
  },
};

const RIGHT_MOTION = {
  initial: { opacity: 0, scale: 0.82, y: 0, rotate: 6 },
  animate: {
    opacity: 0.88,
    scale: 1,
    y: [0, 24, 0, -24, 0],
    rotate: [6, -6],
  },
  transition: {
    opacity: { duration: 1, ease: "easeOut" as const },
    scale: { duration: 1, ease: "easeOut" as const },
    y: { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const },
    rotate: {
      duration: 11,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    transition: { duration: 1, ease: "easeIn" as const },
  },
};

const HINT_CLASSES =
  "absolute left-1/2 top-full -translate-x-1/2 mt-3 whitespace-nowrap text-xs md:text-sm font-outfit tracking-[0.2em] uppercase text-zinc-300/85 group-hover:text-fuchsia-300 transition-colors";

interface MoleculeOverlayProps {
  href?: string;
  hintLabel?: string;
  placement?: Placement;
}

export const MoleculeOverlay = ({
  href,
  hintLabel = "Open live demo ↗",
  placement = "edges",
}: MoleculeOverlayProps = {}) => {
  const preset = PLACEMENTS[placement];
  const [lx1, lx2, ly1, ly2] = preset.left.range;
  const [rx1, rx2, ry1, ry2] = preset.right.range;

  const leftImgIdxRef = useRef<number>(-1);
  const rightImgIdxRef = useRef<number>(-1);

  const leftSlot = useSlot(
    lx1,
    lx2,
    ly1,
    ly2,
    preset.left.showMs,
    preset.left.periodMs,
    preset.left.initialDelayMs,
    rightImgIdxRef,
  );
  const rightSlot = useSlot(
    rx1,
    rx2,
    ry1,
    ry2,
    preset.right.showMs,
    preset.right.periodMs,
    preset.right.initialDelayMs,
    leftImgIdxRef,
  );

  leftImgIdxRef.current = leftSlot.visible ? leftSlot.imgIdx : -1;
  rightImgIdxRef.current = rightSlot.visible ? rightSlot.imgIdx : -1;

  const interactive = Boolean(href);
  const positionStyle = (slot: SlotState) => ({
    top: slot.top,
    left: slot.left,
    transform: "translate(-50%, -50%)",
  });

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", interactive && "z-20")}
    >
      <AnimatePresence>
        {leftSlot.visible &&
          (interactive ? (
            <motion.a
              key={`left-${leftSlot.uid}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hintLabel}
              className={cn(
                "absolute z-20 pointer-events-auto select-none cursor-pointer group",
                preset.left.sizeClass,
              )}
              style={positionStyle(leftSlot)}
              {...LEFT_MOTION}
            >
              <img
                src={MOLECULES[leftSlot.imgIdx]}
                alt="Molecule"
                className={cn(
                  MOLECULE_IMAGE_GLOW,
                  "h-full w-full object-contain transition-transform duration-300 group-hover:scale-105",
                )}
                draggable="false"
              />
              <span className={HINT_CLASSES}>{hintLabel}</span>
            </motion.a>
          ) : (
            <motion.img
              key={`left-${leftSlot.uid}`}
              src={MOLECULES[leftSlot.imgIdx]}
              alt="Molecule"
              className={cn(
                MOLECULE_IMAGE_GLOW,
                "pointer-events-none absolute z-10 object-contain",
                preset.left.sizeClass,
              )}
              style={positionStyle(leftSlot)}
              {...LEFT_MOTION}
              draggable="false"
            />
          ))}
        {rightSlot.visible &&
          (interactive ? (
            <motion.a
              key={`right-${rightSlot.uid}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hintLabel}
              className={cn(
                "absolute z-20 pointer-events-auto select-none cursor-pointer group",
                preset.right.sizeClass,
              )}
              style={positionStyle(rightSlot)}
              {...RIGHT_MOTION}
            >
              <img
                src={MOLECULES[rightSlot.imgIdx]}
                alt="Molecule"
                className={cn(
                  MOLECULE_IMAGE_GLOW,
                  "h-full w-full object-contain transition-transform duration-300 group-hover:scale-105",
                )}
                draggable="false"
              />
              <span className={HINT_CLASSES}>{hintLabel}</span>
            </motion.a>
          ) : (
            <motion.img
              key={`right-${rightSlot.uid}`}
              src={MOLECULES[rightSlot.imgIdx]}
              alt="Molecule"
              className={cn(
                MOLECULE_IMAGE_GLOW,
                "pointer-events-none absolute z-10 object-contain",
                preset.right.sizeClass,
              )}
              style={positionStyle(rightSlot)}
              {...RIGHT_MOTION}
              draggable="false"
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default MoleculeOverlay;
