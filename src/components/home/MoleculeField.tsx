import { prefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Discrete molecular atmosphere — real small molecules (intra-molecule bonds only).
 * No global network graph / long-range mesh lines.
 */

interface Atom {
  x: number;
  y: number;
  z: number;
  /** 0 forest · 1 cyan · 2 sand */
  kind: 0 | 1 | 2;
  r: number;
}

interface MoleculeTemplate {
  atoms: Atom[];
  bonds: [number, number][];
}

interface Instance {
  template: number;
  x: number;
  y: number;
  scale: number;
  rot: number;
  rotSpeed: number;
  phase: number;
  drift: number;
}

interface Palette {
  forest: [number, number, number];
  cyan: [number, number, number];
  spark: [number, number, number];
  sand: [number, number, number];
  isDark: boolean;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Parses a hex token value. Returns null rather than a literal brand colour so
 * this file never becomes a second source of truth for the palette — the tokens
 * in `tailwind.css` / `brand-tokens.css` are the only place a colour is written.
 */
function hexRgb(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function hslChannelsToRgb(channels: string): [number, number, number] | null {
  const parts = channels.trim().split(/\s+/);
  if (parts.length < 3) return null;
  const h = Number.parseFloat(parts[0]);
  const s = Number.parseFloat(parts[1].replace("%", "")) / 100;
  const l = Number.parseFloat(parts[2].replace("%", "")) / 100;
  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c);
  };
  return [f(0), f(8), f(4)];
}

/**
 * Reads the canvas palette straight off the design tokens. Returns null until the
 * stylesheet has applied, so the field simply does not paint rather than inventing
 * colours of its own.
 */
function readPalette(): Palette | null {
  const root = getComputedStyle(document.documentElement);
  const forest = hslChannelsToRgb(root.getPropertyValue("--molcrafts-forest-hsl"));
  const cyan = hexRgb(root.getPropertyValue("--brand-primary-from"));
  const spark = hexRgb(root.getPropertyValue("--molcrafts-cyan-spark-soft"));
  const sand = hexRgb(root.getPropertyValue("--molcrafts-sand"));
  if (!forest || !cyan || !spark || !sand) return null;
  return {
    forest,
    cyan,
    spark,
    sand,
    isDark: document.documentElement.classList.contains("dark"),
  };
}

function rgba(rgb: [number, number, number], a: number) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
}

/** Benzene ring */
const BENZENE: MoleculeTemplate = (() => {
  const atoms: Atom[] = [];
  const bonds: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    atoms.push({ x: Math.cos(a), y: Math.sin(a), z: 0, kind: i % 2 === 0 ? 0 : 1, r: 0.22 });
    bonds.push([i, (i + 1) % 6]);
  }
  return { atoms, bonds };
})();

/** Caffeine-like fused heterocycle (simplified planar) */
const CAFFEINE: MoleculeTemplate = {
  atoms: [
    { x: 0, y: 0, z: 0, kind: 0, r: 0.24 },
    { x: 0.9, y: 0.5, z: 0.1, kind: 1, r: 0.2 },
    { x: 0.9, y: -0.5, z: -0.1, kind: 0, r: 0.2 },
    { x: 1.8, y: 0, z: 0, kind: 2, r: 0.18 },
    { x: -0.7, y: 0.8, z: 0.15, kind: 0, r: 0.2 },
    { x: -0.7, y: -0.8, z: -0.1, kind: 1, r: 0.2 },
    { x: -1.5, y: 0, z: 0, kind: 0, r: 0.22 },
    { x: -2.3, y: 0.6, z: 0.1, kind: 2, r: 0.16 },
    { x: -2.3, y: -0.6, z: -0.05, kind: 1, r: 0.16 },
    { x: 0.3, y: 1.4, z: 0.2, kind: 0, r: 0.18 },
    { x: 1.2, y: 1.5, z: 0.15, kind: 1, r: 0.17 },
    { x: -0.2, y: 2.1, z: 0.25, kind: 2, r: 0.15 },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [0, 4],
    [0, 5],
    [4, 6],
    [5, 6],
    [6, 7],
    [6, 8],
    [4, 9],
    [9, 10],
    [9, 11],
    [1, 10],
  ],
};

