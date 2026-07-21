import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dirFor } from '../lib/direction.js';

export function useDirection() {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState(() => dirFor(i18n.language));

  useEffect(() => {
    const applyDir = (lng) => {
      const next = dirFor(lng);
      document.documentElement.lang = lng?.split('-')[0] ?? lng;
      document.documentElement.dir = next;
      setDir(next);
    };

    applyDir(i18n.language);
    i18n.on('languageChanged', applyDir);
    return () => i18n.off('languageChanged', applyDir);
  }, [i18n]);

  return dir;
}
