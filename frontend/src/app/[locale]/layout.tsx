// app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import i18nConfig from '../../../i18nConfig'
import initTranslations from '../../shared/utils/i18n/i18n'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import ConsentBanner from '@/shared/components/ui/ConsentBanner'


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
		title: t('meta.title'),
		description: t('meta.description'),
		icons: {
			icon: '/images/favicon.svg',
			shortcut: '/images/favicon.svg',
			apple: '/images/favicon.svg'
		},
		verification: {
			google: 'K4NjTpnl-Yu4tWYOS-afGUtZA3PIIZM-AH30tKuJrzo',
			yandex: '016d187c35064f23'
		},
		openGraph: {
			title: t('meta.title'),
			description: t('description'),
			url: 'https://genealogyhub.ru',
			siteName: t('meta.name'),
			images: [{ url: 'https://genealogyhub.ru/images/favicon.png' }]
		}
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
	const { resources } = await initTranslations({
		locale: locale,
		namespaces: ['common']
	})
	return (
		<TranslationsProvider
			namespaces={['common']}
			locale={locale}
			resources={resources}
		>
			<ConsentBanner />
			{children}
		</TranslationsProvider>
	)
}
