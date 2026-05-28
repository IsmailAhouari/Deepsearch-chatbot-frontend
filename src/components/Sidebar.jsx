import React from 'react';
import { useSession } from '../store/sessionStore.js';
import { getFunnelStep } from '../flows/index.js';

// ── Qualification funnel steps ───────────────────────────────────────────────
const FUNNEL_STEPS = [
  { step: 1, label: 'Soggetto',        screen: 'funnel_subject', qualKey: 'subjectType' },
  { step: 2, label: 'Motivazione',     screen: null,             qualKey: 'intent' },
  { step: 3, label: 'Area Geografica', screen: 'funnel_geo',     qualKey: 'geoArea' },
  { step: 4, label: 'Funzione',        screen: null,             qualKey: 'role' },
  { step: 5, label: 'Contatto',        screen: 'funnel_form',    qualKey: null },
];

// ── Exploration navigation items ─────────────────────────────────────────────
const EXPLORATION_NAV = [
  { label: 'Piattaforma',        id: 'flowA',       icon: '◈' },
  { label: "Casi d'uso",         id: 'flowB',       icon: '◇' },
  { label: 'A chi si rivolge',   id: 'flowC',       icon: '❖' },
  { label: 'Contatta il Team',   id: 'flowF',       icon: '✉' },
  { label: 'Altro',              id: 'flowG_intro', prefix: 'flowG', icon: '…' },
  { label: 'FAQ',                id: 'faq',         icon: '?' },
];

export default function Sidebar() {
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
          <div className="ds-sidebar-section-label">Esplora</div>

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
                <span className="ds-step-label">{item.label}</span>
                {isVisited && <span className="ds-visited-dot" title="Visitato" />}
              </button>
            );
          })}
        </div>

        {/* ── Qualification progress — compact secondary section ── */}
        <div className="ds-sidebar-qual-section">
          <div className="ds-sidebar-section-label">Demo in configurazione</div>
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
                <span className="ds-step-label">{item.label}</span>
                {isCompleted && !isActive && qualification[item.qualKey] && (
                  <span className="ds-step-value">{qualification[item.qualKey]}</span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    );
  }

  // ── Exploration mode ───────────────────────────────────────────────────
  return (
    <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div className="ds-sidebar-nav">
        <div className="ds-sidebar-section-label">Esplora</div>

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
              <span className="ds-step-label">{item.label}</span>
              {isVisited && !isActive && (
                <span className="ds-visited-dot" title="Visitato" />
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
          <span className="ds-step-label">Menu principale</span>
        </button>
      </div>
    </div>
  );
}
