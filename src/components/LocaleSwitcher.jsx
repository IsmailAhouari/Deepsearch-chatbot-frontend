import { useTranslation } from 'react-i18next';

const LOCALES = [
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
];

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.split('-')[0] || 'it';

  return (
    <div className="ds-locale-switcher" aria-label="Language switcher">
      {LOCALES.map(({ code, flag, label }) => (
        <button
          key={code}
          className={`ds-locale-btn ${current === code ? 'ds-locale-btn--active' : ''}`}
          onClick={() => current !== code && i18n.changeLanguage(code)}
          aria-pressed={current === code}
          aria-label={code === 'it' ? 'Switch to Italian' : 'Switch to English'}
          disabled={current === code}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