/** Linear-ish chain (peptide-ish fragment) */
const CHAIN: MoleculeTemplate = {
  atoms: [
    { x: -1.6, y: 0.1, z: 0, kind: 0, r: 0.2 },
    { x: -0.8, y: -0.2, z: 0.1, kind: 1, r: 0.18 },
    { x: 0, y: 0.15, z: -0.1, kind: 0, r: 0.2 },
    { x: 0.8, y: -0.15, z: 0.05, kind: 2, r: 0.17 },
    { x: 1.6, y: 0.2, z: 0, kind: 0, r: 0.2 },
    { x: -0.8, y: 0.7, z: 0.2, kind: 1, r: 0.14 },
    { x: 0.8, y: 0.65, z: -0.15, kind: 0, r: 0.14 },
  ],
  bonds: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 5],
    [3, 6],
  ],
};

/** Water-like triangle cluster */
const TRIAD: MoleculeTemplate = {
  atoms: [
    { x: 0, y: 0, z: 0, kind: 1, r: 0.26 },
    { x: 0.7, y: 0.55, z: 0.1, kind: 0, r: 0.16 },
    { x: -0.65, y: 0.5, z: -0.1, kind: 0, r: 0.16 },
  ],
  bonds: [
    [0, 1],
    [0, 2],
  ],
};

/** Compact tetrahedral-ish fragment */
const TETRA: MoleculeTemplate = {
  atoms: [
    { x: 0, y: 0, z: 0, kind: 0, r: 0.24 },
    { x: 0.75, y: 0.55, z: 0.2, kind: 1, r: 0.18 },
    { x: -0.7, y: 0.5, z: 0.15, kind: 2, r: 0.17 },
    { x: 0.1, y: -0.75, z: 0.25, kind: 0, r: 0.18 },
    { x: 0, y: 0.1, z: -0.85, kind: 1, r: 0.16 },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
};

const TEMPLATES: MoleculeTemplate[] = [BENZENE, CAFFEINE, CHAIN, TRIAD, TETRA];

function project(
  ax: number,
  ay: number,
  az: number,
  rotY: number,
  rotX: number,
  scale: number,
  cx: number,
  cy: number,
): { x: number; y: number; z: number } {
  // rotY then rotX
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = ax * cosY + az * sinY;
  const z1 = -ax * sinY + az * cosY;
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = ay * cosX - z1 * sinX;
  const z2 = ay * sinX + z1 * cosX;
  return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2 };
}

interface MoleculeFieldProps {
  intensity?: number;
  className?: string;
  interactive?: boolean;
}

