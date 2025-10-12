// app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import ConsentBanner from '@/shared/components/ui/ConsentBanner'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'

import i18nConfig from '../../../i18nConfig'
import initTranslations from '../../shared/utils/i18n/i18n'

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
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
			icon: 'https://genealogyhub.ru/images/favicon.svg',
			shortcut: 'https://genealogyhub.ru/images/favicon.svg',
			apple: 'https://genealogyhub.ru/images/favicon.svg'
		},
		verification: {
			google: 'K4NjTpnl-Yu4tWYOS-afGUtZA3PIIZM-AH30tKuJrzo',
			yandex: '016d187c35064f23'
		},
		openGraph: {
			title: t('meta.title'),
			description: t('meta.description'),
			url:
				locale === 'en'
					? 'https://genealogyhub.ru/en'
					: 'https://genealogyhub.ru/ru',
			siteName: t('meta.name'),
			locale: locale === 'en' ? 'en_US' : 'ru_RU',
			images: [
				{
					url: 'https://genealogyhub.ru/images/favicon.png',
					width: 1200,
					height: 630,
					alt: 'Genealogy Hub — сайт о генеалогии'
				}
			],
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title: t('meta.title'),
			description: t('meta.description'),
			images: ['https://genealogyhub.ru/images/favicon.png']
		},
		alternates: {
			canonical:
				locale === 'en'
					? 'https://genealogyhub.ru/en'
					: 'https://genealogyhub.ru/ru',
			languages: {
				en: 'https://genealogyhub.ru/en',
				ru: 'https://genealogyhub.ru/ru'
			}
		},
		
	}
}

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
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
