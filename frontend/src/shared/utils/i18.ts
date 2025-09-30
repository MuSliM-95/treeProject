
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import homeEN from '../../../public/locales/en/home.json'
import homeRU from '../../../public/locales/ru/home.json'
import treeEN from '../../../public/locales/en/tree.json'
import treeRU from '../../../public/locales/ru/tree.json'
import authEN from '../../../public/locales/en/auth.json'
import authRU from '../../../public/locales/ru/auth.json'
import privacyEN from '../../../public/locales/en/privacy.json'
import privacyRU from '../../../public/locales/ru/privacy.json'

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		debug: true,
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage', 'cookie']
		},
		resources: {
			en: { translation: homeEN, tree: treeEN, auth: authEN, privacy: privacyEN },
			ru: { translation: homeRU, tree: treeRU, auth: authRU, privacy: privacyRU }
		},
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
