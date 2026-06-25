
import { useTranslation } from 'react-i18next';
import { useSession } from '../store/sessionStore.js';
import Sidebar from './Sidebar.jsx';
import Panel from './Panel.jsx';
import MobileStepper from './MobileStepper.jsx';
import LocaleSwitcher from './LocaleSwitcher.jsx';
import { SCREENS } from '../flows/index.js';
import { isMobileDevice } from '../lib/detectDevice.js';
import dsLogo from '../assets/icon.png';

const IS_MOBILE = isMobileDevice();

export default function Modal() {
  const { t }               = useTranslation('ui');
  const screen              = useSession((s) => s.screen);
  const toggleMobileSidebar = useSession((s) => s.toggleMobileSidebar);
  const mobileSidebarOpen   = useSession((s) => s.mobileSidebarOpen);
  const lead                = useSession((s) => s.lead);

  const screenDef   = SCREENS[screen] || SCREENS['fallback'];
  const showSidebar = screenDef?.showSidebar ?? false;

  return (
    <div className="ds-overlay">
      <div className={`ds-modal ${mobileSidebarOpen ? 'sidebar-open' : ''} ${IS_MOBILE ? 'ds-mobile' : 'ds-desktop'}`}>
        {/* Header */}
        <div className="ds-header">
          <div className="ds-header-brand">
            {showSidebar && (
              <button className="ds-mobile-menu-trigger" onClick={toggleMobileSidebar}>
                {mobileSidebarOpen ? '✕' : '☰'}
              </button>
            )}
            <div className="ds-header-icon">
              <img src={dsLogo} alt="Logo" className="ds-header-logo-img" />
            </div>
            <div>
              <div className="ds-header-title">DeepSearch ● AI Assistant</div>
              <div className="ds-header-sub">{t('header.brandSub')}</div>
            </div>
          </div>
          <div className="ds-header-actions">
            <LocaleSwitcher />
          </div>
        </div>

        {/* Mobile-only decoy ✕ — sits over deepsearch.ch's own close button.
            Non-interactive (pointer-events: none) so the tap passes through to
            the parent page's real close control underneath. */}
        {IS_MOBILE && (
          <span className="ds-mobile-close-decoy" aria-hidden="true">✕</span>
        )}

        {/* Mobile qualification progress stepper (hidden on desktop via CSS) */}
        <MobileStepper />

        {/* Body */}
        <div className="ds-body">
          {showSidebar && <Sidebar />}
          <Panel />
        </div>
      </div>
    </div>
  );
}
