import { Exists } from '@/features/auth/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'

const i18nNamespaces = ['auth']

export default async function ExistsPage({
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
			<Exists />{' '}
		</TranslationsProvider>
	)
}
