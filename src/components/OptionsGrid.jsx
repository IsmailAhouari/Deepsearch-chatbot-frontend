import React from 'react';

export function OptionsGrid({ options, onOptionClick }) {
  return (
    <div className="options-grid">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-btn"
          onClick={() => onOptionClick(option)}
        >
          <span className="opt-label">{option.label}</span>
          <span className="opt-desc">{option.description}</span>
        </button>
      ))}
    </div>
  );
}

export default OptionsGrid;
