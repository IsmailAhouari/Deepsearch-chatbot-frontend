
export default function MessageBubble({ text }) {
  if (!text) return null;

  return (
    <div className="ds-message">
      <div className="ds-message-text" style={{ whiteSpace: 'pre-line' }}>
        {text}
      </div>
    </div>
  );
}
