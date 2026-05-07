import React from 'react';
import { useSession } from '../store/sessionStore.js';
import { SCREENS } from '../flows/index.js';
import { FAQ } from '../flows/faq.js';
import MessageBubble from './MessageBubble.jsx';
import ButtonGrid from './ButtonGrid.jsx';
import DemoForm from './DemoForm.jsx';
import FreeText from './FreeText.jsx';

export default function Panel() {
  const screen = useSession((s) => s.screen);
  const history = useSession((s) => s.history);
  const navigate = useSession((s) => s.navigate);
  const back = useSession((s) => s.back);
  const setQual = useSession((s) => s.setQual);
  const setLead = useSession((s) => s.setLead);
  const close_modal = useSession((s) => s.close_modal);
  const startDemoFlow = useSession((s) => s.startDemoFlow);

  const screenDef = SCREENS[screen] || SCREENS['fallback'];

  const handleChoice = (choice) => {
    // Capture qualification data before navigating
    if (screen === 'flowD_interest') setQual({ interest: choice.label });
    if (screen === 'flowD_role') setQual({ role: choice.label });
    if (screen === 'flowD_org') setQual({ org: choice.label });
    if (screen === 'flowD_timing') setQual({ timing: choice.label });
    if (screen === 'flowF') setQual({ interest: choice.label });

    // flowG qualification
    if (screen === 'flowG_function') setQual({ function: choice.label });
    if (screen === 'flowG_geo') setQual({ geoArea: choice.label });
    if (screen === 'flowG_need') setQual({ needType: choice.label });

    // Capture context for flowB sub-selections
    if (screen === 'flowB_dd') setQual({ interest: choice.label });

    if (choice.action && choice.action.type === 'startDemo') {
      startDemoFlow(choice.action);
      return;
    }

    navigate(choice.target);
  };

  const handleFormSubmit = (formData) => {
    setLead(formData);
    // Navigate to thanks (for demo) or fallback confirmation
    if (screen === 'flowD_form' || screen === 'flowG_form') {
      navigate('flowD_thanks');
    } else {
      // Contact and generic forms navigate to thanks too
      navigate('flowD_thanks');
    }
  };

  const handleFreeTextSubmit = (text) => {
    if (screen === 'flowG_intro') {
      setLead({ customRequestText: text });
    } else {
      setLead({ note: text });
    }

    // If no inline success message, handle navigation
    if (!screenDef.successMessage) {
      if (screen === 'flowC_other') {
        navigate('flowG_form');
      }
    }
  };

  // Back button: show if history > 0, never on welcome or flowD_thanks
  const showBack = history.length > 0 && screen !== 'welcome' && screen !== 'flowD_thanks';

  // Thanks screen
  if (screenDef.component === 'thanks') {
    return (
      <div className="ds-panel">
        <div className="ds-panel-content">
          <div className="ds-thanks">
            <div className="ds-thanks-icon">✓</div>
            <div className="ds-message">
              <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>{screenDef.message}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FAQ screen
  if (screenDef.component === 'faq') {
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <div className="ds-faq">
            <div className="ds-faq-title">Domande Frequenti</div>
            {Object.entries(FAQ).map(([question, answer]) => (
              <div key={question} className="ds-faq-item">
                <div className="ds-faq-q">{question}</div>
                <div className="ds-faq-a">{answer}</div>
              </div>
            ))}
          </div>
          <div className="ds-button-grid" style={{ marginTop: '16px' }}>
            <button className="ds-choice-btn" onClick={() => startDemoFlow()}>
              <span className="ds-choice-label">Richiedi demo</span>
            </button>
            <button className="ds-choice-btn" onClick={() => navigate('flowF')}>
              <span className="ds-choice-label">Contatta il team</span>
            </button>
            <button className="ds-choice-btn" onClick={() => navigate('welcome')}>
              <span className="ds-choice-label">Torna al menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  if (screenDef.component === 'form') {
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <DemoForm formType={screenDef.formType} onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  // Free text screen
  if (screenDef.component === 'freetext') {
    return (
      <div className="ds-panel">
        {showBack && (
          <button className="ds-back-btn" onClick={back}>← Indietro</button>
        )}
        <div className="ds-panel-content">
          <FreeText
            message={screenDef.message}
            successMessage={screenDef.successMessage}
            successButtons={screenDef.successButtons}
            submitLabel={screenDef.submitLabel}
            onSubmit={handleFreeTextSubmit}
            onChoice={handleChoice}
          />
        </div>
      </div>
    );
  }

  // Standard screen: message + prompt + choices/ctas
  const isWelcome = screen === 'welcome';
  const buttons = screenDef.choices || screenDef.ctas || [];

  return (
    <div className="ds-panel">
      {showBack && (
        <button className="ds-back-btn" onClick={back}>← Indietro</button>
      )}
      <div className="ds-panel-content">
        {screenDef.title && <div className="ds-panel-title">{screenDef.title}</div>}
        <MessageBubble text={screenDef.message} />
        {screenDef.prompt && <div className="ds-prompt">{screenDef.prompt}</div>}
        {buttons.length > 0 && (
          <ButtonGrid
            choices={buttons}
            onSelect={handleChoice}
            columns={isWelcome ? 2 : 1}
            showSublabels={isWelcome}
          />
        )}
      </div>
    </div>
  );
}
