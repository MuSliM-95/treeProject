import HomePage from '@/features/home/components/HomePage'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'

import initTranslations from '../../shared/utils/i18n/i18n'
import i18nConfig from '../../../i18nConfig'

const i18nNamespaces = ['home']

export const revalidate = 86400

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}
  

export default async function Home({
	params
}: {
	params: Promise<{ locale: string }>
}) {
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
			<HomePage t={t} locale={locale} />
		</TranslationsProvider>
	)
}
