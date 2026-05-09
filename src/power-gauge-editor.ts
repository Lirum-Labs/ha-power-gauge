import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { EDITOR_TAG } from './const';
import {
  DEFAULT_CRITICAL_COLOR,
  DEFAULT_NORMAL_COLOR,
  DEFAULT_WARNING_COLOR,
} from './levels';
import type { HomeAssistant, PowerGaugeCardConfig } from './types';

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
  {
    name: 'entity',
    required: true,
    selector: { entity: { domain: ['sensor', 'input_number'] } },
  },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'name', selector: { text: {} } },
      { name: 'unit', selector: { text: {} } },
    ],
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
    ],
  },
  { name: 'rolling_numbers', selector: { boolean: {} } },
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
  entity: 'Entity (required)',
  name: 'Name (optional)',
  unit: 'Unit override (optional)',
  min: 'Minimum value',
  max: 'Maximum value',
  precision: 'Decimal places',
  rolling_numbers: 'Rolling numbers (rapid fluctuation around the live value)',
  normal: 'Normal threshold',
  normal_color: `Normal color (default ${DEFAULT_NORMAL_COLOR})`,
  warning: 'Warning threshold',
  warning_color: `Warning color (default ${DEFAULT_WARNING_COLOR})`,
  critical: 'Critical threshold',
  critical_color: `Critical color (default ${DEFAULT_CRITICAL_COLOR})`,
};

@customElement(EDITOR_TAG)
export class PowerGaugeCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: PowerGaugeCardConfig;

  public setConfig(config: PowerGaugeCardConfig): void {
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
    `;
  }

  private _computeLabel = (item: SchemaItem): string =>
    LABELS[item.name] ?? item.name;

  private _valueChanged(event: CustomEvent): void {
    const detail = event.detail as { value: PowerGaugeCardConfig };
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: PowerGaugeCardEditor;
  }
}
