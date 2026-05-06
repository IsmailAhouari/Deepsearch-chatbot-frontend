import React, { useState } from 'react';

export function InputBar({ onSendMessage, disabled = false }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    // Auto-expand textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          className="input-field"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi il tuo messaggio... (il testo libero è monitorato per compliance)"
          rows="1"
          disabled={disabled}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={disabled || !input.trim()}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default InputBar;
