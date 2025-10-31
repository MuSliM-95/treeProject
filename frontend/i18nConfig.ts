import 'next-i18n-router'

const i18nConfig = {
	locales: ['ru', 'en'],
	defaultLocale: 'ru',
	fallbackLng: 'ru',
	order: ['cookie'],
	lookupCookie: 'NEXT_LOCALE',
	caches: [],
	localeDetector: (request: unknown, config: unknown) => {
		return 'the-locale'
	},
	prefixDefault: true
}

export default i18nConfig
