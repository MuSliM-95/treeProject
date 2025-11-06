import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'

import { TreeLink } from '@/features/tree/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'

interface IProps {
	params: Promise<{ token: string; locale: string }>
}

const i18nNamespaces = ['tree']
export default async function LinkPage({ params }: IProps) {
	const { token, locale } = await params

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
			<ReactFlowProvider>
				<TreeLink token={token} />
			</ReactFlowProvider>
		</TranslationsProvider>
	)
}
