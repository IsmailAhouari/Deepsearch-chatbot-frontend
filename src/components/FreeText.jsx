import React, { useState } from 'react';
import ButtonGrid from './ButtonGrid.jsx';

export default function FreeText({ message, successMessage, successButtons, submitLabel = 'Invia', onSubmit, onChoice }) {
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    if (successMessage) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted && successMessage) {
    return (
      <div className="ds-freetext">
        <div className="ds-message">
          <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>{successMessage}</div>
        </div>
        {successButtons && (
          <div style={{ marginTop: '16px' }}>
            <ButtonGrid choices={successButtons} onSelect={onChoice} />
          </div>
        )}
      </div>
    );
  }

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
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
