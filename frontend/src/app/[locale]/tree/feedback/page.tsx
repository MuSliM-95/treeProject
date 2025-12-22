import { FeedbackFormDynamic } from '@/features/tree/components'

import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'
import i18nConfig from '../../../../../i18nConfig'
import { Metadata } from 'next'
import { createAlternates } from '@/shared/utils'
import { IProps } from '@/shared/types/locale.type'

const i18nNamespaces = ['tree']

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
	const { locale } = await params
	const { t } = await initTranslations({
		locale: locale,
		namespaces: i18nNamespaces
	})
	return {
		title: t('feedback.meta.title'),
		description: t('feedback.meta.description'),

		openGraph: {
			title: t('feedback.meta.title'),
			description: t('feedback.meta.description'),
			url: createAlternates('/tree/feedback').canonical,
			siteName: t('feedback.meta.name'),
		},
		twitter: {
			title: t('feedback.meta.title'),
			description: t('feedback.meta.description')
		},
		alternates: createAlternates('/tree/feedback')
	}
}

export const revalidate = false

export const dynamic = 'force-static'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function FeedbackPage({
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
			<main className='bg-background text-foreground h-screen w-full'>
				<FeedbackFormDynamic />
			</main>
		</TranslationsProvider>
	)
}
