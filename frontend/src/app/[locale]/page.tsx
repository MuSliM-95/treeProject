import { Metadata } from 'next'

import HomePage from '@/features/home/components/HomePage'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'

import i18nConfig from '../../../i18nConfig'
import initTranslations from '../../shared/utils/i18n/i18n'
import { createAlternates } from '@/shared/utils'

const i18nNamespaces = ['home']

export const revalidate = 86400

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})

	return {
		title: t('meta.title'),
		description: t('meta.description'),

		openGraph: {
			title: t('meta.title'),
			description: t('meta.description'),
			url: createAlternates(locale, '/').canonical,
			siteName: t('meta.name'),
		},
		twitter: {
			title: t('meta.title'),
			description: t('meta.description')
		},
		alternates: createAlternates(locale, '/')
	}
}

export default async function Home({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const { t, resources } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<HomePage t={t} locale={locale} />
		</TranslationsProvider>
	)
}
