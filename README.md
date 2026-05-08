# Power Gauge Card

A glowing, animated power consumption gauge for [Home Assistant][ha] Lovelace dashboards. Inspired by [Mushroom][mushroom] but focused on a single, opinionated component: a near-full-circle gauge whose color ramps from cyan through blue, amber and red as the load approaches its configured maximum.

![preview](docs/preview.png)

## Features

- Color ramp that follows the load (`IDLE` → `NORMAL` → `ACTIVE` → `HIGH` → `PEAK`).
- Animated tick ring (80 ticks light up sequentially).
- Rotating outer aura, counter-rotating dashed inner ring, shimmering halo.
- Subtle ambient flicker on the displayed value so the gauge feels alive.
- Visual editor — no YAML required.
- Honors `prefers-reduced-motion`.

## Installation

### HACS (custom repository)

1. In HACS → Frontend → ⋮ → *Custom repositories*, add this repo URL with category **Lovelace**.
2. Install **Power Gauge Card**.
3. Refresh your browser.

### Manual

1. Download `dist/ha-power-gauge.js` from the latest release.
2. Copy it to `<config>/www/community/ha-power-gauge/ha-power-gauge.js`.
3. In Lovelace → Resources, add:

   ```
   /local/community/ha-power-gauge/ha-power-gauge.js   (JavaScript Module)
   ```
4. Refresh your browser.

## Usage

Add the card from the dashboard *Add card* picker (it's listed as **Power Gauge Card**), or paste this YAML:

```yaml
type: custom:power-gauge-card
entity: sensor.house_power_consumption
name: Electricity Consumption
max: 5000
unit: W
```

### Options

| Option       | Type     | Default                              | Description                                                          |
| ------------ | -------- | ------------------------------------ | -------------------------------------------------------------------- |
| `entity`     | string   | _(required)_                         | A `sensor` (or anything with a numeric state) to read the value from |
| `name`       | string   | entity's `friendly_name`             | Title shown in the card header                                       |
| `unit`       | string   | entity's `unit_of_measurement` or `W` | Unit shown next to the value                                         |
| `min`        | number   | `0`                                  | Lower bound of the gauge                                             |
| `max`        | number   | `5000`                               | Upper bound — the gauge maxes out (and turns red) at this value      |
| `precision`  | number   | `0`                                  | Decimal places to display                                            |

## Development

```bash
npm install
npm run build      # → dist/ha-power-gauge.js
npm run watch      # rebuild on change
```

The whole card ships as a single ES module file (`dist/ha-power-gauge.js`) suitable for dropping into `/config/www/`.

## License

MIT.

[ha]: https://www.home-assistant.io/
[mushroom]: https://github.com/piitaya/lovelace-mushroom
