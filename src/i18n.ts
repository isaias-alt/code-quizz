import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguadeDetector from "i18next-browser-languagedetector"

export default i18next.use(LanguadeDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'start': 'Start',
        'reset': 'Reset Game',
        'corrects': 'corrects',
        'incorrects': 'incorrects',
        'unanswered': 'unanswered',
      }
    },
    es: {
      translation: {
        'start': 'Empezar',
        'reset': 'Reiniciar Juego',
        'corrects': 'corretas',
        'incorrects': 'incorrectas',
        'unanswered': 'sin responder',
      }
    }
  }
})