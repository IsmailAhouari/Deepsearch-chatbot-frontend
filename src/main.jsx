import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n.js';
import './styles/tokens.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
);
