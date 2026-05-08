import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { EDITOR_TAG } from './const';
import type { HomeAssistant, PowerGaugeCardConfig } from './types';

interface SchemaItem {
  name: string;
  required?: boolean;
  selector: Record<string, unknown>;
}

const SCHEMA: SchemaItem[] = [
  { name: 'entity', required: true, selector: { entity: { domain: ['sensor', 'input_number'] } } },
  { name: 'name', selector: { text: {} } },
  { name: 'unit', selector: { text: {} } },
  { name: 'min', selector: { number: { mode: 'box', step: 1 } } },
  { name: 'max', selector: { number: { mode: 'box', step: 1 } } },
  { name: 'precision', selector: { number: { mode: 'box', min: 0, max: 4, step: 1 } } },
];

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

  private _computeLabel = (item: SchemaItem): string => {
    const labels: Record<string, string> = {
      entity: 'Entity (required)',
      name: 'Name (optional)',
      unit: 'Unit override (optional)',
      min: 'Minimum value',
      max: 'Maximum value',
      precision: 'Decimal places',
    };
    return labels[item.name] ?? item.name;
  };

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
