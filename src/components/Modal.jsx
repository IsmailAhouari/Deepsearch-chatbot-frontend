import React from 'react';
import { useSession } from '../store/sessionStore.js';
import Sidebar from './Sidebar.jsx';
import Panel from './Panel.jsx';
import { SCREENS } from '../flows/index.js';

import icon from '../assets/icon.png';

export default function Modal() {
  const close_modal = useSession((s) => s.close_modal);
  const screen = useSession((s) => s.screen);
  const screenDef = SCREENS[screen] || SCREENS['fallback'];
  const showSidebar = screenDef?.showSidebar ?? false;

  return (
    <div className="ds-overlay" onClick={(e) => { if (e.target === e.currentTarget) close_modal(); }}>
      <div className="ds-modal">
        {/* Header */}
        <div className="ds-header">
          <div className="ds-header-brand">
            <div className="ds-header-icon">
              <img src={icon} alt="Logo" className="ds-header-logo-img" />
            </div>
            <div>
              <div className="ds-header-title">DeepSearch ● AI Assistant</div>
              <div className="ds-header-sub">Interfaccia di Intelligence per Analisi del Rischio</div>
            </div>
          </div>
          <div className="ds-header-actions">
            <button className="ds-header-close" onClick={close_modal} aria-label="Chiudi sessione">✕</button>
          </div>
        </div>

        {/* Body */}
        <div className="ds-body">
          {showSidebar && <Sidebar />}
          <Panel />
        </div>
      </div>
    </div>
  );
}
