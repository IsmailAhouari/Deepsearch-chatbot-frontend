import React from 'react';
import { useChatStore } from '../store/chatStore';

export function LandingPage() {
  const startSession = useChatStore(state => state.startSession);

  return (
    <div className="landing-page">
      <h1>DeepSearch™ Intelligence</h1>
      <p className="tagline">"Scopri quello che gli altri non vedono"</p>
      <p className="subtitle">
        Piattaforma di Decision &amp; Network Intelligence<br />
        Interfaccia di intelligence per analisi del rischio, due diligence e controparti
      </p>
      <button className="start-btn" onClick={startSession}>
        Avvia Sessione
      </button>
      <div className="landing-disclaimer">
        ⚠️ Questa interfaccia non memorizza dati personali. Tutti i dati transitano direttamente verso CRM protetto.
      </div>
    </div>
  );
}

export default LandingPage;
