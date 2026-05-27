import React from 'react';

export default function ButtonGrid({ choices, onSelect, columns = 1, showSublabels = false }) {
  return (
    <div className={`ds-button-grid ${columns === 2 ? 'ds-button-grid--2col' : ''}`}>
      {choices.map((choice, i) => {
        const isDemoCta = choice.action?.type === 'startDemo';
        return (
          <button
            key={i}
            className={`ds-choice-btn${isDemoCta ? ' ds-choice-btn--demo' : ''}`}
            onClick={() => onSelect(choice)}
          >
            {choice.icon && <div className="ds-choice-icon">{choice.icon}</div>}
            <div className="ds-choice-content">
              <span className="ds-choice-label">{choice.label}</span>
              {showSublabels && choice.sublabel && (
                <span className="ds-choice-sublabel">{choice.sublabel}</span>
              )}
            </div>
            {isDemoCta && <span className="ds-choice-demo-arrow">→</span>}
          </button>
        );
      })}
    </div>
  );
}
