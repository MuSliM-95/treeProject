// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import ConsentBanner from '@/shared/components/ui/ConsentBanner'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import { createAlternates } from '@/shared/utils'

import initTranslations from '../../shared/utils/i18n/i18n'
import { CreateOpenGraph } from '@/shared/utils/seo/create.open.graph'
import { createTwitterMeta } from '@/shared/utils/seo/create.twitter'
import { IProps } from '@/shared/types/locale.type'

export async function generateMetadata({
	params
}: IProps): Promise<Metadata> {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: ['meta']
	})

	return {
		metadataBase: new URL('https://genealogyhub.ru'),
		title: t('meta.title'),
		description: t('meta.description'),
		icons: {
			icon: [
				{
					url: 'https://genealogyhub.ru/images/favicon.svg',
					type: 'image/svg+xml'
				}
			],

			apple: [
				{
					url: 'https://genealogyhub.ru/images/favicon.png',
					sizes: '180x180',
					type: 'image/png'
				}
			]
		},
		verification: {
			google: 'K4NjTpnl-Yu4tWYOS-afGUtZA3PIIZM-AH30tKuJrzo',
			yandex: '016d187c35064f23'
		},
		openGraph: CreateOpenGraph(t, createAlternates('/tree').canonical, locale),
		twitter: createTwitterMeta(t),
		alternates: createAlternates('/tree')
	}
}

interface ILayout {
	children: ReactNode
	params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: ILayout) {
	const { locale } = await params
	const { t, resources } = await initTranslations({
		locale: locale,
		namespaces: ['common']
	})
	return (
		<>
			<TranslationsProvider
				namespaces={['common']}
				locale={locale}
				resources={resources}
			>
				<ConsentBanner />

				{children}
			</TranslationsProvider>
		</>
	)
}
