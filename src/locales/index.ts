import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@/locales/en/translation';
import translationVN from '@/locales/vn/translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vn: {
        translation: translationVN,
      },
      en: {
        translation: translationEN,
      },
    },
    lng: 'vn',
    fallbackLng: 'vn',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });

export default i18n;
