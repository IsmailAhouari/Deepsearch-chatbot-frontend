import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../store/sessionStore.js';
import { SCREENS } from '../flows/index.js';
import { FAQ } from '../flows/faq.js';
import { resolveCTALabel } from '../lib/resolveCTALabel.js';
import MessageBubble from './MessageBubble.jsx';
import ButtonGrid from './ButtonGrid.jsx';
import DemoForm from './DemoForm.jsx';
import FreeText from './FreeText.jsx';

// ── Personalization helpers ─────────────────────────────────────────────────

/**
 * Affinity tables mapping a known qualification signal (role or intent ID)
 * to the choice(s) it should boost, identified by normalized ID rather than
 * translated label text — so reordering behaves identically in every
 * language. Cross-axis entries (e.g. role 'legal' boosting the 'litigation'
 * intent choice) mirror the correlations the previous substring-matching
 * implementation produced, characterized before this rewrite.
 */
const ROLE_AFFINITY = {
  HR:             [{ axis: 'role',   id: 'HR',               weight: 10 }],
  compliance_aml: [{ axis: 'role',   id: 'compliance_aml',    weight: 10 }],
  legal:          [{ axis: 'role',   id: 'legal',             weight: 8 },
                    { axis: 'intent', id: 'litigation',        weight: 8 }],
  security_risk:  [{ axis: 'role',   id: 'security_risk',     weight: 6 },
                    { axis: 'intent', id: 'risk_analysis',     weight: 6 },
                    { axis: 'intent', id: 'reputational_risk', weight: 6 },
                    { axis: 'intent', id: 'counterparty_risk', weight: 6 }],
};

const INTENT_AFFINITY = {
  aml:           [{ axis: 'intent', id: 'aml',           weight: 10 },
                   { axis: 'role',   id: 'compliance_aml', weight: 10 }],
  due_diligence: [{ axis: 'intent', id: 'due_diligence', weight: 8 }],
  litigation:    [{ axis: 'intent', id: 'litigation',    weight: 8 },
                   { axis: 'role',   id: 'legal',         weight: 8 }],
};

function choiceRoleId(choice) {
  if (choice.capture?.key === 'role') return choice.capture.value;
  return choice.action?.role ?? null;
}

function choiceIntentId(choice) {
  if (choice.capture?.key === 'intent') return choice.capture.value;
  return choice.action?.interest ?? null;
}

function choiceAffinityScore(choice, boosts) {
  const roleId   = choiceRoleId(choice);
  const intentId = choiceIntentId(choice);
  let score = 0;
  for (const { axis, id, weight } of boosts) {
    if (axis === 'role' && roleId === id) score += weight;
    if (axis === 'intent' && intentId === id) score += weight;
  }
  return score;
}

/**
 * Reorders choices to bubble up the most contextually relevant options
 * based on accumulated qualification state. Operates on raw (untranslated)
 * choice objects — call this before resolving labelKey → t(), so ordering
 * depends only on normalized IDs and is identical across languages.
 */
