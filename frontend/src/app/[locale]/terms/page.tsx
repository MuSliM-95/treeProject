import { TermsDynamic } from '@/features/home/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'
import i18nConfig from '../../../../i18nConfig'

const i18nNamespaces = ['terms']

export const revalidate = false

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function TermsPage({
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
			{' '}
			<TermsDynamic />{' '}
		</TranslationsProvider>
	)
}