export function MoleculeField({
  intensity = 1,
  className,
  interactive = true,
}: MoleculeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.42, active: false });
  const reducedRef = useRef(false);
  const paletteRef = useRef<Palette | null>(readPalette());
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = prefersReducedMotion();
    const onMq = () => {
      reducedRef.current = prefersReducedMotion();
    };
    mq.addEventListener("change", onMq);

    const refreshPalette = () => {
      paletteRef.current = readPalette();
    };
    refreshPalette();
    const observer = new MutationObserver(refreshPalette);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mq.removeEventListener("change", onMq);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: e.clientX / Math.max(1, window.innerWidth),
        y: e.clientY / Math.max(1, window.innerHeight),
        active: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    /*
     * The field covers the viewport and never leaves it, so `document.hidden` is the
     * only thing that can make it invisible. An earlier rect-based off-screen gate
     * dated from when each section owned a field; under a single fixed layer its
     * condition was always true, so it only cost a layout read per frame.
     */
    let pageVisible = !document.hidden;
    let running = false;

    const t0 = performance.now();
    const instances: Instance[] = [];

    /*
     * Per-atom glow was a fresh `createRadialGradient` plus two colour strings on
     * every atom of every frame — roughly a hundred gradient objects a frame, and
     * the bulk of this loop's garbage. The falloff only depends on the atom's
     * colour, so it is baked once per colour and stamped with `drawImage`;
     * per-atom depth is applied with `globalAlpha` instead.
     */
    const GLOW_SPRITE_PX = 64;
    const glowSprites = new Map<string, HTMLCanvasElement>();
    const glowSprite = (rgb: [number, number, number]) => {
      const key = `${rgb[0]},${rgb[1]},${rgb[2]}`;
      const cached = glowSprites.get(key);
      if (cached) return cached;
      const sprite = document.createElement("canvas");
      sprite.width = GLOW_SPRITE_PX;
      sprite.height = GLOW_SPRITE_PX;
      const sctx = sprite.getContext("2d");
      if (sctx) {
        const mid = GLOW_SPRITE_PX / 2;
        const grad = sctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
        grad.addColorStop(0, rgba(rgb, 1));
        grad.addColorStop(1, rgba(rgb, 0));
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, GLOW_SPRITE_PX, GLOW_SPRITE_PX);
      }
      glowSprites.set(key, sprite);
      return sprite;
    };

    /* Reused across frames so the draw loop allocates no arrays of its own. */
    type DrawnInstance = {
      inst: Instance;
      rotY: number;
      rotX: number;
      cx: number;
      cy: number;
      depth: number;
    };
    const drawn: DrawnInstance[] = [];
    const projected: ReturnType<typeof project>[] = [];
    const order: number[] = [];

    const seed = () => {
      instances.length = 0;
      const count = Math.min(14, Math.floor((w * h) / 90000) + 7);
      for (let i = 0; i < count; i++) {
        instances.push({
          template: i % TEMPLATES.length,
          x: 0.08 + Math.random() * 0.84,
          y: 0.12 + Math.random() * 0.76,
          scale: 18 + Math.random() * 28,
          rot: Math.random() * Math.PI * 2,
          // Noticeable spin — was too slow to read as “rotating molecules”.
          rotSpeed: (0.22 + Math.random() * 0.35) * (Math.random() > 0.5 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          drift: 0.55 + Math.random() * 1.1,
        });
      }
    };

    /*
     * Measured from the viewport, never from the parent. This layer is
     * `position: fixed`, so any ancestor carrying a CSS transform becomes its
     * containing block — the page-entrance transform in `App.tsx` does exactly that
     * while mounting, which sized the backing store to the full document height and
     * left ~8x of the painting permanently outside the visible band.
     */
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    /*
     * The field is a slow drift behind text, and it is the page's only permanent
     * per-frame cost — it can never be gated on visibility because it is always
     * visible. Half the frames carry the motion just as well and cost half as much.
     */
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;

    const draw = (now: number) => {
      if (now - lastFrame < FRAME_MS) {
        if (running) raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      const elapsed = (now - t0) / 1000;
      const reduced = reducedRef.current;
      const pal = paletteRef.current;
      // Tokens not applied yet — skip the frame instead of painting invented colours.
      if (!pal) {
        if (running) raf = requestAnimationFrame(draw);
        return;
      }
      const inten = clamp(intensityRef.current, 0, 1);
      const ptr = pointerRef.current;

      ctx.clearRect(0, 0, w, h);

      // Soft stage well only — no lattice mesh
      const gx = w * (0.5 + (ptr.active && !reduced ? (ptr.x - 0.5) * 0.06 : 0));
      const gy = h * (0.4 + (ptr.active && !reduced ? (ptr.y - 0.5) * 0.05 : 0));
      const wellA = (pal.isDark ? 0.22 : 0.1) * inten;
      const well = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.55);
      well.addColorStop(0, rgba(pal.forest, wellA));
      well.addColorStop(0.55, rgba(pal.forest, wellA * 0.25));
      well.addColorStop(1, rgba(pal.forest, 0));
      ctx.fillStyle = well;
      ctx.fillRect(0, 0, w, h);

      const pullX = ptr.active && !reduced && interactive ? (ptr.x - 0.5) * 28 : 0;
      const pullY = ptr.active && !reduced && interactive ? (ptr.y - 0.5) * 22 : 0;

      // Depth-sort instances roughly by center z after rotation
      drawn.length = 0;
      for (let idx = 0; idx < instances.length; idx++) {
        const inst = instances[idx];
        if (!inst) continue;
        const rotY = reduced ? inst.rot : inst.rot + elapsed * inst.rotSpeed;
        const rotX = reduced ? 0.35 : 0.35 + Math.sin(elapsed * 0.55 + inst.phase) * 0.45;
        const bob = reduced ? 0 : Math.sin(elapsed * inst.drift + inst.phase) * 14;
        const cx = inst.x * w + pullX * (0.4 + (idx % 3) * 0.15);
        const cy = inst.y * h + bob + pullY * (0.35 + (idx % 2) * 0.12);
        drawn.push({ inst, rotY, rotX, cx, cy, depth: Math.sin(rotY) });
      }
      drawn.sort((a, b) => a.depth - b.depth);

      for (const { inst, rotY, rotX, cx, cy } of drawn) {
        const tmpl = TEMPLATES[inst.template];
        if (!tmpl) continue;
        const scale = inst.scale * (0.85 + inten * 0.25);
        projected.length = 0;
        for (const atom of tmpl.atoms) {
          projected.push(project(atom.x, atom.y, atom.z, rotY, rotX, scale, cx, cy));
        }

        // Intra-molecule bonds only
        ctx.save();
        ctx.lineWidth = pal.isDark ? 1.4 : 1.2;
        ctx.lineCap = "round";
        for (const [i, j] of tmpl.bonds) {
          const a = projected[i];
          const b = projected[j];
          const atomA = tmpl.atoms[i];
          const atomB = tmpl.atoms[j];
          if (!a || !b || !atomA || !atomB) continue;
          const depth = (a.z + b.z) * 0.5;
          const fade = clamp(0.55 + depth * 0.08, 0.28, 0.85) * inten;
          ctx.strokeStyle = rgba(pal.forest, fade * (pal.isDark ? 0.7 : 0.5));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.restore();

        // Atoms (painter's order by z)
        order.length = 0;
        for (let i = 0; i < projected.length; i++) order.push(i);
        order.sort((a, b) => (projected[a]?.z ?? 0) - (projected[b]?.z ?? 0));

        for (const i of order) {
          const p = projected[i];
          const atom = tmpl.atoms[i];
          if (!p || !atom) continue;
          const col = atom.kind === 1 ? pal.cyan : atom.kind === 2 ? pal.sand : pal.forest;
          const depthFade = clamp(0.55 + p.z * 0.1, 0.35, 1) * inten;
          const radius = atom.r * scale * 0.55;
          const pulse = reduced ? 1 : 0.92 + Math.sin(elapsed * 1.6 + inst.phase + i) * 0.08;

          const glowRadius = radius * 3.2;
          ctx.globalAlpha = depthFade * (pal.isDark ? 0.35 : 0.22);
          ctx.drawImage(
            glowSprite(col),
            p.x - glowRadius,
            p.y - glowRadius,
            glowRadius * 2,
            glowRadius * 2,
          );
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.fillStyle = rgba(col, depthFade * (pal.isDark ? 0.9 : 0.75));
          ctx.arc(p.x, p.y, radius * pulse, 0, Math.PI * 2);
          ctx.fill();

          // Specular highlight
          ctx.beginPath();
          ctx.fillStyle = rgba(pal.spark, depthFade * 0.35);
          ctx.arc(p.x - radius * 0.28, p.y - radius * 0.28, radius * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const onPageVisibility = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) cancelAnimationFrame(raf);
      else if (running) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onPageVisibility);

    resize();
    window.addEventListener("resize", resize);
    running = true;
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onPageVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [interactive]);

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
