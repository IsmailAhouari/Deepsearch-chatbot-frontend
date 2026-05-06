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
];

export default function Sidebar() {
  const screen = useSession((s) => s.screen);
  const navigate = useSession((s) => s.navigate);
  const activeFlow = getActiveFlow(screen);

  const handleClick = (item) => {
    navigate(item.key);
  };

  return (
    <div className="ds-sidebar">
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
  );
}
