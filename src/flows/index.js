import { welcomeScreen } from './welcome.js';
import { funnelScreens, getFunnelStep } from './funnel.js';
import { faqScreens } from './faq.js';

// Exploratory flows — first-class navigation (no longer "legacy")
import { flowAScreens } from './flowA.js';
import { flowBScreens } from './flowB.js';
import { flowCScreens } from './flowC.js';
import { flowDScreens } from './flowD.js';
import { flowEScreens } from './flowE.js';
import { flowFScreens } from './flowF.js';
import { flowGScreens } from './flowG.js';

/**
 * All screen definitions in a single lookup map.
 * Panel.jsx reads from this to render the current screen.
 */
const allScreens = [
  welcomeScreen,
  ...funnelScreens,
  ...faqScreens,
  ...flowAScreens,
  ...flowBScreens,
  ...flowCScreens,
  ...flowDScreens,
  ...flowEScreens,
  ...flowFScreens,
  ...flowGScreens,
];

export const SCREENS = {};
for (const screen of allScreens) {
  SCREENS[screen.id] = screen;
}

// Re-export getFunnelStep from funnel.js (used by Sidebar.jsx)
export { getFunnelStep };

/**
 * Determine which sidebar flow is active for a given screen ID.
 * Maps screen IDs to their parent flow for sidebar highlighting.
 */
export function getActiveFlow(screenId) {
  if (screenId === 'welcome') return null;
  if (screenId.startsWith('funnel_')) return 'funnel';
  if (screenId.startsWith('flowA')) return 'flowA';
  if (screenId.startsWith('flowB')) return 'flowB';
  if (screenId.startsWith('flowC')) return 'flowC';
  if (screenId.startsWith('flowD')) return 'flowD';
  if (screenId.startsWith('flowE')) return 'flowE';
  if (screenId.startsWith('flowF')) return 'flowF';
  if (screenId.startsWith('flowG')) return 'flowG';
  if (screenId === 'faq' || screenId === 'fallback') return 'faq';
  return null;
}
