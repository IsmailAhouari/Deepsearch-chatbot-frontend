import React, { useState, useRef, useEffect } from 'react';

const FAQ_DATA = [
  {
    q: "Cos’è DeepSearch?",
    a: "Una piattaforma di intelligence che individua relazioni tra soggetti, controparti e segnali di rischio."
  },
  {
    q: "È un chatbot?",
    a: "No. Il chatbot guida l’utente. DeepSearch è una piattaforma di analisi."
  },
  {
    q: "Posso richiedere una demo?",
    a: "Sì, è possibile richiedere una demo personalizzata."
  },
  {
    q: "A chi è rivolto?",
    a: "Funzioni risk, legale, compliance, HR e direzione."
  }
];

export default function FAQButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="ds-faq-floating-container" ref={containerRef}>
      {isOpen && (
        <div className="ds-faq-popup ds-scale-in">
          <div className="ds-faq-popup-header">
            <h3>FAQ automatiche</h3>
            <button className="ds-faq-close-mini" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="ds-faq-popup-content">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="ds-faq-popup-item">
                <div className="ds-faq-popup-q">{item.q}</div>
                <div className="ds-faq-popup-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button 
        className={`ds-faq-trigger ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Apri FAQ"
      >
        {!isOpen && <span className="ds-faq-label">FAQ</span>}
        <span className="ds-faq-icon">?</span>
      </button>
    </div>
  );
}
