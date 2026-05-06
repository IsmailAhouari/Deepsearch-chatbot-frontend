import { useState, useCallback } from 'react';

/**
 * Custom hook for managing chat state and logic
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback((text, isUser) => {
    setMessages((prev) => [...prev, { text, isUser, timestamp: Date.now() }]);
  }, []);

  const addMessages = useCallback((newMessages) => {
    setMessages((prev) => [...prev, ...newMessages]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const setLoadingState = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((err) => {
    setError(err);
  }, []);

  return {
    messages,
    isLoading,
    error,
    addMessage,
    addMessages,
    clearMessages,
    setMessages,
    setLoadingState,
    setErrorState,
  };
}
