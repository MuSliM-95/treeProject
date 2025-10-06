import AboutProject from '@/features/home/components/AboutProject'

import initTranslations from '@/shared/utils/i18n/i18n'

const i18nNamespaces = ['about']

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
	return <AboutProject t={t} />
}
