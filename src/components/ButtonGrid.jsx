import React from 'react';

export default function ButtonGrid({ choices, onSelect, columns = 1, showSublabels = false }) {
  return (
    <div className={`ds-button-grid ${columns === 2 ? 'ds-button-grid--2col' : ''}`}>
      {choices.map((choice, i) => (
        <button
          key={i}
          className="ds-choice-btn"
          onClick={() => onSelect(choice)}
        >
          {choice.icon && <div className="ds-choice-icon">{choice.icon}</div>}
          <div className="ds-choice-content">
            <span className="ds-choice-label">{choice.label}</span>
            {showSublabels && choice.sublabel && (
              <span className="ds-choice-sublabel">{choice.sublabel}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
