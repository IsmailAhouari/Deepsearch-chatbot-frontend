import React from 'react';
import { useSession } from '../store/sessionStore.js';
import { getFunnelStep } from '../flows/index.js';

const FUNNEL_STEPS = [
  { step: 1, label: 'Soggetto', screen: 'welcome', qualKey: 'subjectType' },
  { step: 2, label: 'Motivazione', screen: null, qualKey: 'intent' },
  { step: 3, label: 'Area Geografica', screen: 'funnel_geo', qualKey: 'geoArea' },
  { step: 4, label: 'Funzione', screen: null, qualKey: 'role' },
  { step: 5, label: 'Contatto', screen: 'funnel_form', qualKey: null },
];

export default function Sidebar() {
  const screen = useSession((s) => s.screen);
  const navigate = useSession((s) => s.navigate);
  const qualification = useSession((s) => s.qualification);
  const mobileSidebarOpen = useSession((s) => s.mobileSidebarOpen);

  const currentStep = getFunnelStep(screen);
  const isFunnel = currentStep > 0;

  // For funnel screens, show step progress
  if (isFunnel) {
    return (
      <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="ds-sidebar-nav">
          <div className="ds-sidebar-section-label">Qualificazione</div>
          {FUNNEL_STEPS.map((item) => {
            const isActive = item.step === currentStep;
            const isCompleted = item.qualKey ? !!qualification[item.qualKey] : item.step < currentStep;
            const isPending = !isActive && !isCompleted;

            // Determine the target screen for navigation
            let targetScreen = item.screen;
            if (item.step === 2) {
              // Step 2 depends on subject type
              targetScreen = qualification.subjectType === 'Persone' 
                ? 'funnel_intent_person' 
                : 'funnel_intent_company';
            }
            if (item.step === 4) {
              // Step 4 depends on subject type
              targetScreen = qualification.subjectType === 'Persone' 
                ? 'funnel_role_person' 
                : 'funnel_role_company';
            }

            const canClick = isCompleted && !isActive;

            return (
              <button
                key={item.step}
                className={`ds-sidebar-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isPending ? 'pending' : ''}`}
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

        <div className="ds-sidebar-footer" style={{ padding: '16px 16px 0 16px', marginTop: 'auto' }}>
          <button
            className="ds-sidebar-item"
            onClick={() => navigate('faq')}
            style={{ opacity: 0.7, fontSize: '11px' }}
          >
            <span className="ds-step-indicator" style={{ fontSize: '10px' }}>?</span>
            <span className="ds-step-label">FAQ</span>
          </button>
        </div>
      </div>
    );
  }

  // For non-funnel screens (legacy flows, FAQ), show minimal sidebar
  return (
    <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div className="ds-sidebar-nav">
        <button
          className="ds-sidebar-item"
          onClick={() => navigate('welcome')}
        >
          <span className="ds-step-indicator">←</span>
          <span className="ds-step-label">Torna al Menu</span>
        </button>
        <button
          className={`ds-sidebar-item ${screen === 'faq' ? 'active' : ''}`}
          onClick={() => navigate('faq')}
        >
          <span className="ds-step-indicator">?</span>
          <span className="ds-step-label">FAQ</span>
        </button>
      </div>
    </div>
  );
}
