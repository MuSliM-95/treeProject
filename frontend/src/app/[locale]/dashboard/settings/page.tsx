
import initTranslations from '@/shared/utils/i18n/i18n'
import { SettingsForm } from '@/features/user/components'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'

const i18nNamespaces = ['auth']

export default async function SettingsPage({params}: { params: { locale: string } }) {
	const { locale } = await params
	const { resources } = await initTranslations({
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
			<SettingsForm />{' '}
		</TranslationsProvider>
	)
}
