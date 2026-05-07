import React from 'react';
import { useSession } from '../store/sessionStore.js';

export default function Trigger() {
  const open_modal = useSession((s) => s.open_modal);
  const startDemoFlow = useSession((s) => s.startDemoFlow);
  const setOpen = useSession((s) => s.setOpen);
  const open = useSession((s) => s.open);

  return (
    <div className="trigger-container">
      {!open && (
        <div className="ds-trigger-widget">
          <div className="ds-trigger-header">
            <div className="ds-trigger-logo">
              <img src="/icons.png" alt="DeepSearch Logo" className="ds-trigger-logo-img" />
            </div>
            <h2 className="ds-trigger-title">DeepSearch™ Intelligence</h2>
          </div>

          <div className="ds-trigger-body">
            <p className="ds-trigger-subtitle-top">
              DeepSearch <span className="ds-trigger-sep">-</span> Piattaforma di Intelligence  Individua relazioni nascoste tra soggetti
            </p>
          </div>

          <div className="ds-trigger-actions">
            <div className="ds-trigger-demo-link" onClick={() => { startDemoFlow(); setOpen(); }}>
              Richiedi Demo
            </div>
            <button className="ds-trigger-btn" onClick={open_modal}>
              <span className="ds-trigger-sep">● </span> Avvia Sessione DeepSearch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
