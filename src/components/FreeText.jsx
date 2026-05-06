import React, { useState } from 'react';

export default function FreeText({ message, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
  };

  return (
    <div className="ds-freetext">
      {message && (
        <div className="ds-message">
          <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>{message}</div>
        </div>
      )}
      <form className="ds-freetext-form" onSubmit={handleSubmit}>
        <textarea
          className="ds-freetext-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi la tua richiesta..."
          rows="3"
        />
        <button type="submit" className="ds-submit-btn" disabled={!text.trim()}>
          Invia
        </button>
      </form>
    </div>
  );
}
