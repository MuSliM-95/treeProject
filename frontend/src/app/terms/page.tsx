'use client'

import { useTranslation } from 'react-i18next'

import { InfoNavProvider } from '@/shared/providers'

export default function TermsPage() {
	const { t } = useTranslation('privacy')

	const sections = t('termsPage', { returnObjects: true }) as Record<
		string,
		{ title: string; text: string }
	>

	return (
		<InfoNavProvider>
			<div className='mx-auto max-w-3xl p-4'>
				<h1 className='mb-6 text-3xl font-bold'>
					{sections.disclaimer.title}
				</h1>

				<p>{sections.disclaimer.text}</p>
			</div>
		</InfoNavProvider>
	)
}
