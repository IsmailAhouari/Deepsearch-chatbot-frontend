import { welcomeScreen } from './welcome.js';
import { flowAScreens } from './flowA.js';
import { flowBScreens } from './flowB.js';
import { flowCScreens } from './flowC.js';
import { flowDScreens } from './flowD.js';
import { flowEScreens } from './flowE.js';
import { flowFScreens } from './flowF.js';
import { flowGScreens } from './flowG.js';
import { faqScreens } from './faq.js';

/**
 * All screen definitions in a single lookup map.
 * Panel.jsx reads from this to render the current screen.
 */
const allScreens = [
  welcomeScreen,
  ...flowAScreens,
  ...flowBScreens,
  ...flowCScreens,
  ...flowDScreens,
  ...flowEScreens,
  ...flowFScreens,
  ...flowGScreens,
  ...faqScreens,
];

export const SCREENS = {};
for (const screen of allScreens) {
  SCREENS[screen.id] = screen;
}

/**
 * Determine which sidebar flow is active for a given screen ID.
 * Maps screen IDs to their parent flow for sidebar highlighting.
 */
export function getActiveFlow(screenId) {
  if (screenId === 'welcome') return null;
  if (screenId.startsWith('flowA')) return 'flowA';
  if (screenId.startsWith('flowB')) return 'flowB';
  if (screenId.startsWith('flowC')) return 'flowC';
  if (screenId.startsWith('flowD')) return 'flowD';
  if (screenId.startsWith('flowE')) return 'flowE';
  if (screenId.startsWith('flowF')) return 'flowF';
  if (screenId.startsWith('flowG')) return 'flowG';
  if (screenId === 'faq' || screenId === 'fallback') return null;
  return null;
}
