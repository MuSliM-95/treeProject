import { MetaData } from '..'
import React from 'react'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'

interface Props {
	locale: string
}

export const MetaDataWrapper: React.FC<Props> = async ({ locale }: Props) => {
	const { t, resources } = await initTranslations({
		locale: locale,
		namespaces: ['home']
	})
	return (
		<TranslationsProvider
			namespaces={['home']}
			locale={locale}
			resources={resources}
		>
			<MetaData t={t} locale={locale} />
		</TranslationsProvider>
	)
}
