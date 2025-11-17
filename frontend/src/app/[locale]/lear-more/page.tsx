import { AboutProjectDynamic } from '@/features/home/components/AboutProject'

import initTranslations from '@/shared/utils/i18n/i18n'

import i18nConfig from '../../../../i18nConfig'

const i18nNamespaces = ['about']

export const revalidate = false

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function AboutProjectPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return <AboutProjectDynamic t={t} />
}
