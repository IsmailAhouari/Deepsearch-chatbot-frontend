import { useEffect } from 'react';
import { useSession } from '../store/sessionStore.js';
import { SCREENS } from '../flows/index.js';
import { FAQ } from '../flows/faq.js';
import MessageBubble from './MessageBubble.jsx';
import ButtonGrid from './ButtonGrid.jsx';
import DemoForm from './DemoForm.jsx';
import FreeText from './FreeText.jsx';

// ── Personalization helpers ─────────────────────────────────────────────────

/**
 * Reorders choices to bubble up the most contextually relevant options
 * based on accumulated qualification state.
 */
function reorderChoices(choices, qualification) {
  if (!choices?.length) return choices;
  const role   = qualification.role?.toLowerCase()   || '';
  const intent = qualification.intent?.toLowerCase() || '';

  return [...choices].sort((a, b) => {
    let sA = 0, sB = 0;
    const la = a.label.toLowerCase();
    const lb = b.label.toLowerCase();

    // Role-based boosting
    if (role.includes('hr')         && la.includes('hr'))         sA += 10;
    if (role.includes('hr')         && lb.includes('hr'))         sB += 10;
    if (role.includes('compliance') && la.includes('compliance')) sA += 10;
    if (role.includes('compliance') && lb.includes('compliance')) sB += 10;
    if ((role.includes('legal') || role.includes('legale')) && (la.includes('lit') || la.includes('legal') || la.includes('legale'))) sA += 8;
    if ((role.includes('legal') || role.includes('legale')) && (lb.includes('lit') || lb.includes('legal') || lb.includes('legale'))) sB += 8;
    if (role.includes('security') && la.includes('risk')) sA += 6;
    if (role.includes('security') && lb.includes('risk')) sB += 6;

    // Intent-based boosting
    if ((intent.includes('aml') || intent.includes('kyc')) && la.includes('aml')) sA += 10;
    if ((intent.includes('aml') || intent.includes('kyc')) && lb.includes('aml')) sB += 10;
    if ((intent.includes('due') || intent.includes('diligence')) && (la.includes('due') || la.includes('dd'))) sA += 8;
    if ((intent.includes('due') || intent.includes('diligence')) && (lb.includes('due') || lb.includes('dd'))) sB += 8;
    if (intent.includes('litigation') && la.includes('lit')) sA += 8;
    if (intent.includes('litigation') && lb.includes('lit')) sB += 8;
    if (intent.includes('fornitor') && la.includes('fornitor')) sA += 6;
    if (intent.includes('fornitor') && lb.includes('fornitor')) sB += 6;

    return sB - sA;
  });
}

/**
 * Sorts FAQ items so those matching the user's role or intent float to top.
 */
function sortFAQ(faqItems, qualification) {
  const role   = qualification.role   || '';
  const intent = qualification.intent || '';
  return [...faqItems].sort((a, b) => {
    const relA = a.relevance?.some(r => r === role || r === intent) ? 1 : 0;
    const relB = b.relevance?.some(r => r === role || r === intent) ? 1 : 0;
    return relB - relA;
  });
}

/**
 * Replaces generic "Richiedi Demo" labels with context-aware ones.
 */
function resolveCTALabel(choice, qualification) {
  if (choice.action?.type !== 'startDemo') return choice.label;
  // Only personalise generic labels, preserve intentional ones (e.g. "Demo executive")
  const genericLabels = ['richiedi demo', 'prenota demo', 'richiedi demo riservata'];
  if (!genericLabels.includes(choice.label.toLowerCase())) return choice.label;

  const intent = qualification.intent?.toLowerCase() || '';
  const geo    = qualification.geoArea?.toLowerCase() || '';
  const role   = qualification.role?.toLowerCase()   || '';

  if (intent.includes('aml') || intent.includes('kyc'))             return 'Prenota Demo AML Compliance';
  if (intent.includes('due diligence') || intent.includes('due'))   return 'Configura Demo Due Diligence';
  if (intent.includes('litigation'))                                 return 'Prenota Demo Litigation';
  if (geo.includes('svizzera') || geo.includes('swiss'))            return 'Demo per il Mercato Svizzero';
  if (role.includes('hr'))                                           return 'Demo Background Check';
  if (role.includes('direzione') || role.includes('board'))         return 'Demo Executive';
  return choice.label;
}

