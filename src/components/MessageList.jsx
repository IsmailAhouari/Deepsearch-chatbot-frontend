import Message from './Message';
import TypingIndicator from './TypingIndicator';

export default function MessageList({ messages, isLoading }) {
  return (
    <>
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} isUser={msg.isUser} />
      ))}
      {isLoading && <TypingIndicator />}
    </>
  );
}
