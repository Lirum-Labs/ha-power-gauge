import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { BAR_EDITOR_TAG } from './const';
import {
  DEFAULT_CRITICAL_COLOR,
  DEFAULT_NORMAL_COLOR,
  DEFAULT_WARNING_COLOR,
} from './levels';
import type { HomeAssistant, PowerGaugeBarCardConfig } from './types';

interface SchemaItem {
  name: string;
  type?: string;
  title?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  schema?: SchemaItem[];
}

const numSel = { number: { mode: 'box', step: 1 } };

const SCHEMA: SchemaItem[] = [
  { name: 'title', selector: { text: {} } },
  {
    name: 'entities',
    required: true,
    selector: {
      entity: { multiple: true, domain: ['sensor', 'input_number'] },
    },
  },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'min', selector: numSel },
      { name: 'max', selector: numSel },
      {
        name: 'precision',
        selector: { number: { mode: 'box', min: 0, max: 4, step: 1 } },
      },
      { name: 'unit', selector: { text: {} } },
    ],
  },
  { name: 'rolling_numbers', selector: { boolean: {} } },
  { name: 'background', selector: { text: {} } },
  {
    name: '',
    type: 'expandable',
    title: 'Color levels',
    schema: [
      {
        name: '',
        type: 'grid',
        schema: [
          { name: 'normal', selector: numSel },
          { name: 'normal_color', selector: { text: {} } },
        ],
      },
      {
        name: '',
        type: 'grid',
        schema: [
          { name: 'warning', selector: numSel },
          { name: 'warning_color', selector: { text: {} } },
        ],
      },
      {
        name: '',
        type: 'grid',
        schema: [
          { name: 'critical', selector: numSel },
          { name: 'critical_color', selector: { text: {} } },
        ],
      },
    ],
  },
];

const LABELS: Record<string, string> = {
  title: 'Card title (optional)',
  entities: 'Entities (one bar per entity)',
  min: 'Minimum value',
  max: 'Maximum value',
  precision: 'Decimal places',
  unit: 'Unit override (optional)',
  rolling_numbers: 'Rolling numbers (rapid fluctuation around the live value)',
  background: 'Background (CSS color/gradient, "transparent" for HA theme)',
  normal: 'Normal threshold',
  normal_color: `Normal color (default ${DEFAULT_NORMAL_COLOR})`,
  warning: 'Warning threshold',
  warning_color: `Warning color (default ${DEFAULT_WARNING_COLOR})`,
  critical: 'Critical threshold',
  critical_color: `Critical color (default ${DEFAULT_CRITICAL_COLOR})`,
};

@customElement(BAR_EDITOR_TAG)
export class PowerGaugeBarCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: PowerGaugeBarCardConfig;

  public setConfig(config: PowerGaugeBarCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        For per-row overrides (custom name, max, or color per device), edit the
        card YAML — each entry under <code>entities</code> can be
        <code>{ entity, name, max, normal, warning, critical, ... }</code>.
      </p>
    `;
  }

  private _computeLabel = (item: SchemaItem): string =>
    LABELS[item.name] ?? item.name;

  private _valueChanged(event: CustomEvent): void {
    const detail = event.detail as { value: PowerGaugeBarCardConfig };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: detail.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    .hint {
      margin: 12px 4px 0;
      font-size: 12px;
      color: var(--secondary-text-color, #6b7894);
    }
    code {
      font-family: ui-monospace, 'SF Mono', Menlo, monospace;
      font-size: 11px;
      background: rgba(127, 127, 127, 0.12);
      padding: 1px 5px;
      border-radius: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [BAR_EDITOR_TAG]: PowerGaugeBarCardEditor;
  }
}
