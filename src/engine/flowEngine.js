/**
 * Flow Engine
 * Handles loading, parsing, and rendering conversational flows from JSON
 */

/**
 * Load a flow by ID (in a real app, these would be fetched from API)
 * For now, we'll import them at the component level
 */
export async function loadFlow(flowId) {
  try {
    const flow = await import(`../data/flows/${flowId}.json`);
    return flow.default;
  } catch (error) {
    console.error(`Failed to load flow: ${flowId}`, error);
    return null;
  }
}

/**
 * Check if content contains prohibited terms
 */
export function checkCompliance(text) {
  const prohibitedTerms = [
    'score', 'scoring', 'rating', 'punteggio', 'valutazione automatica',
    'evaluate', 'assessment', 'quanto e rischioso', 'rischio totale',
    'how risky', 'risk score', 'credit score', 'trust score',
    'e sicuro', 'criminal record', 'arresto', 'sanctions list',
    'blacklist', 'watchlist', 'terrorista', 'truffatore', 'frode',
    'condanna', 'reato', 'penale', 'inchiesta giudiziaria'
  ];
  
  const lower = text.toLowerCase();
  return prohibitedTerms.filter(term => lower.includes(term));
}

/**
 * Render template content dynamically
 * Supports: template:name syntax that gets replaced with actual content
 */
export function renderTemplate(content, userData = {}) {
  if (!content.startsWith('template:')) return content;
  
  const templateName = content.replace('template:', '');
  const templates = getTemplates();
  
  if (templates[templateName]) {
    return templates[templateName](userData);
  }
  
  return content;
}

/**
 * Available dynamic templates
 */
function getTemplates() {
  return {
    demo_confirmation: (userData) => {
      const interest = userData.demoInterest || 'Demo generale';
      return `Grazie.<br>La richiesta Ã¨ stata acquisita per: <strong>${interest}</strong>.<br><br>Un <strong>referente DeepSearch</strong> ti contatterÃ  a breve.<br><br><strong>Prossimi passi:</strong><br>â€¢ Uno specialista intelligence ti contatterÃ  entro 24 ore<br>â€¢ La pianificazione della demo richiede conferma umana (nessuna prenotazione automatica)<br>â€¢ Riceverai un invito calendario una volta confermata la disponibilitÃ <br><br><span class="status-badge success">â€¢ Instradato: Coda Prioritaria</span>`;
    },
    
    contact_confirmation: (userData) => {
      const nature = userData.contactNature ? `<strong>Natura:</strong> ${userData.contactNature}<br>` : '';
      const refId = userData.contactRefId || 'DS-PENDING';
      return `Grazie per averci contattato.<br><br>La tua richiesta Ã¨ stata registrata con ID di riferimento <strong>${refId}</strong>.<br>${nature}Il team competente ti risponderÃ  nei tempi indicati.<br><br><span class="status-badge success">â€¢ Instradato al team appropriato</span>`;
    },
  };
}

/**
 * Parse step action and return action object
 */
export function parseAction(action) {
  return {
    type: action?.action || 'message',
    target: action?.target,
    key: action?.key,
    data: action?.data,
  };
}

export default {
  loadFlow,
  checkCompliance,
  renderTemplate,
  parseAction,
};