// ── Panel component ──────────────────────────────────────────────────────────

export default function Panel() {
  const screen          = useSession((s) => s.screen);
  const navigate        = useSession((s) => s.navigate);
  const back            = useSession((s) => s.back);
  const setQual         = useSession((s) => s.setQual);
  const setLead         = useSession((s) => s.setLead);
  const startDemoFlow   = useSession((s) => s.startDemoFlow);
  const qualification   = useSession((s) => s.qualification);
  const lead            = useSession((s) => s.lead);

  const screenDef = SCREENS[screen] || SCREENS['fallback'];

  // ── autoCapture: fire screen-level captures when screen changes ─────────
  useEffect(() => {
    const ac = screenDef?.autoCapture;
    if (ac && Object.keys(ac).length > 0) {
      setQual(ac);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleChoice = (choice) => {
    // 1. Declarative choice-level capture
    if (choice.capture) {
      setQual({ [choice.capture.key]: choice.capture.value });
    }

    // 2. startDemo action
    if (choice.action?.type === 'startDemo') {
      startDemoFlow(choice.action);
      return;
    }

    // 3. Navigate
    if (choice.target) {
      navigate(choice.target);
    }
  };

  const handleFreeTextSubmit = (text) => {
    // Capture text to qualification if key specified
    if (screenDef.freeTextCaptureKey) {
      setQual({ [screenDef.freeTextCaptureKey]: text });
    }

    // Route based on subject type (funnel_geo)
    if (screenDef.freeTextTargetFn === 'bySubjectType') {
      const q = useSession.getState().qualification;
      // Skip role step if already captured (e.g. came through flowC which sets role via autoCapture)
      if (q.role) {
        navigate('funnel_form');
      } else {
        navigate(q.subjectType === 'Persone' ? 'funnel_role_person' : 'funnel_role_company');
      }
      return;
    }

    // Route to declared target if no inline success message
    if (screenDef.freeTextTarget && !screenDef.successMessage) {
      navigate(screenDef.freeTextTarget);
    }
  };

  const handleFormSubmit = (formData) => {
    setLead(formData);
    navigate(screenDef.formSuccessTarget || 'funnel_thanks');
  };

  // Back button: hide only on welcome and thanks screens.
  // At a flow entry screen the button still shows — pressing it goes to Menu principale.
  // history.length can be 0 at a flow entry (when the user arrived via sidebar/navigateReset
  // which clears history); back() handles an empty stack gracefully by returning 'welcome'.
  const showBack = screen !== 'welcome'
    && !screen.endsWith('_thanks');

  // ── Thanks screen ──────────────────────────────────────────────────────
  if (screenDef.component === 'thanks') {
    const calendlyUrl = screenDef.showCalendly && lead.email
      ? `https://calendly.com/deepsearch-demo/30min` +
        `?name=${encodeURIComponent(lead.nome || '')}` +
        `&email=${encodeURIComponent(lead.email || '')}` +
        `&a1=${encodeURIComponent(lead.azienda || '')}`
      : null;

    return (
      <div className="ds-panel">
        <div className="ds-panel-content">
          <div className="ds-thanks">
            <div className="ds-thanks-icon">✓</div>
            <div className="ds-message">
              <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>
                {screenDef.message}
              </div>
            </div>
            {calendlyUrl && (
              <div className="ds-calendly-wrapper">
                <div className="ds-calendly-label">Prenota subito la tua sessione:</div>
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="450px"
                  frameBorder="0"
                  title="Prenota Demo DeepSearch"
                  className="ds-calendly-frame"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── FAQ screen ─────────────────────────────────────────────────────────
  if (screenDef.component === 'faq') {
    const sortedFAQ = sortFAQ(FAQ, qualification);
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <div className="ds-faq">
            <div className="ds-faq-title">Domande Frequenti</div>
            {sortedFAQ.map((item, idx) => {
              const isClickable = item.target || item.action;
              return (
                <div key={idx} className="ds-faq-group" style={{ marginBottom: '12px' }}>
                  <div className="ds-faq-q" style={{ paddingLeft: '4px', marginBottom: '8px' }}>{item.question}</div>
                  <div
                    className={`ds-faq-item ${isClickable ? 'clickable' : ''}`}
                    onClick={() => {
                      if (item.action?.type === 'startDemo') {
                        startDemoFlow(item.action);
                      } else if (item.target) {
                        navigate(item.target);
                      }
                    }}
                  >
                    <div className="ds-faq-a">{item.answer}</div>
                    {isClickable && (
                      <span className="ds-faq-chevron" style={{ color: 'var(--ds-accent)', fontWeight: 'bold', fontSize: '14px', opacity: 0.6 }}>›</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Form screen ────────────────────────────────────────────────────────
  if (screenDef.component === 'form') {
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <DemoForm formType={screenDef.formType} onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  // ── FreeText screen ────────────────────────────────────────────────────
  if (screenDef.component === 'freetext') {
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <FreeText
            message={screenDef.message}
            successMessage={screenDef.successMessage}
            successButtons={screenDef.successButtons}
            submitLabel={screenDef.submitLabel}
            placeholder={screenDef.placeholder}
            onSubmit={handleFreeTextSubmit}
            onChoice={handleChoice}
          />
        </div>
      </div>
    );
  }

  // ── Standard screen: message + prompt + choices ────────────────────────
  // Lock main choices until every topChoices selector on this screen has been picked.
  const topGroups = screenDef.topChoices
    ? (Array.isArray(screenDef.topChoices) ? screenDef.topChoices : [screenDef.topChoices])
    : [];
  const choicesLocked = topGroups.length > 0 && !topGroups.every(g => !!qualification[g.captureKey]);

  // If the screen declares per-subject-type choice sets, pick the matching one;
  // fall back to the default choices list when no subjectType is selected yet.
  const rawButtons = (
    screenDef.choicesBySubjectType && qualification.subjectType
      ? screenDef.choicesBySubjectType[qualification.subjectType]
      : null
  ) ?? screenDef.choices ?? screenDef.ctas ?? [];

  // Personalize: reorder by role/intent context
  const reordered = reorderChoices(rawButtons, qualification);

  // Personalize: resolve CTA labels
  const buttons = reordered.map(btn => ({
    ...btn,
    label: resolveCTALabel(btn, qualification),
  }));

  return (
    <div className="ds-panel">
      {showBack && (
        <button className="ds-back-btn" onClick={back}>← Indietro</button>
      )}
      <div className="ds-panel-content">
        {screenDef.title && <div className="ds-panel-title">{screenDef.title}</div>}
        <MessageBubble text={screenDef.message} />

        {/* Inline selector groups — captures without navigating; accepts single object or array */}
        {screenDef.topChoices && (
          (Array.isArray(screenDef.topChoices) ? screenDef.topChoices : [screenDef.topChoices])
            .map((group, gi) => (
              <div key={gi} className="ds-top-selector">
                <div className="ds-prompt">{group.prompt}</div>
                <div className="ds-top-selector-row">
                  {group.options.map((opt, i) => {
                    const isSelected = qualification[group.captureKey] === opt.value;
                    return (
                      <button
                        key={i}
                        className={`ds-top-selector-btn${isSelected ? ' ds-top-selector-btn--selected' : ''}`}
                        onClick={() => setQual({ [group.captureKey]: opt.value })}
                      >
                        {opt.icon && <span className="ds-top-selector-icon">{opt.icon}</span>}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
        )}

        {screenDef.prompt && <div className="ds-prompt">{screenDef.prompt}</div>}

        {buttons.length > 0 && (
          <ButtonGrid
            choices={buttons}
            onSelect={handleChoice}
            columns={screenDef.columns || 1}
            showSublabels={true}
            locked={choicesLocked}
          />
        )}
      </div>
    </div>
  );
}
