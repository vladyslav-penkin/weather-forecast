import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './translations/eng.json';
import ru from './translations/ru.json';
import uk from './translations/uk.json';

const resources = {
  eng: {
    translation: eng,
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
  lng: 'eng', 
  fallbackLng: 'eng',
  interpolation: {
    escapeValue: false,
  },
  resources,
});


export default i18next;