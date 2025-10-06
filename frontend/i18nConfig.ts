import 'next-i18n-router'

const i18nConfig = {
	locales: ['ru', 'en'],
	defaultLocale: 'en',
	localeDetector: (request: unknown, config: unknown) => {
		return 'the-locale'
	},
	prefixDefault: true
}

export default i18nConfig
