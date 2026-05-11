import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import MessageBubble, { SystemMessage } from './MessageBubble';
import OptionsGrid from './OptionsGrid';
import InputBar from './InputBar';
import DynamicForm from './DynamicForm';
import { checkCompliance, renderTemplate } from '../engine/flowEngine';

// Import all flows
import welcomeFlow from '../data/flows/welcome.json';
import overviewFlow from '../data/flows/overview.json';
import overviewRiskFlow from '../data/flows/overview-risk.json';
import usecasesFlow from '../data/flows/usecases.json';
import usecasesDueDiligenceFlow from '../data/flows/usecases-due-diligence.json';
import usecasesInvestigationsFlow from '../data/flows/usecases-investigations.json';
import demoFlow from '../data/flows/demo.json';
import contactFlow from '../data/flows/contact.json';
import commercialFlow from '../data/flows/commercial.json';
import audienceFlow from '../data/flows/audience.json';
import audienceSecurityFlow from '../data/flows/audience-security.json';
import audienceLegalFlow from '../data/flows/audience-legal.json';

const FLOWS = {
  welcome: welcomeFlow,
  overview: overviewFlow,
  'overview-risk': overviewRiskFlow,
  usecases: usecasesFlow,
  'usecases-due-diligence': usecasesDueDiligenceFlow,
  'usecases-investigations': usecasesInvestigationsFlow,
  demo: demoFlow,
  contact: contactFlow,
  commercial: commercialFlow,
  audience: audienceFlow,
  'audience-security': audienceSecurityFlow,
  'audience-legal': audienceLegalFlow,
};

function ChatWindow() {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesRef = useRef(null);

  const {
    messages,
    isTyping,
    currentStep,
    userData,
    addMessage,
    setTyping,
    nextStep,
    updateUserData,
    showSidebar,
    clearMessages,
  } = useChatStore();

  // Get flow ID from location pathname
  const getFlowIdFromPath = (pathname) => {
    if (pathname === '/') return 'welcome';
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 1) {
      return parts.join('-');
    }
    return parts[0];
  };

  const flowId = getFlowIdFromPath(location.pathname);
  const flow = FLOWS[flowId];

  const renderStep = useCallback((stepIndex) => {
    if (!flow || !flow.steps[stepIndex]) return;

    const step = flow.steps[stepIndex];
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      if (step.type === 'message') {
        const content = renderTemplate(step.content, userData);
        addMessage(content, 'bot');
      } else if (step.type === 'form') {
        addMessage(`Compila il modulo di contatto per procedere.`, 'bot');
      }
    }, 700);
  }, [flow, userData, setTyping, addMessage]);

  // Render initial step when flow changes
  useEffect(() => {
    if (flow) {
      clearMessages();
      setTimeout(() => renderStep(0), 50);
    }
  }, [flowId, clearMessages, renderStep, flow]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option) => {
    addMessage(option.label, 'user');

    if (option.action === 'navigate') {
      if (option.key) {
        updateUserData({ [option.key]: option.label });
      }
      // Show sidebar when navigating to non-welcome flows
      if (option.target !== '/') {
        showSidebar();
      }
      navigate(option.target);
    } else if (option.action === 'select_option') {
      updateUserData({ [option.key]: option.label });
      nextStep();
      renderStep(currentStep + 1);
    } else if (option.action === 'close') {
      navigate('/');
    } else if (option.action === 'download') {
      addMessage(
        '<span class="status-badge success">• Download in preparazione...</span>',
        'bot'
      );
    } else {
      nextStep();
      renderStep(currentStep + 1);
    }
  };

  const handleFormSubmit = (formData) => {
    updateUserData(formData);
    addMessage(
      '<span class="status-badge success">• Sincronizzazione CRM in corso...</span>',
      'bot'
    );

    setTimeout(() => {
      nextStep();
      renderStep(currentStep + 1);
    }, 1200);
  };

  const handleUserMessage = (text) => {
    const prohibited = checkCompliance(text);

    addMessage(text, 'user');

    if (prohibited.length > 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        const warning = `<div class="msg-header">⚠️ Avviso di Compliance — Flusso H Attivato</div>
Il tuo messaggio contiene termini che richiedono <strong>revisione umana obbligatoria</strong>: <em>${prohibited.join(
          ', '
        )}</em><br><br>
DeepSearch non fornisce punteggi di rischio automatizzati. Tutte le valutazioni richiedono validazione analista.`;
        addMessage(warning, 'warning');
      }, 500);
      return;
    }

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage(
        '<strong>Per evitare risposte generiche, seleziona una delle seguenti opzioni:</strong>',
        'bot'
      );
    }, 1000);
  };

  const currentStepData = flow?.steps[currentStep];
  const showForm = currentStepData?.type === 'form';
  const showOptions = currentStepData?.options && !showForm;

  return (
    <div className="chat-panel">
      <div className="messages-area" ref={messagesRef}>
        {messages.length === 0 && !isTyping && (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            Inizio della conversazione...
          </div>
        )}

        {messages.map((msg) => {
          if (msg.type === 'warning') {
            return <SystemMessage key={msg.id} message={msg.content} type="warning" />;
          }
          return <MessageBubble key={msg.id} message={msg.content} type={msg.type} />;
        })}

        {isTyping && <MessageBubble message="" type="typing" />}

        {showOptions && (
          <OptionsGrid options={currentStepData.options} onOptionClick={handleOptionClick} />
        )}

        {showForm && currentStepData.formType && (
          <DynamicForm formType={currentStepData.formType} onSubmit={handleFormSubmit} />
        )}
      </div>

      <InputBar onSendMessage={handleUserMessage} disabled={isTyping} />
    </div>
  );
}

export default ChatWindow;
