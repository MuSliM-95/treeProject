import { Terms } from '@/features/home/components'

import initTranslations from '@/shared/utils/i18n/i18n'

const i18nNamespaces = ['terms']

export default async function TermsPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return <Terms t={t} />
}
