import React from 'react';
import { useSession } from '../store/sessionStore.js';
import { getActiveFlow } from '../flows/index.js';

const SIDEBAR_ITEMS = [
  { key: 'flowA', label: 'Panoramica piattaforma' },
  { key: 'flowB', label: "Casi d'uso" },
  { key: 'flowC', label: 'A chi si rivolge' },
  { key: 'flowD_interest', label: 'Richiedi demo' },
  { key: 'flowE', label: 'Informazioni commerciali' },
  { key: 'flowF', label: 'Contatta il team' },
  { key: 'flowG_intro', label: 'Altro' },
  { key: 'faq', label: 'FAQ' },
];

export default function Sidebar() {
  const screen = useSession((s) => s.screen);
  const navigate = useSession((s) => s.navigate);
  const mobileSidebarOpen = useSession((s) => s.mobileSidebarOpen);
  const activeFlow = getActiveFlow(screen);

  const startDemoFlow = useSession((s) => s.startDemoFlow);

  const handleClick = (item) => {
    if (item.key === 'flowD_interest') {
      startDemoFlow();
    } else {
      navigate(item.key);
    }
  };

  return (
    <div className={`ds-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div className="ds-sidebar-nav">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive =
            (item.key === 'flowD_interest' && activeFlow === 'flowD') ||
            (item.key !== 'flowD_interest' && activeFlow === item.key);

          return (
            <button
              key={item.key}
              className={`ds-sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="ds-sidebar-footer" style={{ padding: '16px 16px 0 16px', marginTop: 'auto' }}>
        <button 
          className="ds-choice-btn" 
          onClick={() => navigate('welcome')} 
          style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px 10px' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="ds-choice-label" style={{ fontSize: '10px' }}>Torna al Menu</span>
        </button>
      </div>
    </div>
  );
}
