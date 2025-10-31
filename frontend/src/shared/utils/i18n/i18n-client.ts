import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import commonEN from './messages/en/common.json'
import commonRU from './messages/ru/common.json'
import treeEN from './messages/en/tree.json'
import treeRU from './messages/ru/tree.json'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		detection: {
			order: ['cookie'],
			lookupCookie: 'NEXT_LOCALE',
			caches: ['cookie']
		},

		resources: {
			en: { tree: treeEN, common: commonEN },
			ru: { tree: treeRU, common: commonRU }
		},
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
