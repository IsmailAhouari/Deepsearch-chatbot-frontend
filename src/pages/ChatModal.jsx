import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

export function ChatModal() {
  const navigate = useNavigate();
  const endSession = useChatStore(state => state.endSession);
  const sessionActive = useChatStore(state => state.sessionActive);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (!sessionActive) {
      navigate('/');
      return;
    }

    // Session timer
    let seconds = 24 * 60 * 60;
    timerIntervalRef.current = setInterval(() => {
      seconds--;
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      const timerEl = document.getElementById('sessionTimer');
      if (timerEl) {
        timerEl.textContent = 
          String(h).padStart(2, '0') + ':' + 
          String(m).padStart(2, '0') + ':' + 
          String(s).padStart(2, '0');
      }
      if (seconds <= 0) {
        clearInterval(timerIntervalRef.current);
        handleClose();
      }
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [sessionActive, navigate]);

  const handleClose = () => {
    endSession();
    navigate('/');
  };

  return (
    <div className="modal-overlay active">
      <div className="modal-container">
        <Header onClose={handleClose} />

        <div className="disclaimer-banner">
          <span className="icon">⚠️</span>
          <span>
            <strong>Avvertenza legale:</strong> Questo assistente non fornisce consulenza legale, finanziaria o di valutazione del rischio. Tutte le valutazioni richiedono la revisione di un analista umano. Nessuno scoring algoritmico viene visualizzato.{' '}
            <a href="#">Privacy Policy</a> • <a href="#">Termini</a>
          </span>
        </div>

        <div className="progress-bar">
          <div className="fill" id="progressFill" style={{ width: '0%' }}></div>
        </div>

        <div className="modal-body">
          <Sidebar />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
