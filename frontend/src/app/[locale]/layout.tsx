// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import ConsentBanner from '@/shared/components/ui/ConsentBanner'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import { IProps } from '@/shared/types/locale.type'
import { createAlternates } from '@/shared/utils'
import { CreateOpenGraph } from '@/shared/utils/seo/create.open.graph'
import { createTwitterMeta } from '@/shared/utils/seo/create.twitter'

import initTranslations from '../../shared/utils/i18n/i18n'

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
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
					url: '/images/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png'
				},
				{
					url: '/images/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png'
				}
			],
			apple: {
				url: '/images/apple-touch-icon.png',
				sizes: '180x180'
			}
		},
		verification: {
			google: 'K4NjTpnl-Yu4tWYOS-afGUtZA3PIIZM-AH30tKuJrzo',
			yandex: '016d187c35064f23'
		},
		openGraph: CreateOpenGraph(
			t,
			createAlternates('/tree', locale).canonical,
			locale
		),
		twitter: createTwitterMeta(t),
		alternates: createAlternates('/tree', locale)
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
