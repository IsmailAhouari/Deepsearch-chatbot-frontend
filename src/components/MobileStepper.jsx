import { useSession } from '../store/sessionStore.js';

const STEPS = ['Soggetto', 'Motivazione', 'Geo', 'Funzione', 'Contatto'];

function getStepIndex(screenId) {
  if (screenId === 'funnel_subject')                                           return 0;
  if (screenId === 'funnel_intent_company' || screenId === 'funnel_intent_person') return 1;
  if (screenId === 'funnel_geo')                                               return 2;
  if (screenId === 'funnel_role_company'   || screenId === 'funnel_role_person')   return 3;
  if (screenId === 'funnel_form')                                              return 4;
  if (screenId === 'funnel_thanks')                                            return 5;
  return -1;
}

export default function MobileStepper() {
  const screen      = useSession((s) => s.screen);
  const sidebarMode = useSession((s) => s.sidebarMode);

  if (sidebarMode !== 'qualification') return null;

  const currentIndex = getStepIndex(screen);
  if (currentIndex === -1) return null;

  return (
    <div className="ds-mobile-stepper">
      {STEPS.map((label, i) => {
        const isActive    = i === currentIndex;
        const isCompleted = i < currentIndex;
        return (
          <div
            key={i}
            className={`ds-mobile-step${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
          >
            <div className="ds-mobile-step-dot" />
            <span className="ds-mobile-step-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
