export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export interface Palette {
  c1: string;
  c2: string;
  c3: string;
  mood: string;
}

interface ColorStop extends Palette {
  t: number;
}

const STOPS: ColorStop[] = [
  { t: 0.0, c1: '#1ee0ff', c2: '#2a7bff', c3: '#0a3aa0', mood: 'IDLE' },
  { t: 0.35, c1: '#2bd9ff', c2: '#2864ff', c3: '#0a2a90', mood: 'NORMAL' },
  { t: 0.65, c1: '#7eb8ff', c2: '#5a78ff', c3: '#3a2090', mood: 'ACTIVE' },
  { t: 0.8, c1: '#ffc24a', c2: '#ff7a2b', c3: '#a02a00', mood: 'HIGH' },
  { t: 1.0, c1: '#ff4d6d', c2: '#ff1a3c', c3: '#700010', mood: 'PEAK' },
];

function hex(h: string): [number, number, number] {
  const s = h.replace('#', '');
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}

function mix(h1: string, h2: string, t: number): string {
  const a = hex(h1);
  const b = hex(h2);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

export function rampColor(pct: number): Palette {
  const p = clamp(pct, 0, 1);
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (p <= b.t) {
      const t = (p - a.t) / (b.t - a.t);
      return {
        c1: mix(a.c1, b.c1, t),
        c2: mix(a.c2, b.c2, t),
        c3: mix(a.c3, b.c3, t),
        mood: p >= (a.t + b.t) / 2 ? b.mood : a.mood,
      };
    }
  }
  const last = STOPS[STOPS.length - 1];
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
