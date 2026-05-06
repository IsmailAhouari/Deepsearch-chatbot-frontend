import React from 'react';
import { useSession } from '../store/sessionStore.js';

export default function Trigger() {
  const open_modal = useSession((s) => s.open_modal);

  return (
    <div className="trigger-container">
      <div className="trigger-content">
        <h1 className="trigger-title">DeepSearch™ Intelligence</h1>
        <p className="trigger-tagline">"Scopri quello che gli altri non vedono"</p>
        <p className="trigger-subtitle">
          Piattaforma di Decision &amp; Network Intelligence
          <br />
          Interfaccia di intelligence per analisi del rischio, due diligence e controparti
        </p>
        <button className="trigger-btn" onClick={open_modal}>
          ● Avvia Sessione DeepSearch
        </button>
        <div className="trigger-disclaimer">
          ⚠ Questa interfaccia non memorizza dati personali. Tutti i dati transitano direttamente verso CRM protetto.
        </div>
      </div>
    </div>
  );
}
