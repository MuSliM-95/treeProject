import { ProfileDynamic } from '@/features/user/components/Profile'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'

const i18nNamespaces = ['auth']

export default async function ProfilePage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
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
			<ProfileDynamic /> 
		</TranslationsProvider>
	)
}
