import { useState } from 'react';
import Header from '../components/Header';
import ChatContainer from '../components/ChatContainer';
import MessageList from '../components/MessageList';
import InputArea from '../components/InputArea';
import EmptyState from '../components/EmptyState';
import '../styles/ChatBot.css';

export default function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text) => {
    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's a fascinating question! Let me explore the depths of this topic for you...",
        "I'm diving deep into this query. Here's what I've discovered...",
        "Interesting! This connects to several key areas of knowledge...",
        "Let me search through multiple perspectives on this...",
        "Great question! This opens up some profound insights...",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, isUser: false }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <div className="background"></div>
      <div className="noise"></div>

      <div className="container">
        <Header />

        <ChatContainer>
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </ChatContainer>

        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </>
  );
}
