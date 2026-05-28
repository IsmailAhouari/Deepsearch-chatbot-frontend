
export function Header({ onClose }) {
  return (
    <div className="modal-header">
      <div className="brand">
        <div className="brand-icon">DS</div>
        <div>
          <div className="brand-text">DeepSearch AI Assistant</div>
          <div className="brand-sub">Interfaccia di Intelligence per Analisi del Rischio</div>
        </div>
      </div>
      <div className="session-info">
        <span id="sessionTimer">23:59:59</span>
        <span className="status-badge success">● Sicuro</span>
      </div>
      <button
        className="close-btn"
        onClick={onClose}
        aria-label="Close session"
      >
        ×
      </button>
    </div>
  );
}

export default Header;
