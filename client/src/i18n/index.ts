import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslations from './en.json';

const DEFAULT_LANGUAGE = 'en';
const FALLBACK_LANGUAGE = 'en';

i18next.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  resources: {
    en: {
      translation: englishTranslations,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
