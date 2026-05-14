import { welcomeScreen } from './welcome.js';
import { funnelScreens } from './funnel.js';
import { faqScreens } from './faq.js';

// Legacy flows — kept for backward compatibility (accessible via FAQ links, etc.)
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
  // Legacy flows (still accessible but not primary navigation)
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

/**
 * Determine funnel step number from screen ID.
 * Returns 0 for non-funnel screens.
 */
export function getFunnelStep(screenId) {
  if (screenId === 'welcome') return 1;
  if (screenId === 'funnel_intent_company' || screenId === 'funnel_intent_person') return 2;
  if (screenId === 'funnel_geo') return 3;
  if (screenId === 'funnel_role_company' || screenId === 'funnel_role_person') return 4;
  if (screenId === 'funnel_form') return 5;
  if (screenId === 'funnel_thanks') return 6;
  return 0;
}

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
