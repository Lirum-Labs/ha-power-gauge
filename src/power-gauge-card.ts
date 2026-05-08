import { LitElement, html, css, svg, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { CARD_VERSION, CARD_TAG, EDITOR_TAG, CARD_NAME, CARD_DESCRIPTION } from './const';
import {
  arcPath,
  clamp,
  easeOutCubic,
  lerp,
  polar,
  rampColor,
  type ColorStop,
  type Palette,
} from './utils';
import { buildStops } from './levels';
import type { HomeAssistant, PowerGaugeCardConfig } from './types';

/* eslint-disable no-console */
console.info(
  `%c POWER-GAUGE-CARD %c v${CARD_VERSION} `,
  'color:#fff; background:#1ee0ff; font-weight:600; padding:2px 6px; border-radius:3px 0 0 3px;',
  'color:#1ee0ff; background:#0a0f1c; font-weight:600; padding:2px 6px; border-radius:0 3px 3px 0;',
);
/* eslint-enable no-console */

(window.customCards = window.customCards || []).push({
  type: CARD_TAG,
  name: CARD_NAME,
  description: CARD_DESCRIPTION,
  preview: true,
  documentationURL: 'https://github.com/lirum/ha-power-gauge',
});

const CX = 200;
const CY = 200;
const R = 150;
const START_A = 130;
const END_A = 410;
const SWEEP = END_A - START_A;
const TICKS = 80;
const ANIM_MS = 700;
const AMBIENT_AMP = 0.012;
const AMBIENT_PERIOD = 2.6;

@customElement(CARD_TAG)
export class PowerGaugeCard extends LitElement {
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./power-gauge-editor');
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(): Partial<PowerGaugeCardConfig> {
    return { type: `custom:${CARD_TAG}`, entity: '', max: 5000 };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PowerGaugeCardConfig;
  @state() private _animated = 0;
  @state() private _live = 0;
  @state() private _stops: ColorStop[] = [];

  private _target = 0;
  private _initialized = false;
  private _animFrom = 0;
  private _animTo = 0;
  private _animStart = 0;
  private _animRaf?: number;
  private _ambientStart = 0;
  private _ambientRaf?: number;

  public setConfig(config: PowerGaugeCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = { min: 0, max: 5000, precision: 0, ...config };
    this._stops = buildStops(this._config);
  }

  public getCardSize(): number {
    return 5;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._ambientStart = performance.now();
    this._startAmbient();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._animRaf) cancelAnimationFrame(this._animRaf);
    if (this._ambientRaf) cancelAnimationFrame(this._ambientRaf);
  }

  protected willUpdate(_changed: PropertyValues): void {
    if (!this.hass || !this._config) return;
    const next = this._readEntityValue();
    if (next === null) return; // entity not loaded / unavailable — wait
    if (!this._initialized) {
      // First successful read — snap to the entity value so the gauge
      // appears at the correct number instead of animating from 0.
      this._initialized = true;
      this._target = next;
      this._animated = next;
      this._live = next;
      return;
    }
    if (next !== this._target) {
      this._target = next;
      this._startAnim(next);
    }
  }

  /**
   * Read the entity's numeric value, returning `null` if the entity hasn't
   * loaded yet, is unavailable/unknown, or doesn't parse as a number. This
   * lets the rest of the card distinguish "no data yet" from "actually 0".
   */
  private _readEntityValue(): number | null {
    if (!this.hass || !this._config) return null;
    const state = this.hass.states[this._config.entity];
    if (!state) return null;
    if (state.state === 'unavailable' || state.state === 'unknown') return null;
    const n = Number(state.state);
    return Number.isFinite(n) ? n : null;
  }

  private _startAnim(to: number): void {
    if (this._animRaf) cancelAnimationFrame(this._animRaf);
    this._animFrom = this._animated;
    this._animTo = to;
    this._animStart = performance.now();
    const tick = (now: number): void => {
      const t = clamp((now - this._animStart) / ANIM_MS, 0, 1);
      this._animated = lerp(this._animFrom, this._animTo, easeOutCubic(t));
      if (t < 1) {
        this._animRaf = requestAnimationFrame(tick);
      } else {
        this._animRaf = undefined;
      }
    };
    this._animRaf = requestAnimationFrame(tick);
  }

  private _startAmbient(): void {
    const loop = (now: number): void => {
      const t = (now - this._ambientStart) / 1000;
      const drift = Math.sin((t * Math.PI * 2) / AMBIENT_PERIOD) * AMBIENT_AMP;
      this._live = this._animated + drift * this._animated;
      this._ambientRaf = requestAnimationFrame(loop);
    };
    this._ambientRaf = requestAnimationFrame(loop);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const state = this.hass.states[this._config.entity];
    if (!state) {
      return html`
        <ha-card>
          <div class="error">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const min = this._config.min ?? 0;
    const max = this._config.max ?? 5000;
    const range = Math.max(1, max - min);
    const live = this._live;
    const pct = clamp((live - min) / range, 0, 1);
    const palette = rampColor(pct, this._stops);
    const unit = this._config.unit ?? state.attributes.unit_of_measurement ?? 'W';
    const friendly =
      this._config.name ?? state.attributes.friendly_name ?? this._config.entity;
    const precision = this._config.precision ?? 0;
    const ready = this._initialized;
    const liveLabel = ready ? this._format(live, precision) : '—';
    const secondary = ready ? this._secondaryLine(live, unit, palette) : 'WAITING FOR DATA';

    const cssVars = {
      '--c1': palette.c1,
      '--c2': palette.c2,
      '--c3': palette.c3,
    };

    const currentEnd = START_A + SWEEP * pct;
    const [kx, ky] = polar(CX, CY, R, currentEnd);

    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="panel">
          <div class="header">
            <div>
              <div class="title">${friendly}</div>
              <div class="subtitle">Live · ${(max / 1000).toFixed(1)} ${unit === 'W' ? 'kW' : unit} max</div>
            </div>
          </div>

          <div class="stage">
            <div class="gauge">
              ${this._renderSvg(palette, currentEnd)}
              <div class="center">
                <div class="core">
                  <div class="reading">
                    <div class="label-now">Live draw</div>
                    <div class="value">
                      ${liveLabel}<span class="unit-inline">${unit}</span>
                    </div>
                    <div class="unit">${secondary}</div>
                  </div>
                </div>
              </div>
              <div
                class="knob"
                style=${styleMap({
                  left: `${(kx / 400) * 100}%`,
                  top: `${(ky / 400) * 100}%`,
                })}
              ></div>
            </div>
          </div>

          <div class="status">
            <span><span class="pulse-dot"></span>${ready ? 'Streaming' : 'Connecting'}</span>
            <span>Now <b>${liveLabel} ${unit}</b></span>
            <span>Limit <b>${this._formatLimit(max, unit)}</b></span>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _format(v: number, precision: number): string {
    if (precision <= 0) return Math.round(v).toLocaleString();
    return v.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  private _formatLimit(max: number, unit: string): string {
    if (unit === 'W' && max >= 1000) return `${(max / 1000).toFixed(1)} kW`;
    return `${max.toLocaleString()} ${unit}`;
  }

  private _secondaryLine(v: number, unit: string, palette: Palette): string {
    if (unit === 'W') return `${(v / 1000).toFixed(2)} kW · ${palette.mood}`;
    return palette.mood;
  }

  private _renderSvg(palette: Palette, currentEnd: number): TemplateResult {
    const ticks: TemplateResult[] = [];
    const pct = (currentEnd - START_A) / SWEEP;
    for (let i = 0; i <= TICKS; i++) {
      const tt = i / TICKS;
      const a = START_A + SWEEP * tt;
      const major = i % 8 === 0;
      const r1 = R - 22;
      const r2 = R - (major ? 8 : 14);
      const [x1, y1] = polar(CX, CY, r1, a);
      const [x2, y2] = polar(CX, CY, r2, a);
      const lit = tt <= pct;
      ticks.push(svg`
        <line
          x1=${x1} y1=${y1} x2=${x2} y2=${y2}
          stroke=${lit ? palette.c1 : 'rgba(255,255,255,0.08)'}
          stroke-width=${major ? 1.6 : 1}
          stroke-linecap="round"
          opacity=${lit ? 1 : 0.55}
          style=${lit ? `filter: drop-shadow(0 0 4px ${palette.c1})` : ''}
        />
      `);
    }

    return html`
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pg-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color=${palette.c1} />
            <stop offset="60%" stop-color=${palette.c2} />
            <stop offset="100%" stop-color=${palette.c3} />
          </linearGradient>
          <radialGradient id="pg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="transparent" />
            <stop offset="80%" stop-color=${palette.c2} stop-opacity="0.5" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
          <radialGradient id="pg-aura" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stop-color="transparent" />
            <stop offset="72%" stop-color=${palette.c1} stop-opacity="0.18" />
            <stop offset="86%" stop-color=${palette.c2} stop-opacity="0.32" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
          <filter id="pg-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="pg-blur-xl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <g class="spin-slow" style="transform-origin: 200px 200px;">
          <circle cx=${CX} cy=${CY} r=${R + 24} fill="url(#pg-aura)" opacity="0.9" />
        </g>

        <path
          d=${arcPath(CX, CY, R, START_A, END_A)}
          stroke="rgba(255,255,255,0.06)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g>${ticks}</g>

        <path
          d=${arcPath(CX, CY, R, START_A, currentEnd)}
          stroke=${palette.c1}
          stroke-width="26"
          fill="none"
          stroke-linecap="round"
          opacity="0.35"
          filter="url(#pg-blur-xl)"
        />
        <path
          d=${arcPath(CX, CY, R, START_A, currentEnd)}
          stroke="url(#pg-stroke)"
          stroke-width="14"
          fill="none"
          stroke-linecap="round"
          opacity="0.6"
          filter="url(#pg-blur-lg)"
        />
        <path
          d=${arcPath(CX, CY, R, START_A, currentEnd)}
          stroke="url(#pg-stroke)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g class="spin-fast" style="transform-origin: 200px 200px;">
          <circle
            cx=${CX} cy=${CY} r=${R - 30}
            fill="none"
            stroke=${palette.c2}
            stroke-opacity="0.18"
            stroke-width="1"
            stroke-dasharray="2 8"
          />
        </g>

        <circle
          cx=${CX} cy=${CY} r=${R - 36}
          fill="url(#pg-halo)"
          opacity="0.7"
          class="shimmer"
        />
      </svg>
    `;
  }

  static styles = css`
    :host {
      --bg-0: #05070d;
      --bg-1: #0a0f1c;
      --bg-2: #111b30;
      --text: #eef3ff;
      --muted: #6b7894;
      --c1: #1ee0ff;
      --c2: #2a7bff;
      --c3: #0a3aa0;

      display: block;
    }

    ha-card {
      background: radial-gradient(
          120% 80% at 50% 0%,
          rgba(40, 90, 200, 0.25),
          transparent 60%
        ),
        linear-gradient(180deg, #0b1326, #060a14);
      color: var(--text);
      border: 1px solid rgba(120, 160, 220, 0.12);
      border-radius: var(--ha-card-border-radius, 16px);
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
      overflow: hidden;
      font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    }

    .panel {
      position: relative;
      padding: 22px 20px 18px;
      display: flex;
      flex-direction: column;
    }

    .panel::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.6), transparent),
        radial-gradient(1px 1px at 70% 60%, rgba(255, 255, 255, 0.4), transparent),
        radial-gradient(1px 1px at 40% 80%, rgba(255, 255, 255, 0.5), transparent),
        radial-gradient(1px 1px at 85% 20%, rgba(255, 255, 255, 0.3), transparent),
        radial-gradient(1px 1px at 15% 70%, rgba(255, 255, 255, 0.4), transparent);
      opacity: 0.3;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      z-index: 1;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.4px;
    }

    .subtitle {
      font-size: 11px;
      color: var(--muted);
      margin-top: 4px;
      letter-spacing: 0.4px;
    }

    .stage {
      flex: 1;
      display: grid;
      place-items: center;
      position: relative;
      margin: 8px 0;
      z-index: 1;
    }

    .gauge {
      position: relative;
      width: 100%;
      max-width: 320px;
      aspect-ratio: 1 / 1;
    }

    .gauge svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .core {
      width: 56%;
      height: 56%;
      border-radius: 50%;
      background:
        radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.06), transparent 60%),
        radial-gradient(
          circle at 50% 100%,
          color-mix(in oklab, var(--c2) 35%, transparent),
          transparent 70%
        ),
        #050912;
      border: 1px solid rgba(255, 255, 255, 0.06);
      box-shadow:
        inset 0 0 40px color-mix(in oklab, var(--c2) 30%, transparent),
        inset 0 0 0 1px rgba(255, 255, 255, 0.04),
        0 0 60px color-mix(in oklab, var(--c1) 20%, transparent);
      display: grid;
      place-items: center;
      transition: box-shadow 0.6s;
    }

    .reading {
      text-align: center;
      padding: 0 8px;
    }

    .label-now {
      font-size: 9px;
      letter-spacing: 2.5px;
      color: var(--muted);
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .value {
      font-size: 36px;
      font-weight: 300;
      letter-spacing: -1.2px;
      font-variant-numeric: tabular-nums;
      color: #fff;
      text-shadow: 0 0 20px color-mix(in oklab, var(--c1) 60%, transparent);
      line-height: 1;
    }

    .unit-inline {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.55);
      margin-left: 4px;
    }

    .unit {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.55);
      margin-top: 6px;
      letter-spacing: 1.5px;
      font-weight: 500;
    }

    .knob {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #0a1020;
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      transform: translate(-50%, -50%);
      pointer-events: none;
      box-shadow:
        0 0 0 4px rgba(0, 0, 0, 0.4),
        0 0 20px color-mix(in oklab, var(--c1) 80%, transparent);
      display: grid;
      place-items: center;
    }

    .knob::after {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--c1);
      box-shadow: 0 0 8px var(--c1);
    }

    .status {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 4px 0;
      font-size: 11px;
      color: var(--muted);
      font-variant-numeric: tabular-nums;
      position: relative;
      z-index: 1;
    }

    .status b {
      color: var(--text);
      font-weight: 600;
      font-family: 'SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', ui-monospace, monospace;
      letter-spacing: 0;
    }

    .pulse-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--c1);
      margin-right: 6px;
      animation: pg-pulse 1.4s ease-in-out infinite;
      box-shadow: 0 0 8px var(--c1);
    }

    @keyframes pg-pulse {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.4;
        transform: scale(0.7);
      }
    }

    @keyframes pg-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .spin-slow {
      animation: pg-spin 24s linear infinite;
      transform-origin: 50% 50%;
    }

    .spin-fast {
      animation: pg-spin 9s linear infinite reverse;
      transform-origin: 50% 50%;
    }

    @keyframes pg-shimmer {
      0%,
      100% {
        opacity: 0.85;
      }
      50% {
        opacity: 1;
      }
    }

    .shimmer {
      animation: pg-shimmer 2.4s ease-in-out infinite;
    }

    .error {
      padding: 16px;
      color: var(--error-color, #db4437);
    }

    @media (prefers-reduced-motion: reduce) {
      .spin-slow,
      .spin-fast,
      .shimmer,
      .pulse-dot {
        animation: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: PowerGaugeCard;
  }
}
