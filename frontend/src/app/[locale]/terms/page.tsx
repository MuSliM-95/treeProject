import { TermsDynamic } from '@/features/home/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'
import i18nConfig from '../../../../i18nConfig'
import { Metadata } from 'next'
import { createAlternates } from '@/shared/utils'
import { CreateOpenGraph } from '@/shared/utils/seo/create.open.graph'
import { createTwitterMeta } from '@/shared/utils/seo/create.twitter'
import { IProps } from '@/shared/types/locale.type'

const i18nNamespaces = ['terms']


export async function generateMetadata({ params }: IProps): Promise<Metadata> {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return {
		title: t('meta.title'),
		description: t('meta.description'),
		openGraph: CreateOpenGraph(t, createAlternates('/terms').canonical, locale),
		twitter: createTwitterMeta(t),
		alternates: createAlternates('/terms')
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
