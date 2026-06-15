import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const SUPPORTED_LOCALES = ['it', 'en'];
const DEFAULT_LOCALE = 'it';

export function detectLocale() {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param && SUPPORTED_LOCALES.includes(param.toLowerCase())) {
    return param.toLowerCase();
  }
  const nav = navigator.language?.split('-')[0].toLowerCase();
  if (nav && SUPPORTED_LOCALES.includes(nav)) {
    return nav;
  }
  return DEFAULT_LOCALE;
}

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: detectLocale(),
    fallbackLng: DEFAULT_LOCALE,
    ns: ['flows', 'ui', 'qualification'],
    defaultNS: 'flows',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    interpolation: { escapeValue: false },
    saveMissing: import.meta.env.DEV,
  });

export default i18n;
