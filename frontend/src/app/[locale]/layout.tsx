// app/[locale]/layout.tsx
import type { Metadata } from 'next'


import i18nConfig from '../../../i18nConfig'
import initTranslations from '../../shared/utils/i18n/i18n'

export async function generateMetadata({
	params
}: {
	params: { locale: string }
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
			icon: '/images/share-2.svg',
			shortcut: '/images/share-2.svg',
			apple: '/images/share-2.svg'
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
			images: [{ url: 'https://genealogyhub.ru/images/og-tree.png' }]
		}
	}
}


export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	return <>{children}</>
}
