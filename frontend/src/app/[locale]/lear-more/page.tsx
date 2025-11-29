import { Metadata } from 'next'

import { AboutProjectDynamic } from '@/features/home/components/AboutProject'

import initTranslations from '@/shared/utils/i18n/i18n'

import i18nConfig from '../../../../i18nConfig'
import { createAlternates } from '@/shared/utils'

const i18nNamespaces = ['about']

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
			url: createAlternates(locale, '/lear-more').canonical,
			siteName: t('meta.name'),
		},
		twitter: {
			title: t('meta.title'),
			description: t('meta.description')
		},
		alternates: createAlternates(locale, '/lear-more')
	}
}

export const revalidate = false

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function AboutProjectPage({ params }: IProps) {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return <AboutProjectDynamic t={t} />
}
