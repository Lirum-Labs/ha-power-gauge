import { LitElement, html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  BAR_CARD_TAG,
  BAR_CARD_NAME,
  BAR_CARD_DESCRIPTION,
  BAR_EDITOR_TAG,
} from './const';
import { clamp, easeOutCubic, lerp, rampColor, type ColorStop } from './utils';
import { buildStops } from './levels';
import type {
  BarEntityInput,
  HomeAssistant,
  PowerGaugeBarCardConfig,
  PowerGaugeCardConfig,
} from './types';

(window.customCards = window.customCards || []).push({
  type: BAR_CARD_TAG,
  name: BAR_CARD_NAME,
  description: BAR_CARD_DESCRIPTION,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-power-gauge',
});

const ANIM_MS = 500;
const AMBIENT_AMP = 0.012;
const AMBIENT_PERIOD = 2.6;

interface ResolvedRow {
  entity: string;
  name: string;
  unit: string;
  precision: number;
  min: number;
  max: number;
  stops: ColorStop[];
}

interface RampState {
  from: number;
  to: number;
  start: number;
}

@customElement(BAR_CARD_TAG)
export class PowerGaugeBarCard extends LitElement {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./power-gauge-bar-editor');
    return document.createElement(BAR_EDITOR_TAG);
  }

  public static getStubConfig(): Partial<PowerGaugeBarCardConfig> {
    return {
      type: `custom:${BAR_CARD_TAG}`,
      entities: [],
      max: 5000,
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PowerGaugeBarCardConfig;
  @state() private _live: Record<string, number> = {};

  private _animated: Record<string, number> = {};
  private _targets: Record<string, number> = {};
  private _ramps: Record<string, RampState> = {};
  private _initialized = new Set<string>();
  private _ambientStart = 0;
  private _raf?: number;

  public setConfig(config: PowerGaugeBarCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    if (!Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('You need to define at least one entity');
    }
    this._config = {
      min: 0,
      max: 5000,
      precision: 0,
      rolling_numbers: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return Math.max(1, this._config?.entities.length ?? 1);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._ambientStart = performance.now();
    this._loop();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  protected willUpdate(_changed: PropertyValues): void {
    if (!this.hass || !this._config) return;
    for (const input of this._config.entities) {
      const entityId = typeof input === 'string' ? input : input.entity;
      if (!entityId) continue;
      const next = this._readValue(entityId);
      if (next === null) continue;
      if (!this._initialized.has(entityId)) {
        this._initialized.add(entityId);
        this._targets[entityId] = next;
        this._animated[entityId] = next;
        // _live for this row gets seeded by the next loop tick.
        continue;
      }
      if (this._targets[entityId] !== next) {
        this._targets[entityId] = next;
        this._ramps[entityId] = {
          from: this._animated[entityId] ?? next,
          to: next,
          start: performance.now(),
        };
      }
    }
  }

  private _readValue(entityId: string): number | null {
    if (!this.hass) return null;
    const s = this.hass.states[entityId];
    if (!s) return null;
    if (s.state === 'unavailable' || s.state === 'unknown') return null;
    const n = Number(s.state);
    return Number.isFinite(n) ? n : null;
  }

  private _loop = (): void => {
    const now = performance.now();
    const rolling = this._config?.rolling_numbers ?? true;
    const ambientT = (now - this._ambientStart) / 1000;
    const drift = rolling
      ? Math.sin((ambientT * Math.PI * 2) / AMBIENT_PERIOD) * AMBIENT_AMP
      : 0;

    const next: Record<string, number> = {};
    for (const id of Object.keys(this._animated)) {
      const ramp = this._ramps[id];
      if (ramp) {
        const t = clamp((now - ramp.start) / ANIM_MS, 0, 1);
        this._animated[id] = lerp(ramp.from, ramp.to, easeOutCubic(t));
        if (t >= 1) delete this._ramps[id];
      }
      const animated = this._animated[id];
      next[id] = rolling ? animated + drift * animated : animated;
    }
    this._live = next;
    this._raf = requestAnimationFrame(this._loop);
  };

  /**
   * Resolve an entity row to a fully-populated row config — card defaults
   * with row-specific overrides applied on top, then a friendly_name
   * fallback from the entity's attributes.
   */
  private _resolveRow(input: BarEntityInput): ResolvedRow | null {
    if (!this.hass || !this._config) return null;
    const isObj = typeof input === 'object' && input !== null;
    const entity = isObj ? input.entity : input;
    if (!entity) return null;
    const stateObj = this.hass.states[entity];

    const merged = { ...this._config, ...(isObj ? input : {}) } as PowerGaugeCardConfig;
    const min = merged.min ?? 0;
    const max = merged.max ?? 5000;
    const unit =
      merged.unit ??
      (stateObj?.attributes.unit_of_measurement as string | undefined) ??
      'W';
    const precision = merged.precision ?? 0;
    const name =
      (isObj && input.name) ||
      (stateObj?.attributes.friendly_name as string | undefined) ||
      entity;
    const stops = buildStops(merged);
    return { entity, name, unit, precision, min, max, stops };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const rows = this._config.entities
      .map((e) => this._resolveRow(e))
      .filter((r): r is ResolvedRow => r !== null);

    return html`
      <ha-card>
        <div class="wrap">
          ${this._config.title
            ? html`<div class="card-title">${this._config.title}</div>`
            : nothing}
          <div class="stack">${rows.map((r) => this._renderRow(r))}</div>
        </div>
      </ha-card>
    `;
  }

  private _renderRow(row: ResolvedRow): TemplateResult {
    const ready = this._initialized.has(row.entity);
    const live = this._live[row.entity] ?? this._animated[row.entity] ?? 0;
    const range = Math.max(1, row.max - row.min);
    const pct = clamp((live - row.min) / range, 0, 1);
    const palette = rampColor(pct, row.stops);
    const valueLabel = ready
      ? this._format(live, row.precision)
      : '—';

    return html`
      <div
        class="row"
        style=${styleMap({
          '--c1': palette.c1,
          '--c2': palette.c2,
          '--w': `${pct * 100}%`,
        })}
      >
        <div class="label">${row.name}</div>
        <div class="value">${valueLabel}<span class="unit">${row.unit}</span></div>
        <div class="track" aria-hidden="true">
          <div class="fill"></div>
          <div class="cap"></div>
        </div>
      </div>
    `;
  }

  private _format(v: number, precision: number): string {
    if (precision <= 0) return Math.round(v).toLocaleString();
    return v.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      background: linear-gradient(180deg, #0b1326, #060a14);
      color: #eef3ff;
      border: 1px solid rgba(120, 160, 220, 0.12);
      border-radius: var(--ha-card-border-radius, 14px);
      box-shadow:
        0 12px 28px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
      overflow: hidden;
      font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    }

    .wrap {
      padding: 14px 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      padding: 2px 2px 0;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .row {
      --c1: #1ee0ff;
      --c2: #2a7bff;
      position: relative;
      padding: 10px 14px 12px;
      border-radius: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.005)
      );
      border: 1px solid rgba(120, 160, 220, 0.1);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      column-gap: 14px;
      row-gap: 8px;
      align-items: center;
    }

    .label {
      grid-column: 1;
      grid-row: 1;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.78);
      letter-spacing: 0.2px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      grid-column: 2;
      grid-row: 1;
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.2px;
    }

    .value .unit {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.55);
      margin-left: 4px;
      font-weight: 400;
    }

    .track {
      grid-column: 1 / -1;
      grid-row: 2;
      position: relative;
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .fill {
      position: absolute;
      inset: 0;
      width: var(--w);
      border-radius: 999px;
      background: linear-gradient(90deg, var(--c1), var(--c2));
      box-shadow:
        0 0 8px color-mix(in oklab, var(--c1) 50%, transparent),
        0 0 14px color-mix(in oklab, var(--c2) 30%, transparent);
      transition: background 0.4s;
    }

    .cap {
      position: absolute;
      top: 50%;
      left: var(--w);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--c1);
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 8px var(--c1);
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [BAR_CARD_TAG]: PowerGaugeBarCard;
  }
}
