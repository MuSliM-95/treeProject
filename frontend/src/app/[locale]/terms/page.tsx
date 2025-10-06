import initTranslations from '@/shared/utils/i18n/i18n'
import { Terms } from '@/features/home/components'
const i18nNamespaces = ['terms']

export default async function TermsPage({
	params
}: {
	params: { locale: string }
}) {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return <Terms t={t} />
}
