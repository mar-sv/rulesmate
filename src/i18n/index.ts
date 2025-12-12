import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import sv from './locales/sv.json';
import fr from './locales/fr.json';

// Map browser language codes to our supported languages
const languageMap: Record<string, string> = {
  'sv': 'sv',
  'sv-SE': 'sv',
  'fr': 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
};

const resources = {
  en: { translation: en },
  sv: { translation: sv },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'sv', 'fr'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'rulesmate-language',
      convertDetectedLanguage: (lng) => {
        // Map detected language to our supported languages
        if (languageMap[lng]) return languageMap[lng];
        // Check if it starts with a supported language code
        const shortCode = lng.split('-')[0];
        if (languageMap[shortCode]) return languageMap[shortCode];
        return 'en';
      },
    },
  });

// Helper to get the language name for backend
export const getLanguageName = (code: string): string => {
  const names: Record<string, string> = {
    en: 'English',
    sv: 'Swedish',
    fr: 'French',
  };
  return names[code] || 'English';
};

export default i18n;
