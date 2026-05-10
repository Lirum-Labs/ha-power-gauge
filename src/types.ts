import type { LovelaceCardConfig } from 'custom-card-helpers';

/** A single level can be a bare threshold (number) or {value, color}. */
export type LevelInput = number | { value?: number; color?: string };

export interface PowerGaugeCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  unit?: string;
  min?: number;
  max?: number;
  precision?: number;

  /** Threshold at which the gauge fully expresses the "normal" colour. */
  normal?: LevelInput;
  /** Threshold at which the gauge fully expresses the "warning" colour. */
  warning?: LevelInput;
  /** Threshold at which the gauge fully expresses the "critical" colour. */
  critical?: LevelInput;

  normal_color?: string;
  warning_color?: string;
  critical_color?: string;

  /**
   * When true (default), the displayed value continuously fluctuates
   * around the real entity value to give the gauge a "live" feel. When
   * false, the value only changes when the entity actually changes,
   * smoothly ramping from old → new on each update.
   */
  rolling_numbers?: boolean;

  /**
   * Card background. Any CSS color, gradient, or `transparent`. When
   * unset, the card's signature blue gradient is used. When set to
   * `transparent`, HA's theme background shows through and the text
   * colours adapt to HA's dark / light theme automatically.
   */
  background?: string;
}

/**
 * One row inside a `power-gauge-bar-card`. Either a bare entity id or
 * an object with per-row overrides on top of the card-level defaults.
 */
export type BarEntityInput =
  | string
  | {
      entity: string;
      name?: string;
      min?: number;
      max?: number;
      unit?: string;
      precision?: number;
      normal?: LevelInput;
      warning?: LevelInput;
      critical?: LevelInput;
      normal_color?: string;
      warning_color?: string;
      critical_color?: string;
    };

export interface PowerGaugeBarCardConfig extends LovelaceCardConfig {
  type: string;
  /** Optional title shown above the stack. */
  title?: string;
  /** One linear gauge per entry. Mixed string / object entries are ok. */
  entities: BarEntityInput[];

  // Shared defaults — every row inherits these unless it overrides.
  min?: number;
  max?: number;
  unit?: string;
  precision?: number;
  normal?: LevelInput;
  warning?: LevelInput;
  critical?: LevelInput;
  normal_color?: string;
  warning_color?: string;
  critical_color?: string;
  rolling_numbers?: boolean;
  /** See `PowerGaugeCardConfig.background` — same semantics. */
  background?: string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: { darkMode: boolean };
  language: string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<void>;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
