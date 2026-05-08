import { clamp, deriveShades, type ColorStop } from './utils';
import type { LevelInput, PowerGaugeCardConfig } from './types';

export const DEFAULT_NORMAL_COLOR = '#1ee0ff';
export const DEFAULT_WARNING_COLOR = '#ff7a2b';
export const DEFAULT_CRITICAL_COLOR = '#ff1a3c';

interface ResolvedLevel {
  value: number;
  color: string;
  mood: string;
}

function resolveOne(
  input: LevelInput | undefined,
  fallbackValue: number,
  topLevelColor: string | undefined,
  defaultColor: string,
  mood: string,
): ResolvedLevel {
  let value = fallbackValue;
  let color = topLevelColor ?? defaultColor;
  if (typeof input === 'number') {
    value = input;
  } else if (input && typeof input === 'object') {
    if (typeof input.value === 'number') value = input.value;
    if (typeof input.color === 'string' && input.color.trim().length > 0) {
      color = input.color;
    }
  }
  return { value, color, mood };
}

/**
 * Build the colour-ramp stops from the card config.
 *
 * Defaults: normal at 20% of max, warning at 60%, critical at 100% — with
 * the canonical blue / orange / red palette. Each stop's c2/c3 shades are
 * derived from c1 so users only have to pick one colour per level.
 */
export function buildStops(config: PowerGaugeCardConfig): ColorStop[] {
  const min = config.min ?? 0;
  const max = config.max ?? 5000;
  const range = Math.max(1, max - min);

  const normal = resolveOne(
    config.normal,
    min + range * 0.2,
    config.normal_color,
    DEFAULT_NORMAL_COLOR,
    'NORMAL',
  );
  const warning = resolveOne(
    config.warning,
    min + range * 0.6,
    config.warning_color,
    DEFAULT_WARNING_COLOR,
    'WARNING',
  );
  const critical = resolveOne(
    config.critical,
    max,
    config.critical_color,
    DEFAULT_CRITICAL_COLOR,
    'CRITICAL',
  );

  const toStop = (lvl: ResolvedLevel): ColorStop => ({
    t: clamp((lvl.value - min) / range, 0, 1),
    ...deriveShades(lvl.color),
    mood: lvl.mood,
  });

  return [toStop(normal), toStop(warning), toStop(critical)];
}
