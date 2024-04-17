import i18next from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import ru from './translations/ru.json';
import uk from './translations/uk.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uk: {
    translation: uk,
  }
};

i18next.use(initReactI18next).init({
  debug: true,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources,
});


export default i18next;