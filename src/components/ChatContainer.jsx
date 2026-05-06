import { useRef, useEffect } from 'react';

export default function ChatContainer({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div className="chat-container" ref={containerRef}>
      {children}
    </div>
  );
}
