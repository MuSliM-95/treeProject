import { Metadata } from 'next'

import HomePage from '@/features/home/components/HomePage'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import { IProps } from '@/shared/types/locale.type'
import { createAlternates } from '@/shared/utils'
import { CreateOpenGraph } from '@/shared/utils/seo/create.open.graph'
import { createTwitterMeta } from '@/shared/utils/seo/create.twitter'

import i18nConfig from '../../../i18nConfig'
import initTranslations from '../../shared/utils/i18n/i18n'

const i18nNamespaces = ['home']

export const revalidate = 86400

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
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
		openGraph: CreateOpenGraph(
			t,
			createAlternates('/').canonical,
			locale
		),
		twitter: createTwitterMeta(t),
		alternates: createAlternates('/')
	}
}

export default async function Home({ params }: IProps) {
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