function reorderChoices(choices, qualification) {
  if (!choices?.length) return choices;
  const boosts = [
    ...(ROLE_AFFINITY[qualification.role] ?? []),
    ...(INTENT_AFFINITY[qualification.intent] ?? []),
  ];
  if (boosts.length === 0) return choices;

  return choices
    .map((choice, index) => ({ choice, index, score: choiceAffinityScore(choice, boosts) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ choice }) => choice);
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

// ── Panel component ──────────────────────────────────────────────────────────

export default function Panel() {
  const { t } = useTranslation('flows');
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
        navigate(q.subjectType === 'persone' ? 'funnel_role_person' : 'funnel_role_company');
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
    return (
      <div className="ds-panel">
        <div className="ds-panel-content">
          <div className="ds-thanks">
            <div className="ds-thanks-icon">✓</div>
            <div className="ds-message">
              <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>
                {screenDef.messageKey ? t(screenDef.messageKey) : screenDef.message}
              </div>
            </div>
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
          <button className="ds-back-btn" onClick={back}>{t('ui:navigation.back')}</button>
        )}
        <div className="ds-panel-content">
          <div className="ds-faq">
            <div className="ds-faq-title">{t(screenDef.titleKey)}</div>
            {sortedFAQ.map((item, idx) => {
              const isClickable = item.target || item.action;
              return (
                <div key={idx} className="ds-faq-group" style={{ marginBottom: '12px' }}>
                  <div className="ds-faq-q" style={{ paddingLeft: '4px', marginBottom: '8px' }}>{t(item.questionKey)}</div>
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
                    <div className="ds-faq-a">{t(item.answerKey)}</div>
                    {isClickable && (
                      <span className="ds-faq-chevron" style={{ color: 'var(--ds-accent)', fontWeight: 'bold', fontSize: '14px', opacity: 0.6 }} aria-hidden="true" />
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
          <button className="ds-back-btn" onClick={back}>{t('ui:navigation.back')}</button>
        )}
        <div className="ds-panel-content">
          <DemoForm formType={screenDef.formType} onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  // ── FreeText screen ────────────────────────────────────────────────────
  if (screenDef.component === 'freetext') {
    const translatedSuccessButtons = screenDef.successButtons?.map(btn => ({
      ...btn,
      label: btn.labelKey ? t(btn.labelKey) : btn.label,
    })).map(btn => ({
      ...btn,
      label: resolveCTALabel(btn, qualification, t),
    }));

    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>{t('ui:navigation.back')}</button>
        )}
        <div className="ds-panel-content">
          <FreeText
            message={screenDef.messageKey ? t(screenDef.messageKey) : screenDef.message}
            successMessage={screenDef.successMessageKey ? t(screenDef.successMessageKey) : screenDef.successMessage}
            successButtons={translatedSuccessButtons}
            submitLabel={screenDef.submitLabelKey ? t(screenDef.submitLabelKey) : (screenDef.submitLabel ?? t('ui:freetext.submit'))}
            placeholder={screenDef.placeholderKey ? t(screenDef.placeholderKey) : (screenDef.placeholder ?? t('ui:freetext.placeholder'))}
            onSubmit={handleFreeTextSubmit}
            onChoice={handleChoice}
          />
        </div>
      </div>
    );
  }

  // ── Resolve translatable screen fields ────────────────────────────────
  const screenMessage = screenDef.messageKey ? t(screenDef.messageKey) : screenDef.message;
  const screenPrompt  = screenDef.promptKey  ? t(screenDef.promptKey)  : screenDef.prompt;

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

  // Personalize: reorder by role/intent context — on the raw choices, before
  // translation, so ordering depends on normalized IDs, not translated text.
  const reordered = reorderChoices(rawButtons, qualification);

  // Resolve translation keys on each button
  const translatedButtons = reordered.map(btn => ({
    ...btn,
    label:    btn.labelKey    ? t(btn.labelKey)    : btn.label,
    sublabel: btn.sublabelKey ? t(btn.sublabelKey) : btn.sublabel,
  }));

  // Personalize: resolve CTA labels
  const buttons = translatedButtons.map(btn => ({
    ...btn,
    label: resolveCTALabel(btn, qualification, t),
  }));

  return (
    <div className="ds-panel">
      {showBack && (
        <button className="ds-back-btn" onClick={back}>{t('ui:navigation.back')}</button>
      )}
      <div className="ds-panel-content">
        {(screenDef.titleKey || screenDef.title) && (
          <div className="ds-panel-title">{screenDef.titleKey ? t(screenDef.titleKey) : screenDef.title}</div>
        )}
        <MessageBubble text={screenMessage} />

        {/* Inline selector groups — captures without navigating; accepts single object or array */}
        {screenDef.topChoices && (
          (Array.isArray(screenDef.topChoices) ? screenDef.topChoices : [screenDef.topChoices])
            .map((group, gi) => (
              <div key={gi} className="ds-top-selector">
                <div className="ds-prompt">{group.promptKey ? t(group.promptKey) : group.prompt}</div>
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
                        <span>{opt.labelKey ? t(opt.labelKey) : opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
        )}

        {screenPrompt && <div className="ds-prompt">{screenPrompt}</div>}

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
