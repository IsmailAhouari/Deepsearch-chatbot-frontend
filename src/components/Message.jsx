export default function Message({ text, isUser }) {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">{text}</div>
    </div>
  );
}
