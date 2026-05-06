import { useState } from 'react';

export default function InputArea({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        className="input-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What would you like to explore..."
        disabled={isLoading}
        autoFocus
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={isLoading || !input.trim()}
      >
        Send
      </button>
    </div>
  );
}
