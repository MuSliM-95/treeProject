import { NewVerificationFormDynamic } from '@/features/auth/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import { IProps } from '@/shared/types/locale.type'
import initTranslations from '@/shared/utils/i18n/i18n'

const i18nNamespaces = ['auth']

export default async function NewVerificationPage({ params }: IProps) {
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
			<NewVerificationFormDynamic />{' '}
		</TranslationsProvider>
	)
}
