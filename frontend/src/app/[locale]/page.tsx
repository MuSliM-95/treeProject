import HomePage from '@/features/home/components/HomePage'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'

import initTranslations from '../../shared/utils/i18n/i18n'

const i18nNamespaces = ['home']

export default async function Home({ params }: { params: { locale: 'ru' | 'en' } }) {
	const { locale } = await params
	const { t, resources } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<HomePage t={t} locale={locale}/>
		</TranslationsProvider>
	)
}
