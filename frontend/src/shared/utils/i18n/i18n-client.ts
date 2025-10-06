import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import treeEN from './messages/en/tree.json'
import treeRU from './messages/ru/tree.json'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		detection: {
			order: ['cookie', 'htmlTag', 'navigator'],
			lookupCookie: 'NEXT_LOCALE',  
		},
	
		resources: {
			en: { tree: treeEN },
			ru: { tree: treeRU }
		},
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
