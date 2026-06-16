const FLOW_IDS = {
  flowA: 'platform_overview',
  flowB: 'use_cases',
  flowC: 'personas',
  flowD: 'demo_request',
  flowE: 'commercial_info',
  flowF: 'contact_team',
  flowG: 'custom_request',
  funnel: 'direct_qualification',
};

/**
 * Builds the lead capture payload from form input, qualification state,
 * and session metadata.
 *
 * @param {object} form          - Collected form fields (nome, azienda, email, …)
 * @param {object} qualification - Zustand qualification state
 * @param {object} sessionMeta   - { sessionStart, visitedScreens, intentSignals, backendSessionId, qualificationHistory }
 * @param {string} [formType]    - 'demo' | 'contact' | 'genericRequest'
 * @returns {object} payload ready for POST /api/v1/leads/capture
 */
export function buildLeadPayload(form, qualification, sessionMeta, formType = 'demo', locale = 'it') {
  const {
    sessionStart,
    visitedScreens = [],
    intentSignals = {},
    backendSessionId = null,
    qualificationHistory = [],
  } = sessionMeta;

  const sessionDuration = Math.round((Date.now() - sessionStart) / 1000);

  const qualFields = {
    target:         qualification.subjectType  || null,
    obiettivo:      qualification.intent       || null,
    request_nature: qualification.contactReason || null,
    geografia:      qualification.geoArea      || null,
    role:           qualification.role        || null,
    need_type:      qualification.needType    || null,
    source_flow:    FLOW_IDS[qualification.sourceFlow] ?? qualification.sourceFlow ?? null,
    entry_screen:   qualification.entryScreen || null,
  };

  return {
    ...(backendSessionId ? { session_id: backendSessionId } : {}),
    locale,
    request_type: formType === 'genericRequest' ? 'generic_request' : formType,
    contact: {
      nome:     form.nome     || '',
      azienda:  form.azienda  || '',
      email:    form.email    || '',
      telefono: form.telefono || '',
      ruolo:    form.ruolo    || '',
      paese:    form.paese    || '',
    },
    qualification: Object.fromEntries(
      Object.entries(qualFields).filter(([, v]) => v !== null)
    ),
    metadata: {
      source:                   'deepsearch_chatbot_widget',
      session_duration_seconds: sessionDuration,
      engagement_depth:         visitedScreens.length,
      visited_screens:          visitedScreens,
      intent_signals:           intentSignals,
      source_flow:              FLOW_IDS[qualification.sourceFlow] ?? qualification.sourceFlow ?? null,
      qualification_steps:      qualificationHistory,
    },
    note: form.note || form.messaggio || '',
  };
}
