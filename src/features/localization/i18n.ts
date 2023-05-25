import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Languages } from 'utils/constants/constants';

export const supportedLngs = [Languages.RU, Languages.EN];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.RU,
    supportedLngs,
    detection: {
      order: ['cookie', 'sessionStorage', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

export default i18n;
