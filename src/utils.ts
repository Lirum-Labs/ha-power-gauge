export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export interface Palette {
  c1: string;
  c2: string;
  c3: string;
  mood: string;
}

export interface ColorStop extends Palette {
  /** Position along the 0..1 normalised gauge axis where this stop is fully expressed. */
  t: number;
}

function hex(h: string): [number, number, number] {
  const s = h.replace('#', '').trim();
  const v =
    s.length === 3
      ? s
          .split('')
          .map((c) => c + c)
          .join('')
      : s;
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

export function mix(h1: string, h2: string, t: number): string {
  const a = hex(h1);
  const b = hex(h2);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

/** Derive companion shades (mid + deep) from a single seed colour for the arc gradient. */
export function deriveShades(c1: string): { c1: string; c2: string; c3: string } {
  return {
    c1,
    c2: mix(c1, '#000000', 0.35),
    c3: mix(c1, '#000000', 0.7),
  };
}

/**
 * Linearly interpolate the palette across an ordered list of stops.
 *
 * Below the first stop or above the last stop, the colour clamps to the
 * boundary stop. Between two stops, c1/c2/c3 are mixed channel-wise so the
 * colour shifts smoothly rather than snapping at level boundaries.
 */
export function rampColor(pct: number, stops: ColorStop[]): Palette {
  if (stops.length === 0) {
    return { c1: '#1ee0ff', c2: '#2a7bff', c3: '#0a3aa0', mood: 'NORMAL' };
  }
  const sorted = [...stops].sort((a, b) => a.t - b.t);
  const p = clamp(pct, 0, 1);
  if (p <= sorted[0].t) {
    const s = sorted[0];
    return { c1: s.c1, c2: s.c2, c3: s.c3, mood: s.mood };
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (p <= b.t) {
      const span = b.t - a.t;
      const t = span > 0 ? (p - a.t) / span : 0;
      return {
        c1: mix(a.c1, b.c1, t),
        c2: mix(a.c2, b.c2, t),
        c3: mix(a.c3, b.c3, t),
        mood: t < 0.5 ? a.mood : b.mood,
      };
    }
  }
  const last = sorted[sorted.length - 1];
  return { c1: last.c1, c2: last.c2, c3: last.c3, mood: last.mood };
}

export function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Default radial-card background — the rich blue gradient with the top
 * highlight that the original design ships with.
 */
export const DEFAULT_RADIAL_BG =
  'radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%), linear-gradient(180deg, #0b1326, #060a14)';

/** Default bar-card background — flat dark blue gradient. */
export const DEFAULT_BAR_BG = 'linear-gradient(180deg, #0b1326, #060a14)';

/**
 * Resolve user-provided background into the CSS custom properties the cards
 * read from. When the user picks `transparent` we let HA's theme show
 * through and switch the foreground / muted text colors to HA's theme
 * variables so the card stays readable in both dark and light HA themes.
 * Any other value (default included) keeps the card's own dark aesthetic
 * with white-ish text — picking a light custom colour is at the user's
 * discretion.
 */
export function backgroundVars(
  input: string | undefined,
  defaultBg: string,
): Record<string, string> {
  const raw = (input ?? '').trim();
  const bg = raw.length === 0 ? defaultBg : raw;
  const isTransparent = bg.toLowerCase() === 'transparent';
  return {
    '--pg-bg': bg,
    '--pg-text': isTransparent ? 'var(--primary-text-color, #eef3ff)' : '#eef3ff',
    '--pg-muted': isTransparent ? 'var(--secondary-text-color, #6b7894)' : '#6b7894',
  };
}
