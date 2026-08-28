/**
 * Geometry of the capabilities screen's knowledge thread.
 *
 * The section measures its stations and this module turns those boxes into an
 * SVG path: a vertical line down each station's leading edge, joined to the
 * next by two exact quarter-circle fillets around a horizontal run centred in
 * the row gap. Every radius is half the measured gap, so the shape is derived
 * from the layout rather than drawn by eye — resize, locale, and text wrap all
 * land on the same construction.
 */

/** One station's box, in the pixel space the path is drawn in. */
export interface ThreadStation {
  /** Leading edge the line runs beside. */
  left: number;
  top: number;
  bottom: number;
}

export interface ThreadFrame {
  /** Horizontal distance between the line and a station's leading edge. */
  inset: number;
  /** How far the line continues past the first and last station. */
  overshoot: number;
}

/** Path numbers stay readable: two decimals, no trailing float noise. */
function fmt(value: number): string {
  return String(Math.round(value * 100) / 100);
}

/**
 * The thread as one continuous SVG path through the stations, in order.
 *
 * Between two stations the fillet radius is half the vertical gap, clamped to
 * half the horizontal travel — so the two arcs and the run between them always
 * fit, and when the gap is the binding constraint the run sits exactly on the
 * gap's centreline. A single station degenerates to one vertical line; no
 * stations, to an empty path.
 */
export function threadPath(stations: readonly ThreadStation[], frame: ThreadFrame): string {
  if (stations.length === 0) return "";
  const edge = (station: ThreadStation) => station.left - frame.inset;

  const first = stations[0];
  const last = stations[stations.length - 1];
  const parts = [`M ${fmt(edge(first))} ${fmt(first.top - frame.overshoot)}`];

  for (let i = 0; i < stations.length - 1; i += 1) {
    const from = stations[i];
    const to = stations[i + 1];
    const xa = edge(from);
    const xb = edge(to);
    const gap = to.top - from.bottom;
    const dx = xb - xa;
    const r = Math.max(Math.min(gap / 2, Math.abs(dx) / 2), 0);

    parts.push(`L ${fmt(xa)} ${fmt(from.bottom)}`);
    if (r > 0) {
      /* Turn direction follows the travel: stepping right sweeps 0 then 1,
         stepping left mirrors both. */
      const s = dx >= 0 ? 1 : -1;
      const [out, back] = s === 1 ? [0, 1] : [1, 0];
      parts.push(`A ${fmt(r)} ${fmt(r)} 0 0 ${out} ${fmt(xa + s * r)} ${fmt(from.bottom + r)}`);
      parts.push(`L ${fmt(xb - s * r)} ${fmt(from.bottom + r)}`);
      parts.push(`A ${fmt(r)} ${fmt(r)} 0 0 ${back} ${fmt(xb)} ${fmt(from.bottom + 2 * r)}`);
    }
  }

  parts.push(`L ${fmt(edge(last))} ${fmt(last.bottom + frame.overshoot)}`);
  return parts.join(" ");
}
