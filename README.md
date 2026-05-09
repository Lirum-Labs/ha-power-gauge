# Power Gauge Card

A glowing, animated power consumption gauge for [Home Assistant][ha] Lovelace dashboards. Inspired by [Mushroom][mushroom] but focused on a single, opinionated component: a near-full-circle gauge whose color ramps from cyan through blue, amber and red as the load approaches its configured maximum.

![preview](docs/preview.png)

## Features

- Three configurable thresholds (`normal` / `warning` / `critical`), each with its own colour.
- Smooth channel-wise interpolation between thresholds — the gauge shifts hue continuously instead of snapping at level boundaries.
- Animated tick ring (80 ticks light up sequentially with the active colour).
- Rotating outer aura, counter-rotating dashed inner ring, shimmering halo.
- Subtle ambient flicker on the displayed value so the gauge feels alive.
- Visual editor — no YAML required.
- Honours `prefers-reduced-motion`.

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
normal: 1000      # below this, gauge is fully blue
warning: 3000     # at this draw, gauge is fully orange
critical: 5000    # at/above this, gauge is fully red
```

### Options

| Option            | Type     | Default                                | Description                                                          |
| ----------------- | -------- | -------------------------------------- | -------------------------------------------------------------------- |
| `entity`          | string   | _(required)_                           | A `sensor` (or anything with a numeric state) to read the value from |
| `name`            | string   | entity's `friendly_name`               | Title shown in the card header                                       |
| `unit`            | string   | entity's `unit_of_measurement` or `W`  | Unit shown next to the value                                         |
| `min`             | number   | `0`                                    | Lower bound of the gauge                                             |
| `max`             | number   | `5000`                                 | Upper bound of the gauge axis                                        |
| `precision`       | number   | `0`                                    | Decimal places to display                                            |
| `normal`          | number   | `min + 20% × (max − min)`              | Power draw at which the gauge is fully the *normal* colour           |
| `warning`         | number   | `min + 60% × (max − min)`              | Power draw at which the gauge is fully the *warning* colour          |
| `critical`        | number   | `max`                                  | Power draw at which the gauge is fully the *critical* colour         |
| `normal_color`    | string   | `#1ee0ff` (cyan/blue)                  | Hex color for the normal level                                       |
| `warning_color`   | string   | `#ff7a2b` (orange)                     | Hex color for the warning level                                      |
| `critical_color`  | string   | `#ff1a3c` (red)                        | Hex color for the critical level                                     |
| `rolling_numbers` | boolean  | `true`                                 | When `true`, the displayed value continuously fluctuates ±1.2% around the live value to give the gauge an "alive" feel. When `false`, it only updates when the entity changes, smoothly ramping from old → new on each update. |

Between any two levels, the colour interpolates smoothly channel-by-channel — the arc, ticks, halo and central glow all shift together as the value changes.

## Development

```bash
npm install
npm run build      # → dist/ha-power-gauge.js
npm run watch      # rebuild on change
```

The whole card ships as a single ES module file (`dist/ha-power-gauge.js`) suitable for dropping into `/config/www/`.

### Local preview (no Home Assistant required)

```bash
npm run dev
```

This runs the rollup watcher and a static server on <http://localhost:8000>. Open <http://localhost:8000/dev/> to see the card with sliders for value + thresholds + colours, plus an *Auto drift* button that simulates a fluctuating sensor. Edit anything under `src/` and the page picks up the rebuilt bundle on refresh.

If you only want to serve the existing build, `npm run serve` skips the watcher.

## License

MIT.

[ha]: https://www.home-assistant.io/
[mushroom]: https://github.com/piitaya/lovelace-mushroom
