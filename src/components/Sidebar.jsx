
import { useTranslation } from 'react-i18next';
import { useSession } from '../store/sessionStore.js';
import { getFunnelStep } from '../flows/index.js';

// ── Qualification funnel steps ───────────────────────────────────────────────
const FUNNEL_STEPS = [
  { step: 1, labelKey: 'subject',    screen: 'funnel_subject', qualKey: 'subjectType' },
  { step: 2, labelKey: 'motivation', screen: null,             qualKey: 'intent' },
  { step: 3, labelKey: 'geo',        screen: 'funnel_geo',     qualKey: 'geoArea' },
  { step: 4, labelKey: 'role',       screen: null,             qualKey: 'role' },
  { step: 5, labelKey: 'contact',    screen: 'funnel_form',    qualKey: null },
];

// ── Exploration navigation items ─────────────────────────────────────────────
const EXPLORATION_NAV = [
  { id: 'flowA',   icon: '◈' },
  { id: 'flowB',       icon: '◇' },
  { id: 'flowC',   icon: '❖' },
  { id: 'flowF',   icon: '✉' },
  { id: 'flowG_intro', prefix: 'flowG', icon: '…' },
  { id: 'faq',         icon: '?' },
];

export default function Sidebar() {
  const { t }            = useTranslation('ui');
  const screen           = useSession((s) => s.screen);
  const navigate         = useSession((s) => s.navigate);
  const navigateReset    = useSession((s) => s.navigateReset);
  const qualification    = useSession((s) => s.qualification);
  const mobileSidebarOpen = useSession((s) => s.mobileSidebarOpen);
  const sidebarMode      = useSession((s) => s.sidebarMode);
  const visitedScreens   = useSession((s) => s.visitedScreens);

  // ── Qualification (funnel) mode ────────────────────────────────────────
  if (sidebarMode === 'qualification') {
    const currentStep = getFunnelStep(screen);

    return (
      <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>

        {/* ── Exploration map — preserved as spatial context, dimmed ── */}
        <div className="ds-sidebar-nav">
          <div className="ds-sidebar-section-label">{t('sidebar.exploreLabel')}</div>

          {EXPLORATION_NAV.map((item) => {
            const matchPrefix = item.prefix || item.id;
            const isVisited = visitedScreens.some(s => s.startsWith(matchPrefix));
            return (
              <button
                key={item.id}
                className={`ds-sidebar-item ds-sidebar-item--ctx ${isVisited ? 'visited' : ''}`}
                onClick={() => navigateReset(item.id === 'faq' ? 'faq' : item.id)}
              >
                <span className="ds-step-indicator">{item.icon}</span>
                <span className="ds-step-label">{t(`sidebar.nav.${item.id}`)}</span>
                {isVisited && <span className="ds-visited-dot" title={t('sidebar.visitedTooltip')} />}
              </button>
            );
          })}
        </div>

        {/* ── Qualification progress — compact secondary section ── */}
        <div className="ds-sidebar-qual-section">
          <div className="ds-sidebar-section-label">{t('sidebar.configLabel')}</div>
          {FUNNEL_STEPS.map((item) => {
            const isActive    = item.step === currentStep;
            const isCompleted = item.qualKey ? !!qualification[item.qualKey] : item.step < currentStep;
            const isPending   = !isActive && !isCompleted;

            let targetScreen = item.screen;
            if (item.step === 2) {
              targetScreen = qualification.subjectType === 'Persone'
                ? 'funnel_intent_person'
                : 'funnel_intent_company';
            }
            if (item.step === 4) {
              targetScreen = qualification.subjectType === 'Persone'
                ? 'funnel_role_person'
                : 'funnel_role_company';
            }

            const canClick = isCompleted && !isActive;

            return (
              <button
                key={item.step}
                className={`ds-sidebar-item ds-sidebar-item--compact ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isPending ? 'pending' : ''}`}
                onClick={() => canClick && targetScreen && navigate(targetScreen)}
                disabled={isPending}
              >
                <span className="ds-step-indicator">
                  {isCompleted && !isActive ? '✓' : item.step}
                </span>
                <span className="ds-step-label">{t(`sidebar.steps.${item.labelKey}`)}</span>
                {isCompleted && !isActive && qualification[item.qualKey] && (
                  <span className="ds-step-value">{qualification[item.qualKey]}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="ds-sidebar-footer" style={{ padding: '16px 16px 0 16px', marginTop: 'auto' }}>
          <button
            className="ds-sidebar-item"
            onClick={() => navigateReset('welcome')}
          >
            <span className="ds-step-indicator">←</span>
            <span className="ds-step-label">{t('navigation.mainMenu')}</span>
          </button>
        </div>

      </div>
    );
  }

  // ── Exploration mode ───────────────────────────────────────────────────
  return (
    <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div className="ds-sidebar-nav">
        <div className="ds-sidebar-section-label">{t('sidebar.exploreLabel')}</div>

        {EXPLORATION_NAV.map((item) => {
          const matchPrefix = item.prefix || item.id;
          const faqMatch    = item.id === 'faq' && (screen === 'faq' || screen === 'fallback');
          const isActive    = faqMatch || (!faqMatch && screen.startsWith(matchPrefix));
          const isVisited   = visitedScreens.some(s => s.startsWith(matchPrefix));

          return (
            <button
              key={item.id}
              className={`ds-sidebar-item ${isActive ? 'active' : ''} ${isVisited && !isActive ? 'visited' : ''}`}
              onClick={() => navigateReset(item.id === 'faq' ? 'faq' : item.id)}
            >
              <span className="ds-step-indicator">{item.icon}</span>
              <span className="ds-step-label">{t(`sidebar.nav.${item.id}`)}</span>
              {isVisited && !isActive && (
                <span className="ds-visited-dot" title={t('sidebar.visitedTooltip')} />
              )}
            </button>
          );
        })}
      </div>

      <div className="ds-sidebar-footer" style={{ padding: '16px 16px 0 16px', marginTop: 'auto' }}>
        <button
          className="ds-sidebar-item"
          onClick={() => navigateReset('welcome')}
        >
          <span className="ds-step-indicator">←</span>
          <span className="ds-step-label">{t('navigation.mainMenu')}</span>
        </button>
      </div>
    </div>
  );
}
