import './power-gauge-card';
import './power-gauge-bar-card';

/* eslint-disable no-console */
import { CARD_VERSION } from './const';
console.info(
  `%c POWER-GAUGE %c v${CARD_VERSION} `,
  'color:#fff; background:#1ee0ff; font-weight:600; padding:2px 6px; border-radius:3px 0 0 3px;',
  'color:#1ee0ff; background:#0a0f1c; font-weight:600; padding:2px 6px; border-radius:0 3px 3px 0;',
);
/* eslint-enable no-console */
