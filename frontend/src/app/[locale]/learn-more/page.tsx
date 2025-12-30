import { Metadata } from 'next'

import { AboutProjectDynamic } from '@/features/home/components/AboutProject'

import initTranslations from '@/shared/utils/i18n/i18n'

import i18nConfig from '../../../../i18nConfig'
import { createAlternates } from '@/shared/utils'
import { CreateOpenGraph } from '@/shared/utils/seo/create.open.graph'
import { createTwitterMeta } from '@/shared/utils/seo/create.twitter'
import { IProps } from '@/shared/types/locale.type'
import { pageConfig } from '@/shared/config'

const i18nNamespaces = ['about']

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return {
		title: t('meta.title'),
		description: t('meta.description'),
		openGraph: CreateOpenGraph(t, createAlternates(`/${pageConfig.info.learn_more}`).canonical, locale),
		twitter: createTwitterMeta(t),
		alternates: createAlternates(`/${pageConfig.info.learn_more}`)
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
