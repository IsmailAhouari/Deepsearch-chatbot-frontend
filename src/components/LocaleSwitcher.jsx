import { useTranslation } from 'react-i18next';

const LOCALES = [
  { code: 'en', flag: '🇬🇧', label: 'EN', ariaLabelKey: 'localeSwitcher.switchToEnglish' },
  { code: 'ar', flag: '🇸🇦', label: 'ع', ariaLabelKey: 'localeSwitcher.switchToArabic' },
];

export default function LocaleSwitcher() {
  const { t, i18n } = useTranslation('ui');
  const current = i18n.language?.split('-')[0] || 'en';

  return (
    <div className="ds-locale-switcher" aria-label={t('localeSwitcher.ariaLabel')}>
      {LOCALES.map(({ code, flag, label, ariaLabelKey }) => (
        <button
          key={code}
          className={`ds-locale-btn ${current === code ? 'ds-locale-btn--active' : ''}`}
          onClick={() => current !== code && i18n.changeLanguage(code)}
          aria-pressed={current === code}
          aria-label={t(ariaLabelKey)}
          disabled={current === code}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
