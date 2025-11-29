import { TermsDynamic } from '@/features/home/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'
import i18nConfig from '../../../../i18nConfig'
import { Metadata } from 'next'
import { createAlternates } from '@/shared/utils'

const i18nNamespaces = ['terms']

interface IProps {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
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
			url: createAlternates(locale, '/terms').canonical,
			siteName: t('meta.name'),
		},
		twitter: {
			title: t('meta.title'),
			description: t('meta.description')
		},
		alternates: createAlternates(locale, '/terms')
	}
}


export const revalidate = false

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function TermsPage({
	params
}: IProps) {
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
			{' '}
			<TermsDynamic />{' '}
		</TranslationsProvider>
	)
}
